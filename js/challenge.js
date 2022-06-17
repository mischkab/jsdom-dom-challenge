// DOM Elements
const timerCount = document.getElementById("counter");
const likesUnorderedList = document.querySelector("ul.likes");
const commentForm = document.getElementById("comment-form");
const comment = document.getElementById("comment-input");
const commentList = document.getElementById("list");

// Application State (single source of truth)
let currentNumber = 0;
let counterRunning = true;
let likedNumbers = {};

// Events
document.addEventListener("click", event => {
  if (event.target.id === "plus") {
    changeCounter(1);
  } else if (event.target.id === "minus") {
    changeCounter(-1);
  } else if (event.target.id === "pause") {
    togglePaused();
  } else if (event.target.id === "heart") {
    updateLikes();
  }
});

commentForm.addEventListener("submit", event => {
  event.preventDefault();
  const p = document.createElement("p");
  p.innerText = comment.value;
  commentList.appendChild(p);
  event.target.reset();
})

function togglePaused () {
  counterRunning = !counterRunning;
  document.querySelectorAll("button").forEach(button => {
    if (button.id !== "pause") {
      button.disabled = !counterRunning;
    } else {
      if (counterRunning) {
        button.innerText = "pause";
      } else {
        button.innerText = "resume";
      }
    }
  })
};

function updateLikes () {
  if (likedNumbers[currentNumber]) {
    const li = document.querySelector(`[data-number="${currentNumber}"]`);
    likedNumbers[currentNumber] += 1;
    li.innerText = `The number ${currentNumber} has been liked ${likedNumbers[currentNumber]} times`;
  } else {
    likedNumbers[currentNumber] = 1
    const li = document.createElement("li");
    li.dataset.number = currentNumber;
    li.innerText = `The number ${currentNumber} has been liked 1 time`;
    likesUnorderedList.appendChild(li);
  }
};

function changeCounter(amount) {
  currentNumber = currentNumber + amount
  timerCount.innerText = currentNumber;
};

// use setInterval() to run the code every second
// change the number in the timer
setInterval(() => {
  if (counterRunning) {
    changeCounter(1);
  }
}, 1000);


