// Minimal jQuery-like selectors for brevity
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const starColor = 'rgba(220,180,255,0.85)';

window.addEventListener('DOMContentLoaded', () => {
  // Starfield generation - 130 stars as divs with random positions, size, opacity
  const starfield = $('#starfield');
  for (let j = 0; j < 2; j++) { // repeat twice for seamless loop
    for (let i = 0; i < 130; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const left = Math.random() * window.innerWidth + j * window.innerWidth;
      const top = Math.random() * window.innerHeight;
      s.style.left = `${left}px`;
      s.style.top = `${top}px`;
      s.style.background = starColor;
      const size = Math.random() * 1.2 + 1;
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.opacity = (Math.random() * 0.7 + 0.3).toFixed(2);
      starfield.appendChild(s);
    }
  }

  // Menu and lock button references
  const menuBtn = $('#mainMenuBtn');
  const sideMenu = $('#sideMenu');
  const lockBtn = $('#lockBtn');
  const audio = $('#bgm');
  const knob = $('#volumeKnob');
  const resumeBtn = $('#resumeBtn');

  // Disable menu initially
  menuBtn.disabled = true;

  // Lock In button click: enable menu, play music
  lockBtn.addEventListener('click', () => {
    lockBtn.classList.add('active');
    menuBtn.disabled = false;

    audio.volume = knob.value;
    audio.play().catch(() => {});

    // Fade out lockBtn
    lockBtn.classList.add('fade-out');

let backBtn = document.getElementById('backToWorldBtn');
if (!backBtn) {
  backBtn = document.createElement('button');
  backBtn.id = 'backToWorldBtn';
  backBtn.textContent = 'Back to the Real World';
  document.body.appendChild(backBtn);
  backBtn.addEventListener('click', () => window.location.reload());
}

// Force a reflow to ensure initial styles are rendered
void backBtn.offsetWidth;

// Now add the class that triggers the fade-in
backBtn.classList.add('visible');

backBtn.classList.add('visible');
  });

  // Menu toggle click, stop event propagation to prevent immediate closing
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sideMenu.classList.toggle('hidden');
  });

  // Clicking outside sideMenu closes it
  document.body.addEventListener('click', () => {
    sideMenu.classList.add('hidden');
  });

  // Volume knob controls audio volume
  knob.addEventListener('input', () => {
    audio.volume = knob.value;
  });

  // Resume button to try play after user interaction if blocked
  resumeBtn.addEventListener('click', () => {
    audio
      .play()
      .then(() => {
        resumeBtn.style.display = 'none';
      })
      .catch(() => {
        alert('Playback failed. Please try interacting again.');
      });
  });

  // Menu navigation buttons - render features or placeholder
  $$('.nav-link').forEach((btn) => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;

    if (view === 'pomodoro') {
      renderPomodoroTimer();
    } else if (view === 'music') {
      renderMusicPlayer();
    } else if (view === 'doubts') {
      renderAIDoubtSolver();
    }else if (view=='summarizer'){
      renderNotesSummarizer();
    }else if (view=='hints'){
      renderAssignmentHints();
    }else if (view === 'flashcards') {
      renderFlashcardMaker();
    } else {
      $('#appContent').textContent = 'Loading feature: ' + btn.textContent + '...';
    }
    sideMenu.classList.add('hidden');
  });
});
});

// Pomodoro Timer UI and logic
function renderPomodoroTimer() {
  const container = $('#appContent');
  container.innerHTML = `
    <h2>Pomodoro Timer</h2>
    <div id="timerDisplay" style="font-size: 3rem; margin: 20px 0;">25:00</div>
    <div style="display:flex; gap:12px; justify-content:center;">
      <button id="startPauseBtn" class="pomodoro-btn" title="Start or pause the timer">Start</button>
      <button id="resetBtn" class="pomodoro-btn" title="Reset the timer to 25:00">Reset</button>
    </div>
    <div id="cycleInfo" style="margin-top:10px;color:#c7a8ff;"></div>
  `;

  let workDuration = 25*60; // 25 minutes in seconds
  let breakDuration = 5*60; // 5 minutes in seconds
  let remaining = workDuration;
  let timerId = null;
  let isRunning = false;
  let isWork = true;
  let cycles = 0;

  const display = $('#timerDisplay');
  const startPauseBtn = $('#startPauseBtn');
  const resetBtn = $('#resetBtn');
  const cycleInfo = $('#cycleInfo');

  function updateDisplay(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    display.textContent = `${m}:${s}`;
  }

  function updateCycleInfo() {
    if (cycles < 4) {
      cycleInfo.textContent = `Cycle: ${cycles + (isWork ? 1 : 0)} / 4`;
    } else {
      cycleInfo.textContent = '';
    }
  }

  function showLongBreakMessage() {
    container.innerHTML = `
      <h2 style="color:#c7a8ff;font-size:2.2rem;text-align:center;margin-top:2rem;">
        Your ONE OF A KIND!!<br>
        Take a long break as per your desire.
      </h2>
      <button id="restartPomodoro" class="btn btn--primary" style="margin-top:2rem;">Restart Pomodoro</button>
    `;
    $('#restartPomodoro').onclick = renderPomodoroTimer;
  }

  function tick() {
    if (remaining > 0) {
      remaining--;
      updateDisplay(remaining);
    } else {
      clearInterval(timerId);
      timerId = null;
      isRunning = false;
      startPauseBtn.textContent = 'Start';

      if (isWork) {
        cycles++;
        if (cycles >= 4) {
          showLongBreakMessage();
          return;
        }
        // Switch to break
        isWork = false;
        remaining = breakDuration;
        updateDisplay(remaining);
        cycleInfo.textContent = `Break time! Cycle: ${cycles} / 4`;
        setTimeout(() => {
          startPauseBtn.disabled = false;
          startPauseBtn.textContent = 'Start Break';
        }, 500);
      } else {
        // Switch to work
        isWork = true;
        remaining = workDuration;
        updateDisplay(remaining);
        updateCycleInfo();
        setTimeout(() => {
          startPauseBtn.disabled = false;
          startPauseBtn.textContent = 'Start Work';
        }, 500);
      }
    }
  }

  startPauseBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      isRunning = false;
      startPauseBtn.textContent = 'Start';
    } else {
      timerId = setInterval(tick, 1000);
      isRunning = true;
      startPauseBtn.textContent = 'Pause';
      startPauseBtn.disabled = false;
    }
  });

  resetBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    isRunning = false;
    isWork = true;
    cycles = 0;
    remaining = workDuration;
    updateDisplay(remaining);
    startPauseBtn.textContent = 'Start';
    startPauseBtn.disabled = false;
    updateCycleInfo();
  });

  updateDisplay(remaining);
  updateCycleInfo();
}

