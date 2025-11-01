# 🔐 React Native Auth App

A modern **React Native + Expo** app with robust authentication using **Firebase Auth (REST API)** and **Google Sign-In**.  
Built for simplicity, security, and a smooth user experience.

---

## 📱 Screenshots

| Login Screen | Signup Screen |
|--------------|--------------|
| ![Login](./assets/screenshots/screenshot1.png) | ![Signup](./assets/screenshots/screenshot2.png) |

*(Save your screenshots in `assets/screenshots/` and update the file names as needed.)*

---

## 🔧 Tech Stack

- **React Native + Expo**
- **Firebase Authentication (REST API)**
- **Axios** (for API requests)
- **Google Sign-In**
- **React Context API** (for managing auth state)

---

## 🛠️ Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/react-native-auth-app.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a `.env` file** (or add your API key directly in `auth.js`):
   ```bash
   FIREBASE_API_KEY=your_firebase_api_key_here
   ```
4. **Start the project:**
   ```bash
   expo start
   ```
5. **Scan the QR code** with Expo Go to test on your device.

---

## 🧠 How It Works

### Signup/Login
- Uses Firebase’s Identity Toolkit REST API for creating and authenticating users.

### Google Sign-In
- Uses Google’s OAuth 2.0 flow via Expo’s Google Auth or Firebase integration.

### Auth State
- Managed using React Context API.
- Tokens are stored locally (e.g., AsyncStorage) for persistent sessions.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or a pull request to suggest changes.

---

## 📄 License

This project is [MIT](LICENSE) licensed.
