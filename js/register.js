let register_form = document.querySelector("#register_form");
let BASE_URL = "https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api";
let inputname = document.querySelector("#inputname");
let phone_number = document.querySelector("#phone_number");
let password = document.querySelector("#password");
let confirm_password = document.querySelector("#confirm-password");

let fileinput = document.querySelector("#file");

register_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let namevalue = inputname.value;
  let phonevalue = phone_number.value;
  let passwordvalue = password.value;
  let confirmvalue = confirm_password.value;

  if (passwordvalue == confirmvalue && phonevalue.includes("+998")) {
    let file = fileinput.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let imgUrl = e.target.result;
      postUsers(imgUrl, namevalue, phonevalue, passwordvalue);
    };
    reader.readAsDataURL(file);
  }
});

function postUsers(imgUrl, name, phone, password) {
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      img: imgUrl,
      name: name,
      phone: phone,
      password: password,
      contact: [],
    }),
  })
    .then((data) => data.json())
    .then((data) => (window.location.href = "./login.html"));
}
