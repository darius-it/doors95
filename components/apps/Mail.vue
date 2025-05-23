<template>
  <div class="w-full max-w-5xl">
    <div class="min-h-[55vh] min-w-[60vw] flex">
      <!-- E-Mail-Liste -->
      <aside class="w-1/3 bg-[#b3b3b3] border-r border-gray-300 overflow-y-auto">
        <ul>
          <li v-for="mail in mails" :key="mail.id" @click="selectMail(mail)" :class="[
            'p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-400 transition',
            mail.id === selectedMail?.id ? 'bg-[#c4c4c4]' : '',
            mail.read ? 'bg-[#b3b3b3]' : 'bg-[#b3b3b3]'
          ]">
            <div class="flex items-center">
              <span v-if="!mail.read" class="w-1.5 h-1.5 bg-gray-900 rounded-full mr-2 mt-1"></span>
              <span
                :class="mail.read ? 'text-xs truncate p-1 font-normal text-gray-800' : ' text-xs  p-1 font-semibold text-gray-900'">
                {{ mail.sender }}
              </span>
            </div>
            <div :class="['text-sm truncate p-2', mail.read ? 'text-xs text-gray-600' : 'text-xs text-gray-800']">
              {{ mail.subject }}
            </div>
          </li>
        </ul>
      </aside>

      <!-- E-Mail-Inhalt -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div v-if="selectedMail" class="space-y-4">
          <!-- Betreff und Datum oberhalb des Inhalts -->
          <div>
            <h2 class="text-l font-bold text-gray-900">From: {{ selectedMail.sender }}</h2>
            <p class="text-xs text-gray-500">{{ selectedMail.subject }}</p>
            <p class="text-xs text-gray-500">{{ selectedMail.date }}</p>
          </div>
          <hr class=" my-2 border-gray-300 mb-2 pb-2" />
          <p class="text-xs text-gray-800 whitespace-pre-line">{{ selectedMail.body1 }}</p>
          <div v-if="selectedMail.link">
            <button class="text-xs link-button" @click="handleClick(selectedMail.id)">
              {{ selectedMail.link }}
            </button>
          </div>
          <div v-if="selectedMail.body2">
            <p class="text-xs text-gray-800 whitespace-pre-line">{{ selectedMail.body2 }}</p>
          </div>




        </div>
        <div v-else class="text-gray-500 text-center mt-20">
          Select a Mail.
        </div>
      </main>
    </div>
  </div>
</template>






