import { useState } from "react";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import BarcodeResultToast from "./BarcodeResultMessage";

const Results = ({ barcodes }: { barcodes: Barcode[] }) => {
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
        className={`results-container fixed z-50 bg-white ${
          isExpanded
            ? "h-[100%] transition-all duration-10 ease-in-out"
            : "h-[5%] transition-all duration-10 ease-in-out"
        } w-full md:min-w-[400px] max-w-[600px] left-1/2 transform -translate-x-1/2 bottom-0 overflow-y-auto`}
      >
        <button onClick={toggleHeight} className="text-center w-full py-0.5">
          {isExpanded ? "Collapse" : "Expand"}
        </button>
        {uniqueBarcodes.reverse().map((barcode) => (
          <BarcodeResultToast
            key={barcode.rawBytes.join("")}
            barcode={barcode}
          />
        ))}
      </div>
    </>
  );
};

export default Results;
