import { useState } from "react";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import SingleBarcodeResult from "./SingleBarcodeResult";
import { scannerService } from "../services/scannerService";

const Results = ({
  barcodes,
  handleClearResults,
}: {
  barcodes: Barcode[];
  handleClearResults: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isSingleScan = scannerService.getScanner()?.isDetectionPaused();
  const defaultHeight = isSingleScan ? "h-[40%]" : "h-[20%]";

  const toggleHeight = () => {
    setIsExpanded(!isExpanded);
  };

  const uniqueBarcodes = Array.from(
    new Set(barcodes.map((barcode) => barcode.text))
  ).map((text) => {
    return barcodes.find((barcode) => barcode.text === text)!;
  });

  return (
    <>
      <div
        className={`results-container fixed z-50 bg-red text-white ${
          isExpanded
            ? "h-[100%] transition-all duration-10 ease-in-out"
            : `${defaultHeight} transition-all duration-10 ease-in-out`
        } w-full md:min-w-[400px] max-w-[600px] left-1/2 transform -translate-x-1/2 bottom-0 overflow-y-auto`}
      >
        <div className="flex justify-between px-2 py-1 items-center">
          <span>{`${uniqueBarcodes.length} codes`}</span>
          <button onClick={toggleHeight} className="text-center py-0.5">
            {isExpanded ? "Collapse" : "Expand"}
          </button>
          {!isSingleScan && <span onClick={handleClearResults} className="cursor-pointer">Clear</span>}
        </div>
        {uniqueBarcodes.reverse().map((barcode) => (
          <SingleBarcodeResult
            key={barcode.rawBytes.join("")}
            barcode={barcode}
            dismissable={isSingleScan ? true : false}
            handleClearResults={handleClearResults}
          />
        ))}
      </div>
    </>
  );
};

export default Results;
