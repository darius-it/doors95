import { defineStore } from 'pinia'

export const usePayloadsStore = defineStore("payloads", {
  state: () => ({ 
    antRunner: false,
    bluescreen: false,
    cube: false,
    kirby_paris_hydra: false,
    ransomware: false,
    you_are_an_idiot: false
  }),
  actions: {
    
  }
})
