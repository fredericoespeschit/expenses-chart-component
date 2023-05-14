let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let daysRect = document.querySelectorAll(".week-spending>div>div.graphic");
let date = new Date();
let dayNum = date.getDay();
let currentDay = days[dayNum];
let currentDayRect = document.querySelector(`.${currentDay}>div.graphic`);

currentDayRect.style.backgroundColor = "hsl(186, 34%, 60%)";

let amounts = [];

async function getDate() {
  let response = await fetch("/data.json");
  let data = await response.json();
  for (let i = 0; i < data.length; i++) {
    amounts[i] = data[i].amount;
  }
  daysRect.forEach((day, i) => {
    day.style.height = `${amounts[i] * 2.5}px`;
  });
}
getDate();

daysRect.forEach((rect) => {
  rect.addEventListener("mouseenter", (e) => {
    let amountDiv = document.createElement("div");
    let curDayHov = e.target.parentNode;
    let curDayHovClass = curDayHov.classList[0];

    function getAmount() {
      for (let index in days) {
        if (days[index] == curDayHovClass) {
          if (days[index] == "sun") return amounts[6];
          return amounts[index - 1];
        }
      }
      return 0;
    }

    amountDiv.classList.add("show");
    amountDiv.textContent = `$${getAmount()}`;

    if (curDayHov.className != currentDayRect.parentNode.className) {
      e.target.style.backgroundColor = "#EF97B1";
    }
    curDayHov.insertBefore(amountDiv, curDayHov.firstChild);
    amountDiv.style.bottom = `${e.currentTarget.clientHeight + 40}px`;
  });
});

daysRect.forEach((rect) => {
  rect.addEventListener("mouseleave", (e) => {
    let curDayHov = e.target.parentNode;
    e.target.style.backgroundColor = "hsl(10, 79%, 65%)";
    currentDayRect.style.backgroundColor = "hsl(186, 34%, 60%)";
    curDayHov.removeChild(curDayHov.firstElementChild);
  });
});
