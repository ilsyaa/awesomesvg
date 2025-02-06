export default function Icon({ svg }) {
    const handleCopy = async () => {
        await navigator.clipboard.writeText(svg);
    }

    return (
        <button type="button" onClick={handleCopy} className="border border-gray-200 rounded-xl p-5 flex flex-col text-center gap-3 aspect-square justify-center items-center cursor-pointer">
            <div className="[&_svg]:size-8" dangerouslySetInnerHTML={{ __html: svg }}></div>
        </button>
    )
}