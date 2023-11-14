import logo from "../assets/images/scanbot-logo.svg";

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-2">
      <div className="container">
        <img className="max-w-[140px]" src={logo} alt="Scanbot Logo" />
      </div>
    </header>
  );
}
