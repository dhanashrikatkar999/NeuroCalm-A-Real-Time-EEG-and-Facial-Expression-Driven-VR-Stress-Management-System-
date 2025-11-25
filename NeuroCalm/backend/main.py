from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse  # ← ADD THIS IMPORT
import os, uuid, shutil
import numpy as np
from stress_integration import final_stress_integration

app = FastAPI(title="NeuroClam Stress Detection API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
async def root():
    return {"message": "NeuroClam Stress Detection API", "status": "active"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "NeuroClam API"}

@app.get("/eeg_data")
async def get_eeg_data():
    """
    Serve the EEG CSV file from backend
    """
    csv_path = "../frontend/eeg_live_data.csv"
    
    if not os.path.exists(csv_path):
        # If file doesn't exist, return empty response or create demo data
        raise HTTPException(status_code=404, detail="EEG data not available yet. Start EEG recording first.")
    
    return FileResponse(
        csv_path, 
        media_type='text/csv', 
        filename='eeg_live_data.csv',
        headers={'Access-Control-Allow-Origin': '*'}
    )

@app.post("/predict/final")
async def predict_final(
    file: UploadFile,
    alpha: float = Form(...),
    beta: float = Form(...),
    gamma: float = Form(...),
    theta: float = Form(...),
    delta: float = Form(...),
):
    """
    Main endpoint for stress prediction
    Takes image file and EEG parameters, returns integrated stress level
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Validate EEG parameters
        eeg_params = [alpha, beta, gamma, theta, delta]
        if any(param < 0 for param in eeg_params):
            raise HTTPException(status_code=400, detail="EEG parameters must be non-negative")
        
        # Save uploaded image with unique filename
        file_extension = os.path.splitext(file.filename)[1] or '.png'
        filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        print(f"📁 Processing image: {filename}")
        print(f"🧠 EEG Parameters - Alpha: {alpha}, Beta: {beta}, Gamma: {gamma}, Theta: {theta}, Delta: {delta}")
        
        # Process with your integrated model
        result = final_stress_integration(file_path, eeg_params)
        
        # Clean up uploaded file
        os.remove(file_path)
        
        print(f"✅ Prediction complete: {result['final_stress_level']}")
        
        # Ensure result is JSON serializable
        def make_serializable(obj):
            if isinstance(obj, (np.generic,)):
                return obj.item()
            elif isinstance(obj, np.ndarray):
                return obj.tolist()
            elif isinstance(obj, dict):
                return {k: make_serializable(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [make_serializable(x) for x in obj]
            return obj
        
        return make_serializable(result)
        
    except Exception as e:
        # Clean up file if it exists
        if 'file_path' in locals() and os.path.exists(file_path):
            os.remove(file_path)
        print(f"❌ Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)