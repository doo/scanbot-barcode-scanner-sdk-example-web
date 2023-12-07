import { useState, useEffect } from "react";
import { IBarcodeScannerHandle } from "scanbot-web-sdk/@types/interfaces/i-barcode-scanner-handle";
import { BarcodeScannerConfiguration } from "scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration";
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

function App() {
  const [activeScanner, setActiveScanner] =
    useState<IBarcodeScannerHandle | null>(null);
  const [results, setResults] = useState<Barcode[]>([]);
	const [showResultsContainer, setShowResultsContainer] = useState<boolean>(false);

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
    configuration: BarcodeScannerConfiguration,
		showResultsContainer: boolean = true
  ) => {
    const licenseInfo = await scannerService.getLicenseInfo();
    if (licenseInfo.isValid()) {
      try {
        await scannerService.createBarcodeScanner(configuration);
        setActiveScanner(scannerService.getScanner());
				setShowResultsContainer(showResultsContainer);
      } catch (error) {
        console.error("Error creating barcode scanner", error);
        return Promise.reject(`Error creating barcode scanner: ${error}`);
      }
    } else {
      console.error("License is not valid");
      alert("License is not valid");
    }
  };

  const handleResults = (result: { barcodes: Barcode[] }) =>
    setResults((prev) => [...prev, ...result.barcodes]);

  const handleClearResults = () => {
    setResults([]);
  };

  const handleScannerClose = () => {
    if (activeScanner) {
      scannerService.dispose();
      setActiveScanner(null);
      setResults([]);
			setShowResultsContainer(false);
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
      {showResultsContainer && (
        <Results barcodes={results} handleClearResults={handleClearResults} />
      )}
      {(results.length > 0 && !showResultsContainer) && (
        <BarcodeResultToast result={results[0]} handleDismiss={handleDismiss} />
      )}
      <Banner />
      <Footer />
    </>
  );
}

export default App;
