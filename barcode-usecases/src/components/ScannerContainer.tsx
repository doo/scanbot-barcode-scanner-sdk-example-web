export interface ScannerContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children?: React.ReactNode;
}

const ScannerContainer = ({
  children,
  id,
  ...props
}: ScannerContainerProps) => {
  return (
    <div id={id} {...props}>
      {children}
    </div>
  );
};

export default ScannerContainer;
