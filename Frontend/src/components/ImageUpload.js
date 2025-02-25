import React, { useState } from "react";
import axios from "axios";
import "./ImageUpload.css";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Пожалуйста, выберите изображение.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/get_breed_by_img", formData);

      if (response.data.prediction) {
        setPrediction(response.data.prediction);
      } else {
        setPrediction("Не удалось получить результат.");
      }
    } catch (error) {
      console.error("Ошибка при отправке изображения:", error);
      setPrediction("Не удалось получить результат.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload-container">

      {/* Зона для перетаскивания изображения */}
      <div
        className="drag-drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <img src={preview} alt="Предпросмотр" />
        ) : (
          <p>Перетащите изображение сюда</p>
        )}
      </div>

      {/* Поле для стандартной загрузки изображения */}
      <input type="file" accept="image/*" onChange={handleFileInput} />

      {/* Кнопка отправки */}
      <button className="submit-button" onClick={handleSubmit}>
        Отправить
      </button>

      {/* Индикатор загрузки */}
      {loading && <p>Обрабатываем изображение...</p>}

      {/* Отображение результата */}
      {prediction && (
        <div className="result-container">
          <p className="result-text">Результат:</p>
          <p className="result-prediction">{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
