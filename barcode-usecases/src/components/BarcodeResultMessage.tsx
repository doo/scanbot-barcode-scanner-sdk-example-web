import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

const BarcodeResultToast = ({ barcode }: { barcode: Barcode }) => {
  const image = new Blob([barcode.barcodeImage], { type: "image/jpeg" });

  return (
    <div className="flex">
      <img
        src={URL.createObjectURL(image)}
        alt="barcode"
        className="mr-1 w-8 h-fit my-auto"
      />
      <div className="my-auto">
        <p className="font-semibold">{barcode.format}</p>
        <p>{barcode.text}</p>
      </div>
    </div>
  );
};

export default BarcodeResultToast;
