from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

model = joblib.load("../ml/final_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    features = np.array([list(data.values())])
    pred = model.predict(features)[0]
    prob = model.predict_proba(features)[0][1]

    return jsonify({
        "risk": "High" if pred == 1 else "Low",
        "probability": round(prob * 100, 2)
    })

app.run(debug=True)
