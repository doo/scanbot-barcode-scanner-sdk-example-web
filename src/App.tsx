import { useState, useEffect } from "react";
import ScanbotSDK from "scanbot-web-sdk";
import {
  singleBarcodeScan,
  multipleBarcodeScan,
  batchBarcodeScan,
  scanAndCountScan,
  multiARScan,
  selectARScan,
  findAndPickARScan,
  detectBarcodeFromImageScan,
} from "./utils";
import type { default as ScanbotSDKType } from "scanbot-web-sdk/@types/scanbot-sdk";
import { IBarcodeScannerHandle } from "scanbot-web-sdk/@types/interfaces/i-barcode-scanner-handle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseScannerButton from "./components/CloseScannerButton";
import SectionList from "./components/SectionList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";

function App() {
  const [scanbotSDK, setScanbotSDK] = useState<ScanbotSDKType | null>(null);
  const [activeScanner, setActiveScanner] =
    useState<IBarcodeScannerHandle | null>(null);

  useEffect(() => {
    async function initializeSDK() {
      try {
        const sdkInstance = await ScanbotSDK.initialize({
          licenseKey: "",
        });
        setScanbotSDK(sdkInstance);
      } catch (error: unknown) {
        console.error("Failed to initialize Scanbot SDK:", error);
      }
    }

    initializeSDK();
  }, []);

  const callWithLicense = async (
    scanningFunction: (sdk: ScanbotSDKType) => Promise<IBarcodeScannerHandle>
  ) => {
    if (scanbotSDK) {
      const licenseInfo = await scanbotSDK.getLicenseInfo();

      if (licenseInfo.isValid()) {
        const currentScanner = await scanningFunction(scanbotSDK);
        setActiveScanner(currentScanner);
      } else {
        toast.warn(
          "License not valid. Your license is corrupted or expired, Scanbot features are disabled. Please restart the app in order to receive one minute valid license."
        );
      }
    } else {
      toast.error("Scanbot SDK not initialized.");
    }
  };

  const sectionListData = [
    {
      title: "Barcode Scanning Use Cases",
      data: [
        {
          title: "Scan Single Barcodes",
          scanningFunction: () => callWithLicense(singleBarcodeScan),
        },
        {
          title: "Scan Multiple Barcodes",
          scanningFunction: () => callWithLicense(multipleBarcodeScan),
        },
        {
          title: "Batch Barcode Scan",
          scanningFunction: () => callWithLicense(batchBarcodeScan),
        },
        {
          title: "Scan and Count",
          scanningFunction: () => callWithLicense(scanAndCountScan),
        },
        {
          title: "Detect Barcode from Image",
          scanningFunction: () => detectBarcodeFromImageScan(scanbotSDK),
        },
      ],
    },
    {
      title: "Barcode AR Overlay Use Cases",
      data: [
        {
          title: "AR-MultiScan",
          scanningFunction: () => callWithLicense(multiARScan),
        },
        {
          title: "AR-SelectScan",
          scanningFunction: () => callWithLicense(selectARScan),
        },
        {
          title: "AR-SelectScan",
          scanningFunction: () => callWithLicense(findAndPickARScan),
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
      <div
        id="scanner"
        className="fixed top-0 bottom-0 left-0 right-0 z-20 empty:static"
      ></div>
      {activeScanner && (
        <CloseScannerButton
          scanner={activeScanner}
          setScanner={() => setActiveScanner(null)}
        />
      )}
      <Banner />
      <Footer />
    </>
  );
}

export default App;
