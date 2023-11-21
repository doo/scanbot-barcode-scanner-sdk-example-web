import { useState, useEffect } from "react";
import type { default as ScanbotSDKType } from "scanbot-web-sdk/@types/scanbot-sdk";
import { IBarcodeScannerHandle } from "scanbot-web-sdk/@types/interfaces/i-barcode-scanner-handle";
import { BarcodeScannerConfiguration } from "scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration";
import { scannerService } from "./utils/scannerService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  singleConfig,
  multipleConfig,
  multipleARConfig,
  batchConfig,
  scanAndCountConfig,
  selectARConfig,
  findAndPickARConfig,
} from "./utils/configs";
import detectBarcodeFromImageScan from "./utils/detectBarcodeFromImageScan";
import CloseScannerButton from "./components/CloseScannerButton";
import SectionList from "./components/SectionList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import ScannerContainer from "./components/ScannerContainer";

function App() {
  const [scanbotSDK, setScanbotSDK] = useState<ScanbotSDKType | null>(null); // to remove?
  const [activeScanner, setActiveScanner] =
    useState<IBarcodeScannerHandle | null>(null);

  useEffect(() => {
    const scanbotOptions = {
      licenseKey: "",
    };

    scannerService.initialize(scanbotOptions);

    return () => {
      scannerService.dispose();
    };
  }, []);

  const handleCreateBarcodeScanner = async (
    configuration: BarcodeScannerConfiguration
  ) => {
    try {
      await scannerService.createBarcodeScanner(configuration);
      setActiveScanner(scannerService.getScanner());
    } catch (error) {
      console.error("Error creating barcode scanner", error);
      return Promise.reject(`Error creating barcode scanner: ${error}`);
    }
  };

  const handleScannerClose = () => {
    if (activeScanner) {
      scannerService.dispose();
      setActiveScanner(null);
    }
  };

  const sectionListData = [
    {
      title: "Barcode Scanning Use Cases",
      data: [
        {
          title: "Scan Single Barcodes",
          scanningFunction: () => handleCreateBarcodeScanner(singleConfig),
        },
        {
          title: "Scan Multiple Barcodes",
          scanningFunction: () => handleCreateBarcodeScanner(multipleConfig),
        },
        {
          title: "Batch Barcode Scan",
          scanningFunction: () => handleCreateBarcodeScanner(batchConfig),
        },
        {
          title: "Scan and Count",
          scanningFunction: () =>
            handleCreateBarcodeScanner(scanAndCountConfig),
        },
        {
          title: "Detect Barcode from Image",
          scanningFunction: () =>
            detectBarcodeFromImageScan(scannerService.getScanbotSDK()),
        },
      ],
    },
    {
      title: "Barcode AR Overlay Use Cases",
      data: [
        {
          title: "AR-MultiScan",
          scanningFunction: () => handleCreateBarcodeScanner(multipleARConfig),
        },
        {
          title: "AR-SelectScan",
          scanningFunction: () => handleCreateBarcodeScanner(selectARConfig),
        },
        {
          title: "AR-FindAndPickScan",
          scanningFunction: () =>
            handleCreateBarcodeScanner(findAndPickARConfig),
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SectionList sections={sectionListData} />
      <ScannerContainer
        id="scanner"
        className="fixed top-0 bottom-0 left-0 right-0 z-20 empty:static"
      />
      {scannerService.getScanner() && (
        <CloseScannerButton handleScannerClose={handleScannerClose} />
      )}
      <Banner />
      <Footer />
    </>
  );
}

export default App;
