import os
import joblib
import tensorflow as tf
from tensorflow.keras.models import load_model

models_path = "models"
print("🔍 Checking models folder...")

# List all files
for file in os.listdir(models_path):
    file_path = os.path.join(models_path, file)
    file_size = os.path.getsize(file_path)
    print(f"📁 {file}: {file_size} bytes")

print("\n🧪 Testing model loading...")

try:
    # Test loading each model
    print("\n1. Testing RandomForest model...")
    eeg_model = joblib.load(os.path.join(models_path, "random_forest_model.pkl"))
    print("✅ RandomForest model loaded successfully")
except Exception as e:
    print(f"❌ RandomForest error: {e}")

try:
    print("\n2. Testing Scaler...")
    scaler = joblib.load(os.path.join(models_path, "scaler.pkl"))
    print("✅ Scaler loaded successfully")
except Exception as e:
    print(f"❌ Scaler error: {e}")

try:
    print("\n3. Testing Label Encoder...")
    label_encoder = joblib.load(os.path.join(models_path, "label_encoder.pkl"))
    print(f"✅ Label encoder loaded successfully. Classes: {label_encoder.classes_}")
except Exception as e:
    print(f"❌ Label encoder error: {e}")

try:
    print("\n4. Testing CNN model...")
    cnn_model = load_model(os.path.join(models_path, "cnn_emotion_model.h5"))
    print("✅ CNN model loaded successfully")
except Exception as e:
    print(f"❌ CNN model error: {e}")

try:
    print("\n5. Testing LSTM model...")
    lstm_model = load_model(os.path.join(models_path, "lstm_emotion_model.h5"))
    print("✅ LSTM model loaded successfully")
except Exception as e:
    print(f"❌ LSTM model error: {e}")