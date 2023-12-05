import { useState, useEffect } from "react";
import { IBarcodeScannerHandle } from "scanbot-web-sdk/@types/interfaces/i-barcode-scanner-handle";
import { BarcodeScannerConfiguration } from "scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration";
import { scannerService } from "./services/scannerService";
import { ToastContainer, toast } from "react-toastify";
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
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import Results from "./components/Results";
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

function App() {
  const [activeScanner, setActiveScanner] =
    useState<IBarcodeScannerHandle | null>(null);
  const [scannedBarcodes, setScannedBarcodes] = useState<Barcode[]>([]);
  const [isSingleScan, setIsSingleScan] = useState(false);

  useEffect(() => {
    const scanbotOptions = {
      licenseKey: "",
    };

    scannerService.initialize(scanbotOptions);

    return () => {
      scannerService.dispose();
    };
  }, []);

	
  const scanSingleBarcode = () => {
		initScanner(singleBarcodeScan, { isSingle: true });
  };
	
  const scanBatchBarcodes = () => {
		initScanner(batchBarcodeScan(onBarcodesDetected));
  };
	
	const initScanner = (scanConfig, { isSingle = false } = {}) => {
		if (isSingle) {
			setIsSingleScan(true);
		}
		handleCreateBarcodeScanner(scanConfig);
	};

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
      toastService.showErrorToast({ message: "License is not valid" });
    }
  };

  const onBarcodesDetected = (result: BarcodeResult) => {
    setScannedBarcodes((prev) => {
      const newBarcodes = result.barcodes.filter(
        (newBarcode) =>
          !prev.some(
            (existingBarcode) => existingBarcode.text === newBarcode.text
          )
      );
      return [...newBarcodes, ...prev];
    });
  };

  const handleScannerClose = () => {
    if (activeScanner) {
      scannerService.dispose();
      setActiveScanner(null);
      toast.dismiss();
    }
  };

  const sectionListData = [
    {
      title: "Barcode Scanning Use Cases",
      data: [
        {
          title: "Scan Single Barcodes",
          scanningFunction: scanSingleBarcode,
        },
        {
          title: "Scan Multiple Barcodes",
          scanningFunction: () =>
            handleCreateBarcodeScanner(multipleBarcodeScan),
        },
        {
          title: "Batch Barcode Scan",
          scanningFunction: scanBatchBarcodes,
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
        className={"absolute h-[200px]"}
      />
      <SectionList sections={sectionListData} />
      <ScannerContainer
        id="scanner"
        className="fixed top-0 bottom-0 left-0 right-0 z-20 empty:static"
      >
        {activeScanner && (
          <CloseScannerButton handleScannerClose={handleScannerClose} />
        )}
      </ScannerContainer>
      {activeScanner && !isSingleScan ? (
        <Results barcodes={scannedBarcodes} />
      ) : null}
      <Banner />
      <Footer />
    </>
  );
}

export default App;
