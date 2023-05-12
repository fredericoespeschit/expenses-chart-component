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
getDate();

daysRect.forEach(rect => {
  rect.addEventListener("mouseenter", (e)=>{
    let amountDiv = document.createElement('div');

    let curDayHov = e.target.parentNode;
    let curDayHovClass = curDayHov.className;

    function getAmount(){
      for (let index in days){
        if(days[index]==curDayHovClass){
          if(days[index]=="sun") return amounts[6];
          return amounts[index -1];
        }
      }
    }
    amountDiv.className.add('show');
    amountDiv.textContent=`$${getAmount()}`;

    curDayHov.insertBefore(amountDiv, curDayHov.firstChild);
    amountDiv.style.bottom = `${e.target.clientHeight+40}px`
  })
})

daysRect.forEach(rect=>{
  rect.addEventListener("mouseleave", (e)=>{
    let curDayHov=e.target.parentNode;
    e.target.style.backgroundColor="hsl(10, 79%, 65%)";
    currentDayRect.style.backgroundColor="hsl(186, 34%, 60%)";
    curDayHov.removeChild(curDayHov.firstElementChild);
  })
})

