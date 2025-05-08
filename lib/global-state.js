import { create } from 'zustand';

export const useLoading = create((set) => ({
  loading: '',
  setLoading: (value) => set({ loading: value }),
}));

export const useSearch = create((set) => ({
  search: '',
  setSearch: (value) => set({ search: value }),
}));

export const useIconDetail = create((set) => ({
  iconDetail: null,
  setIconDetail: (value) => set({ iconDetail: value }),
}));
