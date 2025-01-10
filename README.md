# BubbleLink

BubbleLink is a real-time chat application built using **React Native** and **Firebase**. The app features seamless real-time messaging with Firebase Realtime Database and Firestore, user authentication, and a modern, customizable UI. It also includes persistent user sessions using `browserLocalPersistence`.

---

## Features

- **Real-Time Messaging**: Messages are updated instantly using Firebase Realtime Database and Firestore.
- **User Authentication**: Users can log in, stay logged in (persistent sessions), and log out using Firebase Authentication.
- **Customizable UI**: Built with `react-native-gifted-chat` for a modern and user-friendly experience.
- **Message Storage**: Messages are saved in Firebase for persistence and easy retrieval.
- **Header Customization**: Includes customizable headers with options like logout functionality.
- **Cross-Platform**: Works seamlessly on both Android and iOS devices.
- **Persistent User Sessions**: User sessions are maintained with `browserLocalPersistence`.

---

## Tech Stack

- **React Native**: Front-end framework for building mobile apps.
- **Firebase**:
  - **Realtime Database**: For instant data synchronization.
  - **Firestore**: For storing messages and user information.
  - **Authentication**: For secure user login and logout.
- **Expo**: For streamlined React Native development.
- **react-native-gifted-chat**: For building chat UI components.
- **Firebase Modular SDK**: To leverage Firebase’s latest SDK features.

---

## Prerequisites

Before running this project, ensure you have the following installed:

1. [Node.js](https://nodejs.org/en/)
2. [Expo CLI](https://expo.dev/)
3. Firebase account and project setup.

---

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dasgajraj/bubblelink-firebase-realtime-chat.git
   cd bubblelink-firebase-realtime-chat
   ```

  Install Dependencies:
2. **Install Dependencies**
  ```bash
  npm install
```

3. **Set Up Firebase:**

- Create a new project in Firebase Console.
- Enable Firebase Authentication, Firestore, and Realtime Database.
- Replace the Firebase configuration in firebaseConfig.js with your project settings

```bash
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
export const database = getFirestore(app);
export const realtimeDb = getDatabase(app);
```

4. **Start the Application**:

  ```bash
  npm start
```

---

## Usage

1. **Run the App:**
- Use the Expo Go app to scan the QR code displayed in the terminal.
- Alternatively, use an emulator/simulator to run the app.
2. **Log In:**
- Log in using Firebase Authentication with an email and password.
3. **Chat:**
- Send and receive real-time messages instantly.
4. **Log Out:**
- Tap the logout button in the header to securely log out.

---
## Project Structure

```bash
BubbleLink/
├── components/
│   ├── Chat.js           # Main chat screen
│   ├── Login.js          # Login screen
│   ├── LoadingScreen.js  # Loading state screen
├── firebaseConfig.js      # Firebase configuration
├── navigation/
│   ├── StackNavigation.js # App navigation setup
├── App.js                 # Entry point of the app
├── package.json           # Project metadata and dependencies
```

---

## Fork the repository.
1. Create a new branch:
```bash
git checkout -b feature-name
```
2. Make your changes and commit:
```bash
git commit -m "Add your message here"
```
3. Push to your branch:
```bash
git push origin feature-name
```
4. Submit a pull request.
---
## ScreenShots
![image](https://github.com/user-attachments/assets/5860cd46-5c2d-4c1d-b6c7-3f37c3f116f6)
![image](https://github.com/user-attachments/assets/0f128172-4d5c-45c9-89d1-2b556c09df6c)
![image](https://github.com/user-attachments/assets/13a782aa-0853-451c-a370-71ff19ca4b7b)



---
### Author

### DAS GAJRAJ SHARMA
Explore more projects on [GitHub](https://github.com/dasgajraj/)

---






