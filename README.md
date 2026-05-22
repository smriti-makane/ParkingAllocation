# 🚗 Parkyourlot — Smart Vehicle Detection & Parking Allocation System

An AI-powered smart parking management system that detects vehicles in real time and intelligently allocates parking slots using Computer Vision, Machine Learning, and Full Stack Development technologies.

---

# 📌 Project Overview

Parkyourlot is a real-time smart parking allocation system designed to improve parking efficiency by automatically detecting vehicles and allocating parking slots dynamically.

The project integrates:

- YOLOv8 for vehicle detection
- OpenCV for image/video processing
- Flask for backend API development
- React.js for frontend dashboard
- SQLite for database management

This system helps in:
- Reducing parking congestion
- Improving parking efficiency
- Automating parking slot management
- Enhancing smart city infrastructure

---

# ✨ Features

✅ Real-time vehicle detection  
✅ Smart parking slot allocation  
✅ Dynamic slot availability tracking  
✅ Interactive React dashboard  
✅ Flask backend API integration  
✅ Database-driven parking management  
✅ Scalable system architecture  
✅ User-friendly interface  

---

# 🛠️ Tech Stack

## Frontend
- React.js
- JavaScript
- HTML
- CSS

## Backend
- Flask
- Python

## Machine Learning / Computer Vision
- YOLOv8
- OpenCV

## Database
- SQLite

## Tools & Platforms
- Git
- GitHub
- VS Code

---

# 🧠 System Architecture

```text
Camera/Input Feed
        ↓
YOLOv8 Vehicle Detection
        ↓
OpenCV Processing
        ↓
Flask Backend API
        ↓
Parking Allocation Logic
        ↓
SQLite Database
        ↓
React Frontend Dashboard
```

---

# 📂 Project Structure

```text
ParkingAllocation/
│
├── backend/
│   ├── app.py
│   ├── allocator.py
│   ├── detector.py
│   ├── db.py
│   └── slots.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/smriti-makane/ParkingAllocation.git
```

---

# Backend Setup

## Navigate to Backend Folder

```bash
cd backend
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run Backend

```bash
python app.py
```

Backend runs on:

```text
http://127.0.0.1:5000
```

---

# Frontend Setup

## Navigate to Frontend Folder

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 🚘 Vehicle Detection Workflow

1. Capture image/video feed
2. Process frames using OpenCV
3. Detect vehicles using YOLOv8
4. Send detection results to backend
5. Allocate parking slot dynamically
6. Update database and dashboard

---

# 🗄️ Database Management

SQLite database stores:
- Parking slot IDs
- Vehicle allocation status
- Parking occupancy information
- Slot availability tracking

---

# 📊 Future Enhancements

- Live CCTV integration
- Real-time analytics dashboard
- Multi-floor parking management
- Authentication system
- Payment gateway integration
- Cloud deployment
- Mobile application support

---

# 📸 Screenshots

Add screenshots of:
- Dashboard
- Vehicle detection
- Parking allocation
- Frontend UI

---

# 🎯 Learning Outcomes

This project helped in understanding:
- Full Stack Development
- Machine Learning Integration
- REST API Development
- Computer Vision
- Database Integration
- Git & GitHub Workflow

---

# 👩‍💻 Author

## Smriti Singh

Computer Science Student | AI & Full Stack Enthusiast

GitHub:
https://github.com/smriti-makane

---

