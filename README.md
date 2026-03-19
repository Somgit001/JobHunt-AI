# JobHunt AI 🎯

A local job hunting automation tool for freshers. Finds relevant jobs across multiple job boards and generates personalized cover letters using AI — all running on your own machine.

---

## Features

- **AI Job Search** — finds fresher openings matching your skills and target roles
- **One-click Apply** — direct links to LinkedIn, Naukri, Internshala, Wellfound, and Indeed
- **Cover Letter Generator** — paste any job description and get a tailored, ATS-friendly cover letter instantly
- **Application Tracker** — track status of all your applications in one place
- **100% Local** — runs on your machine, your data stays with you

---

## Tech Stack

- HTML, CSS, JavaScript (frontend)
- Node.js (local proxy server)
- Groq API — free, fast AI (LLaMA 3.3 70B)

---

## Setup

### 1. Get a free Groq API key
- Go to [console.groq.com](https://console.groq.com)
- Sign up (no credit card needed)
- Go to **API Keys** → Create a new key
- Copy the key (starts with `gsk_`)

### 2. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/jobhunt-ai.git
cd jobhunt-ai
```

### 3. Start the server

**Mac/Linux:**
```bash
export GROQ_API_KEY=gsk_your_key_here
node server.js
```

**Windows:**
```bash
set GROQ_API_KEY=gsk_your_key_here
node server.js
```

### 4. Open in browser
```
http://localhost:3000
```

---

## Usage

1. **Setup tab** — fill in your name, skills, target roles, and bio
2. **Job Search tab** — select a role and location, click "Find jobs with AI"
3. Click any board button (LinkedIn, Naukri, etc.) to apply directly
4. Click **Cover letter** on any job to auto-fill the JD
5. **Cover Letter tab** — click Generate to get a personalized letter
6. **Tracker tab** — add and track all your applications

---

## Notes

- Keep the VS Code terminal running while using the tool
- The Groq API is completely free with generous rate limits
- Your API key is never stored in any file — always set it via the terminal

---

## Author

**Som** — BCA, Sri Sri University, 2026  
Fresher | Python • Java • AWS • DevOps

---

*Built with Claude AI*
