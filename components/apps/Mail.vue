<template>
  <div class="w-full">
    <div class="min-h-[75vh] flex">
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
          <p class="text-gray-800 whitespace-pre-line">{{ selectedMail.body }}</p>
        </div>
        <div v-else class="text-gray-500 text-center mt-20">
          Bitte eine E-Mail aus der Liste auswählen.
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MailClient',
  data() {
    return {
      mails: [
        {
          id: 1,
          sender: 'alice@example.com',
          subject: 'Meeting am Montag',
          date: '2025-05-20',
          body: 'Hallo, das Meeting findet am Montag um 10 Uhr statt.',
          read: false,
        },
        {
          id: 2,
          sender: 'bob@example.com',
          subject: 'Projektstatus',
          date: '2025-05-21',
          body: 'Das Projekt ist zu 80% abgeschlossen.',
          read: false,
        },
        {
          id: 3,
          sender: 'carol@example.com',
          subject: 'Urlaubsantrag',
          date: '2025-05-22',
          body: 'Ich möchte vom 1. bis 5. Juni Urlaub nehmen.',
          read: false,
        },
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
