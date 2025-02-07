export default function Icon({ svg, label, styleList }) {

    const handleCopy = async () => {
        await navigator.clipboard.writeText(regexSvg(svg));
    }

    return (
        <>
            {styleList === 'cheatsheet' ? (
                <button type="button" onClick={handleCopy} className="bg-white hover:shadow-emerald-400/50 shadow rounded-lg p-3 flex items-center gap-3 cursor-pointer">
                    <div className="size-5 [&_svg]:h-full [&_svg]:w-auto" dangerouslySetInnerHTML={{ __html: regexSvg(svg) }}></div>
                    <div className="text-xs text-gray-500 line-clamp-1">{label}</div>
                </button>
            ) : styleList === 'compact' ? (
                <button type="button" onClick={handleCopy} className="bg-white hover:shadow-emerald-400/50 shadow rounded-lg p-5 flex flex-col text-center gap-3 aspect-square justify-center items-center cursor-pointer">
                    <div className="size-5 [&_svg]:h-full [&_svg]:w-auto" dangerouslySetInnerHTML={{ __html: regexSvg(svg) }}></div>
                </button>
            ) : null}
        </>
    );
}

function regexSvg(svg) {
    // Add fill="currentColor" to all <path> elements
    svg = svg.replace(/<path([^>]*?)>/g, '<path fill="currentColor"$1>');

    return svg
}