function renderMusicPlayer() {
  const container = $('#appContent');
  container.innerHTML = `
    <h2 style="color:#c7a8ff;text-align:center;margin-bottom:12px;">Music Player</h2>
    <div class="music-player-card">
      <div class="music-controls">
        <button id="prevTrack" title="Previous">&#9198;</button>
        <button id="playPause" title="Play/Pause" aria-label="Play or Pause" class="play-pause-btn">▶</button>\
        <button id="nextTrack" title="Next">&#9197;</button>
        <button id="shuffleBtn" title="Shuffle Playlist">&#128256;</button>
      </div>
      <div id="trackInfo" class="music-track-info">Loading...</div>
      <input type="range" id="seekBar" min="0" max="0" value="0"/>
      <div class="music-time">
        <span id="currentTime">0:00</span> / <span id="duration">0:00</span>
      </div>
      <div class="music-hint">Adjust volume with the slider (bottom left).</div>
    </div>`
    const playPauseBtn = $('#playPause');

playPauseBtn.onclick = () => {
  if (audio.paused) {
    audio.play().catch(() => {});
    playPauseBtn.classList.add('playing');
    playPauseBtn.textContent = '⏸';
  } else {
    audio.pause();
    playPauseBtn.classList.remove('playing');
    playPauseBtn.textContent = '▶';
  }
};

  ;

  const playlist = [
    { name: "Memories of Spring", artist: "Tokyo Music Walker", src: "assets/Memories.mp3" },
    { name: "New Beginnings", artist: "Tokyo Music Walker", src: "assets/New.mp3" },
    { name: "Late at Night", artist: "Sakura Girl", src: "assets/Sakura.mp3" }
  ];

  let current = 0;
  let shuffled = false;
  let shuffleOrder = [...playlist.keys()];

  // Create one audio element for playback
  const audio = new Audio();

  // Select UI elements
  
  const prevBtn = $('#prevTrack');
  const nextBtn = $('#nextTrack');
  const shuffleBtn = $('#shuffleBtn');
  const trackInfo = $('#trackInfo');
  const seekBar = $('#seekBar');
  const currentTime = $('#currentTime');
  const duration = $('#duration');

  // Connect volume knob if exists
  const globalVolumeKnob = $('#volumeKnob');
  if (globalVolumeKnob) {
    audio.volume = globalVolumeKnob.value;
    globalVolumeKnob.addEventListener('input', () => {
      audio.volume = globalVolumeKnob.value;
    });
  } else {
    audio.volume = 0.7; // default volume
  }

  // Format seconds into MM:SS
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // Load and prepare the selected track
  function loadTrack(idx) {
    const trackIdx = shuffled ? shuffleOrder[idx] : idx;
    audio.src = playlist[trackIdx].src;
    audio.currentTime = 0;
    seekBar.value = 0;
    playPauseBtn.innerHTML = '▶️';
    trackInfo.textContent = `${playlist[trackIdx].name} — ${playlist[trackIdx].artist}`;

    // On metadata loaded, update seek bar limit and duration text
    audio.addEventListener('loadedmetadata', () => {
      seekBar.max = Math.floor(audio.duration);
      duration.textContent = formatTime(audio.duration);
    }, { once: true });
  }

  // Play current track
  function playTrack() {
    audio.play().catch(e => {
      // Some browsers require user interaction for autoplay
      console.warn('Playback prevented:', e);
    });
    playPauseBtn.innerHTML = '⏸️';
  }

  // Pause track
  function pauseTrack() {
    audio.pause();
    playPauseBtn.innerHTML = '▶️';
  }

  // Toggle play/pause button behavior
  playPauseBtn.onclick = () => {
    if (audio.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  };

  // Next track handler
  nextBtn.onclick = () => {
    current = (current + 1) % playlist.length;
    loadTrack(current);
    playTrack();
  };

  // Previous track handler
  prevBtn.onclick = () => {
    current = (current - 1 + playlist.length) % playlist.length;
    loadTrack(current);
    playTrack();
  };

  // Shuffle toggle handler
  shuffleBtn.onclick = () => {
    shuffled = !shuffled;
    shuffleBtn.classList.toggle('active', shuffled);
    if (shuffled) {
      shuffleOrder = Array.from(playlist.keys());
      for (let i = shuffleOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffleOrder[i], shuffleOrder[j]] = [shuffleOrder[j], shuffleOrder[i]];
      }
      current = 0;
    } else {
      shuffleOrder = [...playlist.keys()];
      current = 0;
    }
    loadTrack(current);
    playTrack();
  };

  // Update seek bar and current time as audio plays
  audio.addEventListener('timeupdate', () => {
    seekBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = formatTime(audio.currentTime);
  });

  // User changes seek bar input
  seekBar.oninput = () => {
    audio.currentTime = seekBar.value;
  };

  // Auto play next on track end
  audio.addEventListener('ended', () => {
    nextBtn.click();
  });

  // Immediately load the first track on render
  loadTrack(current);
}


