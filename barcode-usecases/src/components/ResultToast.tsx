import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

const ResultToast = ({
  result,
  handleDismiss,
}: {
  result: Barcode;
  handleDismiss: () => void;
}) => {
  const { barcodeImage, format, text } = result;
  const image = new Blob([barcodeImage], { type: "image/jpeg" });

  return (
    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 bg-white rounded-t-md sm:rounded-b-md p-3 w-full max-w-[500px] shadow-sm z-50">
      <div className="flex flex-col items-center gap-2 text-center">
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

export default ResultToast;
