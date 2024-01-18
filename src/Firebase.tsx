// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAnZeFtePf7rpsTHVdl7uadVnQ0MQSMIy0',
	authDomain: 'todolist2-dfa46.firebaseapp.com',
	projectId: 'todolist2-dfa46',
	storageBucket: 'todolist2-dfa46.appspot.com',
	messagingSenderId: '255873830245',
	appId: '1:255873830245:web:ab4f22619ef4445a2de58c',
	measurementId: 'G-624E8LRQ21',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const db = getDatabase(app)
