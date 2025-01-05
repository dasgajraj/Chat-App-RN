# BubbleLink

BubbleLink is a real-time chat application built using **React Native** and **Firebase**. The app features a sleek and modern UI powered by `react-native-gifted-chat` and includes real-time messaging functionality with Firebase Firestore. The project also supports user authentication and logout via Firebase Authentication.

---

## Features

- **Real-Time Messaging**: Messages are updated instantly using Firestore listeners.
- **User Authentication**: Users can log in and log out using Firebase Authentication.
- **Customizable UI**: Built with `react-native-gifted-chat` for a seamless user experience.
- **Message Storage**: Messages are saved in Firebase Firestore for persistence.
- **Header Customization**: Includes a logout button in the navigation header.
- **Avatar Support**: Each user is assigned a placeholder avatar for identification.

---

## Tech Stack

- **React Native**: Front-end framework for building mobile apps.
- **Firebase**:
  - Firestore: For real-time database and message storage.
  - Authentication: For user login and logout functionality.
- **Expo**: For streamlined React Native development.
- **react-native-gifted-chat**: For chat UI components.

---

## Prerequisites

Before running this project, ensure you have the following installed:

1. [Node.js](https://nodejs.org/en/)
2. [Expo CLI](https://expo.dev/)
3. Firebase account and configuration.

---

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   
   git clone https://github.com/dasgajraj/bubblelink-firebase-realtime-chat.git
   cd bubblelink-firebase-realtime-chat
   ```


2. Install Dependencies:

```bash
npm install
```

3. Set Up Firebase:

-Create a new project in Firebase Console.
-Add a Firestore Database and enable Firebase Authentication.
-Replace the Firebase configuration in firebaseConfig.js with your project's settings:
javascript

```bash
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
```

4. Start the Project:
```bash
expo start
```
---
## Usage
1. Run the app on your device or emulator:

- Use the Expo Go app to scan the QR code displayed in the terminal.
- Alternatively, use an emulator/simulator to run the app.
2. Log In:

- Use Firebase Authentication to log in with an email and password.
3. Chat:

- Send and receive real-time messages.
- Your messages will appear instantly, thanks to Firestore.
4. Log Out:

3. Tap the logout button in the header to securely log out of the app.
---
## Project Structure
```bash
BubbleLink/
├── components/
│   ├── Chat.js          # Main chat screen
├── firebaseConfig.js     # Firebase configuration
├── App.js                # Entry point of the app
├── package.json          # Project metadata and dependencies
```
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
   
### Author

### DAS GAJRAJ SHARMA


