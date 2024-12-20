import os
import zipfile
import random
from PIL import Image
from torchvision import transforms
import torch

# Define the CNNModel class 
class CNNModel(torch.nn.Module):
    def __init__(self):
        super(CNNModel, self).__init__()

        self.conv1 = torch.nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, stride=1, padding=1)
        self.conv2 = torch.nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, stride=1, padding=1)
        self.conv3 = torch.nn.Conv2d(in_channels=64, out_channels=128, kernel_size=3, stride=1, padding=1)

        self.pool = torch.nn.MaxPool2d(kernel_size=2, stride=2, padding=0)

        # Adjusted the input size of fc1 to match the flattened size
        self.fc1 = torch.nn.Linear(128 * 28 * 28, 512)
        self.fc2 = torch.nn.Linear(512, 128)
        self.fc3 = torch.nn.Linear(128, 2)  # Binary classification: real vs fake

        self.dropout = torch.nn.Dropout(0.5)

    def forward(self, x):
        x = self.pool(torch.nn.functional.relu(self.conv1(x)))  # Conv Layer 1 with ReLU + Pooling
        x = self.pool(torch.nn.functional.relu(self.conv2(x)))  # Conv Layer 2 with ReLU + Pooling
        x = self.pool(torch.nn.functional.relu(self.conv3(x)))  # Conv Layer 3 with ReLU + Pooling

        x = x.view(-1, 128 * 28 * 28)  # Flatten the output for fully connected layers

        x = self.dropout(torch.nn.functional.relu(self.fc1(x)))  # FC Layer 1 with ReLU + Dropout
        x = self.dropout(torch.nn.functional.relu(self.fc2(x)))  # FC Layer 2 with ReLU + Dropout
        x = self.fc3(x)  # Final output layer

        return x
class CnnModelWrapper:
    def __init__(self, model_path, device):

        self.device = device

        # Initialize the model
        self.model = CNNModel()

        # Load the model state dict
        state_dict = torch.load(model_path, map_location=device)
        self.model.load_state_dict(state_dict)  # Load the parameters into the model
        self.model.to(device)  # Transfer the model to the device
        self.model.eval()  # Set the model to evaluation mode

        print("Model successfully loaded and ready for inference.")

    # Preprocessing function for input image
    def preprocess_image(self, image_path):
        """Preprocess the image for the model."""
        preprocess = transforms.Compose([
            transforms.Resize((224, 224)),  # Resize to the input size of the model 
            transforms.ToTensor(),  # Convert image to tensor
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize for pretrained models
        ])
        image = Image.open(image_path).convert('RGB')  # Open the image and convert to RGB
        image = preprocess(image).unsqueeze(0)  # Add batch dimension
        return image

    # Inference function
    def infer(self, image_path):
        """Perform inference on the provided image."""
        # Preprocess the image
        image = self.preprocess_image(image_path)
        
        # Move the image to the same device as the model
        image = image.to(self.device)
        
        # Perform inference
        with torch.no_grad():  
            output = self.model(image)
            
        # Process the output
        _, predicted = torch.max(output, 1)  
        return predicted.item()  # Return the predicted class label

#model path
# model_path = "C:/Users/Shushant PC/Desktop/deepfakeApp/deepfake-backend/best_model_cnn.pth"

# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# print(f"Loading model on: {device}")

# cnn_model = CnnModelWrapper(model_path, device)