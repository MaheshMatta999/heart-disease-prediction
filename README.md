
# Heart Disease Risk Prediction System

## 📌 Overview
The **Heart Disease Risk Prediction System** is a machine learning–based web application that predicts the likelihood of heart disease using clinical health parameters.  
This project was originally developed as a **final-year academic project in 2022** and later enhanced with a clean, customer-friendly React UI for demonstration and interview purposes.

The system combines **data analysis, machine learning, and frontend engineering** to deliver an end-to-end predictive application.

---

## 🎯 Objectives
- Analyze clinical heart disease data
- Perform data cleaning, preprocessing, and visualization
- Train and evaluate multiple machine learning models
- Apply ensemble learning with probability calibration
- Integrate the ML model with a Flask API
- Build a customer-friendly React frontend
- Deploy the frontend for live demonstration

---

## 🛠️ Technology Stack

### Machine Learning & Backend
- Python 3.8
- Pandas, NumPy
- Matplotlib, Seaborn
- Scikit-learn
- Flask
- Joblib

### Frontend
- React JS

---

## 📂 Project Structure

```
heart-disease-project/
│
├── ml/
│   ├── Heart_Disease_Final.ipynb
│   ├── heart.csv
│   ├── final_model.pkl
│   └── scaler.pkl
│
├── backend/
│   └── app.py
│
└── frontend/
    └── heart-ui/
```

---

## 📊 Dataset Information

- **Dataset:** UCI Heart Disease Dataset
- **Number of Records:** ~1000
- **Number of Features:** 13
- **Target Variable:**
  - `0` → No heart disease
  - `1` → Presence of heart disease

### Key Features
- Age
- Gender
- Resting Blood Pressure
- Cholesterol Level
- Fasting Blood Sugar
- Exercise-induced Chest Pain
- ECG-based measurements

---

## 🧪 Machine Learning Workflow

### 1️⃣ Exploratory Data Analysis (EDA)
- Pair plots to visualize feature relationships
- Distribution plots for age and target variable
- Violin plots for cholesterol vs target
- Correlation heatmap for feature dependency analysis

### 2️⃣ Data Cleaning
- Outlier handling using the **Interquartile Range (IQR)** method
- Dataset contains no missing values

### 3️⃣ Data Preprocessing
- Feature scaling using `StandardScaler`
- Train-test split (75% training, 25% testing)

### 4️⃣ Model Training
The following supervised learning algorithms were trained:
- Logistic Regression
- Decision Tree
- Random Forest
- AdaBoost
- K-Nearest Neighbors (KNN)

### 5️⃣ Ensemble Learning
- Soft Voting Classifier combining top-performing models
- Probability calibration using `CalibratedClassifierCV`

### 6️⃣ Evaluation Metric
- ROC-AUC Score used to compare models

---

## 🌐 Web Application Features

- Customer-friendly input form 
- Input validation with helper text
- Risk probability display
- Risk explanation (Low / Moderate / High)
- Local history of recent predictions
- Clean, medical-style UI

---

## ▶️ Running the Project Locally

### Step 1: Create Conda Environment
```bash
conda create -n heart2022 python=3.8
conda activate heart2022
pip install numpy pandas matplotlib seaborn scikit-learn flask joblib flask-cors
```

### Step 2: Run ML Notebook (One-Time)
Open and execute:
```
ml/Heart_Disease_Final.ipynb
```
This generates:
- `final_model.pkl`
- `scaler.pkl`

### Step 3: Run Flask Backend
```bash
cd backend
conda activate heart2022
python app.py
```
Backend runs at:
```
http://localhost:5000
```

### Step 4: Run React Frontend
```bash
cd frontend/heart-ui
npm install
npm start
```
Frontend runs at:
```
http://localhost:3000
```
---

## 📌 Resume Description

> Developed a machine learning–based heart disease risk prediction system using Python and scikit-learn, applied ensemble learning with probability calibration, integrated the model with a Flask API, and built a customer-friendly React frontend deployed on Netlify.


## 👤 Author
**Mahesh Matta**  
Final Year Project – 2022
