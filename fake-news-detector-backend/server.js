const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5700;

app.get('/',(req,res)=>{
    res.send('Hello from server');
})

// Endpoint to analyze news text
app.post('/analyze', async (req, res) => {
  const { text } = req.body;

  try {
    // Call the Python AI model
    const response = await axios.post('http://localhost:8000/predict', { text });

    res.json({
      fakeScore: response.data.fakeScore,
      verdict: response.data.verdict,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error analyzing text.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
