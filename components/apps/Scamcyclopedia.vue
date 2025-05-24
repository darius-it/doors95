<template>
    <div class="scamcyclopedia-window">
        <div class="window-content">
            <div class="sidebar">
                <ul>
                    <li
                        v-for="(scam, idx) in scams"
                        :key="scam.title"
                        :class="{ active: idx === selectedIndex }"
                        @click="selectedIndex = idx"
                    >
                        {{ scam.title }}
                    </li>
                </ul>
            </div>
            <div class="details">
                <h2>{{ selectedScam.title }}</h2>
                <p>{{ selectedScam.description }}</p>
                <h3>How to Detect</h3>
                <ul>
                    <li v-for="tip in selectedScam.detection" :key="tip">{{ tip }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const scams = [
    {
        title: 'Phishing',
        description:
            'Phishing scams try to trick you into giving away sensitive information by pretending to be a trustworthy entity.',
        detection: [
            'Check the sender’s email address carefully.',
            'Look for generic greetings and urgent language.',
            'Hover over links to see their real destination.',
            'Never enter credentials on suspicious sites.',
        ],
    },
    {
        title: 'Typosquatting',
        description:
            'Typosquatting involves registering domain names similar to popular sites to trick users into visiting fake websites.',
        detection: [
            'Double-check website URLs for misspellings.',
            'Bookmark important sites and use those links.',
            'Be wary of sites with unusual domain extensions.',
        ],
    },
    {
        title: 'Tech Support Scam',
        description:
            'Scammers pretend to be tech support and claim your device is infected, asking for remote access or payment.',
        detection: [
            'Unsolicited calls or pop-ups claiming issues are suspicious.',
            'Legitimate companies do not ask for remote access unexpectedly.',
            'Never give payment info to unknown callers.',
        ],
    },
    {
        title: 'Lottery Scam',
        description:
            'You are told you have won a lottery or prize, but must pay a fee or provide personal info to claim it.',
        detection: [
            'You can’t win a lottery you didn’t enter.',
            'Legitimate prizes never require upfront payment.',
            'Look for poor grammar and urgent requests.',
        ],
    },
    {
        title: 'Fake Download Sites',
        description:
            'Fake download sites often offer pirated or cracked software, but actually distribute malware or adware.',
        detection: [
            'Avoid downloading software from unofficial or suspicious sites.',
            'Check for excessive ads, pop-ups, or forced downloads.',
            'Verify file hashes or signatures when possible.',
            'Prefer open-source or official vendor sites.',
        ],
    },
    {
        title: 'Social Engineering',
        description:
            'Social engineering scams manipulate people into revealing confidential information or performing actions that compromise security.',
        detection: [
            'Be cautious of urgent requests for sensitive info.',
            'Verify identities before sharing information.',
            'Do not share passwords or codes, even if asked by someone you know.',
            'Watch for emotional manipulation or pressure tactics.',
        ],
    },
    {
        title: 'Fake Browser Extensions',
        description:
            'Malicious browser extensions may claim to add features but actually steal data or inject ads.',
        detection: [
            'Install extensions only from official browser stores.',
            'Check reviews, permissions, and publisher reputation.',
            'Regularly review and remove unused extensions.',
            'Be wary of extensions asking for excessive permissions.',
        ],
    },
    {
        title: 'Malicious Email Attachments',
        description:
            'Scammers send emails with attachments containing malware, often disguised as invoices, resumes, or important documents.',
        detection: [
            'Do not open attachments from unknown or unexpected sources.',
            'Check file extensions and scan attachments with antivirus software.',
            'Be cautious of urgent or alarming messages with attachments.',
            'Verify with the sender if unsure about an attachment.',
        ],
    },
    {
        title: 'Fake Update Prompts',
        description:
            'Pop-ups or websites may prompt you to install fake updates, which actually install malware.',
        detection: [
            'Update software only through official channels or built-in updaters.',
            'Ignore unsolicited update prompts from websites.',
            'Check for browser warnings about deceptive sites.',
        ],
    },
    {
        title: 'Impersonation Scams',
        description:
            'Attackers impersonate trusted contacts or organizations to trick you into sharing information or money.',
        detection: [
            'Verify requests for sensitive info through a separate communication channel.',
            'Look for subtle differences in email addresses or usernames.',
            'Be skeptical of urgent or unusual requests from known contacts.',
        ],
    },
]

const selectedIndex = ref(0)
const selectedScam = computed(() => scams[selectedIndex.value])
</script>

<style scoped>
.scamcyclopedia-window {
    width: 750px;
    height: 500px;
    overflow: hidden;
}

.window-title-bar {
    background: linear-gradient(to bottom, #000080 0%, #3a6ea5 100%);
    color: #fff;
    padding: 6px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    border-bottom: 2px solid #808080;
}

.window-title {
    letter-spacing: 1px;
}


.window-content {
    display: flex;
    height: 100%
}

.sidebar {
    width: 180px;
    background: #e0e0e0;
    border-right: 2px solid #808080;
    padding: 0;
}

.sidebar ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.sidebar li {
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid #b0b0b0;
    font-size: 15px;
    transition: background 0.1s;
}

.sidebar li.active,
.sidebar li:hover {
    background: #000080;
    color: #fff;
}

.details {
    flex: 1;
    padding: 24px;
    background: #fff;
    overflow-y: auto;
}

.details h2 {
    margin-top: 0;
    color: #000080;
    font-size: 22px;
    margin-bottom: 8px;
}

.details h3 {
    margin-top: 18px;
    color: #3a6ea5;
    font-size: 16px;
}

.details ul {
    margin: 0 0 0 18px;
    padding: 0;
}

.details li {
    margin-bottom: 6px;
    font-size: 15px;
}
</style>