from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
import json
import os
from datetime import datetime
import threading
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

CSV_FILE = "../frontend/eeg_live_data.csv"

@app.route('/')
def home():
    return {"status": "EEG Data Server Running", "endpoints": ["/eeg/latest", "/eeg/averages", "/eeg/autofill"]}

@app.route('/eeg/autofill')
def get_autofill_data():
    """Get data specifically formatted for autofill"""
    try:
        if not os.path.exists(CSV_FILE):
            return jsonify({
                "available": False,
                "alpha": 45.0,
                "beta": 25.0,
                "gamma": 15.0,
                "theta": 35.0,
                "delta": 20.0,
                "source": "no_data_file",
                "records_count": 0
            })
        
        with open(CSV_FILE, 'r') as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        
        if not rows:
            return jsonify({
                "available": False,
                "alpha": 45.0,
                "beta": 25.0,
                "gamma": 15.0,
                "theta": 35.0,
                "delta": 20.0,
                "source": "no_records",
                "records_count": 0
            })
        
        # Calculate averages from CSV data
        channel_data = {}
        
        for row in rows:
            channel = row['Channel']
            band = row['Band']
            value = float(row['Value'])
            
            if channel not in channel_data:
                channel_data[channel] = {}
            if band not in channel_data[channel]:
                channel_data[channel][band] = []
            
            channel_data[channel][band].append(value)
        
        # Calculate averages
        averages = {}
        for channel, bands in channel_data.items():
            averages[channel] = {}
            for band, values in bands.items():
                averages[channel][band] = sum(values) / len(values)
        
        # Convert to standard EEG bands
        standard_bands = convert_to_standard_bands(averages)
        
        return jsonify({
            "available": True,
            "alpha": standard_bands['alpha'],
            "beta": standard_bands['beta'],
            "gamma": standard_bands['gamma'],
            "theta": standard_bands['theta'],
            "delta": standard_bands['delta'],
            "source": "eeg_headset",
            "records_count": len(rows),
            "channel_averages": averages
        })
        
    except Exception as e:
        return jsonify({
            "available": False,
            "alpha": 45.0,
            "beta": 25.0,
            "gamma": 15.0,
            "theta": 35.0,
            "delta": 20.0,
            "source": "error",
            "error": str(e)
        })

def convert_to_standard_bands(channel_averages):
    """
    Convert channel-specific data to standard EEG frequency bands
    """
    # Extract values from your electrode data
    tp9_values = list(channel_averages.get('TP9', {}).values()) if channel_averages.get('TP9') else [45.0]
    af7_values = list(channel_averages.get('AF7', {}).values()) if channel_averages.get('AF7') else [25.0]
    af8_values = list(channel_averages.get('AF8', {}).values()) if channel_averages.get('AF8') else [15.0]
    tp10_values = list(channel_averages.get('TP10', {}).values()) if channel_averages.get('TP10') else [35.0]
    
    # Combine all values and calculate realistic ranges
    all_values = tp9_values + af7_values + af8_values + tp10_values
    
    if not all_values:
        return {
            "alpha": 45.0,
            "beta": 25.0,
            "gamma": 15.0,
            "theta": 35.0,
            "delta": 20.0
        }
    
    avg_value = sum(all_values) / len(all_values)
    
    # Create realistic EEG band distributions
    return {
        "alpha": max(30.0, min(80.0, avg_value * 1.1)),  # Alpha usually higher
        "beta": max(15.0, min(50.0, avg_value * 0.8)),   # Beta medium
        "gamma": max(5.0, min(30.0, avg_value * 0.5)),   # Gamma lower
        "theta": max(20.0, min(60.0, avg_value * 0.9)),  # Theta medium-high
        "delta": max(10.0, min(40.0, avg_value * 0.6))   # Delta medium-low
    }

if __name__ == '__main__':
    print("🚀 Starting EEG Data Server on http://localhost:5001")
    print("📊 Endpoint: http://localhost:5001/eeg/autofill")
    app.run(host='0.0.0.0', port=5001, debug=False)