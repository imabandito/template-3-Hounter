const forwardBtn = document.querySelector(".featured__forward");
const backwardBtn = document.querySelector(".featured__backward");
const housesWrapper = document.querySelector(".featured__houses");
const houseTypeBtn = document.querySelector(".featured__house__types");
const houseTypeBtns = document.querySelectorAll(".featured__house__type");
const controlBtns = document.querySelectorAll(".featured__controls button");
const houseBtn = document.querySelector(".house__btn");
const villaBtn = document.querySelector(".house__villa__btn");
const apartmentBtn = document.querySelector(".house__apartment__btn");
const allBtn = document.querySelector(".house__all__btn");

const housesSlider = document.querySelector(".featured__slider");
const reviewsSlider = document.querySelector(".reviews__slider");
const reviewsSlides = document.querySelector(".slides");
const reviewsAnchors = document.querySelectorAll(".reviews__anchors a");

const houses = [
  {
    title: "Roselands House",
    price: "$ 35.000.000",
    category: "house_popular",
    img: "./images/featured/house1.png",
    type: "house",

    customer: {
      name: "Dianne Russell",
      location: "Manchester, Kentucky",
      img: "./images/featured/person1.png",
    },
  },
  {
    title: "Woodlandside",
    price: "$ 20.000.000",
    category: "house_new",
    img: "./images/featured/house2.png",
    type: "house",

    customer: {
      name: "Robert Fox",
      location: "Dr. San Jose, South Dakota",
      img: "./images/featured/person2.png",
    },
  },
  {
    title: "The Old Lighthouse",
    price: "$ 44.000.000",
    category: "house_popular",
    img: "./images/featured/house3.png",
    type: "apartment",

    customer: {
      name: "Ronald Richards",
      location: "Santa Ana, Illinois",
      img: "./images/featured/person3.png",
    },
  },
  {
    title: "Cosmo's House",
    price: "$ 22.000.000",
    category: "",
    img: "./images/featured/house4.png",
    type: "villa",

    customer: {
      name: "Jenny Wilson",
      location: "Preston Rd. Inglewood, Maine 98380",
      img: "./images/featured/person4.png",
    },
  },
];

window.addEventListener("load", (e) => {
  renderHouses(houses);
});

function deleteChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderHouses(housesData) {
  deleteChildren(housesWrapper);

  const houseNodes = createHouses(housesData);
  houseNodes.forEach((node) => {
    housesWrapper.appendChild(node);
  });

  if (housesData.length > 3) {
    controlBtns.forEach((btn) => (btn.disabled = false));
    let firstnodeCopy = housesWrapper.firstChild.cloneNode(true);
    housesWrapper.appendChild(firstnodeCopy);
    housesWrapper.scrollBy({
      top: 0,
      left: 50,
      behavior: "smooth",
    });
  } else {
    controlBtns.forEach((btn) => {
      btn.disabled = true;
    });
  }
}

function createHouses(housesData) {
  const housesNodes = [];

  housesData.forEach((house) => {
    const houseNode = document.createElement("div");

    houseNode.className = `house ${house.category}`;
    houseNode.innerHTML = `
    <div class="house__img__wrapper">
    <img
      src=${house.img}
      alt="house"
      class="house__img"
    />
  </div>
  <h3 class="house__title">${house.title}</h3>
  <h4 class="house__price">${house.price}</h4>
  <div class="house__customer customer">
    <img
      class="customer__img"
      src=${house.customer.img}
      alt="person"
    />
    <div class="customer__info">
      <h6 class="customer__name">${house.customer.name}</h6>
      <p class="customer__address">${house.customer.location}</p>
    </div>
  </div>
    `;
    housesNodes.push(houseNode);
  });

  return housesNodes;
}

let currentSlide;
let activeItem = 0;
let transformPos = 740;

backwardBtn.addEventListener("click", (e) => {
  e.preventDefault();
  housesWrapper.removeChild(housesWrapper.firstChild);
  const nodeCopy = housesWrapper.firstChild.cloneNode(true);
  housesWrapper.appendChild(nodeCopy);

  housesWrapper.scrollBy({
    top: 0,
    left: 50,
    behavior: "smooth",
  });
});

forwardBtn.addEventListener("click", (e) => {
  e.preventDefault();
  housesWrapper.removeChild(housesWrapper.lastChild);
  const nodeCopy = housesWrapper.lastChild.cloneNode(true);
  housesWrapper.prepend(nodeCopy);

  housesWrapper.scrollBy({
    top: 0,
    left: -50,
    behavior: "smooth",
  });
});

houseTypeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    houseTypeBtns.forEach((typeBtn) => typeBtn.classList.remove("featured_active"));
    btn.classList.add("featured_active");
    prevBtn = btn;
    let sortedHouses = houses;
    if (btn !== allBtn) {
      sortedHouses = houses.filter((house) => house.type.toLowerCase() === btn.innerText.toLowerCase().trim());
    }
    renderHouses(sortedHouses);
  });
});

let position = 0;
let intervalPause = false;
let slideNumber = 0;
let scrollPixels = 750;

reviewsSlides.addEventListener("mouseover", (e) => {
  intervalPause = true;
});

reviewsSlides.addEventListener("mouseout", (e) => {
  intervalPause = false;
});

reviewsAnchors[0].className = "anchor_active";
reviewsAnchors.forEach((anchor, i) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    position = i * scrollPixels;
    reviewsSlides.scrollTo(position, 0);
    reviewsAnchors.forEach((anchor) => (anchor.className = ""));
    reviewsAnchors[i].className = "anchor_active";
  });

  anchor.addEventListener("mouseover", (e) => {
    intervalPause = true;
  });

  anchor.addEventListener("mouseout", (e) => {
    intervalPause = false;
  });
});

const slidesInterval = setInterval(() => {
  if (window.screen.width <= 600) {
    scrollPixels = 280;
  } else {
    scrollPixels = 750;
  }

  if (!intervalPause) {
    position += scrollPixels;

    let sliderWidth = scrollPixels * 3;
    if (position >= sliderWidth) {
      reviewsSlides.scrollLeft -= sliderWidth;
      position = 0;
    } else {
      reviewsSlides.scrollLeft += scrollPixels;
    }
    reviewsAnchors.forEach((anchor) => (anchor.className = ""));
    reviewsAnchors[Math.round(position / scrollPixels)].className = "anchor_active";
  }
}, 2000);

//clearInterval(slidesInterval);
