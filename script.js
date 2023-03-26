const slideContainer = document.querySelector(".slide-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentSlide = 0;
const slideWidth = 200;
const slideMargin = 20;

fetch("https://bobsburgers-api.herokuapp.com/characters/")
  .then(response => response.json())
  .then(characters => {
    slideContainer.style.width = (slideWidth + slideMargin) * characters.length + "px";
    characters.forEach(character => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" />`;
        const card1 = document.createElement("div");
          card1.classList.add("card1");
          card1.innerHTML = `
        <h2>${character.name}</h2><hr>
        <p><b>gender</b>: ${character.gender}</p>
        <p><b>occupation</b>: ${character.occupation}</p>
        <p><b>firstEpisode</b>: ${character.firstEpisode}</p>
        <p><b>Voice By</b>: ${character.voicedBy}</p>
      `;
      card.appendChild(card1);
      slideContainer.appendChild(card);
    });
  })
  .catch(error => console.log(error));

prevBtn.addEventListener("click", () => {
  currentSlide--;
  slideContainer.style.transform = `translateX(-${(slideWidth + slideMargin) * currentSlide}px)`;
  checkNavBtns();
});

nextBtn.addEventListener("click", () => {
  currentSlide++;
  slideContainer.style.transform = `translateX(-${(slideWidth + slideMargin) * currentSlide}px)`;
  checkNavBtns();
});

function checkNavBtns() {
  if (currentSlide === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (currentSlide === slideContainer.children.length - 1) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}
