import { useState } from "react";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

const BarcodeResult = ({
  barcode,
}: {
  barcode: Barcode;
  handleClearResults: () => void;
}) => {
  const image = new Blob([barcode.barcodeImage], { type: "image/jpeg" });

  return (
    <div className="flex px-2 py-1 border-b border-gray-100/50 last:border-0">
      <img
        src={URL.createObjectURL(image)}
        alt="barcode"
        className="mr-2 w-8 my-auto"
      />
      <div className="my-auto">
        <p className="font-semibold">{barcode.format}</p>
        <p>{barcode.text}</p>
      </div>
    </div>
  );
};

const ResultsTray = ({
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
        className={`results-container fixed z-50 bg-white/80 transition-all duration-10 ease-in-out ${
          isExpanded ? "h-[100%]" : "h-[25%]"
        } w-full max-w-[500px] left-1/2 transform -translate-x-1/2 bottom-0 rounded-t-md sm:rounded-b-md shadow-sm`}
      >
        <div className="sticky top-0 grid grid-cols-3 px-2 py-1 items-center bg-red text-white rounded-t-md">
          <span>{`${uniqueBarcodes.length} codes`}</span>
          <button onClick={toggleHeight} className="text-center py-0.5">
            {isExpanded ? "Collapse" : "Expand"}
          </button>
          {uniqueBarcodes.length >= 1 && (
            <span
              onClick={handleClearResults}
              className="cursor-pointer text-right"
            >
              Clear
            </span>
          )}
        </div>
        {uniqueBarcodes.length > 0 && (
          <div className="overflow-y-auto max-h-[calc(100%-48px)]">
            {uniqueBarcodes.reverse().map((barcode) => (
              <BarcodeResult
                key={barcode.rawBytes.join("")}
                barcode={barcode}
                handleClearResults={handleClearResults}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ResultsTray;