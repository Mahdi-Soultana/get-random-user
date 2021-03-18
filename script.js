const URL = `https://randomuser.me/api/`;
const btns = document.querySelectorAll(".btns button");
const h2Html = document.querySelector("h1");
const rndBtn = document.querySelector(".rnd_User");
const img = document.querySelector(".img_holder img");
const starsHtml = document.querySelector(".stars");
let rndStartNum = 7;
async function FetchData(URL) {
  const data = await fetch(URL).then((data) => data.json());
  let {
    results: [
      {
        email,
        phone,
        picture: { large: img },
        name: { first, last },
        location: {
          city,
          country,
          state,
          street: { name, number },
        },
        login: { password },
        dob: { age },
      },
    ],
  } = data;

  let userData = [
    `<small>My Name Is :</small>${first} ${last}`,
    `<small>My Full Adress Is :</small> ${country} ,${city} ,${state} ,${name} ,${number}`,
    `<small>My Email Is:</small> ${email}`,
    `<small>My Password Is :</small> ${password}`,
    `<small>My Age Is :</small> ${age}`,
    `<small>My Phone Number : </small>${phone}`,
    img,
  ];
  displayUser(userData);
}

function displayUser(userData) {
  h2Html.innerHTML = userData[0];
  img.src = userData[userData.length - 1];

  btns.forEach((btn, i, btns) => {
    btn.addEventListener("click", (e) => {
      h2Html.innerHTML = userData[i];
      removeActive();
      e.currentTarget.classList.add("active");
    });
    btns[0].classList.add("active");
  });
}

FetchData(URL);
rndStart();
rndBtn.addEventListener("click", () => {
  FetchData(URL);
  rndStart();
  removeActive();
});

function rndStart() {
  let rndNum = Math.ceil(Math.random() * rndStartNum);
  let start = "";
  if (rndNum > 5) {
    start = `<i class="fas fa-star"></i>`;
  } else if (rndNum >= 3) {
    start = `<i class="fas fa-star-half-alt"></i>`;
  } else {
    start = `<i class="far fa-star"></i>`;
  }
  let re = start.repeat(rndNum);
  starsHtml.innerHTML = re;
}
function removeActive() {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
}
