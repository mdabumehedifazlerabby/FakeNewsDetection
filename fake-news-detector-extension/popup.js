document.getElementById('analyzeBtn').addEventListener('click', async () => {
    const newsText = document.getElementById('newsInput').value;
  
    if (!newsText) {
      alert('Please paste some text to analyze.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5700/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newsText }),
      });
  
      const data = await response.json();
      document.getElementById('result').innerText =
        `Verdict: ${data.verdict}\nFake Score: ${data.fakeScore}`;
    } catch (error) {
      document.getElementById('result').innerText = 'Error analyzing text.';
    }
  });
  