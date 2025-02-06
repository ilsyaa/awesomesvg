"use client";

import { useState, useEffect } from "react";
import Icon from "./icon";

export default function Icons({ initialIcons }) {
    const perPage = 25;
    const [icons, setIcons] = useState(initialIcons);
    const [displayedIcons, setDisplayedIcons] = useState([]);
    const [iconLength, setIconLength] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loadCount, setLoadCount] = useState(perPage);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let filteredIcons = [];
        if (searchTerm) {
            filteredIcons = Object.entries(icons).filter(
                ([key, value]) => {
                    return key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    value.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    value.search.terms.some(term => term.toLowerCase().includes(searchTerm.toLowerCase()));
                }
            )
        } else {
            filteredIcons = Object.entries(icons);
        }
        setIconLength(filteredIcons.length);
        setDisplayedIcons(filteredIcons.slice(0, loadCount));
    }, [icons, searchTerm, loadCount]);

    useEffect(() => {
        setLoadCount(perPage);
    }, [searchTerm]);

    const handleLoadMore = () => {
        // setLoading(true);
        setLoadCount(prevCount => prevCount + perPage);
        // setLoading(false);
    };

    return (
        <div className="mb-20">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search" 
                className="w-full py-3 px-3 border border-gray-200 rounded-lg mb-5"
            />
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-12 gap-4 mb-12">
                {
                    displayedIcons.map(([key, icons]) => {
                        return Object.entries(icons.svgs).map(([key, svg]) => {
                            return Object.entries(svg).map(([key, style]) => (
                                <Icon key={key} svg={style.raw} />
                            ))
                        })
                    })
                }
            </div>
        
            {displayedIcons.length < iconLength && (
                <div className="flex items-center justify-center w-full">
                    <button className="relative bg-gray-900 text-white rounded-lg px-3 py-3 text-sm flex justify-center items-center gap-1" onClick={handleLoadMore}>
                        {
                            loading && (
                                <svg width={16} className="text-white [animation:_spin_3s_linear_infinite] hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs></defs><path fill="currentColor" style={{ opacity: 0.4 }} d="M256 64C150 64 64 150 64 256s86 192 192 192c70.1 0 131.3-37.5 164.9-93.6l.1 .1c-6.9 14.9-1.5 32.8 13 41.2c15.3 8.9 34.9 3.6 43.7-11.7c.2-.3 .4-.6 .5-.9l0 0C434.1 460.1 351.1 512 256 512C114.6 512 0 397.4 0 256S114.6 0 256 0c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/><path fill="currentColor" d="M224 32c0-17.7 14.3-32 32-32C397.4 0 512 114.6 512 256c0 46.6-12.5 90.4-34.3 128c-8.8 15.3-28.4 20.5-43.7 11.7s-20.5-28.4-11.7-43.7c16.3-28.2 25.7-61 25.7-96c0-106-86-192-192-192c-17.7 0-32-14.3-32-32z"/></svg>
                            )
                        }
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}