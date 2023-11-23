const CloseScannerButton = ({
  handleScannerClose,
}: {
  handleScannerClose: () => void;
}) => {
  return (
    <span
      id="close-scanner"
      className="absolute top-2 right-4 text-white cursor-pointer rotate-45 text-4xl z-30"
      onClick={() => {
        handleScannerClose();
      }}
    >
      +
    </span>
  );
};

export default CloseScannerButton;
