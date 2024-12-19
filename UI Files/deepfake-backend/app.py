from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import zipfile
import random
from PIL import Image
import cv2
from torchvision import transforms
import torch
from CnnModel import CnnModelWrapper
from ViTModel import ViTModelWrapper
from SwinModel import SwinModelWrapper


app = Flask(__name__)
CORS(app)  

@app.route('/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files or 'model' not in request.form:
        return jsonify({'error': 'Missing image or model'}), 400
    file = request.files['image']
    model_choice = request.form['model']
    image_path = f"uploads/{file.filename}"
    file.save(image_path)  # Save image temporarily for processing

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    if(model_choice == 'model1'):

        model_path = "C:/Users/Shushant PC/Desktop/models/best_model_cnn.pth"
        cnn_model = CnnModelWrapper(model_path, device)
        result = cnn_model.infer(image_path) 

    elif(model_choice == 'model2'):

        model_path = "C:/Users/Shushant PC/Desktop/models/partial_tuning_unfreezing_6_layersbest_vit_model_fancy_tr_2.pth"
        vit_model = ViTModelWrapper(model_path, device)
        result = vit_model.infer(image_path)

    else:

        model_path = "C:/Users/Shushant PC/Desktop/models/best_swin_model_recall.pth"
        swin_model = SwinModelWrapper(model_path, device)
        result = swin_model.infer(image_path)

    if(result):
        result = "Fake"
    else:
        result = "Real"    

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
