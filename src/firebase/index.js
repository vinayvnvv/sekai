// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  limit,
  and,
  where,
  orderBy,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCZxzO2ZbPqKkqe06hndSRQFfXe_MrX0_w",
//   authDomain: "sekai-69f4e.firebaseapp.com",
//   projectId: "sekai-69f4e",
//   storageBucket: "sekai-69f4e.appspot.com",
//   messagingSenderId: "747465835493",
//   appId: "1:747465835493:web:076d4b1d073b2d0abca50c",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBxOX5AjT0c8NTT1ynDzv9BxvfzySYpL5M",
  authDomain: "sekai-holidays-9eba8.firebaseapp.com",
  projectId: "sekai-holidays-9eba8",
  storageBucket: "sekai-holidays-9eba8.appspot.com",
  messagingSenderId: "32393979857",
  appId: "1:32393979857:web:16057b3abc4eae68ed22f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const invioceCollection = collection(db, "invoice");
const userCollection = collection(db, "users");

export const addInvoice = (invoice) => {
  return addDoc(invioceCollection, invoice);
};

export const updateInvoice = (id, data) => {
  const invioceDoc = doc(db, `invoice/${id}`);
  return updateDoc(invioceDoc, data);
};

export const deleteInvoice = (id) => {
  const invioceDoc = doc(db, `invoice/${id}`);
  return deleteDoc(invioceDoc);
};

export const getInvoice = (id) => {
  const invioceDoc = doc(db, `invoice/${id}`);
  return getDoc(invioceDoc);
};

export const getAllInvoice = (id) => {
  const queryD = query(
    invioceCollection,
    orderBy("created_at", "desc"),
    limit(400)
  );
  return getDocs(queryD);
};

export const getUser = (username, password) => {
  const q = query(
    userCollection,
    and(where("username", "==", username), where("password", "==", password))
  );
  return getDocs(q);
};
