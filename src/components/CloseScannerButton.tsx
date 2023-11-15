import {type IScannerCommon} from 'scanbot-web-sdk/@types/interfaces/i-scanner-common-handle'

const CloseScannerButton = ({
  scanner,
  setScanner,
}: {
  scanner: IScannerCommon;
  setScanner: () => void;
}) => {
  return (
    <span
      id="close-scanner"
      className="absolute top-2 right-4 text-white cursor-pointer rotate-45 text-4xl z-30"
      onClick={() => {
        scanner.dispose();
        setScanner();
      }}
    >
      +
    </span>
  );
};

export default CloseScannerButton;
