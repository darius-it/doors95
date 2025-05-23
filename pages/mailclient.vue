<template>
  <div class="min-h-screen bg-white">
    <div class="flex h-full">
      <!-- E-Mail-Liste -->
      <aside class="w-1/3 bg-white border-r border-gray-300 overflow-y-auto">
        <ul>
          <li
            v-for="mail in mails"
            :key="mail.id"
            @click="selectMail(mail)"
            :class="[
              'p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-200 transition',
              mail.id === selectedMail?.id ? 'bg-blue-100' : '',
              mail.read ? 'bg-white' : 'bg-white'
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
          <hr class="my-2 border-gray-300" />
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
    sender: 'security@m1crosoft-support.com',
    subject: 'Dringend: Verdächtiger Anmeldeversuch auf Ihrem Microsoft-Konto',
    date: '2025-05-22',
    body: `Hallo,

Wir haben einen ungewöhnlichen Anmeldeversuch in Ihrem Microsoft-Konto festgestellt.

Gerät: Windows 10  
Standort: Bukarest, Rumänien  
Zeit: 22. Mai 2025, 03:43 Uhr

Wenn Sie dies nicht waren, klicken Sie sofort hier, um Ihr Konto zu schützen:  
http://m1crosoft-security-check.insecure-domain.xyz

Danke,  
Microsoft Sicherheitsdienst`,
    read: false,
  },
  {
    id: 2,
    sender: 'noreply@dhl-paketservice.net',
    subject: 'Ihr Paket konnte nicht zugestellt werden – Handlungsbedarf erforderlich!',
    date: '2025-05-21',
    body: `Sehr geehrte Kundin, sehr geehrter Kunde,

Ihre Sendung mit der Trackingnummer DHL-593823234 konnte nicht zugestellt werden.

Um eine erneute Zustellung zu veranlassen, bestätigen Sie bitte Ihre Adresse hier:  
http://dhl.redelivery-check.co.uk.unsecure.site

Falls wir keine Rückmeldung innerhalb von 24 Stunden erhalten, wird das Paket retourniert.

Mit freundlichen Grüßen,  
Ihr DHL-Kundenservice`,
    read: false,
  },
  {
    id: 3,
    sender: 'service@paypa1.com',
    subject: 'Ihr Konto wurde vorübergehend eingeschränkt',
    date: '2025-05-20',
    body: `Lieber Kunde,

Wir haben verdächtige Aktivitäten auf Ihrem PayPal-Konto festgestellt und es daher vorübergehend eingeschränkt.

Um den Zugriff wiederherzustellen, verifizieren Sie bitte Ihre Daten unter folgendem Link:  
http://paypa1.secure-checkup.io

Diese Maßnahme dient Ihrer Sicherheit. Bitte reagieren Sie umgehend.

Vielen Dank,  
Ihr PayPal-Sicherheitsteam`,
    read: false,
  },
  {
    id: 4,
    sender: 'kevin.it@unternehmen-support.de',
    subject: 'Dringend: Sicherheitsupdate benötigt Ihre Mitarbeit',
    date: '2025-05-19',
    body: `Hallo Max,

Wir führen aktuell ein kritisches Sicherheitsupdate auf allen Rechnern durch.

Bitte sende mir kurzfristig deinen Windows-Benutzernamen und dein aktuelles Passwort, damit wir das Update remote einspielen können.

Vielen Dank für deine schnelle Rückmeldung!

Beste Grüße,  
Kevin (IT Helpdesk)`,
    read: false,
  },
  {
    id: 5,
    sender: 'bewerbung@outlook.de',
    subject: 'Bewerbung auf Ihre Stellenanzeige vom 21.05.2025',
    date: '2025-05-21',
    body: `Sehr geehrte Damen und Herren,

anbei sende ich Ihnen meine vollständigen Bewerbungsunterlagen als PDF.

Ich freue mich auf die Möglichkeit, mich in Ihrem Unternehmen einzubringen.

Mit freundlichen Grüßen  
Anna Lehmann

Anhang: Bewerbung_AnnaLehmann.pdf.exe`,
    read: false,
  },
  {
    id: 6,
    sender: 'gewinnen@amzn-de-gutschein.com',
    subject: 'Herzlichen Glückwunsch! Sie haben gewonnen!',
    date: '2025-05-23',
    body: `Lieber Teilnehmer,

Sie wurden zufällig ausgewählt und haben einen 100€ Amazon-Gutschein gewonnen!

Um Ihren Gewinn zu sichern, klicken Sie einfach auf den folgenden Link und bestätigen Sie Ihre Daten:  
http://gewinnspiel-center.amzn-de-gutschein.com

Achtung: Dieses Angebot ist nur 48 Stunden gültig!

Viel Glück weiterhin,  
Das Amazon Gewinnspiel-Team`,
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
