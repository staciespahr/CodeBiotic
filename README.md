# CodeBiotic

## Project Overview

CodeBiotic is an AI-powered web accessibility tool designed to help developers identify and correct accessibility issues in their code based on the Web Content Accessibility Guidelines (WCAG) 2.2 Levels A and AA.

Users can upload HTML or Vue files, which are organized and analyzed for potential accessibility issues. CodeBiotic will provide feedback and suggested corrections, allowing users to review and approve changes before downloading their updated code.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/staciespahr/CodeBiotic.git
cd CodeBiotic
```

### 2. Set Up the Backend

Create a Python virtual environment from the project root:

```bash
python3.12 -m venv .venv
```

Activate the virtual environment:

**macOS/Linux:**
```bash
source .venv/bin/activate
```

**Windows:**
```powershell
.venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```bash
python -m pip install -r backend/requirements.txt
```

Start the FastAPI server:

```bash
python -m uvicorn backend.main:app --reload
```

### 3. Set Up the Frontend

Open a second terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the Vue development server:

```bash
npm run dev
```

### 4. Run CodeBiotic