import { db } from "./firebase.js";
import { doc, getDoc, addDoc, collection, updateDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const productId = localStorage.getItem("productId");
const user = localStorage.getItem("user");

if (!productId) location.href = "shop.html";

let product;

async function load() {

  const snap = await getDoc(doc(db, "products", productId));
  product = snap.data();

  document.getElementById("checkout").innerHTML = `
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    <button onclick="order()">Confirm</button>
  `;
}

window.order = async function () {

  const userRef = doc(db, "users", user);
  const snap = await getDoc(userRef);

  const balance = snap.data().balance || 0;

  if (balance < product.price) return alert("Not enough balance");

  await updateDoc(userRef, {
    balance: balance - product.price
  });

  await addDoc(collection(db, "orders"), {
    username: user,
    productName: product.name,
    price: product.price,
    status: "pending",
    createdAt: Date.now()
  });

  location.href = "myorders.html";
};

load();
