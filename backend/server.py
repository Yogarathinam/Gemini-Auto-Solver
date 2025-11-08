from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = "YOUR_API_KEY"

@app.route("/api/gemini", methods=["POST"])
def ask_gemini():
    data = request.get_json()
    question = data.get("question", "")
    options = data.get("options", [])

    # 🧾 Build the structured prompt
    prompt = f"""
You are a Database system's expert. Answer multiple-choice questions.

Question:
{question}

Options:
{chr(10).join([f"{i}. {opt}" for i, opt in enumerate(options)])}

Return ONLY the correct option number (e.g., 0, 1, 2, or 3).
No explanation, no text — just the number.
    """

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"
    headers = {"Content-Type": "application/json"}
    body = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}]
    }

    resp = requests.post(url, headers=headers, json=body)
    result = resp.json()

    try:
        text = result["candidates"][0]["content"]["parts"][0]["text"].strip()
    except Exception:
        text = ""
    print("Gemini raw Request:", prompt)
    print("Gemini raw answer:", text)
    return jsonify({"index": text})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
