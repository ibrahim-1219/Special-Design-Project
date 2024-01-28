// check if there is a main color in local storage
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  // remove active class from all elements
  document.querySelectorAll(".colors-list li").forEach((li) => {
    li.classList.remove("active");
    // add active class on element with data-color === main color
    if (li.dataset.color === mainColors) li.classList.add("active");
  });
}

// select landing Page element
let landingPage = document.querySelector(".landing-page");
//get array of images
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
let backgroundOptions = true;
let backgroundInterval;
// check if there is a random background in local storage
let backgroundLocalItem = localStorage.getItem("background-option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOptions = true;
  } else {
    backgroundOptions = false;
  }
  // remove active class from all spans111
  document
    .querySelectorAll(".option-box .random-background span")
    .forEach((span) => {
      span.classList.remove("active");
    });
  // add active class on element with background === true
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
    randomizeImgs();
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
} else {
  randomizeImgs();
}

// toglle class Open on main Settings Box
let settingsBoxElement = document.querySelector(".settings-box");
settingsBoxElement.addEventListener("click", function () {
  settingsBoxElement.classList.toggle("open");
  //toggle spin class on gear
  document
    .querySelector(".toggle-settings .fa-gear")
    .classList.toggle("fa-spin");
  // end
});

//switch app colors

const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    handleActive(e);
  });
});

//
//
//
//switch app background

const randonBackgroundElements = document.querySelectorAll(
  ".settings-box .random-background span"
);
randonBackgroundElements.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOptions = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOptions = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

//
//
//
function randomizeImgs() {
  if (backgroundOptions === true) {
    backgroundInterval = setInterval(function () {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // change background image url
      landingPage.style.backgroundImage =
        'url("images/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}

// select skills sector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  //skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  //window scroll top
  let windowScrollTop = this.scrollY;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popup with the elements
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create overlay element
    let overlay = document.createElement("div");

    //add class to overlay
    overlay.className = "popup-overlay";

    //append overlay to the body
    document.body.appendChild(overlay);

    //create popup Box
    let popupBox = document.createElement("div");

    //add class to the popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      //create Heading
      let imgHeading = document.createElement("h3");
      // create text  for heading
      let imgText = document.createTextNode(img.alt);

      // append the text for the heading
      imgHeading.appendChild(imgText);

      //append the heading to the popup box

      popupBox.appendChild(imgHeading);
    }

    //create the image
    let popupImage = document.createElement("img");

    //set Image source
    popupImage.src = img.src;

    //add image to the popup box
    popupBox.appendChild(popupImage);

    //append popup box to the body
    document.body.appendChild(popupBox);

    // craete the close box
    let closeButton = document.createElement("span");

    //craete the close butoon text
    let closeButtonText = document.createTextNode("X");

    //append text to close button
    closeButton.appendChild(closeButtonText);

    //add class to close button
    closeButton.className = "close-button";

    //append close button to popup box
    popupBox.appendChild(closeButton);
  });
});

// close popup

document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    // or  document.querySelector(".close-button").parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//select all links
const allLinks = document.querySelectorAll(".links a");

function scrollTo(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollTo(allLinks);
scrollTo(allBullets);

// handle active state

function handleActive(ev) {
  // remove active class from all elements
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // add active class to my element
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-options");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  }
  if (bulletLocalItem === "none") {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-options", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-options", "none");
    }
    handleActive(e);
  });
});

// Resetb Button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-options");
  window.location.reload();
};

// toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

// click anyWhere Outside ToggleMenu and Button

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    //check if menu is open
    if (toggleBtn.classList.contains("menu-active")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

// stop Propagation in menu
tLinks.onclick = function (even) {
  even.stopPropagation();
};
