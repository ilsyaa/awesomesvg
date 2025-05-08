import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import Svg from "@/components/icon/svg";
import IconCopy from "@/components/icon/copy";

export default function IconDetail({ iconDetail, setIconDetail }) {
  const isOpen = !!iconDetail;
  const [icon, setIcon] = useState(null);
  const [displayIcon, setDisplayIcon] = useState(null);

  useEffect(() => {
    if (iconDetail) {
      fetch(`/api/detail?id=${iconDetail.id}`)
        .then((res) => res.json())
        .then((data) => {
          setDisplayIcon({
            pack: iconDetail.pack,
            style: iconDetail.style,
            svg: data.packs.find((p) => p.key === iconDetail.pack).styles.find((s) => s.key === iconDetail.style).svg,
            swap: false,
          });
          setIcon(data);
        })
        .catch((err) => {
          console.error(err);
          handleClose();
        });
    }
  }, [iconDetail]);

  const handleClose = () => {
    setIconDetail(null);
    setDisplayIcon(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <div className="sr-only">
          <DialogTitle>Icon Detail</DialogTitle>
          <DialogDescription>View icon details.</DialogDescription>
        </div>
        {
          (icon && displayIcon) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative aspect-[1/1] bg-cat-100 dark:bg-cat-700/20 rounded-xl flex flex-col justify-center items-center text-center">
                <div className="[&>svg]:w-16 [&>svg]:h-16">
                  <Svg
                    svg={displayIcon.svg}
                    swap={displayIcon.swap}
                  />
                </div>
                <div className="absolute bottom-3 right-1/2 translate-x-1/2 text-xs">
                  {displayIcon.style}
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="text-xl font-bold">{icon.label}</div>
                <div className="flex flex-wrap gap-2">
                  {icon.packs.map((pack, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setDisplayIcon({
                          pack: pack.key,
                          style: pack.styles[0].key,
                          svg: pack.styles[0].svg,
                          swap: false,
                        })
                      }
                      className="bg-cat-200 dark:bg-cat-900 text-xs font-medium rounded-full px-3 py-1.5 uppercase cursor-pointer"
                    >
                      {displayIcon.pack === pack.key ? (
                        <span className="bg-emerald-500 rounded-full w-2 h-2 inline-block mr-2"></span>
                      ) : (
                        <span className="bg-cat-500 rounded-full w-2 h-2 inline-block mr-2"></span>
                      )}
                      {pack.key}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {icon.packs.find((pack) => pack.key === displayIcon.pack).styles.map((style, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() =>
                                setDisplayIcon({
                                  ...displayIcon,
                                  style: style.key,
                                  svg: style.svg,
                                  swap: false,
                                })
                              }
                              className="bg-cat-200 dark:bg-cat-900 text-xs font-medium rounded-lg size-9 uppercase cursor-pointer flex justify-center items-center"
                            >
                              <div className="[&>svg]:w-5 [&>svg]:h-5">
                                <Svg svg={style.svg} />
                              </div>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{style.key}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                </div>
                {
                  (displayIcon.pack == 'duotone') && (
                    <div className="flex flex-wrap gap-2">
                      <button
                          type="button"
                          onClick={() =>
                            setDisplayIcon({
                              ...displayIcon,
                              swap: false,
                            })
                          }
                          className="bg-cat-200 dark:bg-cat-900 text-xs font-medium rounded-lg size-9 uppercase cursor-pointer flex justify-center items-center"
                        >
                          <div className="[&>svg]:w-4 [&>svg]:h-4">
                            <Svg svg={displayIcon.svg} />
                          </div>
                      </button>
                      <button
                          type="button"
                          onClick={() =>
                            setDisplayIcon({
                              ...displayIcon,
                              swap: true,
                            })
                          }
                          className="bg-cat-200 dark:bg-cat-900 text-xs font-medium rounded-lg size-9 uppercase cursor-pointer flex justify-center items-center"
                        >
                          <div className="[&>svg]:w-4 [&>svg]:h-4">
                            <Svg svg={displayIcon.svg} swap={true} />
                          </div>
                        </button>
                    </div>
                  )
                }
                <div className="mt-auto">
                  <IconCopy svg={displayIcon.svg} swap={displayIcon.swap} />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-pulse">
              <div className="relative aspect-[1/1] bg-cat-100 dark:bg-cat-700/20 rounded-xl"></div>
              <div className="inline-flex flex-col gap-5">
                <div className="text-xl font-bold text-transparent bg-cat-200 dark:bg-cat-900 rounded-lg inline-block">label</div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-cat-200 dark:bg-cat-900 text-xs font-medium rounded-full px-3 py-1 uppercase cursor-pointer text-transparent">classic</div>
                  <div className="bg-cat-200 dark:bg-cat-900 text-xs font-medium rounded-full px-3 py-1 uppercase cursor-pointer text-transparent">solid</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-cat-200 dark:bg-cat-900 text-xs font-medium rounded-lg size-9 uppercase cursor-pointer flex justify-center items-center"></div>
                  <div className="bg-cat-200 dark:bg-cat-900 text-xs font-medium rounded-lg size-9 uppercase cursor-pointer flex justify-center items-center"></div>
                  <div className="bg-cat-200 dark:bg-cat-900 text-xs font-medium rounded-lg size-9 uppercase cursor-pointer flex justify-center items-center"></div>
                </div>
              </div>
            </div>
          )
        }
      </DialogContent>
    </Dialog>
  );
}
