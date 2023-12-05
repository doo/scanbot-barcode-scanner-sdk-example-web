import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

const SingleBarcodeResult = ({
  barcode,
  dismissable,
}: {
  barcode: Barcode;
  dismissable?: boolean;
}) => {
  const image = new Blob([barcode.barcodeImage], { type: "image/jpeg" });

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
      {dismissable && (
        <button className="bg-red text-white py-1 w-full rounded-md">
          Dismiss
        </button>
      )}
    </div>
  );
};

export default SingleBarcodeResult;
