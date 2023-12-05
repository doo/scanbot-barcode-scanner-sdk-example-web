import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

const BarcodeResultToast = ({
  barcode,
  singleToast,
}: {
  barcode: Barcode;
  singleToast?: boolean;
}) => {
  const image = new Blob([barcode.barcodeImage], { type: "image/jpeg" });

  if (singleToast) {
    return (
      <div className="flex flex-col items-center rounded-md h-full">
        <div className="flex flex-col justify-between items-center mb-2">
          <img
            src={URL.createObjectURL(image)}
            alt="barcode"
            className="w-8 my-1"
          />
          <div className="my-auto text-center">
            <p className="font-semibold">{barcode.format}</p>
            <p>{barcode.text}</p>
          </div>
        </div>
        <div className="w-full">
          <button className="bg-red text-white py-1 w-full rounded-md">
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex px-2 py-1 border-b border-gray-300 last:border-0">
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

export default BarcodeResultToast;
