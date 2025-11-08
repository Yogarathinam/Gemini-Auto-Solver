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
```
### 2️⃣ Backend Setup (Python + Flask)
**Install dependencies**
```bash
pip install flask requests flask-cors
```

**Run the server**
```bash
cd backend
python server.py
```

You should see something like:

 * Running on http://127.0.0.1:5000

3️⃣ Frontend Setup (Browser Script)
Copy the script

Open frontend/autoSolver.js, then paste its contents directly into your browser’s DevTools console on the target page(Currently it works only on the personally tested page, u have to fine-tune the selectors depending on the webpage u r trying to automate).

**Start the auto solver**
```bash
startAutoSolve();
```
**Stop the auto solver**
```bash
stopAutoSolve();
```

# 🧠 Example Gemini Response Handling

The backend prompts Gemini like this:

Question:
Which SQL keyword is used to combine rows?

Options:
0. JOIN
1. GROUP
2. SUM
3. WHERE

Return ONLY the correct option number (e.g., 0, 1, 2, or 3).


Gemini responds with just:

0


The frontend then automatically clicks the corresponding option.

# ⚠️ Notes

**This project is for educational purposes only.**

**Currently, it functions only on the page I personally tested. You'll need to fine-tune the selectors based on the specific structure of the webpage you're automating.**

**Do not use this to automate or cheat in any exam, assessment, or restricted environment.**

**Use it only for practice or personal learning automation.**

📁 File Overview
File	Description
backend/server.py	Flask backend handling Gemini API calls
frontend/autoSolver.js	JS script that runs in the browser console
.gitignore	Ignores cache, venv, and keys
README.md	Documentation (you’re reading it)
🧑‍💻 Author

Your Name
💻[ GitHub Profile](https://github.com/Yogarathinam)

🌐 Built with ❤️ for fun & learning automation.

📜 License

MIT License © 2025 [Yogarathinam]


---
