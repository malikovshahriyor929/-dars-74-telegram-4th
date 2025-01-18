if (!localStorage.getItem("access")) {
  localStorage.clear();
  window.location.href = "./login.html";
}
let BASE_URL = "https://67828199c51d092c3dcfc05f.mockapi.io/telegram/message";
let contacts = document.querySelector(".contacts");
let messages = document.querySelector(".messages");
// login
let name = document.querySelector(".name");
let check = JSON.parse(localStorage.getItem("name"));
let userid = JSON.parse(localStorage.getItem("userid"));
let user = JSON.parse(localStorage.getItem("user")) || [];
let contact = JSON.parse(localStorage.getItem("contact"));
let clicked_id = JSON.parse(localStorage.getItem("clicked_id")) || 0;
let yourAvatar = document.querySelector(".yourAvatar");
let phoneNum = document.querySelector(".phoneNum");
let username = document.querySelector(".username");
let back = document.querySelector(".back");
let backpage = document.querySelector(".backpage");
//input things
let message_form = document.querySelector(".message_form");
let online = document.querySelector(".online");
let message_input = document.querySelector(".message_input");
let setting = document.querySelector(".setting");
let inputs_for_profile = document.querySelector(".inputs_for_profile");

// time
let date = new Date();
let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
let minute =
  date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
// log
let logout = document.querySelector(".logout");
// avatar
let avatar = document.querySelector("#avatar");
// right_side
let rigth_side = document.querySelector(".rigth_side");
rigth_side.style.display = "none";
let add = document.querySelector(".add");

// logout
logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "./login.html";
});

// chats
contacts.addEventListener("click", (e) => {
  localStorage.setItem("clicked_id", JSON.stringify(e.target.id));
  if (e.target.classList.contains("con") && clicked_id == e.target.id) {
    fetch("https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api")
      .then((data) => data.json())
      .then((data) =>
        data.forEach((value) => {
          if (value.id == clicked_id) {
            avatar.src = value.img;
            name.innerHTML = value.name;
          }
        })
      );
    rigth_side.style.display = "block";
  } else {
    window.location.reload();
  }
});

// contact delete
contacts.addEventListener("dblclick", (e) => {
  localStorage.setItem("clicked_id", JSON.stringify(e.target.id));
  if (e.target.classList.contains("con") && clicked_id == e.target.id) {
    fetch(`https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api`)
      .then((data) => data.json())
      .then((data) => {
        if (data.filter((value) => value.id === userid)) {
          let findData = data.find((value) => value.contact.id != clicked_id);
          let newdata = { ...user, contact: [ findData ] };
          console.log(findData);
          fetch(
            `https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api/${userid}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newdata),
            }
          )
            .then((data) => data.json())
            .then((data) => {
           
              localStorage.setItem("user", JSON.stringify(data));
            });
        }
      });

   

  } 
});

// typing
message_input.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (message_input.value.length > 4) {
    online.innerHTML = "typing...";
  } else {
    online.innerHTML = "online";
  }
});

//   message_form
message_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (message_input.value !== "" && message_input.value !== " ") {
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message_input.value,
        time: hour + ":" + minute,
        userid: JSON.parse(localStorage.getItem("userid")),
        name: JSON.parse(localStorage.getItem("name")),
        resive: JSON.parse(localStorage.getItem("clicked_id")),
      }),
    })
      .then((data) => data.json())
      .then((data) => checkfunc([data]));
  }
  message_input.value = "";
});
// get message
function fetchfunc() {
  fetch(BASE_URL)
    .then((data) => data.json())
    .then((data) => {
      checkfunc(data);
    });
}
// put messages
function checkfunc(data) {
  data.forEach((value) => {
    if (value.userid == userid && value.resive == clicked_id) {
      let text = document.createElement("div");
      text.classList.add("deleteclass");
      text.innerHTML = `
      <div  class="flex items-end  flex-col">
              <div
                class="bg-[#effedd] relative flex flex-col items-end w-fit p-[9px_15px_0_15px] pb-5 m-3 rounded-md rounded-br-none min-w-[70px] "
              >
                <p id=${value.id} class="text-[18px] message_for_green ">
               ${value?.message}
                </p>
                <p
                  class="text-[12px] text-[#62ac55] absolute bottom-1 right-1 flex gap-2 items-center"
                >
                  ${value?.time} <img src="./assets/svg/ticket.svg" alt="" />
                </p>
                <img
                  class="absolute bottom-0 h-4 right-[-8px]"
                  src="./assets/svg/mymess.svg"
                  alt=""
                />
              </div>
            </div>
    `;
      messages.append(text);
    } else if (value.userid == clicked_id && value.resive == userid) {
      let text = document.createElement("div");
      text.classList.add("deleteclass");
      text.innerHTML = `
      <div class="flex flex-col  items-start message_for_white">
              <div
                class="bg-white relative flex flex-col items-end w-fit p-[9px_15px_0_15px] pb-5 m-3 rounded-lg rounded-bl-none"
                >
                <p id=${value.id} class="text-[18px] message_for_green">
                  ${value?.message}
                </p>
                <p
                  class="text-[12px] text-[#a1aab3] absolute bottom-1 right-2 flex gap-2 items-center"
                >
                  ${value?.time}
                </p>
                <img
                  class="absolute bottom-0 h-4 left-[-5px]"
                  src="./assets/svg/yourmess.svg"
                  alt=""
                />
              </div>
            </div>
                  `;

      messages.append(text);
    }
  });
}

// get data for side bar or chats
function getFetchFunc() {
  fetch("https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api")
    .then((data) => data.json())
    .then((data) => {
      contactsfuncForMe(data);
      // contactsfuncForYour(data);
    });
}

// function for left bar chats
function contactsfuncForMe(data) {
  data.forEach((value) => {
    if (value.id == userid) {
      yourAvatar.src = value.img;
      phoneNum.innerHTML = value.phone;
      username.innerHTML = value.name;
    }
  });
}

// that three listener for profile changing
setting.addEventListener("click", (e) => {
  inputs_for_profile.style.display = "flex";
  usernameInput.value = username.innerHTML.trim();
  phoneNumInput.value = phoneNum.innerHTML.trim();
});
inputs_for_profile.addEventListener("submit", (e) => {
  e.preventDefault();
  let avatarInput = document.querySelector("#avatarInput");
  let usernameInput = document.querySelector("#usernameInput");
  let phoneNumInput = document.querySelector("#phoneNumInput");
  let passwordInput = document.querySelector("#passwordInput");
  let file = avatarInput.files[0];
  let reander = new FileReader();
  reander.onload = function (e) {
    let imgUrl = e.target.result;

    fetch(
      `https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api/${userid}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          img: imgUrl,
          name: usernameInput.value.trim(),
          phone: phoneNumInput.value.trim(),
          password: passwordInput.value.trim(),
        }),
      }
    )
      .then((data) => data.json())
      .then(
        (data) => contactsfunc([data]),
        alert("malumot muvoffaqqiyatli almashdi")
      );
  };
  reander.readAsDataURL(file);
});
back.addEventListener("click", () => {
  inputs_for_profile.style.display = "none";
});

