import { useState, useEffect } from "react";
import { IBarcodeScannerHandle } from "scanbot-web-sdk/@types/interfaces/i-barcode-scanner-handle";
import { scannerService } from "./services/scannerService";
import SectionList from "./components/SectionList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import ScannerContainer from "./components/ScannerContainer";
import CloseScannerButton from "./components/CloseScannerButton";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import Results from "./components/Results";
import { menuData } from "./utils/menuData";
import BarcodeResultToast from "./components/BarcodeResultToast";
import {
  HandleCreateScannerType,
  ResultsType,
  UpdateResultsType,
} from "./utils/types";

function App() {
  const [activeScanner, setActiveScanner] =
    useState<IBarcodeScannerHandle | null>(null);
  const [results, setResults] = useState<Barcode[]>([]);
  const [resultsType, setResultsType] = useState<ResultsType>(null);

  useEffect(() => {
    const scanbotOptions = {
      licenseKey: "",
    };

    scannerService.initialize(scanbotOptions);

    setTimeout(() => {
      alert(
        "Your license is corrupted or expired, Scanbot features are disabled. Please restart the app in order to receive one minute valid license."
      );
      scannerService.dispose();
      handleClearResults();
    }, 60000);

    return () => {
      scannerService.dispose();
    };
  }, []);

  const handleCreateBarcodeScanner: HandleCreateScannerType = async (
    configuration,
    type
  ) => {
    const licenseInfo = await scannerService.getLicenseInfo();
    if (licenseInfo.isValid()) {
      try {
        await scannerService.createBarcodeScanner(configuration);
        setActiveScanner(scannerService.getScanner());
        setResultsType(type);
      } catch (error) {
        console.error("Error creating barcode scanner", error);
        return Promise.reject(`Error creating barcode scanner: ${error}`);
      }
    } else {
      console.error("License is not valid");
      alert("License is not valid");
    }
  };

  const handleResults: UpdateResultsType = (result) =>
    setResults((prev) => [...prev, ...result.barcodes]);

  const handleClearResults = () => {
    setResults([]);
  };

  const handleScannerClose = () => {
    if (activeScanner) {
      scannerService.dispose();
      setActiveScanner(null);
      handleClearResults();
    }
  };

  const handleDismiss = () => {
    scannerService.resume();
    handleClearResults();
  };

  return (
    <>
      <Header />
      <SectionList
        sections={menuData(handleCreateBarcodeScanner, handleResults)}
      />
      <ScannerContainer
        id="scanner"
        className="fixed top-0 bottom-0 left-0 right-0 z-20 empty:static"
      >
        {activeScanner && (
          <CloseScannerButton handleScannerClose={handleScannerClose} />
        )}
      </ScannerContainer>
      {activeScanner !== null &&
        (results.length > 0 && resultsType === "single" ? (
          <BarcodeResultToast
            result={results[0]}
            handleDismiss={handleDismiss}
          />
        ) : (
          resultsType === "multiple" && (
            <Results
              barcodes={results}
              handleClearResults={handleClearResults}
            />
          )
        ))}
      <Banner />
      <Footer />
    </>
  );
}

export default App;
