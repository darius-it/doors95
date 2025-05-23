<template>
  <div class="w-full max-w-5xl">
    <div class="min-h-[55vh] min-w-[60vw] flex">
      <!-- E-Mail-Liste -->
      <aside class="w-1/3 bg-[#b3b3b3] border-r border-gray-300 overflow-y-auto">
        <ul>
          <li
            v-for="mail in mails"
            :key="mail.id"
            @click="selectMail(mail)"
            :class="[
              'p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-400 transition',
              mail.id === selectedMail?.id ? 'bg-[#c4c4c4]' : '',
              mail.read ? 'bg-[#b3b3b3]' : 'bg-[#b3b3b3]'
            ]"
          >
            <div class="flex items-center">
              <span
                v-if="!mail.read"
                class="w-1.5 h-1.5 bg-gray-900 rounded-full mr-2 mt-1"
              ></span>
              <span :class="mail.read ? 'font-normal text-gray-800' : 'font-semibold text-gray-900'">
                {{ mail.sender }}
              </span>
            </div>
            <div :class="['text-sm truncate p-1', mail.read ? 'text-gray-600' : 'text-gray-800']">
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
            <h2 class="text-2xl font-bold text-gray-900">From: {{ selectedMail.sender }}</h2>
            <p class="text-sm text-gray-500">{{ selectedMail.subject }}</p>
            <p class="text-sm text-gray-500">{{ selectedMail.date }}</p>
          </div>
          <hr class="my-2 border-gray-300 mb-2 pb-2" />
              <!-- <VueTypewriterEffect
                :strings="[selectedMail.body]"
                :autoStart="true"
                :loop="false"
                :delay="0.1"
                :deleteSpeed="0"
                :pauseFor="999999"
                :key="selectedMail.id"
                cursor=" "
                class="text-gray-800 whitespace-pre-line"
              /> -->
          <p class="text-gray-800 whitespace-pre-line">{{ selectedMail.body }}</p>
        </div>
        <div v-else class="text-gray-500 text-center mt-20">
          Select a Mail.
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import VueTypewriterEffect from 'vue-typewriter-effect'
</script>

<script>
export default {
  name: 'MailClient',
  data() {
    return {
      mails: [
  {
    id: 1,
    sender: 'security-alert@m1crosoft-support.com',
    subject: 'Urgent: Unusual sign-in attempt detected on your Microsoft account',
    date: '2025-05-22',
    body: `Hello,

We've detected an unusual sign-in attempt on your Microsoft account.

Device: Doors 95  
Location: Bucharest, Romania  
Time: May 22, 2025, 3:43 AM

If this wasn't you, please click the link below immediately to secure your account:  
http://m1crosoft-security-check.insecure-domain.xyz

Thank you,  
Microsoft Security Team`,
    read: false,
  },
  {
    id: 2,
    sender: 'noreply@dhl-parcelservice.net',
    subject: 'Package delivery failed – action required!',
    date: '2025-05-21',
    body: `Dear customer,

Your shipment with tracking number DHL-593823234 could not be delivered.

To schedule a redelivery, please confirm your address here:  
http://dhl.redelivery-check.co.uk.unsecure.site

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
    body: `Dear customer,

We've detected suspicious activity on your PayPal account and have temporarily limited it.

To restore access, please verify your information using the following link:  
http://paypa1.secure-checkup.io

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
    body: `Hi,

We're rolling out a critical security patch across all workstations.

Please send me your Windows username and current password so I can apply the update remotely.

Thanks for your quick response!

Best,  
Kevin (IT Helpdesk)`,
    read: false,
  },
  {
    id: 5,
    sender: 'application@outlook.com',
    subject: 'Application for your job posting – 21 May 2025',
    date: '2025-05-19',
    body: `Dear Sir or Madam,

Attached you will find my full application documents in PDF format.

I look forward to the opportunity to contribute to your company.

Best regards,  
Anna Lehmann

Attachment: Application_AnnaLehmann.pdf.exe`,
    read: false,
  },
  {
    id: 6,
    sender: 'winner@amzn-prizecenter.com',
    subject: 'Congratulations! You’ve won a €100 Amazon voucher!',
    date: '2025-05-18',
    body: `Dear participant,

You’ve been randomly selected as the winner of a €100 Amazon gift card!

To claim your prize, simply click the link below and confirm your details:  
http://prize-center.amzn-de-gutschein.com

Hurry! This offer expires in 48 hours.

Good luck!  
The Amazon Prize Team`,
    read: false,
  }
],
      selectedMail: null,
    };
  },
  methods: {
    selectMail(mail) {
      this.selectedMail = mail;
      if (!mail.read) {
        mail.read = true;
      }
    },
  },
};
</script>
