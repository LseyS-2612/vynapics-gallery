Markdown

# 📸 Vynapics Gallery (Full Stack Photography Portfolio)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=flat&logo=django&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**Vynapics Gallery** is a modern, dockerized web application designed to showcase high-resolution photography portfolios. Developed as a final project for the **"Applied Internet Applications"** course, it features a decoupled architecture with a **Django REST Framework** backend and a **React** frontend, all orchestrated via **Docker Compose**.

## ✨ Key Features

* **Masonry Layout:** Pinterest-style dynamic grid system that handles different aspect ratios (landscape/portrait) seamlessly.
* **Glassmorphism UI:** Modern, dark-themed aesthetic with blurred glass headers and smooth hover effects.
* **Interactive Lightbox:** Full-screen image viewer with zoom and navigation capabilities.
* **Rating System:** Interactive 5-star rating system for visitors to vote on photos.
* **Dynamic Backgrounds:** The application background changes dynamically based on the uploaded gallery images with a blur effect.
* **Admin Management:** Secure Django Admin panel for uploading and managing photos.
* **Containerized:** Fully Dockerized for "write once, run anywhere" deployment.

## 🛠 Tech Stack

### Backend
* **Python / Django:** Core backend framework.
* **Django REST Framework (DRF):** For building the RESTful API.
* **SQLite:** Lightweight database (configured for easy portability).

### Frontend
* **React.js (Vite):** Fast and modern frontend library.
* **Yet Another React Lightbox:** For image viewing experience.
* **CSS3:** Custom Glassmorphism styles and responsive design.

### DevOps & Tools
* **Docker & Docker Compose:** Container orchestration.
* **Git:** Version control.

## 🚀 Installation & Setup

This project is fully dockerized. You don't need to install Python or Node.js locally. You only need **Docker Desktop**.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/vynapics-gallery.git](https://github.com/YOUR_USERNAME/vynapics-gallery.git)
cd vynapics-gallery
2. Build and Run
Run the following command in the root directory:

Bash

docker-compose up --build
Wait for a few minutes for the initial build (Python and Node packages installation).

3. Access the Application
Once the terminal logs settle, access the app via your browser:

Frontend (Gallery): http://localhost:5173

Backend (Admin Panel): http://localhost:8000/admin

⚙️ Configuration & Usage
Creating an Admin User
Since the database starts fresh in Docker, you need to create a superuser to upload photos.

While the containers are running, open a new terminal and run:

Bash

docker-compose exec backend python manage.py createsuperuser
Follow the prompts to set a username and password.

Uploading Photos
Go to http://localhost:8000/admin.

Login with your superuser credentials.

Navigate to Gallery > Photos.

Click "Add Photo", upload your images, and save.

Refresh the Frontend at http://localhost:5173.

📂 Project Structure
vynapics-gallery/
├── backend/             # Django API Source Code
│   ├── gallery/         # App logic (Models, Views, Serializers)
│   ├── media/           # Uploaded images storage
│   ├── Dockerfile       # Python environment setup
│   └── requirements.txt # Python dependencies
│
├── frontend/            # React Source Code
│   ├── src/             # Components (App.jsx, etc.)
│   ├── Dockerfile       # Node.js environment setup
│   └── package.json     # JS dependencies
│
├── docker-compose.yml   # Orchestration of Frontend & Backend services
└── README.md            # Project documentation
🤝 Contributing
This is an academic project, but suggestions are welcome.

Fork the repo.

Create a feature branch (git checkout -b feature/AmazingFeature).

Commit your changes.

Push to the branch.

Open a Pull Request.
