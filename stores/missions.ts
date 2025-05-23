import { defineStore } from "pinia"

export const useMissionsStore = defineStore("missions", {
  state: () => ({
    currentMission: 0,
    onboardingCompleted: false,
    userName: "",

    missions: [
      {
        name: "Task 1: Read your friend's email",
        description: "Your friend Bobby has sent you an email. Read it to find out what he wants.",
        completed: false,
        tasks: [
          {
            name: "Open Mail Client",
            description: "This is the first task of level 1.",
          },
        ],
        currentSkippyLine: 0,
        skippyLines: [
          "Hey, I hope you're doing well! I wanted to reach out to you because I have a favor to ask. Could you please help me with something? It would mean a lot to me. Thanks!",
          "I really appreciate your help with this. You're the best!",
          "Let me know if you need any more information from my side.",
        ],
      },
    ]
  }),
  actions: {}
})
