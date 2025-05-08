export default function Svg ({ svg, swap = false }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={svg.viewBox}>
            {
                svg.path.map((p, index) => {
                    if(swap) index = svg.path.length - index - 1;
                    const opacity = svg.path.length > 1 && index == 0 ? 0.4 : 1;
                    return <path key={index} d={p} fill="currentColor" style={{ opacity }} />;
                })
            }
        </svg>
    );
}