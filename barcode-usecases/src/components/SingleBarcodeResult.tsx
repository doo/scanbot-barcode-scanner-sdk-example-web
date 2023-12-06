import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import { scannerService } from "../services/scannerService";

const SingleBarcodeResult = ({
  barcode,
  dismissable,
  handleClearResults,
}: {
  barcode: Barcode;
  dismissable?: boolean;
	handleClearResults: () => void;
}) => {
  const image = new Blob([barcode.barcodeImage], { type: "image/jpeg" });

  const handleDismiss = () => {
    scannerService.resume();
		handleClearResults();
  };

  if (dismissable) {
    return (
      <div className="flex flex-col items-center gap-1 text-center mx-1 my-2">
        <img
          src={URL.createObjectURL(image)}
          alt="barcode"
          className="w-10 my-auto"
        />
        <div className="my-auto">
          <p className="font-semibold">{barcode.format}</p>
          <p>{barcode.text}</p>
        </div>
        <button
          className="bg-white text-red font-semibold py-1 w-full rounded-md"
          onClick={handleDismiss}
        >
          Dismiss
        </button>
      </div>
    );
  }

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

export default SingleBarcodeResult;
