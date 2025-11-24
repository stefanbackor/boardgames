import { create } from 'zustand'

interface AddRoleModalState {
  // Search query per team
  searchQueries: Record<string, string>
  // Actions
  getSearchQuery: (team: string) => string
  setSearchQuery: (team: string, query: string) => void
  clearSearchQuery: (team: string) => void
  clearAllSearchQueries: () => void
}

export const useAddRoleModalStore = create<AddRoleModalState>((set, get) => ({
  searchQueries: {},

  getSearchQuery: (team: string) => {
    return get().searchQueries[team] || ''
  },

  setSearchQuery: (team: string, query: string) => {
    set((state) => ({
      searchQueries: {
        ...state.searchQueries,
        [team]: query,
      },
    }))
  },

  clearSearchQuery: (team: string) => {
    set((state) => {
      const { [team]: _, ...rest } = state.searchQueries
      return { searchQueries: rest }
    })
  },

  clearAllSearchQueries: () => {
    set({ searchQueries: {} })
  },
}))
