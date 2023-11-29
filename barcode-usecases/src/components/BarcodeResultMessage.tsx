import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

const BarcodeResultToast = ({ barcode }: { barcode: BarcodeResult }) => {
  const imageArray = barcode.barcodes[0].barcodeImage;
  const image = new Blob([imageArray], { type: "image/jpeg" });
  return (
    <div className="flex">
      <img src={URL.createObjectURL(image)} alt="barcode" className="mr-1 w-8 h-fit my-auto" />
      <div className="my-auto">
        <p className="font-semibold">{barcode.barcodes[0].format}</p>
        <p>{barcode.barcodes[0].text}</p>
      </div>
    </div>
  );
};

export default BarcodeResultToast;
