import requests
import os

url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbMAU8qdhLKSuXq7Nx9msw64fCyVLke3Irww&usqp=CAU"
filename = "noUsr.jpg"  # You can change the extension as per the image type
directory = os.path.join(os.path.dirname(__file__), "images")  # Directory to save the image

try:
    # Create the directory if it doesn't exist
    if not os.path.exists(directory):
        os.makedirs(directory)

    # Send a GET request to the URL
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Open a new file in binary write mode and write the content of the response to it
        with open(os.path.join(directory, filename), "wb") as f:
            f.write(response.content)
        print(f"Image downloaded successfully as '{filename}' in the '{directory}' directory")
    else:
        print("Failed to download the image. Status code:", response.status_code)

except Exception as e:
    print("An error occurred:", e)
