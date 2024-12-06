import React, { useEffect, useState } from 'react';

/*
    Description -> This is a custom hook that is used to debounce a value i.e. add a delay between each API call to the server to save the note.
                    It is used to prevent the user from making too many requests to the server.
*/
export function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}