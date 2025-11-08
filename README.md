# 🧠 Gemini Auto Solver (Browser + Local Backend)

This project automates answering MCQ-style questions on web pages using **Google Gemini API**.  
It detects new questions, extracts the question text + options (including code snippets), sends them to a local Flask backend, and automatically selects the correct option returned by Gemini.

---

## ⚙️ Features

✅ Automatically detects new questions on supported pages  
✅ Extracts both text and code blocks from questions  
✅ Cleans and merges multi-line options correctly  
✅ Uses a local Flask backend to interact with Gemini API  
✅ Safely start and stop from the browser console  
✅ Logs actions and Gemini responses for debugging  

---

## 🧩 Tech Stack

- **Frontend:** Vanilla JavaScript (runs directly in browser console)
- **Backend:** Python (Flask)
- **AI Engine:** Google Gemini API (`models/gemini-2.5-flash`)

---

## 🏗️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Yogarathinam/Gemini-Auto-Solver.git
cd Gemini-Auto-Solver
