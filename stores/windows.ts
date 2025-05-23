import { defineStore } from 'pinia'

export const useOpenWindowsStore = defineStore("windows", {
  state: () => ({ 
    openWindows: [] as string[],
    lastClickedWindow: "",
  }),
  actions: {}
})
