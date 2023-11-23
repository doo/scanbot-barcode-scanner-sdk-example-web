export default function Banner() {
  return (
    <div className="container py-4">
      <div className="p-2 bg-red-100 flex flex-col items-center gap-2">
        <p className="font-semibold text-lg">
          Having trouble with integrating?
        </p>
        <a
          href="#"
          className="inline-block bg-red px-3 py-1 text-white no-underline hover:bg-red-500 rounded-sm"
        >
          Contact support
        </a>
        <a href="#" className="inline-block text-sm">
          Get your trial license now
        </a>
      </div>
    </div>
  );
}
