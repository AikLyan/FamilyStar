import { db } from "./firebase.js";

import {
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const productId = localStorage.getItem("productId");
const user = localStorage.getItem("user");

let productData;

/* LOAD PRODUCT */
async function load() {

  const snap = await getDoc(doc(db, "product", productId));

  productData = snap.data();

  document.getElementById("checkout").innerHTML = `
    <h3>${productData.name}</h3>
    <p>${productData.price} MMK</p>
    <button onclick="order()">Confirm</button>
  `;

}

/* ORDER */
window.order = async function () {

  const userRef = doc(db, "users", user);
  const userSnap = await getDoc(userRef);

  const balance = userSnap.data().balance || 0;

  if (balance < productData.price) {
    alert("Not enough balance");
    return;
  }

  await updateDoc(userRef, {
    balance: balance - productData.price
  });

  await addDoc(collection(db, "orders"), {
    username: user,
    productId,
    productName: productData.name,
    price: productData.price,
    status: "pending",
    createdAt: Date.now()
  });

  alert("Order Success");
  location.href = "myorders.html";
};

load();
