import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import ResultToast from "./ResultToast";
import { ResultsType } from "../utils/types";
import ResultsTray from "./ResultsTray";

const ResultsContainer = ({
  barcodes,
  handleClearResults,
  resultsType,
  handleDismiss,
}: {
  barcodes: Barcode[];
  handleClearResults: () => void;
  resultsType: ResultsType;
  handleDismiss: () => void;
}) => {
  return (
    <>
      {resultsType === "single" && barcodes.length > 0 && (
        <ResultToast result={barcodes[0]} handleDismiss={handleDismiss} />
      )}
      {resultsType === "multiple" && (
        <ResultsTray
          barcodes={barcodes}
          handleClearResults={handleClearResults}
        />
      )}
    </>
  );
};

export default ResultsContainer;
