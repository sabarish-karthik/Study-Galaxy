// server.js - REAL AI BACKEND USING GROQ (FREE)
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Get free API key from: https://console.groq.com/keys
const GROQ_API_KEY = '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'; // Replace with your key

app.use(cors());
app.use(express.json({ limit: '10mb' }));


app.get('/', (req, res) => {
  res.json({ message: 'AI Backend Server is running!' });
});

app.post('/ask-ai', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Call Groq AI API (free and fast)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful academic tutor. Provide clear, step-by-step explanations for student questions. Focus on teaching concepts, not just giving answers.'
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', errorText);
      return res.status(response.status).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const answer = data.choices[0].message.content;
    
    res.json({ answer });

  } catch (error) {
    console.error('Backend error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🤖 AI Backend server running at http://localhost:${PORT}`);
  console.log(`🚀 Using Groq AI - get your free key at https://console.groq.com/keys`);
});
