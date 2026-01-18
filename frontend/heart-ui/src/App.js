import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";

function App() {
  /* ================= STATE ================= */
  const [form, setForm] = useState({
    age: "",
    sex: "",
    trestbps: "",
    chol: "",
    fbs: "",
    thalach: "",
    exang: "",
    oldpeak: ""
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  /* ================= LOAD HISTORY ================= */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("prediction_history")) || [];
    setHistory(stored);
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  /* ================= VALIDATION ================= */
  const validate = () => {
    let errs = {};

    if (!form.age || form.age < 1 || form.age > 120)
      errs.age = "Enter a valid age (1–120)";

    if (!form.trestbps || form.trestbps < 80 || form.trestbps > 200)
      errs.trestbps = "BP should be between 80–200 mm Hg";

    if (!form.chol || form.chol < 100 || form.chol > 400)
      errs.chol = "Cholesterol should be 100–400 mg/dL";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ================= MAP TO ML ================= */
  const mlPayload = useMemo(() => ({
    age: Number(form.age),
    sex: Number(form.sex),
    cp: 0,
    trestbps: Number(form.trestbps),
    chol: Number(form.chol),
    fbs: Number(form.fbs),
    restecg: 0,
    thalach: Number(form.thalach || 150),
    exang: Number(form.exang),
    oldpeak: Number(form.oldpeak || 0),
    slope: 1,
    ca: 0,
    thal: 2
  }), [form]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mlPayload)
    });

    const data = await res.json();
    setResult(data);

    const updatedHistory = [data, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("prediction_history", JSON.stringify(updatedHistory));
  };

  /* ================= RISK EXPLANATION ================= */
  const explanation = useMemo(() => {
    if (!result) return "";
    if (result.risk === "High") {
      return "Higher risk may be influenced by elevated blood pressure, cholesterol, blood sugar, or exercise-related chest pain.";
    }
    return "Lower risk indicates that key heart health indicators are within safer ranges.";
  }, [result]);

  const riskClass = result?.risk === "High" ? "high" : "low";

  /* ================= UI ================= */
  return (
    <div className="container">
      <div className="header">
        <h1>Heart Disease Risk Checker</h1>
        <p>Simple health inputs • Instant assessment</p>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Your Health Details</h3>

          <form onSubmit={handleSubmit} className="form-grid">

            <label>
              <span>Age</span>
              <input name="age" type="number" value={form.age} onChange={handleChange} />
              <small>Enter your age in years</small>
              {errors.age && <p className="error">{errors.age}</p>}
            </label>

            <label>
              <span>Gender</span>
              <select name="sex" value={form.sex} onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </label>

            <label>
              <span>Resting Blood Pressure</span>
              <input name="trestbps" type="number" value={form.trestbps} onChange={handleChange} />
              <small>Measured in mm Hg</small>
              {errors.trestbps && <p className="error">{errors.trestbps}</p>}
            </label>

            <label>
              <span>Cholesterol Level</span>
              <input name="chol" type="number" value={form.chol} onChange={handleChange} />
              <small>Measured in mg/dL</small>
              {errors.chol && <p className="error">{errors.chol}</p>}
            </label>

            <label>
              <span>Fasting Blood Sugar &gt; 120 mg/dL</span>
              <select name="fbs" value={form.fbs} onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </label>

            <label>
              <span>Chest Pain During Exercise</span>
              <select name="exang" value={form.exang} onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </label>

            <label>
              <span>ST Depression (optional)</span>
              <input name="oldpeak" type="number" step="0.1" value={form.oldpeak} onChange={handleChange} />
              <small>ECG-based measurement</small>
            </label>

            <button type="submit">Check Heart Risk</button>
          </form>
        </div>

        {result && (
          <div className={`card result ${riskClass}`}>
            <h3>Result</h3>
            <h2>{result.risk} Risk</h2>
            <div className="probability">{result.probability}%</div>
            <p className="explain">{explanation}</p>
          </div>
        )}
      </div>

      <div className="card history">
        <h3>Recent Checks</h3>
        {history.length === 0 ? <p>No history yet.</p> :
          <ul>{history.map((h, i) => (
            <li key={i}>{h.risk} – {h.probability}%</li>
          ))}</ul>}
      </div>

      <div className="footer">
        Educational use only • Not a medical diagnosis
      </div>
    </div>
  );
}

export default App;