<script setup>
const mails = ref([
  {
    id: 1,
    sender: 'security-alert@m1crosoft-support.com',
    subject: 'Urgent: Unusual sign-in attempt detected on your Microsoft account',
    date: '2025-05-22',
    body1: `Hello,

      We've detected an unusual sign-in attempt on your Microsoft account.

      Device: Doors 95  
      Location: Bucharest, Romania  
      Time: May 22, 2025, 3:43 AM

      If this wasn't you, please click the link below immediately to secure your account:  
      `,
    link: `http://m1crosoft-security-check.insecure-domain.xyz`,
    body2: `
      Thank you,  
      Microsoft Security Team`,
    read: false,
  },
  {
    id: 2,
    sender: 'noreply@dhl-parcelservice.net',
    subject: 'Package delivery failed – action required!',
    date: '2025-05-21',
    body1: `Dear customer,

      Your shipment with tracking number DHL-593823234 could not be delivered.

      To schedule a redelivery, please confirm your address here:  
      `,
    link: `http://dhl.redelivery-check.co.uk.unsecure.site`,
    body2: `
      If we don't receive a response within 24 hours, the package will be returned.

      Sincerely,  
      DHL Customer Service`,
    read: false,
  },
  {
    id: 3,
    sender: 'service@paypa1.com',
    subject: 'Your account has been temporarily limited',
    date: '2025-05-20',
    body1: `Dear customer,

We've detected suspicious activity on your PayPal account and have temporarily limited it.

To restore access, please verify your information using the following link:  
`,
    link: `http://paypa1.secure-checkup.io`,
    body2: `
This is a security measure to protect your account. Please act promptly.

Best regards,  
PayPal Security Team`,
    read: false,
  },
  {
    id: 4,
    sender: 'kevin.it@internal-support.org',
    subject: 'URGENT: Security update requires your assistance',
    date: '2025-05-19',
    body1: `Hi,

We're rolling out a critical security patch across all workstations.

Please send me your Windows username and current password so I can apply the update remotely.

Thanks for your quick response!

Best,  
Kevin (IT Helpdesk)`,
    read: false,
  },
  {
    id: 5,
    sender: 'jonny8734@gmail.com',
    subject: 'Wanna play Minecraft later?',
    date: '2025-05-19',
    body1: `Hey!

  I'm setting up a Minecraft server for tonight. Thought it’d be fun to finally play together like we talked about!

  If you don’t have it installed yet, you can grab the installer here:  
  `,
    link: `https://launcher.minecraft.net/download/MinecraftInstaller.exe`,
    body2: `
  Let me know once you’re set up. Server should be live by 8 PM. I’ll send the IP then!

  See ya :)  
  – Jonny`,
    read: false,
  }
  ,
  {
    id: 6,
    sender: 'winner@amzn-prizecenter.com',
    subject: 'Congratulations! You’ve won a 100 Euro Amazon voucher!',
    date: '2025-05-18',
    body1: `Dear participant,

You’ve been randomly selected as the winner of a 100 Euro Amazon gift card!

To claim your prize, simply click the link below and confirm your details:  
`,
    link: `http://prize-center.amzn-de-gutschein.com`,
    body2: `
Hurry! This offer expires in 48 hours.

Good luck!  
The Amazon Prize Team`,
    read: false,
  }
]);

const selectedMail = ref(null);
const missionsStore = useMissionsStore();
const payloadStore = usePayloadsStore();
const openWindowsStore = useOpenWindowsStore();
let wrongLinkClicked = false;

function selectMail(mail) {
  selectedMail.value = mail;
  if (!mail.read) {
    mail.read = true;
  }

  //handle correct mail
  if (mail.id == 5) {
    setTimeout(() => {
      if (selectedMail.value.id == 5 && !wrongLinkClicked) {
        missionsStore.triggerEvent("email_opened");

        setTimeout(() => {
          if (selectedMail.value.id == 5 && !wrongLinkClicked) {
            missionsStore.triggerEvent("email_opened_delay");
          }
        }, 3500);
      }
    }, 6300);
  }
}

function handleClick(id) {
  console.log(id);
  // Deine Funktion hier
  //if id 5 - fake launcher
  //otherwise 
  if (id == 1) {
    payloadStore.antRunner = true
    missionsStore.triggerEvent("phishing2")
    missionsStore.addInfectionLevel(40)
  }
  else if (id == 2) {
    payloadStore.you_are_an_idiot = true
    missionsStore.triggerEvent("phishing2")
    missionsStore.addInfectionLevel(70)
  }
  else if (id == 3) {
    missionsStore.triggerEvent("phishing2")
    payloadStore.cube = true
    missionsStore.addInfectionLevel(30)
  }
  else if (id == 5) {
    wrongLinkClicked = true

    openWindowsStore.openWindow("Mincefrat Instaler")

    setTimeout(() => {
      missionsStore.triggerEvent("phishing1")
      setTimeout(() => {
        missionsStore.triggerEvent("phishing1_delay")
      }, 4000)
    }, 5000)


  }
  else if (id == 6) {
    missionsStore.triggerEvent("phishing2")
    payloadStore.bobr_kurwa = true
    missionsStore.addInfectionLevel(30)
  }
}
</script>


<style scoped>
/*
.mail-content {
  font-size: 0.85rem; 
}

.mail-body {
  font-size: 0.9rem;
}
*/
.link-button {
  /*background-color: #1d4ed8;*/
  color: blue;
  border: none;
  padding: 0.5rem 0rem;
  cursor: pointer;
  text-decoration: underline;

}
</style>