function renderAIDoubtSolver() {
  const container = $('#appContent');
  container.innerHTML = `
    <h2>AI Doubt Solver</h2>
    <div id="doubtSolverContainer" style="max-width: 700px; margin: 20px auto; text-align: center;">
      
      <div style="margin-bottom: 24px; text-align: left;">
        <label for="questionInput" style="display: block; margin-bottom: 10px; color: #c7a8ff; font-size: 1.2rem; font-weight: bold;">
          💭 What's your doubt?
        </label>
        <textarea 
          id="questionInput" 
          placeholder="Ask me anything about Math, Physics, Chemistry, or any academic topic..."
          style="
            width: 100%; 
            min-height: 140px; 
            padding: 16px; 
            border-radius: 12px; 
            border: 2px solid #493168; 
            background: rgba(40, 30, 80, 0.4); 
            color: #ddd; 
            font-family: 'Ruigslay', sans-serif; 
            font-size: 1.1rem; 
            resize: vertical;
            box-shadow: 0 4px 12px rgba(73, 49, 104, 0.3);
            transition: border-color 0.3s, box-shadow 0.3s;
          "
        ></textarea>
      </div>
      
      <div style="display: flex; gap: 16px; justify-content: center; margin-bottom: 24px; flex-wrap: wrap;">
        <button id="askAIBtn" class="pomodoro-btn" style="min-width: 140px; font-size: 1.1rem;">
          🤖 Ask AI
        </button>
        <button id="clearBtn" class="pomodoro-btn" style="background: rgba(150, 100, 180, 0.8); min-width: 100px;">
          🗑️ Clear
        </button>
      </div>
      
      <div id="answerContainer" style="display: none; text-align: left; margin-top: 30px;">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <h3 style="color: #c7a8ff; margin: 0; font-size: 1.3rem;">🎯 AI Response</h3>
          <button id="copyAnswerBtn" style="
            margin-left: auto; 
            background: none; 
            border: 1px solid #c7a8ff; 
            color: #c7a8ff; 
            padding: 6px 12px; 
            border-radius: 6px; 
            cursor: pointer;
            font-family: 'Ruigslay', sans-serif;
            font-size: 0.9rem;
            transition: all 0.2s;
          " title="Copy answer to clipboard">
            📋 Copy
          </button>
        </div>
        <div id="aiAnswer" style="
          background: rgba(40, 30, 80, 0.7); 
          border-radius: 12px; 
          padding: 24px; 
          color: #ddd; 
          line-height: 1.7; 
          border-left: 4px solid #c7a8ff;
          white-space: pre-wrap;
          font-size: 1.05rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          max-height: 400px;
          overflow-y: auto;
        "></div>
      </div>
      
      <div id="loadingIndicator" style="display: none; text-align: center; margin: 30px 0;">
        <div style="color: #c7a8ff; font-size: 1.2rem; margin-bottom: 12px;">
          <span class="thinking-dots">🤖 AI is thinking</span>
        </div>
        <div style="color: #999; font-size: 1rem;">Please wait while I analyze your question...</div>
        <div style="margin-top: 16px;">
          <div class="loading-bar" style="
            width: 200px; 
            height: 4px; 
            background: rgba(73, 49, 104, 0.3); 
            border-radius: 2px; 
            margin: 0 auto;
            overflow: hidden;
          ">
            <div style="
              width: 50px; 
              height: 100%; 
              background: linear-gradient(90deg, #c7a8ff, #e8dcfc); 
              border-radius: 2px;
              animation: loadingSlide 1.5s infinite;
            "></div>
          </div>
        </div>
      </div>
      
      <div id="errorMessage" style="
        display: none; 
        background: rgba(200, 60, 60, 0.2); 
        border: 2px solid #c83232; 
        border-radius: 12px; 
        padding: 16px; 
        color: #ff9999; 
        margin-top: 20px;
        box-shadow: 0 4px 12px rgba(200, 50, 50, 0.2);
      "></div>
      
      <div style="margin-top: 30px; padding: 16px; background: rgba(40, 30, 80, 0.3); border-radius: 8px; color: #999; font-size: 0.95rem;">
        💡 <strong>Quick Tips:</strong> 
        • Use Ctrl+Enter to ask quickly 
        • Be specific about your subject 
        • Include what you've tried so far
        • Ask follow-up questions for clarity
      </div>
    </div>
  `;

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes loadingSlide {
      0% { transform: translateX(-100px); }
      100% { transform: translateX(250px); }
    }
    
    .thinking-dots::after {
      content: '';
      animation: dots 1.5s infinite;
    }
    
    @keyframes dots {
      0%, 20% { content: ''; }
      40% { content: '.'; }
      60% { content: '..'; }
      80%, 100% { content: '...'; }
    }
    
    textarea:focus {
      border-color: #c7a8ff !important;
      box-shadow: 0 4px 16px rgba(199, 168, 255, 0.4) !important;
      outline: none;
    }
    
    #copyAnswerBtn:hover {
      background: rgba(199, 168, 255, 0.1) !important;
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);

  const questionInput = $('#questionInput');
  const askBtn = $('#askAIBtn');
  const clearBtn = $('#clearBtn');
  const answerContainer = $('#answerContainer');
  const aiAnswer = $('#aiAnswer');
  const loadingIndicator = $('#loadingIndicator');
  const errorMessage = $('#errorMessage');
  const copyAnswerBtn = $('#copyAnswerBtn');

  // Ask AI button click handler
  // Ask AI button click handler
