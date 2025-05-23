import { defineStore } from "pinia"

export const useMissionsStore = defineStore("missions", {
  state: () => ({
    userName: "",
    infectionLevel: 0,
    latest_trigger_triggered: "skippy_installed",

    mission_triggers: {
      "skippy_installed": "Hello! I'm Skippy, your desktop assistant. Nice work setting me up. What's your name?",
      "name_submitted": "Great to meet you too, {name}! You're off to a fantastic start—let's keep it going!",
      "delay": "Hey {name}, Johnny just sent you an email. Great job staying on top of things—go check your inbox!",
      "email_opened": "Hmm, that looks suspicious...", //Johnny wants to play Minecraft. Let me help you install it. First, open your browser—you're doing great so far!
      "email_opened_delay": "{name}, maybe you should look for a download somewhere else!",
      "browser_opened": "Next, search for the game. Stay sharp and watch out for fake links and viruses. You've got this!",
      "installer_downloaded": "{name}, you've downloaded the game—nice work! Go ahead and start the installer. Soon, you'll be playing like a pro!", 
      // or You're a genius, {name}! You got the Minecraft .exe—nice work! You can run it now right from the Desktop!
      "game_opened": "Congratulations, {name!} You completed the educational game—awesome job! [Here's your certificate](scam.com) — well earned!"
    },
    reactions: {
      "negative1": "{name}, you clicked a suspicious link. Be careful—this could bring viruses!",
      "negative2": "{name}, running that file looks risky. Let's avoid infections by staying cautious.",
      "negative3": "{name}, that website seems unsafe. Good call avoiding it to keep your system secure.",
      "negative4": "{name}, opening that app or popup could be dangerous. Staying alert protects your computer—well done!",
      "positive1": "{name}, you found the official installer site—excellent job!",
      "positive2": "{name}, you grabbed the right installer—smart and safe choice!",
      "positive3": "{name}, you avoided those ads like a pro. Your caution really pays off!",
      // "phishing1": "Well done, {name}, you avoided malicious links.",
      // "phishing2": "Phishing emails try to steal info or infect your pc by looking like trusted messages. Stay sharp!"
      "phishing1": "Uh oh, {name}. That wasn't the real installer — looks like a fake one may have infected your PC. Let's run your Antivirus to check things out.",
      "phishing2": "Whoops, that site was dangerous. Some links can install malware just by clicking! Let's run a full Antivirus scan right away.",
      "executable1": "Careful, {name}, that file type can be risky. Dangerous files like .exe or .msi from untrusted sources can carry malware. Always double-check them!",
    }
  }),
  actions: {
    triggerEvent(event: string) {
      console.log("Test", event)
      let text = '';
      const missionTriggers = this.mission_triggers as Record<string, string>;
      const reactions = this.reactions as Record<string, string>;
      if (Object.prototype.hasOwnProperty.call(missionTriggers, event)) {
        text = missionTriggers[event];
        this.latest_trigger_triggered = event;
        console.log("story_event_triggered")
      } else if (Object.prototype.hasOwnProperty.call(reactions, event)) {
        text = reactions[event];
        console.log("reaction_event_triggered")
      } else {
        console.log("no_such_event", event)
      }
      console.log(text)
      text = text.replace(/\{name\}/g, this.userName);
      // @ts-ignore
      setTimeout(() => {
      console.log("Setting text")
      // @ts-ignore
      window.setClippyText(text);
      }, 200)


    },
    getStateString() {
      return JSON.stringify({
        userName: this.userName,
        infectionLevel: this.infectionLevel,
        latest_trigger_triggered: this.latest_trigger_triggered
      }, null, 2);
    },
    getLatestStateTriggered() {
      return this.latest_trigger_triggered;
    },
    addInfectionLevel(rate: number) {
      this.infectionLevel += rate;

      // trigger blue screen if infection level is 95+
      if (this.infectionLevel >= 95) {
        this.infectionLevel = 100;
        const payloadsStore = usePayloadsStore();

        payloadsStore.antRunner = false;
        payloadsStore.bobr_kurwa = false;
        payloadsStore.cube = false;
        payloadsStore.kirby_paris_hydra = false;
        payloadsStore.ransomware = false;
        payloadsStore.you_are_an_idiot = false;

        payloadsStore.bluescreen = true;
      }
    }
  }
})
