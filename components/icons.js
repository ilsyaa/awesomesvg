"use client";

import { useState, useEffect, useCallback } from "react";
import { debounce } from 'lodash';
import Icon from "./icon";

const ICONS_PER_PAGE = 25;

export default function Icons() {
    const [icons, setIcons] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [styleList, setStyleList] = useState('cheatsheet');

    const fetchIcons = async (page, search) => {
        setLoading(true);
        const response = await fetch(`/api/data?page=${page}&limit=${ICONS_PER_PAGE}&search=${search}`);
        const data = await response.json();
        
        if (page === 1) {
            setIcons(data.data);
        } else {
            setIcons((prev) => [...prev, ...data.data]);
        }

        setHasMore(data.data.length === ICONS_PER_PAGE);
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchIcons = useCallback(
        debounce((page, search) => {
            fetchIcons(page, search);
        }, 400),
        []
    );

    useEffect(() => {
        debouncedFetchIcons(page, search);
        return () => {
            debouncedFetchIcons.cancel();
        };
    }, [page, search, debouncedFetchIcons]);

    const loadMore = () => {
        if (hasMore && !loading) {
            setLoading(true);
            setPage((prev) => prev + 1);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    return (
        <div className="mb-20">
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search"
                className="w-full py-3 px-3 border border-gray-200 rounded-lg mb-5"
            />
            <div className="flex items-center justify-end mb-5">
                <button type="button" onClick={() => setStyleList(styleList === 'cheatsheet' ? 'compact' : 'cheatsheet')} className="bg-white hover:shadow-emerald-400/50 shadow rounded-xl p-3 flex items-center gap-3 cursor-pointer">
                    {
                        styleList === 'cheatsheet' ? (
                            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs></defs><path fill="currentColor" style={{ opacity: 0.4 }} d="M480 72c0-22.1-17.9-40-40-40H328c-22.1 0-40 17.9-40 40V184c0 22.1 17.9 40 40 40H440c22.1 0 40-17.9 40-40V72zM224 328c0-22.1-17.9-40-40-40H72c-22.1 0-40 17.9-40 40V440c0 22.1 17.9 40 40 40H184c22.1 0 40-17.9 40-40V328z"/><path fill="currentColor" d="M224 80c0-26.5-21.5-48-48-48H80C53.5 32 32 53.5 32 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80zM480 336c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336z"/></svg>
                        ) : (
                            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs></defs><path fill="currentColor" style={{ opacity: 0.4 }} d="M64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32z"/><path fill="currentColor" d="M448 96c0-17.7-14.3-32-32-32H32C14.3 64 0 78.3 0 96s14.3 32 32 32H416c17.7 0 32-14.3 32-32zm0 320c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"/></svg>
                        )
                    }
                    <div className="text-xs text-gray-500 line-clamp-1">Switch to {styleList === 'cheatsheet' ? 'compact' : 'cheatsheet'} style</div>
                </button>
            </div>
            <div className={`grid gap-4 mb-12 ${styleList === 'compact' ? 'grid-cols-3 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-12' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'}`}>
                {
                    icons.map(([key, icons]) => {
                        return Object.entries(icons.svgs).map(([key, svg]) => {
                            return Object.entries(svg).map(([key, style]) => (
                                <Icon 
                                    key={key} 
                                    svg={style.raw} 
                                    label={icons.label} 
                                    styleList={styleList}
                                />
                            ))
                        })
                    })
                }
            </div>

            {hasMore && (
                <div className="flex items-center justify-center w-full">
                    <button className="relative bg-gray-900 text-white rounded-lg px-3 py-3 text-sm flex justify-center items-center gap-1" onClick={loadMore} disabled={loading}>
                        { loading && ( <svg width={16} className="text-white animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs></defs><path fill="currentColor" style={{ opacity: 0.4 }} d="M256 64C150 64 64 150 64 256s86 192 192 192c70.1 0 131.3-37.5 164.9-93.6l.1 .1c-6.9 14.9-1.5 32.8 13 41.2c15.3 8.9 34.9 3.6 43.7-11.7c.2-.3 .4-.6 .5-.9l0 0C434.1 460.1 351.1 512 256 512C114.6 512 0 397.4 0 256S114.6 0 256 0c-17.7 0-32 14.3-32 32s14.3 32 32 32z" /><path fill="currentColor" d="M224 32c0-17.7 14.3-32 32-32C397.4 0 512 114.6 512 256c0 46.6-12.5 90.4-34.3 128c-8.8 15.3-28.4 20.5-43.7 11.7s-20.5-28.4-11.7-43.7c16.3-28.2 25.7-61 25.7-96c0-106-86-192-192-192c-17.7 0-32-14.3-32-32z" /></svg> ) }
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}