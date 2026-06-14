import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const user = localStorage.getItem("user");

if (!user) {
  window.location.href = "index.html";
}

const today = new Date().toLocaleDateString(
  "en-CA",
  {
    timeZone: "Asia/Yangon"
  }
);

let selectedSeat = "";

/* SELECT SEAT */

document.querySelectorAll(".seat").forEach(seat => {

  seat.onclick = () => {

    if (seat.classList.contains("booked")) {
      return;
    }

    document.querySelectorAll(".seat").forEach(s => {
      s.classList.remove("selected");
    });

    seat.classList.add("selected");

    selectedSeat = seat.innerText;

  };

});


/* LOAD BOOKED SEATS */

async function loadBookedSeats() {

  const time =
    document.getElementById("time").value;

  const snap = await getDocs(
    collection(
      db,
      "ticket",
      today,
      "orders"
    )
  );

  document.querySelectorAll(".seat").forEach(seat => {
    seat.classList.remove("booked");
  });

  snap.forEach(docSnap => {

    const data = docSnap.data();

    if (
      data.time === time &&
      (
        data.status === "pending_payment" ||
        data.status === "paid" ||
        data.status === "booked"
      )
    ) {

      document.querySelectorAll(".seat").forEach(seat => {

        if (seat.innerText == data.seat) {
          seat.classList.add("booked");
        }

      });

    }

  });

}


/* BOOK */

window.bookRide = async function () {

  const name =
    document.getElementById("name").value.trim();

  const phone =
    document.getElementById("phone").value.trim();

  const route =
    document.getElementById("route").value;

  const time =
    document.getElementById("time").value;

  if (!name) {
    alert("Enter passenger name");
    return;
  }

  if (!phone) {
    alert("Enter phone number");
    return;
  }

  if (!selectedSeat) {
    alert("Please select seat");
    return;
  }

  try {

    await addDoc(

      collection(
        db,
        "ticket",
        today,
        "orders"
      ),

      {
        username: user,
        name: name,
        phone: phone,
        route: route,
        time: time,
        seat: selectedSeat,
        price: 50000,
        status: "pending_payment",
        createdAt: Date.now()
      }

    );

    alert("Booking Success");

    window.location.href = "ticket.html";

  } catch (e) {

    console.error(e);

    alert(e.message);

  }

};


document
  .getElementById("time")
  .addEventListener(
    "change",
    loadBookedSeats
  );

loadBookedSeats();
