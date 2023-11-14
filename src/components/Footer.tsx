export default function Footer() {
  return (
    <footer className="py-2 text-center border-t border-gray-200">
      <div className="container">
        <p className="text-sm text-gray-800">
          ©Scanbot SDK GmbH 2011-{new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
