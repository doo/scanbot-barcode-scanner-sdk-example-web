import ResultToast from "./ResultToast";
import { ResultsContainerType } from "../utils/types";
import ResultsTray from "./ResultsTray";

const ResultsContainer = ({
  barcodes,
  handleClearResults,
  resultsType,
  handleDismiss,
}: ResultsContainerType) => {
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
