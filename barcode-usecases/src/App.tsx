import { useState, useEffect } from "react";
import { IBarcodeScannerHandle } from "scanbot-web-sdk/@types/interfaces/i-barcode-scanner-handle";
import { BarcodeScannerConfiguration } from "scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration";
import { scannerService } from "./services/scannerService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  singleBarcodeScan,
  multipleBarcodeScan,
  multiARScan,
  batchBarcodeScan,
  scanAndCountARScan,
  selectARScan,
  findAndPickARScan,
} from "./utils/index";
import detectBarcodeFromImageScan from "./utils/detectBarcodeFromImageScan";
import SectionList from "./components/SectionList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import ScannerContainer from "./components/ScannerContainer";
import CloseScannerButton from "./components/CloseScannerButton";
import toastService from "./services/toastService";

function App() {
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
    const licenseInfo = await scannerService.getLicenseInfo();
    if (licenseInfo.isValid()) {
      try {
        await scannerService.createBarcodeScanner(configuration);
        setActiveScanner(scannerService.getScanner());
      } catch (error) {
        console.error("Error creating barcode scanner", error);
        return Promise.reject(`Error creating barcode scanner: ${error}`);
      }
    } else {
      console.error("License is not valid");
      toastService.showErrorToast("License is not valid");
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
          scanningFunction: () => handleCreateBarcodeScanner(singleBarcodeScan),
        },
        {
          title: "Scan Multiple Barcodes",
          scanningFunction: () =>
            handleCreateBarcodeScanner(multipleBarcodeScan),
        },
        {
          title: "Batch Barcode Scan",
          scanningFunction: () => handleCreateBarcodeScanner(batchBarcodeScan),
        },
        {
          title: "Detect Barcode from Image",
          scanningFunction: () => detectBarcodeFromImageScan(),
        },
      ],
    },
    {
      title: "Barcode AR Overlay Use Cases",
      data: [
        {
          title: "AR-MultiScan",
          scanningFunction: () => handleCreateBarcodeScanner(multiARScan),
        },
        {
          title: "AR-SelectScan",
          scanningFunction: () => handleCreateBarcodeScanner(selectARScan),
        },
        {
          title: "AR-FindAndPickScan",
          scanningFunction: () => handleCreateBarcodeScanner(findAndPickARScan),
        },
        {
          title: "AR-Scan and Count",
          scanningFunction: () =>
            handleCreateBarcodeScanner(scanAndCountARScan),
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <ToastContainer
        position="bottom-center"
        autoClose={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        theme="light"
		className={"max-h-[30%] md:max-h-[500px] md:w-[500px] overflow-auto"}
      />
      <SectionList sections={sectionListData} />
      <ScannerContainer
        id="scanner"
        className="fixed top-0 bottom-0 left-0 right-0 z-20 empty:static"
      >
        {scannerService.getScanner() && (
          <CloseScannerButton handleScannerClose={handleScannerClose} />
        )}
      </ScannerContainer>
      <Banner />
      <Footer />
    </>
  );
}

export default App;
