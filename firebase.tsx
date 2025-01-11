import {initializeApp} from 'firebase/app';
import {
    initializeAuth,
    // @ts-ignore
    getReactNativePersistence
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ1y-FVD3HEn0dGB9J1fqeDxBNV7SIm0k",
  authDomain: "bookstore-59884.firebaseapp.com",
  projectId: "bookstore-59884",
  storageBucket: "bookstore-59884.appspot.com",
  messagingSenderId: "812240783935",
  appId: "1:812240783935:web:f34db648a39deee9f1c68a",
  measurementId: "G-MK25C4SG1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {auth};
