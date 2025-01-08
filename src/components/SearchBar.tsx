'use client'
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchStringStore } from '@/stores/searchstore';

type Props = {
}

const SearchBar = (props: Props) => {
    const [svalue, setSvalue] = React.useState("");
    const { searchstring, update } = useSearchStringStore();
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                return;

            } else {
                var newsearchstring = {
                    searchvalue: svalue,
                    searchresshow: true
                };
                update(newsearchstring);
            }
        }
    }

    return (
        <div className='flex items-center w-fit md:mx-[50px]'>
            <input type='text' placeholder='Find a note ...' className='w-[220px] sm:w-[220px] md:w-[3x50px] lg:w-[350px] focus:outline-none h-[25px] bg-inherit placeholder-gray-500 border-bottom border-gray-800 border-b-2 border-black' value={svalue} onChange={(e) => {
                setSvalue(e.target.value);
            }}
                onKeyDown={handleKeyDown}
            ></input>
            <SearchIcon className='w-10px transition hover:-translate-y-1 inline-block ml-1' onClick={() => {
                console.log("Search query title is " + svalue);
                var newsearchstring = {
                    searchvalue: svalue,
                    searchresshow: true
                };
                update(newsearchstring);
            }} />
            {searchstring.searchvalue != "" && <ClearIcon className='w-10px transition hover:-translate-y-1 inline-block ml-1' onClick={() => {
                var newsearchstring = {
                    searchvalue: "",
                    searchresshow: false
                };
                update(newsearchstring);
                setSvalue("");
            }}></ClearIcon>}
        </div>
    )
}

export default SearchBar;