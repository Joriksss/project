import requests

image_path = r"C:\path\to\test_image.jpg"

with open(image_path, "rb") as img_file:
    response = requests.post("http://127.0.0.1:5000/get_breed_by_img", files={"image": img_file})

print(response.json())
