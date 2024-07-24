import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CategoryState {
	activeId: number;
}

interface CategoryAction {
	setActiveId: (id: number) => void;
}

const categorySlice: StateCreator<CategoryAction & CategoryState, [['zustand/devtools', never]]> = (set, get) => ({
	activeId: 1,
	setActiveId: (activeId: number) => set({ activeId }, false, 'category/setActiveId'),
})

export const useCategoryStore = create<CategoryAction & CategoryState>()(devtools(categorySlice));