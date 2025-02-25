from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
from pathlib import Path

classes = ['bun', 'corgi']

model_path = Path(__file__).parent / "model/ZinovGulev.keras"
try:
    model = load_model(model_path)
    print("Model loaded successfully.")
except Exception as e:
    raise FileNotFoundError(f"Could not load model at {model_path}: {e}")

def predict_class(file):
    try:
        img = load_img(file, target_size=(256, 256))
        img_arr = img_to_array(img) / 255.0 
        arr = np.expand_dims(img_arr, axis=0) 
        
        prediction = model.predict(arr)
        print(prediction)
        decoded_label = classes[int(prediction>0.5)]
        return decoded_label
    except Exception as e:
        raise ValueError(f"Error processing file {file}: {e}")
    

if __name__ == "__main__":
    test_image = "test_image.jpg"
    try:
        result = predict_class(test_image)
        print(f"Predicted class: {result}")
    except Exception as e:
        print(f"Error: {e}")
