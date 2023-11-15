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

const SectionList = ({
  sections,
}: {
  sections: {
    title: string;
    data: { title: string; scanningFunction: () => void }[];
  }[];
}) => (
  <div className="container">
    {sections.map((section, index) => (
      <div className="mt-5" key={index}>
        <h2 className="h4">{section.title}</h2>
        {section.data.map((item, itemIndex) => (
          <div key={itemIndex}>
            <h3 className="text-lg mt-2">
              <a href="#" onClick={item.scanningFunction}>
                {item.title}
              </a>
            </h3>
          </div>
        ))}
      </div>
    ))}
  </div>
);

function App() {
  const [scanbotSDK, setScanbotSDK] = useState<ScanbotSDKType | null>(null);

  useEffect(() => {
    async function initializeSDK() {
      try {
        const sdkInstance = await ScanbotSDK.initialize({
          licenseKey: "",
        });
        setScanbotSDK(sdkInstance);
      } catch (error) {
        console.error("Failed to initialize Scanbot SDK:", error);
      }
    }

    initializeSDK();
  }, []);

  const callWithLicense = async (scanningFunction: () => void) => {
    const licenseInfo = await scanbotSDK?.getLicenseInfo();

    licenseInfo?.isValid()
      ? await scanningFunction()
      : alert("License is expired or invalid.");
  };

  const sectionListData = [
    {
      title: "Barcode Scanning Use Cases",
      data: [
        {
          title: "Scan Single Barcodes",
          scanningFunction: () =>
            callWithLicense(() => singleBarcodeScan(scanbotSDK)),
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
          scanningFunction: () => callWithLicense(() => multiARScan(scanbotSDK)),
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
      <SectionList sections={sectionListData} />
      <div
        id="scanner"
        className="fixed top-0 bottom-0 left-0 right-0 z-20 empty:static"
      ></div>
      <span
        id="close-scanner"
        className="absolute top-2 right-4 text-white cursor-pointer rotate-45 text-4xl z-30"
      >
        +
      </span>
      <Banner />
      <Footer />
    </>
  );
}

export default App;
