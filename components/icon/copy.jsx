import { useState, useRef } from "react";

export default function IconCopy({ svg, swap }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  function copySVG() {
    const svgElement = document.createElement("svg");
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("viewBox", svg.viewBox);

    svg.path.map((p, index) => {
      if (swap) index = svg.path.length - index - 1;
      const pathElement = document.createElement("path");
      pathElement.setAttribute("d", p);
      pathElement.setAttribute("fill", "currentColor");
      pathElement.style.opacity = svg.path.length > 1 && index === 0 ? 0.4 : 1;
      svgElement.appendChild(pathElement);
    });

    navigator.clipboard.writeText(svgElement.outerHTML);
    setCopied(true);

    // Clear timeout sebelumnya jika ada
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set timeout baru
    timeoutRef.current = setTimeout(() => {
      setCopied(false);
      timeoutRef.current = null;
    }, 2000);
  }

  return (
    <button
      type="button"
      onClick={copySVG}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-cat-900 dark:bg-white text-white dark:text-cat-900 hover:opacity-95 h-9 px-4 py-2 w-full cursor-pointer"
    >
      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><defs></defs><path fill="currentColor" style={{ opacity: 0.4 }} d="M128 128H48c-26.5 0-48 21.5-48 48V464c0 26.5 21.5 48 48 48H272c26.5 0 48-21.5 48-48V416H256v32H64V192h64V128z"/><path fill="currentColor" d="M160 48c0-26.5 21.5-48 48-48H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48z"/></svg>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
