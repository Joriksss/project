from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_class
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

upload = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(upload, exist_ok=True)

@app.route("/get_breed_by_img", methods=["POST"])
def predict_by_image():
    if "image" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(upload, filename)
    file.save(file_path)

    try:
        prediction = predict_class(file_path)
        return jsonify({"prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        os.remove(file_path)

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="127.0.0.1")
