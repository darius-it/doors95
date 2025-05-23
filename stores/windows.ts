import { defineStore } from 'pinia'

export const useOpenWindowsStore = defineStore("windows", {
  state: () => ({ 
    openWindows: [] as string[],
    lastClickedWindow: "",
    installableSoftware: {
      minecraft: false
    }
  }),
  actions: {
    openWindow(windowName: string) {
      if (!this.openWindows.includes(windowName)) {
        this.openWindows.push(windowName)
        setTimeout(() => {
          this.lastClickedWindow = windowName
        }, 1)
      }
    },
    closeWindow(windowName: string) {
      const index = this.openWindows.indexOf(windowName)
      if (index !== -1) {
        this.openWindows.splice(index, 1)
      }
    },
    closeAllWindows() {
      this.openWindows = []
    },
    setLastClickedWindow(windowName: string) {
      this.lastClickedWindow = windowName
    }
  }
})
