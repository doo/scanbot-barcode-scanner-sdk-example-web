import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

const SingleBarcodeResult = ({
  barcode,
}: {
  barcode: Barcode;
  dismissable?: boolean;
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

export default SingleBarcodeResult;
