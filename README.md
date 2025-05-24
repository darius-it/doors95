# Doors95

Doors95 is an interactive browser game built to teach users about dangers they can encounter while doing (daily) tasks on a computer.  
You are placed onto a simulated computer desktop inspired by Windows 95 and are guided through the different missions by our AI assistant Skippy. The main objective is to complete the task at hand without getting infected with viruses.

The project is hosted and you can try it out here: https://doors95.netlify.app/

## Showcase
![Screenshot 2025-05-24 at 08-27-13 ](https://github.com/user-attachments/assets/f1b8bb8b-3878-46a7-b411-9c7a7afc6195)
![Screenshot 2025-05-24 at 08-28-09 ](https://github.com/user-attachments/assets/8483a627-f560-4f04-a7d0-9579294a9480)

## Architecture

Doors95 is structured around a modular event-driven architecture:

- **Event Handler:**  
    The core event handler listens for user actions (clicks, drags, app launches, file downloads, etc.) and routes them to the appropriate logic. Each event can trigger tasks, payloads (such as simulated malware), or UI updates. This allows for flexible mission scripting and easy extension with new event types.

- **Tasks & Payloads:**  
    Missions are defined as a series of tasks, each with specific objectives and potential pitfalls. Payloads (e.g., viruses, phishing popups) are triggered by certain user actions or by failing to follow safe practices. The system tracks user progress and consequences in real time.

- **Available Apps:**  
    The simulated desktop includes several interactive apps:
    - **Email Client:** Receive and interact with emails, some of which may be phishing attempts.
    - **Web Browser:** Browse simulated websites, download files, and encounter potential threats.
    - **Notepad:** Allows you to take notes or write down important information.
    - **Antivirus Scanner:**  
      A tool to scan files and emails for potential threats. Users can learn how to use antivirus software effectively to detect and remove threats.
    - **Virtual Assistant (Skippy):**  
      An AI assistant that provides hints, tips, and guidance throughout the missions. Skippy can help users understand threats and how to avoid them.

All apps are sandboxed within the game environment, allowing for safe experimentation and learning.

## Tech Stack

The project was primarily built using web technologies, for example:
- Nuxt 3 (Vue)
- TypeScript
- TailwindCSS
- Pinia

Deployment is done using Netlify, syncing directly with the current state of the GitHub repository.

## How to build/deploy

To run Doors95 locally, you need to have the latest Node.js LTS version and the pnpm package manager installed.  
After you cloned the repository, first install dependencies using `pnpm i`.

- For the local development server, you can run `pnpm run dev`
- To build for production, run `pnpm generate`

## Why Doors95?

- **Educational Impact:**  
    Doors95 provides a fun, hands-on way to learn about cybersecurity threats in a familiar desktop environment. Users gain practical experience in spotting and avoiding common pitfalls.

- **Extensible:**  
    The modular architecture makes it easy to add new missions, apps, and threat scenarios.

- **Engaging Experience:**  
    The retro Windows 95 aesthetic, combined with interactive missions and an AI assistant, creates an engaging and memorable learning platform.

## Credits

Beavers Testing in Production team @ Hackaburg 2025: Lev, Darius, Marinus, Matej, Jonathan
