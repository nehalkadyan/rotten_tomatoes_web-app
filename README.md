Rotten Tomatoes Clone
Welcome to my Rotten Tomatoes Clone project! This full-stack application replicates the popular movie and TV show review platform, allowing users to explore, filter, and add movies and shows to their watchlist.

Live Link :- https://rotten-tomatoes-clone.web.app/

Features
Browse Movies and Shows: View a curated collection of movies and shows with detailed descriptions and ratings.

Filtering and Sorting: Filter movies and shows by genre and sort them based on popularity, release date, and more.

Search Functionality: Search for specific movies or shows using a convenient search bar.

User Authentication: Secure user authentication using Firebase. Users can sign up with email/password or seamlessly log in with Google.

Watchlist Management: Users can add movies and shows to their watchlist. Watchlist items are stored in Firebase Firestore for easy access and management.

Technologies Used
Frontend: Built with React.js and styled using Tailwind CSS for a responsive and visually appealing user interface.

Modular Structure: Leveraged React's component-based architecture for modular and reusable code, enhancing maintainability and scalability.

Single Page Application: Utilized React's virtual DOM for fast rendering and smooth navigation, providing a seamless user experience.

Firebase: Integrated Firebase for secure user authentication and real-time data storage (Firestore) for watchlist management.

Additional Tools: JavaScript, HTML, CSS, and React Icons for enhanced UI elements.

How React and Firebase Helped
React.js: Structured the frontend codebase with reusable components, promoting efficiency and code organization. React's virtual DOM ensured fast updates and minimal page reloads, maintaining a responsive and dynamic user interface.

Firebase Authentication: Ensured secure signup/sign-in processes, enhancing user trust and data security. Firebase Firestore enabled efficient data storage and retrieval for user-specific watchlists.

Installation and Usage
To run the project locally:

Clone this repository.

Install dependencies using npm install.

Replace the placeholder Firebase API key in firebase.js with your own Firebase API key. Ensure your Firebase project has Authentication and Firestore Database enabled.

javascript
Copy code
// firebase.js

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
Make necessary configurations in your Firebase project:

Enable Authentication (Email/Password and Google Sign-In).
Set up Firestore Database for storing watchlist items (movieList and showList collections).
Start the development server using npm start.
