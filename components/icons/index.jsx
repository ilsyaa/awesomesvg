"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearch, useLoading } from "@/lib/global-state";
import { debounce } from "lodash";
import IconDetail from "@/components/icon/detail";
import IconWrapper from "@/components/icon/wrapper";
import { useSearchParams } from 'next/navigation';
import Button from "@/components/ui/button";

let ICONS_PER_PAGE = 90;

export function IconGrid() {
  const searchParams = useSearchParams();
  const pack = searchParams.get("pack");
  const style = searchParams.get("style");

  const { search } = useSearch();
  const [page, setPage] = useState(1);
  const [icons, setIcons] = useState([]);
  const { loading, setLoading } = useLoading();
  const [ iconDetail, setIconDetail ] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchIcons = async (page, search) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/icons?page=${page}&limit=${ICONS_PER_PAGE}&search=${encodeURIComponent(search)}&pack=${pack}&style=${style}`);
      const data = await response.json();
      if (page === 1) {
        setIcons(data.data);
      } else {
        setIcons(prev => [...prev, ...data.data]);
      }
      setHasMore(data.pagination?.page < data.pagination?.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching discover icons:", error);
    }
  };

  const debouncedFetch = useMemo(() => {
    return debounce((page, search) => {
      fetchIcons(page, search);
    }, 300);
  }, []);

  useEffect(() => {
    debouncedFetch(page, search);
    return () => {
      debouncedFetch.cancel();
    };
  }, [page, search, debouncedFetch]);

  useEffect(() => {
    setPage(1);
    fetchIcons(1, search);
  }, [search, pack, style]);

  return (
    <>
      <div className="text-sm font-bold uppercase mb-5">
        {pack + " " + style}
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
        {
          icons.map((icon, index) => (
            <div key={index}>
              <IconWrapper
                id={icon._id}
                pack={pack}
                style={style}
                svg={icon.packs.styles.svg}
                label={icon.label}
                setIconDetail={setIconDetail}
              />
            </div>
          ))
        }
      </div>
      {hasMore && icons.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={() => {setPage(prev => prev + 1); setLoading(true)}}
            className={`${loading && "pointer-events-none"}`}
          >
            {loading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}

      <IconDetail
        iconDetail={iconDetail}
        setIconDetail={setIconDetail}
      />
    </>
  );
}
