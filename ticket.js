import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const user = localStorage.getItem("user");

if (!user) {
  window.location.href = "index.html";
}

const today = new Date().toLocaleDateString(
  "en-CA",
  { timeZone: "Asia/Yangon" }
);

/* LOAD TICKETS */

async function loadTickets() {

  try {

    const snap = await getDocs(
      collection(db, "ticket", today, "orders")
    );

    let html = "";

    snap.forEach(docSnap => {

      const t = docSnap.data();

      if (t.username === user) {

        html += `
          <div class="card">
            <div><b>Route:</b> ${t.route}</div>
            <div><b>Seat:</b> ${t.seat}</div>
            <div><b>Name:</b> ${t.name}</div>
            <div><b>Phone:</b> ${t.phone}</div>
            <div><b>Time:</b> ${t.time}</div>
            <div><b>Price:</b> ${t.price} MMK</div>
            <div><b>Status:</b> ${t.status}</div>
          </div>
        `;

      }

    });

    document.getElementById("tickets").innerHTML =
      html || "<p>No tickets found</p>";

  } catch (error) {

    console.error(error);

    document.getElementById("tickets").innerHTML =
      "<p>Error loading tickets</p>";

  }

}

loadTickets();
