let local = JSON.parse(localStorage.getItem("access")) || [];
let form = document.getElementById("form");
let nameInput = document.querySelector("#name");
let password = document.querySelector("#password");
let BASE_URL = "https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api";

form.addEventListener("submit", (e) => {
  e.preventDefault();
    fetch(BASE_URL)
    .then((data) => data.json())
    .then((data) => checkfunc(data));
  function checkfunc(data) {
    data.filter((value) => {
      if (value.name == nameInput.value && value.password == password.value) {
        localStorage.setItem("access", JSON.stringify(value.name));
        localStorage.setItem("name", JSON.stringify(value.name));
        localStorage.setItem("userid", JSON.stringify(value.id));
        localStorage.setItem("user",JSON.stringify(value))
        window.location.href = "../index.html";
      }
    });
  }
});
