from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load a pre-trained model for fake news detection
classifier = pipeline("text-classification", model="facebook/bart-large-mnli")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data['text']

    # Fake news detection logic
    result = classifier(text)
    label = result[0]['label']
    fake_score = result[0]['score']

    # Determine verdict
    if label == "CONTRADICTION" and fake_score > 0.8:
        verdict = "Likely Fake News"
    else:
        verdict = "Likely Credible"

    return jsonify({'fakeScore': fake_score, 'verdict': verdict})

if __name__ == "__main__":
    app.run(port=8000)
