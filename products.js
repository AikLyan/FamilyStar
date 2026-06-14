import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const container = document.getElementById("product");
const category = localStorage.getItem("shopCategory");

async function load() {

  const snap = await getDocs(collection(db, "products"));

  let html = "";

  snap.forEach(d => {

    const p = d.data();

    if (p.category === category) {
      html += `
        <div>
          <h3>${p.name}</h3>
          <p>${p.price}</p>
          <button onclick="buy('${d.id}')">Buy</button>
        </div>
      `;
    }

  });

  container.innerHTML = html || "No Products";
}

window.buy = function (id) {
  localStorage.setItem("productId", id);
  location.href = "checkout.html";
};

load();
