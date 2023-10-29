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
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZxzO2ZbPqKkqe06hndSRQFfXe_MrX0_w",
  authDomain: "sekai-69f4e.firebaseapp.com",
  projectId: "sekai-69f4e",
  storageBucket: "sekai-69f4e.appspot.com",
  messagingSenderId: "747465835493",
  appId: "1:747465835493:web:076d4b1d073b2d0abca50c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const invioceCollection = collection(db, "invoice");

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
  const queryD = query(invioceCollection, limit(400));
  return getDocs(queryD);
};
