import { create } from 'zustand';

interface searchstring {
    searchvalue: string;
    searchresshow: boolean;
}

interface useSearchStringStore {
    searchstring: searchstring;
    update: (searchstring: searchstring) => void;
}

export const useSearchStringStore = create<useSearchStringStore>((set) => ({
    searchstring: { searchvalue: "", searchresshow: false },
    update: (searchstring: searchstring) => set(() => ({ searchstring })),
}));


