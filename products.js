import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const container = document.getElementById("product");
const category = localStorage.getItem("shopCategory");

async function load() {

  const snap = await getDocs(collection(db, "product"));

  let html = "";

  snap.forEach(doc => {

    const d = doc.data();

    if (d.category === category) {

      html += `
        <div class="card">
          <h3>${d.name}</h3>
          <p>${d.price} MMK</p>
          <button onclick="buy('${doc.id}')">Buy</button>
        </div>
      `;

    }

  });

  container.innerHTML = html || "No Products";
}

window.buy = function(id){
  localStorage.setItem("productId", id);
  location.href = "checkout.html";
};

load();
