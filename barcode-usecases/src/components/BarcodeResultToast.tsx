import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

const BarcodeResultToast = ({
  result,
  handleDismiss,
}: {
  result: Barcode;
  handleDismiss: () => void;
}) => {
  const { barcodeImage, format, text } = result;

  const image = new Blob([barcodeImage], { type: "image/jpeg" });

  return (
    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 bg-white rounded-md py-2 px-2 min-w-[400px] max-w-[600px] shadow-sm z-50">
      <div className="flex flex-col items-center gap-1 text-center mx-1 my-2">
        <img
          src={URL.createObjectURL(image)}
          alt="barcode"
          className="w-10 my-auto"
        />
        <div className="my-auto">
          <p className="font-semibold">{format}</p>
          <p>{text}</p>
        </div>
        <button
          className="bg-red text-white font-semibold py-1 w-full rounded-md"
          onClick={handleDismiss}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default BarcodeResultToast;
