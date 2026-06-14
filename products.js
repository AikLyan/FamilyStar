import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const container = document.getElementById("product");

const category = localStorage.getItem("shopCategory");

/* LOAD PRODUCTS */

async function loadProducts() {

  const snap = await getDocs(collection(db, "product"));

  let html = "";

  snap.forEach(doc => {

    const d = doc.data();

    if (d.category === category) {

      html += `
        <div style="
          background:white;
          margin:10px;
          padding:15px;
          border-radius:12px;
          box-shadow:0 2px 8px rgba(0,0,0,.08);
        ">
          <h3>${d.name}</h3>
          <p>${d.price} MMK</p>
          <button onclick="buy('${doc.id}')">Buy</button>
        </div>
      `;

    }

  });

  container.innerHTML = html || "<h3>No Products</h3>";

}

/* BUY */
window.buy = function(id){
  localStorage.setItem("productId", id);
  location.href = "checkout.html";
};

loadProducts();
