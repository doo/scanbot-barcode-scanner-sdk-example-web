import { useState, useEffect } from "react";
import ScanbotSDK from "scanbot-web-sdk";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  multipleBarcodeScan,
  singleBarcodeScan,
  scanAndCountScan,
  multiARScan,
} from "./utils";
import Banner from "./components/Banner";
import type { default as ScanbotSDKType } from "scanbot-web-sdk/@types/scanbot-sdk";
<<<<<<< HEAD
import { type IScannerCommon } from "scanbot-web-sdk/@types/interfaces/i-scanner-common-handle";
import { ToastContainer } from "react-toastify";
=======
import { ToastContainer, toast } from "react-toastify";
>>>>>>> 1481170 (multiARScan and type fixes to app.tsx)
import "react-toastify/dist/ReactToastify.css";
import CloseScannerButton from "./components/CloseScannerButton";
import SectionList from "./components/SectionList";

function App() {
  const [scanbotSDK, setScanbotSDK] = useState<ScanbotSDKType | null>(null);
  const [activeScanner, setActiveScanner] = useState<
    IScannerCommon | undefined
  >(undefined);

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
<<<<<<< HEAD
    scanningFunction: () => Promise<IScannerCommon | undefined>
  ) => {
    const licenseInfo = await scanbotSDK?.getLicenseInfo();

    if (licenseInfo?.isValid()) {
      const currentScanner = await scanningFunction();
      setActiveScanner(currentScanner);
    } else {
      alert(
        "License not valid. Your license is corrupted or expired, Scanbot features are disabled. Please restart the app in order to receive one minute valid license."
      );
    }
=======
    scanningFunction: (sdk: ScanbotSDKType) => void
  ) => {
    const licenseInfo = await scanbotSDK?.getLicenseInfo();

    licenseInfo?.isValid()
      ? scanbotSDK
        ? scanningFunction(scanbotSDK)
        : toast.error("Scanbot SDK not initialized.")
      : toast.warn(
          "License not valid. Your license is corrupted or expired, Scanbot features are disabled. Please restart the app in order to receive one minute valid license."
        );
>>>>>>> 1481170 (multiARScan and type fixes to app.tsx)
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
          title: "Scanning Multiple Barcodes",
          scanningFunction: () =>
            callWithLicense(() => multipleBarcodeScan(scanbotSDK)),
        },
        {
          title: "Scan and Count",
          scanningFunction: () =>
            callWithLicense(() => scanAndCountScan(scanbotSDK)),
        },
        {
          title: "Scanning Tiny Barcodes",
          scanningFunction: () => console.log("Scanning Tiny Barcodes"),
        },
      ],
    },
    {
      title: "Barcode AR Overlay Use Cases",
      data: [
        {
          title: "AR-MultiScan",
          scanningFunction: () =>
            callWithLicense(() => multiARScan(scanbotSDK)),
        },
        {
          title: "AR-SelectScan",
          scanningFunction: () => console.log("AR-SelectScan"),
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
          setScanner={() => setActiveScanner(undefined)}
        />
      )}
      <Banner />
      <Footer />
    </>
  );
}

export default App;
