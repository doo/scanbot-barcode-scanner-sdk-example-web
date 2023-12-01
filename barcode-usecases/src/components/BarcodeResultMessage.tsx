import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

const BarcodeResultToast = ({
  barcode,
  dismissButton,
}: {
  barcode: Barcode;
  dismissButton?: boolean;
}) => {
  const image = new Blob([barcode.barcodeImage], { type: "image/jpeg" });

  return (
    <div className="flex h-8">
      <img
        src={URL.createObjectURL(image)}
        alt="barcode"
        className="mr-2 w-8 my-auto"
      />
      <div className="my-auto">
        <p className="font-semibold">{barcode.format}</p>
        <p>{barcode.text}</p>
      </div>
      {dismissButton && <p className="my-auto ml-auto">Dismiss</p>}
    </div>
  );
};

export default BarcodeResultToast;