askBtn.addEventListener('click', async () => {
  const question = questionInput.value.trim();
  
  if (!question) {
    showError('🤔 Please enter a question before asking the AI!');
    questionInput.focus();
    return;
  }

  if (question.length < 10) {
    showError('📝 Please provide a more detailed question (at least 10 characters).');
    questionInput.focus();
    return;
  }

  // Show loading state
  askBtn.disabled = true;
  askBtn.innerHTML = '⏳ Asking...';
  loadingIndicator.style.display = 'block';
  answerContainer.style.display = 'none';
  errorMessage.style.display = 'none';

  try {
    console.log('Sending question to backend:', question);

    const backendResponse = await fetch('http://localhost:3000/ask-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  // FIXED: removed extra comma
      },
      body: JSON.stringify({ question: question })
    });

    console.log('Backend response status:', backendResponse.status);

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('Backend error:', errorText);
      throw new Error(`Server error: ${backendResponse.status} - ${errorText}`);
    }

    const data = await backendResponse.json();
    console.log('Received data:', data);

    const response = data.answer || 'No response from AI.';

    // Display the response with typing effect
    aiAnswer.textContent = '';
    answerContainer.style.display = 'block';
    await typeWriterEffect(aiAnswer, response, 20);

  } catch (error) {
    console.error('Frontend error:', error);

    if (error.message.includes('fetch')) {
      showError('🌐 Could not connect to AI service. Make sure your backend server is running on port 3000!');
    } else {
      showError('😕 Error: ' + error.message);
    }
  } finally {
    // Reset button state
    askBtn.disabled = false;
    askBtn.innerHTML = '🤖 Ask AI';
    loadingIndicator.style.display = 'none';
  }
});

  // Clear button click handler
  clearBtn.addEventListener('click', () => {
    questionInput.value = '';
    answerContainer.style.display = 'none';
    errorMessage.style.display = 'none';
    questionInput.focus();
    
    // Brief feedback
    clearBtn.innerHTML = '✅ Cleared';
    setTimeout(() => {
      clearBtn.innerHTML = '🗑️ Clear';
    }, 1000);
  });

  // Copy answer button
  copyAnswerBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(aiAnswer.textContent);
      copyAnswerBtn.innerHTML = '✅ Copied!';
      setTimeout(() => {
        copyAnswerBtn.innerHTML = '📋 Copy';
      }, 2000);
    } catch (err) {
      copyAnswerBtn.innerHTML = '❌ Failed';
      setTimeout(() => {
        copyAnswerBtn.innerHTML = '📋 Copy';
      }, 2000);
    }
  });

  // Enter key handler for textarea
  questionInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      askBtn.click();
    }
  });

  // Helper function to show error messages
  function showError(message) {
    errorMessage.innerHTML = `⚠️ ${message}`;
    errorMessage.style.display = 'block';
    answerContainer.style.display = 'none';
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 5000);
  }

  // Typewriter effect for AI responses
  async function typeWriterEffect(element, text, speed = 30) {
    element.textContent = '';
    for (let i = 0; i < text.length; i++) {
      element.textContent += text.charAt(i);
      await new Promise(resolve => setTimeout(resolve, speed));
      // Scroll to bottom as text appears
      element.scrollTop = element.scrollHeight;
    }
  }

  // Focus on the textarea when the feature loads
  setTimeout(() => questionInput.focus(), 100);
}
function renderNotesSummarizer() {
  const container = $('#appContent');
  container.innerHTML = `
    <h2>Notes Summarizer</h2>
    <div id="summarizerContainer" style="max-width: 800px; margin: 20px auto; text-align: center;">
      
      <div style="margin-bottom: 24px; text-align: left;">
        <label for="notesInput" style="display: block; margin-bottom: 10px; color: #c7a8ff; font-size: 1.2rem; font-weight: bold;">
          📝 Paste your notes here:
        </label>
        <textarea 
          id="notesInput" 
          placeholder="Paste your lecture notes, textbook chapters, or any text you want summarized..."
          style="
            width: 100%; 
            min-height: 200px; 
            padding: 16px; 
            border-radius: 12px; 
            border: 2px solid #493168; 
            background: rgba(40, 30, 80, 0.4); 
            color: #ddd; 
            font-family: 'Ruigslay', sans-serif; 
            font-size: 1rem; 
            resize: vertical;
            box-shadow: 0 4px 12px rgba(73, 49, 104, 0.3);
            transition: border-color 0.3s, box-shadow 0.3s;
          "
        ></textarea>
      </div>
      
      <div style="display: flex; gap: 16px; justify-content: center; margin-bottom: 24px; flex-wrap: wrap;">
        <button id="summarizeBtn" class="pomodoro-btn" style="min-width: 160px; font-size: 1.1rem;">
          ✨ Summarize Notes
        </button>
        <button id="clearNotesBtn" class="pomodoro-btn" style="background: rgba(150, 100, 180, 0.8); min-width: 100px;">
          🗑️ Clear
        </button>
      </div>
      
      <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap;">
        <button id="shortSummaryBtn" class="summary-option-btn" data-length="short">📋 Brief</button>
        <button id="mediumSummaryBtn" class="summary-option-btn active" data-length="medium">📄 Detailed</button>
        <button id="longSummaryBtn" class="summary-option-btn" data-length="long">📚 Comprehensive</button>
      </div>
      
      <div id="summaryContainer" style="display: none; text-align: left; margin-top: 30px;">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <h3 style="color: #c7a8ff; margin: 0; font-size: 1.3rem;">📋 Summary</h3>
          <button id="copySummaryBtn" style="
            margin-left: auto; 
            background: none; 
            border: 1px solid #c7a8ff; 
            color: #c7a8ff; 
            padding: 6px 12px; 
            border-radius: 6px; 
            cursor: pointer;
            font-family: 'Ruigslay', sans-serif;
            font-size: 0.9rem;
            transition: all 0.2s;
          " title="Copy summary to clipboard">
            📋 Copy
          </button>
        </div>
        <div id="summaryOutput" style="
          background: rgba(40, 30, 80, 0.7); 
          border-radius: 12px; 
          padding: 24px; 
          color: #ddd; 
          line-height: 1.7; 
          border-left: 4px solid #c7a8ff;
          white-space: pre-wrap;
          font-size: 1.05rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          max-height: 500px;
          overflow-y: auto;
        "></div>
      </div>
      
      <div id="summaryLoadingIndicator" style="display: none; text-align: center; margin: 30px 0;">
        <div style="color: #c7a8ff; font-size: 1.2rem; margin-bottom: 12px;">
          <span class="thinking-dots">📝 Analyzing your notes</span>
        </div>
        <div style="color: #999; font-size: 1rem;">Creating a comprehensive summary...</div>
      </div>
      
      <div id="summaryErrorMessage" style="
        display: none; 
        background: rgba(200, 60, 60, 0.2); 
        border: 2px solid #c83232; 
        border-radius: 12px; 
        padding: 16px; 
        color: #ff9999; 
        margin-top: 20px;
        box-shadow: 0 4px 12px rgba(200, 50, 50, 0.2);
      "></div>
      
      <div style="margin-top: 30px; padding: 16px; background: rgba(40, 30, 80, 0.3); border-radius: 8px; color: #999; font-size: 0.95rem;">
        💡 <strong>Tips for better summaries:</strong> 
        • Paste complete sentences and paragraphs
        • Include context and key concepts
        • Use structured notes for best results
        • Try different summary lengths
      </div>
    </div>
  `;

  // Add CSS for summary option buttons
  const style = document.createElement('style');
  style.textContent = `
    .summary-option-btn {
      background: rgba(73, 49, 104, 0.6);
      color: #c7a8ff;
      border: 2px solid #493168;
      border-radius: 8px;
      padding: 8px 16px;
      font-family: 'Ruigslay', sans-serif;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .summary-option-btn:hover {
      background: rgba(199, 168, 255, 0.2);
      border-color: #c7a8ff;
      transform: scale(1.05);
    }
    
    .summary-option-btn.active {
      background: rgba(199, 168, 255, 0.8);
      color: #2d085f;
      border-color: #c7a8ff;
    }
    
    #copySummaryBtn:hover {
      background: rgba(199, 168, 255, 0.1) !important;
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);

  const notesInput = $('#notesInput');
  const summarizeBtn = $('#summarizeBtn');
  const clearNotesBtn = $('#clearNotesBtn');
  const summaryContainer = $('#summaryContainer');
  const summaryOutput = $('#summaryOutput');
  const summaryLoadingIndicator = $('#summaryLoadingIndicator');
  const summaryErrorMessage = $('#summaryErrorMessage');
  const copySummaryBtn = $('#copySummaryBtn');
  
  // Summary length options
  const summaryOptionBtns = $$('.summary-option-btn');
  let selectedLength = 'medium';

  // Handle summary length selection
  summaryOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      summaryOptionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedLength = btn.dataset.length;
    });
  });

  // Summarize button click handler
  summarizeBtn.addEventListener('click', async () => {
    const notes = notesInput.value.trim();
    
    if (!notes) {
      showSummaryError('📝 Please paste some notes to summarize!');
      notesInput.focus();
      return;
    }

    if (notes.length < 50) {
      showSummaryError('📝 Please provide more text (at least 50 characters) for a meaningful summary.');
      notesInput.focus();
      return;
    }

    // Show loading state
    summarizeBtn.disabled = true;
    summarizeBtn.innerHTML = '⏳ Summarizing...';
    summaryLoadingIndicator.style.display = 'block';
    summaryContainer.style.display = 'none';
    summaryErrorMessage.style.display = 'none';

    try {
      // Create the prompt based on selected length
      let prompt = '';
      switch(selectedLength) {
        case 'short':
          prompt = `Please provide a brief summary of the following notes in 3-5 key points:\n\n${notes}`;
          break;
        case 'long':
          prompt = `Please provide a comprehensive summary of the following notes, including main concepts, details, and examples:\n\n${notes}`;
          break;
        default: // medium
          prompt = `Please provide a detailed summary of the following notes, covering the main concepts and important details:\n\n${notes}`;
      }

      const backendResponse = await fetch('http://localhost:3000/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: prompt })
      });

      if (!backendResponse.ok) {
        const errorText = await backendResponse.text();
        throw new Error(`Server error: ${backendResponse.status} - ${errorText}`);
      }

      const data = await backendResponse.json();
      const summary = data.answer || 'No summary generated.';

      // Display the summary with typing effect
      summaryOutput.textContent = '';
      summaryContainer.style.display = 'block';
      await typeWriterEffect(summaryOutput, summary, 15);

    } catch (error) {
      if (error.message.includes('fetch')) {
        showSummaryError('🌐 Could not connect to AI service. Make sure your backend server is running!');
      } else {
        showSummaryError('😕 Error: ' + error.message);
      }
    } finally {
      summarizeBtn.disabled = false;
      summarizeBtn.innerHTML = '✨ Summarize Notes';
      summaryLoadingIndicator.style.display = 'none';
    }
  });

  // Clear notes button
  clearNotesBtn.addEventListener('click', () => {
    notesInput.value = '';
    summaryContainer.style.display = 'none';
    summaryErrorMessage.style.display = 'none';
    notesInput.focus();
    
    clearNotesBtn.innerHTML = '✅ Cleared';
    setTimeout(() => {
      clearNotesBtn.innerHTML = '🗑️ Clear';
    }, 1000);
  });

  // Copy summary button
  copySummaryBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(summaryOutput.textContent);
      copySummaryBtn.innerHTML = '✅ Copied!';
      setTimeout(() => {
        copySummaryBtn.innerHTML = '📋 Copy';
      }, 2000);
    } catch (err) {
      copySummaryBtn.innerHTML = '❌ Failed';
      setTimeout(() => {
        copySummaryBtn.innerHTML = '📋 Copy';
      }, 2000);
    }
  });

  // Helper functions
  function showSummaryError(message) {
    summaryErrorMessage.innerHTML = `⚠️ ${message}`;
    summaryErrorMessage.style.display = 'block';
    summaryContainer.style.display = 'none';
    
    setTimeout(() => {
      summaryErrorMessage.style.display = 'none';
    }, 5000);
  }

  async function typeWriterEffect(element, text, speed = 20) {
    element.textContent = '';
    for (let i = 0; i < text.length; i++) {
      element.textContent += text.charAt(i);
      await new Promise(resolve => setTimeout(resolve, speed));
      element.scrollTop = element.scrollHeight;
    }
  }

  setTimeout(() => notesInput.focus(), 100);
}
function renderAssignmentHints() {
  const container = $('#appContent');
  container.innerHTML = `
    <h2>Assignment Hints</h2>
    <div id="hintsContainer" style="max-width: 700px; margin: 20px auto; text-align: center;">
      <label for="hintQuestion" style="display: block; margin-bottom: 12px; color: #c7a8ff; font-weight: bold; font-size: 1.2rem;">
        ❓ Enter your assignment question or problem:
      </label>
      <textarea id="hintQuestion" placeholder="Type your question here..." rows="5" style="
        width: 100%; 
        padding: 12px; 
        border-radius: 10px; 
        border: 2px solid #493168; 
        background: rgba(40, 30, 80, 0.4); 
        color: #ddd; 
        font-family: 'Ruigslay', sans-serif; 
        font-size: 1rem;
        resize: vertical;
      "></textarea>
      
      <button id="getHintsBtn" class="pomodoro-btn" style="margin-top:16px; font-size: 1.1rem; min-width: 140px;">
        💡 Get Hints
      </button>

      <div id="hintsLoading" style="display:none; margin-top:24px; color:#c7a8ff; font-size:1.1rem;">
        🤖 Thinking deeply...
      </div>

      <div id="hintsOutput" style="display:none; margin-top: 20px; text-align: left; background: rgba(40,30,80,0.7); padding: 20px; border-radius: 12px; border-left: 4px solid #c7a8ff; font-size: 1.05rem; line-height: 1.6; color: #ddd; white-space: pre-wrap; max-height: 400px; overflow-y: auto;"></div>

      <button id="copyHintsBtn" style="display:none; margin-top: 12px; padding: 6px 12px; border-radius: 8px; border: 1px solid #c7a8ff; background: none; color: #c7a8ff; cursor: pointer; font-family: 'Ruigslay', sans-serif; font-size: 0.9rem;">
        📋 Copy Hints
      </button>

      <div id="hintsError" style="display:none; margin-top: 24px; color: #ff9999; background: rgba(200, 60, 60, 0.2); border: 2px solid #c83232; border-radius: 12px; padding: 16px;"></div>
    </div>
  `;

  const hintQuestion = $('#hintQuestion');
  const getHintsBtn = $('#getHintsBtn');
  const hintsLoading = $('#hintsLoading');
  const hintsOutput = $('#hintsOutput');
  const copyHintsBtn = $('#copyHintsBtn');
  const hintsError = $('#hintsError');

  getHintsBtn.addEventListener('click', async () => {
    const question = hintQuestion.value.trim();
    if (!question) {
      showError('⚠️ Please enter a question before requesting hints!');
      hintQuestion.focus();
      return;
    }
    if (question.length < 10) {
      showError('⚠️ Please enter a more detailed question (at least 10 characters).');
      hintQuestion.focus();
      return;
    }
    
    // Clear previous outputs
    hintsError.style.display = 'none';
    hintsOutput.style.display = 'none';
    copyHintsBtn.style.display = 'none';

    // Show loading
    hintsLoading.style.display = 'block';
    getHintsBtn.disabled = true;

    try {
      const prompt = `
You are a helpful educational assistant who provides only hints, guiding questions, or strategies for solving a problem. 
Do NOT provide any direct answers or full solutions. Your goal is to help the user think with new eyes and discover the answer by themselves.

Question: "${question}"

Hints:
-  
`;

      const response = await fetch('http://localhost:3000/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: prompt })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const hintsText = data.answer || 'No hints generated.';

      hintsOutput.textContent = '';
      hintsOutput.style.display = 'block';
      copyHintsBtn.style.display = 'inline-block';
      
      // Optional: Typewriter effect, or just show
      await typeWriterEffect(hintsOutput, hintsText, 20);

    } catch (err) {
      hintsError.textContent = err.message;
      hintsError.style.display = 'block';
    } finally {
      hintsLoading.style.display = 'none';
      getHintsBtn.disabled = false;
    }
  });

  copyHintsBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(hintsOutput.textContent);
      copyHintsBtn.textContent = '✅ Copied!';
      setTimeout(() => (copyHintsBtn.textContent = '📋 Copy Hints'), 2000);
    } catch {
      copyHintsBtn.textContent = '❌ Failed to copy';
      setTimeout(() => (copyHintsBtn.textContent = '📋 Copy Hints'), 2000);
    }
  });

  // Helper to show errors easily in this UI
  function showError(msg) {
    hintsError.textContent = msg;
    hintsError.style.display = 'block';
    hintsOutput.style.display = 'none';
    copyHintsBtn.style.display = 'none';
  }

  // You can reuse your existing typeWriterEffect or define here
  async function typeWriterEffect(element, text, speed = 30) {
    element.textContent = '';
    for (let i = 0; i < text.length; i++) {
      element.textContent += text.charAt(i);
      await new Promise(resolve => setTimeout(resolve, speed));
      element.scrollTop = element.scrollHeight;
    }
  }
  
  setTimeout(() => hintQuestion.focus(), 100);
}

function renderFlashcardMaker() {
  const container = $('#appContent');
  container.innerHTML = `
    <h2>Flashcard Maker</h2>
    <div id="flashcardMaker" style="max-width:700px;margin:20px auto;text-align:left;">
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <input id="termInput" placeholder="Term (question)" style="flex:1;padding:12px;border-radius:8px;border:2px solid #493168;background:rgba(40,30,80,0.4);color:#ddd;font-size:1rem;" />
        <input id="defInput"  placeholder="Definition (answer)" style="flex:2;padding:12px;border-radius:8px;border:2px solid #493168;background:rgba(40,30,80,0.4);color:#ddd;font-size:1rem;" />
        <button id="addCardBtn" class="pomodoro-btn" style="min-width:120px;">➕ Add Card</button>
      </div>
      <div id="flashcardList" style="margin-top:24px;"></div>
    </div>
  `;

  const termInput      = $('#termInput');
  const defInput       = $('#defInput');
  const addCardBtn     = $('#addCardBtn');
  const flashcardList  = $('#flashcardList');

  // Load existing cards
  let cards = JSON.parse(localStorage.getItem('flashcards') || '[]');

  // Render function
  function renderCards() {
    flashcardList.innerHTML = '';

    cards.forEach((c, i) => {
      // Wrapper for card + delete icon
      const cardWrapper = document.createElement('div');
      cardWrapper.style = 'display:flex; align-items:flex-start; gap:8px; margin-bottom:12px;';

      // Flashcard element
      const card = document.createElement('div');
      card.className = 'flashcard';
      card.style = `
        flex:1;
        background:rgba(40,30,80,0.7);
        border:2px solid #493168;
        border-radius:12px;
        padding:16px;
        color:#ddd;
        cursor:grab;
      `;
      card.innerHTML = `
        <strong style="display:block; font-size:1.2rem; margin-bottom:8px;">${c.term}</strong>
        <div class="definition" style="margin-top:8px; text-decoration:underline;">
          ${c.definition}
        </div>
      `;
      // Toggle definition on click
      card.addEventListener('click', () => {
        const defEl = card.querySelector('.definition');
        defEl.style.display = defEl.style.display === 'none' ? 'block' : 'none';
      });

      // Asteroid delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '🪐';
      deleteBtn.title = 'Delete flashcard';
      deleteBtn.style = `
        background:none;
        border:none;
        color:#c83232;
        font-size:1.2rem;
        cursor:pointer;
        padding:4px;
        align-self:flex-start;
      `;
      deleteBtn.addEventListener('click', () => {
        cards.splice(i,1);
        localStorage.setItem('flashcards', JSON.stringify(cards));
        renderCards();
      });

      // Append to wrapper
      cardWrapper.appendChild(card);
      cardWrapper.appendChild(deleteBtn);
      flashcardList.appendChild(cardWrapper);
    });

    // Enable drag-and-drop reordering
    if (window.flashcardSorter) window.flashcardSorter.destroy();
    window.flashcardSorter = Sortable.create(flashcardList, {
      animation:200,
      ghostClass:'flashcard-ghost',
      chosenClass:'flashcard-chosen',
      forceFallback:true,
      onEnd:(evt) => {
        const [moved] = cards.splice(evt.oldIndex,1);
        cards.splice(evt.newIndex,0,moved);
        localStorage.setItem('flashcards', JSON.stringify(cards));
        renderCards();
      }
    });
  }

  // Add card handler
  addCardBtn.addEventListener('click', () => {
    let term = termInput.value.trim();
    const def = defInput.value.trim();
    if (!term || !def) {
      alert('Please enter both term and definition.');
      return;
    }
    // Title-case term
    term = term.split(' ')
               .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
               .join(' ');
    cards.push({ term, definition: def });
    localStorage.setItem('flashcards', JSON.stringify(cards));
    termInput.value = '';
    defInput.value = '';
    renderCards();
  });

  // Initial render
  renderCards();
};
// CSS for shooting star (automatically injected)
const shootingStarCSS = `
.shooting-star {
  position: fixed;
  width: 2px;
  height: 60px;
  background: linear-gradient(45deg, #fff 30%, transparent 100%);
  opacity: 1;
  pointer-events: none;
  z-index: 1000;
  border-radius: 50%;
  filter: drop-shadow(0 0 6px #fff);
  transition: transform 3s ease-out, opacity 3s ease-out;
}
`;

// Inject CSS if not already present
if (!document.querySelector('#shooting-star-styles')) {
  const style = document.createElement('style');
  style.id = 'shooting-star-styles';
  style.textContent = shootingStarCSS;
  document.head.appendChild(style);
}

function createShootingStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  
  // Random start position - never at Y=0 (top edge)
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * (window.innerHeight - 100) + 50; // 50px from top minimum
  
  star.style.left = startX + 'px';
  star.style.top = startY + 'px';
  
  document.body.appendChild(star);
  
  // Random movement direction in X-Y plane
  const moveX = (Math.random() - 0.5) * 600; // -300 to +300px horizontally
  const moveY = (Math.random() - 0.5) * 400; // -200 to +200px vertically
  
  // Animate the shooting star
  requestAnimationFrame(() => {
    star.style.transform = `translate(${moveX}px, ${moveY}px)`;
    star.style.opacity = '0';
  });
  
  // Remove after animation completes
  setTimeout(() => {
    if (star.parentNode) {
      star.remove();
    }
  }, 3100);
}

function startShootingStarLoop() {
  const randomInterval = Math.random() * 10000 + 5000; // 5-15 seconds
  
  setTimeout(() => {
    createShootingStar();
    startShootingStarLoop(); // Continue the loop
  }, randomInterval);
}

// Start the shooting star system
startShootingStarLoop();

