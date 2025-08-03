# Study-Galazy
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
1.1Prerequisites
  Node.js (v14 or later)
  npm (v6 or later)
  Git
........................................
1.2Steps:-
1.Clone the repository

bash:-
git clone https://github.com/your-username/galaxy-study-buddy.git
cd galaxy-study-buddy

2.Install backend dependencies

bash:_
cd server
npm install

3.Install frontend dependencies

bash:-
cd ../frontend
npm install

1.3.Fill in any required values (e.g. API keys).
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
Open your browser to http://localhost:5000/.
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
Play, pause, seek, shuffle, and change tracks from a curated lofi playlist. Volume control is via a slider.

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

Enjoy studying with your Galaxy Study Buddy! For questions, feel free to open an issue.More updates and new features coming soon.We will be adding more to the project.

