let days=["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let daysRect = document.querySelectorAll(".day-week>.graphic");
// console.log(daysRect)

let date = new Date();
let dayNum = date.getDay();
let currentDay = days[dayNum];

let currentDayRect = document.querySelector(`.${currentDay}>.graphic`);

// console.log(currentDayRect);

currentDayRect.style.backgroundColor = "hsl(186, 34%, 60%)";


let amounts = [];

async function getDate(){
  let response = await fetch("/data.json");
  let data = await response.json();
  for (let i=0; i< data.lenght;i++){
    amounts[i] = data[i].amounts;
  }
  daysRect.forEach((day, i)=>{
    dayNum.style.height= `${amounts[i]*2.5}px`;
  })
}
