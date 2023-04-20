//ипортируем классы и данные
import initialCards from "./initial-сards.js";
import Card from "./Card.js"

//определяем переменные для заполенения карточек
const cardSectionElement = document.querySelector('.elements');

// выполняем автозаполнение первых шести карточек мест
initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, "#card-template");
  const cardElement = card.createCard()
  cardSectionElement.append(cardElement)
})