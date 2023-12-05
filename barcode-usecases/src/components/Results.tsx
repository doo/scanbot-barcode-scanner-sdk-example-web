import { useState } from "react";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

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
          isExpanded ? "h-[100vh]" : "h-[auto]"
        } w-full md:min-w-[400px] max-w-[600px] left-1/2 transform -translate-x-1/2 bottom-0 overflow-y-auto`}
      >
        <button onClick={toggleHeight} className="text-center w-full py-0.5">
          {isExpanded ? "Collapse" : "Expand"}
        </button>
        {uniqueBarcodes.reverse().map((barcode, index) => (
          <div
            key={index}
            className="flex px-2 py-1 border-b border-gray-300 last:border-0"
          >
            <img
              src={URL.createObjectURL(
                new Blob([barcode.barcodeImage], { type: "image/jpeg" })
              )}
              alt="barcode"
              className="mr-2 w-8 my-auto"
            />
            <div>
              <p>{barcode.format}</p>
              <p>{barcode.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Results;
