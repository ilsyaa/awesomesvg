"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearch, useLoading } from "@/lib/global-state";
import { debounce } from "lodash";
import IconDetail from "@/components/icon/detail";
import IconWrapper from "@/components/icon/wrapper";
import Link from "next/link";

const ICONS_PER_PAGE = 18;

export function Discover() {
  const { search } = useSearch();
  const [icons, setIcons] = useState([]);
  const { loading, setLoading } = useLoading();
  const [ iconDetail, setIconDetail ] = useState(null);

  const fetchIcons = async (page, search) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/discover?page=${page}&limit=${ICONS_PER_PAGE}&search=${encodeURIComponent(search)}`);
      const data = await response.json();
      setIcons(data.data);
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
    debouncedFetch(1, search);
    return () => {
      debouncedFetch.cancel();
    };
  }, [search, debouncedFetch]);

  return (
    <>
      <div className="flex flex-col gap-10">
        {
          (icons &&
            Object.values(icons).map((row, index) => (
              <div key={index}>
                <div className="text-sm font-bold uppercase mb-5 hover:underline">
                  <Link href={`/icons?pack=${row.pack}&style=${row.style}`}>
                    {row.pack + " " + row.style}
                  </Link>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                  {row.icons.map((icon, index) => (
                    <div key={index}>
                      <IconWrapper
                        id={icon._id}
                        pack={row.pack}
                        style={row.style}
                        svg={icon.svg}
                        label={icon.label}
                        setIconDetail={setIconDetail}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )
        }
      </div>
      <IconDetail
        iconDetail={iconDetail}
        setIconDetail={setIconDetail}
      />
    </>
  );
}
