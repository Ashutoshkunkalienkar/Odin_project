// ============================================
// FIREBASE CONFIGURATION - SETUP INSTRUCTIONS
// ============================================

/*
To enable Google, Apple, and Microsoft social login, follow these steps:

1. Go to https://console.firebase.google.com/
2. Create a new Firebase project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google, Apple, and Microsoft providers
   - For each provider, you need to configure credentials:
     * Google: Get Client ID from Google Cloud Console
     * Apple: Get Service ID from Apple Developer Portal  
     * Microsoft: Get Client ID from Azure Portal

4. Copy your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click the web icon </>
   - Copy the firebaseConfig object

5. Replace the config below with your Firebase config:
*/

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};

// ============================================
// ALTERNATIVE: Using Firebase CLI
// ============================================

/*
If you want to deploy this website with Firebase Hosting:

1. Install Firebase CLI: npm install -g firebase-tools
2. Run: firebase init
3. Select Hosting, then select your project
4. Deploy: firebase deploy

Then update the firebaseConfig above with your actual project values.
*/

// ============================================
// DEMO MODE
// ============================================

/*
The social login buttons will work in DEMO mode if Firebase is not configured.
In demo mode, clicking the buttons will show an alert message.

To make them work for real:
1. Create a Firebase project
2. Enable authentication providers in Firebase Console
3. Update the firebaseConfig object above with your project details
4. Uncomment the config by replacing with your actual values
*/
