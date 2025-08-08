# Study-Galaxy
Galaxy Study Buddy
Galaxy Study Buddy is a cosmic-themed, AI-powered study companion web application. It features an animated starfield background, relaxing lofi music, and multiple study tools (AI Doubt Solver, Notes Summarizer, Pomodoro Timer, Assignment Hints, Flashcard Maker, Music Player). This README will guide you through setup, usage, and how each component works—no prior context required.
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Table of Contents:
1.Installation
2.Project Structure
3.Running the App
4.Features Overview
5.Configuration & Environment Variables
6.Usage Examples
7.Troubleshooting
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
1. Installation:
Installation Guide

Prerequisites:
Before installing Galaxy Study Buddy, ensure you have the following installed on your system:
Node.js (v14 or later)
npm (v6 or later)
Git

Quick Installation (Git for Windows)
If you're using Git for Windows, you can use the automated setup script:
  Open Git Bash and navigate to your desired directory:
  bash
  cd /path/to/your/directory(where u have installed the git file)
  
  Run the setup script:
  bash
  ./setup.sh

Start the backend server:
  bash
  cd server && npm start

In a new terminal, start the frontend:
  bash
  cd frontend && npm start
......................................
Manual Installation
Step 1: Clone the Repository
bash
git clone https://github.com/your-username/galaxy-study-buddy.git
cd galaxy-study-buddy

Step 2: Install Backend Dependencies
bash:
  cd server
  npm install

Step 3: Install Frontend Dependencies
bash:
  cd ../frontend
  npm install

Step 4: Configuration
Fill in any required configuration values (e.g., API keys) in the appropriate configuration files.(Only need to replace API key in code as per your desired model)

Step 5: Launch the Application
Start the backend server:
bash:
  cd server
  npm start

In a new terminal, start the frontend:
bash:
  cd frontend
  npm start

The application should now be running and accessible through your web browser.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

2. Project Structure
text
galaxy-study-buddy/
├── frontend/              # Client-side code
│   ├── index.html         # Main HTML page
│   ├── style.css          # CSS styles
│   └── app.js             # Client-side JavaScript
├── server/                # Backend API code
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Example environment variables
├── README.md              # This readme

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
3. Running the App
Start the Backend
From the project root:

bash
cd server
npm start
The backend will run at http://localhost:3000/.

Start the Frontend
In a new terminal:

bash
cd frontend
npx serve .
Open your browser to local address displayed.
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
4. Features Overview
Starfield Animation
A seamless, drifting starfield background with twinkling stars.

Lock In
Click Lock In to enter the study space, start background music, and enable the menu.

Side Menu
Access study tools via the hamburger menu:

AI Doubt Solver

Notes Summarizer

Pomodoro Timer

Assignment Hints

Flashcard Maker

Music Player

AI Doubt Solver
Enter any academic question (Math, Physics, Chemistry, etc.) and receive an AI-generated answer.

Notes Summarizer
Paste lecture notes or text, choose summary length (Brief, Detailed, Comprehensive), and generate an AI summary.

Pomodoro Timer
Built-in focus timer with 25 min work / 5 min break cycles and long-break message after four cycles.

Assignment Hints
Input an assignment question and receive AI-guided hints without full solutions.

Flashcard Maker
Create, view, and reorder flashcards; store them in localStorage.

Music Player
Play, pause, seek, shuffle, and change tracks from a curated lofi playlist. Volume control is via a slider which is available in the bottom left (use only after playing music)

Shooting Stars
Random shooting star animations drift across the view at intervals, enhancing immersion.
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
5. Configuration & Environment Variables
Attach your api key in the code(sample will be attached as default replace it if needed)
text
PORT=3000
AI_API_KEY=your_api_key_here
PORT: Port on which the backend API runs.

AI_API_KEY: (Optional) If using an external AI service, supply your API key here.

6. Usage Examples
AI Doubt Solver

Click menu → “AI Doubt Solver”

Type “What is Newton’s second law?”

Click Ask AI; view the response.

Pomodoro Timer

Click menu → “Pomodoro Timer”

Click Start to begin a 25 min session.

Use Pause and Reset as needed.

Music Player

Click menu → “Music”

Click ▶ to play; ⏸ to pause.

Adjust volume knob in bottom-left.

Notes Summarizer

Click menu → “Notes Summarizer”

Paste text in textarea, choose summary length.

Click Summarize Notes.
USERS ARE WELCOMED TO TRY OUT WITH NEW QUESTIONS AND EXPLORE THE PAGE!

7. Troubleshooting
Backend not running: Ensure npm install in server and npm start ran without errors.

CORS issues: If frontend fetches fail, configure CORS in server.js.

AI service errors: Confirm AI_API_KEY is set and valid in .env.

Port conflicts: Change PORT in .env or adjust frontend serve port.

8.Upcoming Updates:
Minor apparence changes.
More tracks.
(Above are expected to be released in 5 working days.)

Enjoy studying with your Galaxy Study Buddy! For questions, feel free to open an issue.More updates and new features coming soon.We will be adding more to the project.

