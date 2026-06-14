window.login = function () {

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  if (username === "admin" && password === "1234") {

    localStorage.setItem("username", username);

    alert("Login success");

    window.location.href = "home.html";

  } else {
    alert("Wrong username or password");
  }
};
