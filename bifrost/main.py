import requests
import base64

url = "http://localhost:8080/v1/chat/completions"

payload = {
    "model": "gemini/gemini-2.5-flash",
    "messages": [
        {
            "role": "user",
            "content": "What is the capital of France?"
        }
    ]
}

username = "paarth"
password = "226044"

# Base64 Basic Auth
basic_token = base64.b64encode(f"{username}:{password}".encode()).decode()

# Your virtual key
vk_token = "sk-bf-f182e5f7-959a-4fb4-babe-566db0578be9"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    # Basic for auth layer
    "Authorization": f"Basic {basic_token}",
    # Virtual key for governance / inference
    "x-bf-vk": vk_token
}

response = requests.post(url, json=payload, headers=headers)

print(response.status_code)
print(response.json())