//delete function delete from api
messages.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("message_for_green")) {
    if (confirm("siz shu messageni ochirmoq chimisiz")) {
      fetch(`${BASE_URL}/${e.target.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then(() => window.location.reload());
    }
  }
});


//add your contact
let contactes = document.querySelector(".contactes");

add.addEventListener("click", () => {
  contactes.style.display = "flex";
});
backpage.addEventListener("click", () => {
  contactes.style.display = "none";
});

//////////////// add member/////////////////
let AddContactForm = document.querySelector(".AddContactForm");
let AddContactInput = document.querySelector("#contactPhoneNum");
AddContactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api")
    .then((data) => data.json())
    .then((data) => {
      // contactsfuncForMe(data);
      // contactsfuncForYour(data, AddContactInput.value);
      {
        if (user.phone === AddContactInput.value) {
          return alert("siz ozizni qoshdingiz");
        }
        let findData = data.find(
          (value) => value.phone === AddContactInput.value
        );
        if (!findData) {
          return alert("bunday nomer yoq");
        }
        let newData = { ...user, contact: [...user.contact, findData] };
        fetch(
          `https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api/${userid}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
          }
        )
          .then((data) => data.json())
          .then((data) => {
            showContact(data.contact);
            localStorage.setItem("user", JSON.stringify(data));
            contactes.style.display = "none";
          });
      }
    });
});


////////contact add to ui or html
fetch(
  `https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api/${userid}`
)
  .then((data) => data.json())
  .then((data) => {
    showContact(data.contact);
  });
function showContact(data) {
//  if (data != []) {
  data.forEach((value) => {
    let contact = document.createElement("div");
    contact.classList.add("con");
    contact.innerHTML = `
              <div id=${value?.id} class="con select-none flex gap-3 p-3 border-b ">
          <img class=" h-14 w-14 rounded-full con " src="${value?.img}" alt="" />
            <div class="flex con flex-col justify-between">
              <p class="flex items-center con gap-3 font-medium  text-[#222]">${value?.name}
                <img class="con" src="./assets/svg/worth_thing_in_telegram.svg" alt="" />
              </p>
              <p  class="text-[15px] con text-[#8d8e90]">
              Sended message
              </p>
            </div>
        </div>
            `;
    contacts.append(contact);
  });
//  }
}

let search_parent = document.querySelector("#search_parent");
search_parent.addEventListener("keyup", (e) => {
  e.preventDefault();
  let searchInput = search_parent.search.value;

  fetch("https://67828199c51d092c3dcfc05f.mockapi.io/telegram/users_api")
    .then((data) => data.json())
    .then((data) => {
      // data.forEach((value) => {
      //   value.name.includes(searchInput);
      // });
      contacts.innerHTML = "";
      data.forEach((value) => {
        if (value.name.includes(searchInput)) {
          let contact = document.createElement("div");
          contact.classList.add("con");
          contact.innerHTML = `
            <div id=${value?.id} class="con select-none flex gap-3 p-3 border-b ">
        <img class=" h-14 w-14 rounded-full con " src="${value?.img}" alt="" />
          <div class="flex con flex-col justify-between">
            <p class="flex items-center con gap-3 font-medium  text-[#222]">${value?.name}
              <img class="con" src="./assets/svg/worth_thing_in_telegram.svg" alt="" />
            </p>
            <p  class="text-[15px] con text-[#8d8e90]">
            Sended message
            </p>
          </div>
      </div>
          `;
          contacts.append(contact);
        } else {
          window.location.reload();
        }
      });
    });
});

fetchfunc();
getFetchFunc();
