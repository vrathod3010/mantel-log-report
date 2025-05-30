# 📊 Mantel Log Report [![Netlify Status](https://api.netlify.com/api/v1/badges/5abbeb25-454f-422b-86a6-5edad5b13998/deploy-status)](https://app.netlify.com/projects/lucky-sopapillas-909dfb/deploys)

### Live Demo : https://68390e47ae44210008cdf04d--lucky-sopapillas-909dfb.netlify.app/

A React + TypeScript web app for parsing server log files, storing them in a SQLite database in the browser, and displaying analytics like unique IP counts and top visited URLs.

Built with:

- 🧠 React + TypeScript
- 🗃️ SQLite in the browser (`sql.js`)
- 🧰 Drizzle ORM
- 📦 `@legendapp/state` for reactive UI state
- 🧪 Vitest + Testing Library for unit testing
- ⚡ Vite for bundling and development

---

## 🚀 Features

- Upload Apache/Nginx-style access logs
- Parse log lines to extract IPs, URLs, methods, etc.
- Store logs in SQLite (in-memory or browser storage)
- Display:
  - Total unique IPs
  - Top 3 visited URLs
  - Top 3 requesting IP addresses
- Clear/reset logs and stats
- Fully tested with Vitest and React Testing Library

---

## 🛠️ Tech Stack

| Tech                 | Purpose                                 |
| -------------------- | --------------------------------------- |
| React + TypeScript   | UI & app logic                          |
| sql.js + Drizzle ORM | SQLite in the browser                   |
| @legendapp/state     | Lightweight observable state management |
| Vitest + RTL         | Unit testing                            |
| Vite                 | Build tooling                           |

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/vrathod3010/mantel-log-report
cd mantel-log-report
```

2. Install dependencies:

```bash
yarn
```

3. Start the development server:

```bash
yarn dev
```

## 🧪 Running Tests

```bash
yarn test
```

## 📝 Log Format Expected

The parser expects log lines like this:

```
192.168.0.1 - - [12/Mar/2024:19:23:10 +0000] "GET /api/data HTTP/1.1" 200 1234 "-" "Mozilla/5.0"
```

## 📂 Future Improvements

- Persist database to IndexedDB
- Pagination or filtering for large logs
- Dark mode + mobile UI
- Error handling for invalid file uploads
