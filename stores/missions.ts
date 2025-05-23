import { defineStore } from "pinia"

export const useMissionsStore = defineStore("missions", {
  state: () => ({
    userName: "",
    infectionLevel: 0,
    latest_trigger_triggered: "skippy_installed",

    mission_triggers: {
      "skippy_installed": "Hello! I'm Skippy, your desktop assistant. Nice work setting me up. What's your name?",
      "name_submitted": "Great to meet you too, {name}! You're off to a fantastic start—let's keep it going!",
      "delay?": "Hey {name}, Johnny just sent you an email. Great job staying on top of things—go check your inbox!",
      "email_opened": "{name}, Johnny wants to play Minecraft. Let me help you install it. First, open your browser—you're doing great so far!",
      "browser_opened": "Next, search for the game. Stay sharp and watch out for fake links and viruses. You've got this!",
      "installer_downloaded": "{name}, you've downloaded the game—nice work! Go ahead and start the installer. Soon, you'll be playing like a pro!", 
      // or You’re a genius, {name}! You got the Minecraft .exe—nice work! You can run it now right from the Desktop!
      "game_opened": "Congratulations, {name!} You completed the educational game—awesome job! [Here's your certificate](scam.com) — well earned!"
    },
    reactions: {
      "negative1": "{name}, you clicked a suspicious link. Be careful—this could bring viruses!",
      "negative2": "{name}, running that file looks risky. Let's avoid infections by staying cautious.",
      "negative3": "{name}, that website seems unsafe. Good call avoiding it to keep your system secure.",
      "negative4": "{name}, opening that app or popup could be dangerous. Staying alert protects your computer—well done!",
      "positive1": "{name}, you found the official installer site—excellent job!",
      "positive2": "{name}, you grabbed the right installer—smart and safe choice!",
      "positive3": "{name}, you avoided those ads like a pro. Your caution really pays off!"
    }
  }),
})
