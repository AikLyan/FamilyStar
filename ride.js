import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const user = localStorage.getItem("user");
if (!user) location.href = "index.html";

const today = new Date().toISOString().split("T")[0];
let seat = "";

document.querySelectorAll(".seat").forEach(s => {
  s.onclick = () => {
    document.querySelectorAll(".seat").forEach(x => x.classList.remove("selected"));
    s.classList.add("selected");
    seat = s.innerText;
  };
});

window.bookRide = async function () {

  if (!seat) return alert("Select seat");

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  if (!name || !phone) return alert("Fill all fields");

  await addDoc(collection(db, "tickets", today, "orders"), {
    username: user,
    name,
    phone,
    seat,
    route: document.getElementById("route").value,
    time: document.getElementById("time").value,
    price: 50000,
    status: "pending_payment",
    createdAt: Date.now()
  });

  alert("Booked");
  location.href = "ticket.html";
};
