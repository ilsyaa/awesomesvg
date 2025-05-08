import React from "react";
import Svg from "@/components/icon/svg";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const IconWrapper = React.memo(function IconWrapper({ id, pack, style, svg, label, setIconDetail }) {
    return (
        <TooltipProvider delayDuration={500}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        onClick={() => setIconDetail({ id, pack, style })}
                        className="bg-white dark:bg-cat-800/80 aspect-[1/1] rounded-xl flex flex-col justify-center items-center text-center gap-3 cursor-pointer duration-200 hover:scale-105 transition-all animate-in fade-in-0"
                    >
                        <div className="[&>svg]:w-6 [&>svg]:h-6">
                            <Svg svg={svg} swap={false} />
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
});

export default IconWrapper;