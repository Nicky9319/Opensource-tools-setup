# Bifrost API Client

A Python client for interacting with the Bifrost API with built-in authentication and load balancing support.

## Authentication

Bifrost requires two layers of authentication:

### 1. Basic Authentication (Auth Layer)
Username and password credentials are required and must be base64 encoded in the `Authorization` header.

```python
import base64

username = "your_username"
password = "your_password"

basic_token = base64.b64encode(f"{username}:{password}".encode()).decode()
headers = {
    "Authorization": f"Basic {basic_token}"
}
```

### 2. Virtual Key (Governance & Inference Layer)
A virtual key (VK) obtained from the Bifrost Dashboard must be passed in the `x-bf-vk` header. This key is essential for:
- Governance and API access control
- Inference request routing
- Load balancing

```python
headers = {
    "x-bf-vk": "sk-bf-your-virtual-key-here"
}
```

## Getting Credentials

To obtain your credentials:
1. Log in to the **Bifrost Dashboard/UI**
2. Navigate to the credentials or API settings section
3. Generate or retrieve:
   - Your **username** and **password** (for Basic Auth)
   - Your **virtual key** (VK token starting with `sk-bf-`)

## Auto Load Balancing

When API key credentials are properly configured in the Bifrost system, **Bifrost automatically load balances requests** across available infrastructure. This means:
- Multiple API keys can be managed simultaneously
- Requests are intelligently distributed based on current load and availability
- No additional configuration needed from the client side

## Example Usage

```python
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

username = "your_username"
password = "your_password"
basic_token = base64.b64encode(f"{username}:{password}".encode()).decode()

vk_token = "sk-bf-your-virtual-key-here"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": f"Basic {basic_token}",
    "x-bf-vk": vk_token
}

response = requests.post(url, json=payload, headers=headers)
print(response.status_code)
print(response.json())
```

## Configuration

Update `main.py` with your credentials from the Bifrost Dashboard:
- `username`: Your Bifrost username
- `password`: Your Bifrost password
- `vk_token`: Your virtual key (starts with `sk-bf-`)

## Headers Reference

| Header | Purpose | Required |
|--------|---------|----------|
| `Authorization` | Basic Auth (base64 encoded username:password) | Yes |
| `x-bf-vk` | Virtual Key for governance and inference | Yes |
| `Content-Type` | Request content type (application/json) | Yes |
| `Accept` | Response content type (application/json) | Yes |
