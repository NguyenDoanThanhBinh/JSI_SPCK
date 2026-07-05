// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqssuIL5LNx4fdyTN9lqrMKGZtWLtIA0w",
  authDomain: "jsi---coffee-management.firebaseapp.com",
  projectId: "jsi---coffee-management",
  storageBucket: "jsi---coffee-management.firebasestorage.app",
  messagingSenderId: "847412160055",
  appId: "1:847412160055:web:e6e9294228c5eb358101b2",
  measurementId: "G-N60JMDLHTS"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Export các biến chính để dùng ở các file khác
const auth = firebase.auth();
const db = firebase.firestore();

console.log("✅ MindX Coffee - Firebase đã kết nối thành công!");
console.log("Project ID:", firebaseConfig.projectId);