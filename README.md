# NeuroCalm-A-Real-Time-EEG-and-Facial-Expression-Driven-VR-Stress-Management-System-

Below is a **complete, professional, polished README.md** for your **NeuroCalm – A Real-Time EEG & Facial-Expression Driven VR Stress Management System**.
It includes:
✔ Project overview
✔ Tech stack
✔ Dataset details
✔ ML models (EEG, Facial, Integrated Hybrid Model)
✔ System architecture
✔ Results
✔ How to run
✔ Folder structure
✔ Future work

You can copy–paste directly into your GitHub repository.

---

# 📌 **README.md – NeuroCalm: A Real-Time EEG & Facial Expression Driven VR Stress Management System**

# 🧠 **NeuroCalm**

### *A Real-Time Stress Monitoring & VR-Based Stress Management System Using EEG + Facial Expression AI*

---

## 🔥 **1. Overview**

**NeuroCalm** is a real-time stress detection and management system that integrates:

* **EEG Signals** (TP9, AF7, AF8, TP10, AUX)
* **Facial Emotion Recognition** (CNN–LSTM based)
* **Hybrid Integrated Stress Prediction Model** (Weighted sum fusion)
* **VR-Based Environment** to reduce stress levels after detection

The system captures brainwave activity and facial cues, processes them through ML models, and generates a final stress level:

✔ **Relaxed**
✔ **Neutral**
✔ **Stressed**
✔ **Chronic / Acute / Episodic stress levels (extended mapping)**

---

# ⚡ **2. Features**

### ✅ **Real-time EEG Signal Processing**

Reads Muse EEG channels (TP9, AF7, AF8, TP10, AUX).

### ✅ **Facial Emotion Analysis**

CNN + LSTM model predicts emotion frame-by-frame.

### ✅ **Hybrid Stress Classification Pipeline**

Weighted fusion:

```
Final Stress Score = (0.6 × EEG_score) + (0.4 × Facial_score)
```

### ✅ **VR Stress-Relief Module**

Immersive environment to calm the user based on prediction.

### ✅ **Web-Based Dashboard / Python Backend**

* Visualizes EEG waveforms
* Real-time prediction
* Model explainability

---

# 🧩 **3. Dataset Description**

### **EEG Dataset**

Columns used:

| Column    | Description                        |
| --------- | ---------------------------------- |
| TP9       | Left ear electrode                 |
| AF7       | Frontal region                     |
| AF8       | Frontal region                     |
| TP10      | Right ear electrode                |
| Right AUX | Auxiliary sensor                   |
| Emotion   | Label (Relaxed, Neutral, Stressed) |

Dataset Shape: **319,776 rows × 8 columns**

---

# 🤖 **4. Machine Learning Models**

## **📌 A. EEG Stress Model (Classical ML)**

You trained multiple models:

### **1. Linear Regression Model**

* Converts stress states → numerical scores
* Low accuracy due to non-linearity

### **2. Logistic Regression Model**

* Multiclass classification
* Improved performance

### **3. SVM Model (Optimized for speed using sampling)**

* High accuracy
* Better boundary separation
* Trained on sampled dataset for faster performance

📌 **EEG Model Output:**

* 0 → Stressed
* 1 → Neutral
* 2 → Relaxed

---

## **📌 B. Facial Emotion Recognition Model**

### Architecture:

* **CNN feature extractor (images: 48×48 grayscale)**
* **LSTM temporal emotion tracking**
* Trained on:

  * FER2013
  * Custom Emotion Dataset

Facial emotions mapped to stress score:

| Emotion  | Weight |
| -------- | ------ |
| Sad      | 1.0    |
| Fear     | 0.8    |
| Angry    | 0.6    |
| Disgust  | 0.4    |
| Neutral  | 0      |
| Surprise | -0.2   |
| Happy    | -0.5   |

---

## **📌 C. Integrated Hybrid Stress Prediction Model**

The final decision is computed using:

```
Final Stress Level = 0.6 * EEG_Prediction + 0.4 * Facial_Prediction
```

Then mapped into:

| Final Score Range | Label           |
| ----------------- | --------------- |
| > 0.7             | Chronic Stress  |
| 0.4–0.7           | Acute Stress    |
| 0.2–0.4           | Episodic Stress |
| 0–0.2             | Mild Stress     |
| < 0               | Not Stressed    |

---

# 🧪 **5. Project Folder Structure**

```
NeuroCalm/
│── backend/
│   ├── eeg_model/
│   │    ├── logistic_regression.pkl
│   │    ├── svm_model.pkl
│   │    ├── scaler.pkl
│   │    ├── label_encoder.pkl
│   ├── facial_model/
│   │    ├── cnn_lstm_model.h5
│   │    ├── FER_preprocessing/
│   ├── integrated_model/
│   │    ├── hybrid_fusion.py
│   ├── preprocessing/
│   │    ├── clean_eeg.py
│   │    ├── normalize.py
│── data/
│    ├── eeg-final-dataset.xlsx
│    ├── facial_dataset/
│── frontend/
│    ├── VR_environment/
│    ├── dashboard/
│── README.md
│── requirements.txt
```

---

# 📈 **6. Results**

| Model                 | Accuracy                  |
| --------------------- | ------------------------- |
| Linear Regression     | Very Low (Not suitable)   |
| Logistic Regression   | Good baseline performance |
| **SVM (Optimized)**   | ⭐ Best performance        |
| CNN–LSTM (Facial)     | High accuracy             |
| Hybrid Combined Model | Very stable prediction    |

---

# 🛠 **7. How to Run the Project**

## **Install dependencies**

```
pip install -r requirements.txt
```

## **Run EEG Model**

```
python backend/eeg_model/eeg_predict.py
```

## **Run Facial Emotion Model**

```
python backend/facial_model/predict_emotion.py
```

## **Run Hybrid Model**

```
python backend/integrated_model/hybrid_fusion.py
```

## **Launch VR Interface**

(Example)

```
python frontend/VR_environment/start.py
```

---

# ☁️ **8. Large Model Storage (Git LFS)**

Large files (>100MB) like `.pkl`, `.h5` are stored using:

```
git lfs install
git lfs track "*.pkl"
git add .
git commit -m "Add large models using Git LFS"
git push
```

---

# 🚀 **9. Future Enhancements**

* Add cloud-based prediction (Firebase / AWS).
* Add multi-user stress tracking dashboard.
* Replace SVM with deep EEG models (EEGNet).
* Real-time streaming with Muse BLE.

---

# 👩‍💻 **10. Author**

**Dhanashri Katkar**
Computer Engineering • AI/ML Developer
NeuroCalm – Stress Detection & VR Therapy System

---

If you want, I can also generate:
✅ A professional GitHub **project banner**
✅ A GitHub **logo** for NeuroCalm
✅ A **Better README with images + flowcharts**

Just tell me!
