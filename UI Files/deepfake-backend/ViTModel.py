from transformers import AutoModelForImageClassification
import torch
from PIL import Image
from torchvision import transforms

# Define the ViT model wrapper
class ViTModelWrapper:
    def __init__(self, model_path, device):

        self.device = device

        # Load the pretrained model
        self.model = AutoModelForImageClassification.from_pretrained(
            "google/vit-base-patch16-224",
            num_labels=2,  # Binary classification
            ignore_mismatched_sizes=True
        )
        
        # Load the fine-tuned state dict
        state_dict = torch.load(model_path, map_location=device)
        self.model.load_state_dict(state_dict) 
        
        self.model.to(device)
        self.model.eval()  
        print("ViT Model loaded and ready for inference.")

    def preprocess_image(self, image_path):

        preprocess = transforms.Compose([
            transforms.Resize((224, 224)),  # Resize to model's input size
            transforms.ToTensor(),  # Convert image to tensor
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize for pretrained models
        ])
        image = Image.open(image_path).convert('RGB')  # Open the image and convert to RGB
        image = preprocess(image).unsqueeze(0)  # Add batch dimension
        return image

    def infer(self, image_path):

        # Preprocess the image
        image = self.preprocess_image(image_path).to(self.device)

        # Perform inference
        with torch.no_grad():
            outputs = self.model(image).logits 
            probabilities = torch.nn.functional.softmax(outputs, dim=1) 
            predicted_class = torch.argmax(probabilities, dim=1).item() 
            confidence = probabilities[0, predicted_class].item()
        return predicted_class

# Load the ViT model
# model_path = "C:/Users/Shushant PC/Desktop/deepfakeApp/deepfake-backend/partial_tuning_unfreezing_6_layersbest_vit_model_fancy_tr_2.pth"
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# print(f"Loading model on: {device}")

# vit_model = ViTModelWrapper(model_path, device)