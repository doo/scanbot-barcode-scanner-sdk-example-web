import { useState } from "react";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import SingleBarcodeResult from "./SingleBarcodeResult";

const Results = ({
  barcodes,
  handleClearResults,
}: {
  barcodes: Barcode[];
  handleClearResults: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
        className={`results-container fixed z-50 bg-white/80 ${
          isExpanded
            ? "h-[100%] transition-all duration-10 ease-in-out"
            : "h-[20%] transition-all duration-10 ease-in-out"
        } w-full md:min-w-[400px] max-w-[600px] left-1/2 transform -translate-x-1/2 bottom-0 overflow-y-auto rounded-s-md rounded-t-md`}
      >
        <div className="flex justify-between px-2 py-1 items-center bg-red text-white">
          <span>{`${uniqueBarcodes.length} codes`}</span>
          <button onClick={toggleHeight} className="text-center py-0.5">
            {isExpanded ? "Collapse" : "Expand"}
          </button>
          {uniqueBarcodes.length > 1 && (
            <span onClick={handleClearResults} className="cursor-pointer">
              Clear
            </span>
          )}
        </div>
        {uniqueBarcodes.reverse().map((barcode) => (
          <SingleBarcodeResult
            key={barcode.rawBytes.join("")}
            barcode={barcode}
            handleClearResults={handleClearResults}
          />
        ))}
      </div>
    </>
  );
};

export default Results;
