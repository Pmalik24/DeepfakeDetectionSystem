import os
import torch
from PIL import Image
from transformers import AutoImageProcessor, AutoModelForImageClassification

class SwinModelWrapper:
    def __init__(self,model_path,device):

        self.device = device

        # Load the pretrained Swin model and image processor
        self.processor = AutoImageProcessor.from_pretrained("microsoft/swin-small-patch4-window7-224")
        self.model = AutoModelForImageClassification.from_pretrained("microsoft/swin-small-patch4-window7-224")

        # Move the model to the appropriate device
        self.model.to(device)
        print(f"Model loaded on device: {device}")

        # Load the state dict (for recall) 
        self.model.load_state_dict(torch.load(model_path, map_location=device))
        self.model.eval()  # Set the model to evaluation mode
        print(f"Model state loaded from: {model_path}")

    # Preprocessing function for inference
    def preprocess_image(self,image_path):
        """Preprocess the image for the Swin Transformer model."""
        image = Image.open(image_path).convert("RGB")  # Ensure the image is in RGB format
        inputs = self.processor(images=image, return_tensors="pt")  # Preprocess the image
        inputs = {key: value.to(self.device) for key, value in inputs.items()}  # Move tensors to device
        return inputs

    # Inference function
    def infer(self, image_path):
        """Perform inference using the Swin Transformer model."""
        inputs = self.preprocess_image(image_path)  # Preprocess the image
        with torch.no_grad():  # Disable gradient calculation for inference
            outputs = self.model(**inputs)  # Perform inference
            predicted_class = torch.argmax(outputs.logits, dim=1).item()  # Get the predicted class (0 or 1)
        return predicted_class

# model_path = "C:/Users/Shushant PC/Desktop/deepfakeApp/deepfake-backend/best_swin_model_recall.pth"
# device = torch.device("mps" if torch.backends.mps.is_available() else "cuda" if torch.cuda.is_available() else "cpu")

# swin_model = SwinModelWrapper(model_path, device)