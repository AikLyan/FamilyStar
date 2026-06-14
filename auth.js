window.login = function () {

  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();

  if (!u || !p) {
    alert("Fill all fields");
    return;
  }

  if (u === "admin" && p === "1234") {
    localStorage.setItem("username", u);
    localStorage.setItem("role", "admin");
    window.location.href = "admin.html";
    return;
  }

  if (u === "user" && p === "1234") {
    localStorage.setItem("username", u);
    localStorage.setItem("role", "user");
    window.location.href = "home.html";
    return;
  }

  alert("Wrong login");
};
