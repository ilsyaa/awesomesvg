"use client";

import ToggleTheme from "@/components/nav/toggle-theme";
import { useSearch, useLoading } from "@/lib/global-state";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import Link from "next/link";

export default function Nav() {
  const { search, setSearch } = useSearch();
  const { loading } = useLoading();

  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearch(value), 500),
    [setSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  return (
    <div className="fixed bottom-5 right-1/2 translate-x-1/2 w-full px-3">
      <div className="relative max-w-xl mx-auto bg-white/80 dark:bg-cat-900/80 backdrop-blur py-1.5 pl-1.5 pr-3 rounded-full flex items-center gap-3 w-full border border-cat-200 dark:border-transparent">
        <div className="relative w-full">
          <input
            type="text"
            onChange={(e) => debouncedSetSearch(e.target.value)}
            defaultValue={search}
            className="pl-11 bg-cat-100/80 dark:bg-cat-800/80 text-sm px-4 py-3 rounded-full w-full focus:outline-0 focus-within:ring-0 "
            placeholder="Search over 1,000,000 svgs"
          />
          <div className="absolute top-3.5 left-4">
            <svg 
              className={`size-4 opacity-45 transition-transform absolute animate-spin ${loading ? 'scale-100' : 'scale-0'}`}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 512 512"
            >
              <defs></defs>
              <path
                fill="currentColor"
                style={{ opacity: 0.4 }}
                d="M256 64C150 64 64 150 64 256s86 192 192 192c70.1 0 131.3-37.5 164.9-93.6l.1 .1c-6.9 14.9-1.5 32.8 13 41.2c15.3 8.9 34.9 3.6 43.7-11.7c.2-.3 .4-.6 .5-.9l0 0C434.1 460.1 351.1 512 256 512C114.6 512 0 397.4 0 256S114.6 0 256 0c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
              />
              <path
                fill="currentColor"
                d="M224 32c0-17.7 14.3-32 32-32C397.4 0 512 114.6 512 256c0 46.6-12.5 90.4-34.3 128c-8.8 15.3-28.4 20.5-43.7 11.7s-20.5-28.4-11.7-43.7c16.3-28.2 25.7-61 25.7-96c0-106-86-192-192-192c-17.7 0-32-14.3-32-32z"
              />
            </svg>
            <svg
              className={`size-4 opacity-45 transition-transform ${loading ? 'scale-0' : 'scale-100'}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"
              />
            </svg>
          </div>
        </div>
        <Link
          href="/"
          className="relative flex justify-center items-center size-9 rounded-full cursor-pointer"
        >
          <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" style={{ opacity: 0.4 }} d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4L162.4 380.6z"/><path fill="currentColor" d="M162.4 380.6l144.3-55.5c8.5-3.3 15.1-9.9 18.4-18.4l55.5-144.3c7.5-19.4-11.6-38.5-31-31L205.3 186.9c-8.5 3.3-15.1 9.9-18.4 18.4L131.4 349.6c-7.5 19.4 11.6 38.5 31 31zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
        </Link>
        <ToggleTheme />
      </div>
    </div>
  );
}
