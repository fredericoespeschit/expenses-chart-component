let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let daysRect = document.querySelectorAll(".week-spending>div>div.graphic");
console.log(daysRect)

let date = new Date();
let dayNum = date.getDay();
let currentDay = days[dayNum];

let currentDayRect = document.querySelector(`.${currentDay}>div.graphic`);

currentDayRect.style.backgroundColor = "hsl(186, 34%, 60%)";


let amounts = [];

async function getDate() {
  let response = await fetch("/data.json");
  let data = await response.json();
  // console.log(data);
  for (let i = 0; i < data.lenght; i++) {
    amounts[i] = data[i].amounts;
  }
  daysRect.forEach((day, i) => {
    dayNum.style.height = `${amounts[i] * 2.5}px`;
  })
}
getDate();

daysRect.forEach(rect => {
  rect.addEventListener("mouseenter", (e) => {
    // Cria um novo elemento <div>
    let amountDiv = document.createElement('div');
    
    // Obtém o elemento pai do evento atual
    let curDayHov = e.target.parentNode;

    // Obtém a classe do elemento pai
    let curDayHovClass = curDayHov.className.add();
    console.log(curDayHovClass)
    
    // Define a função getAmount()
    function getAmount() {
      // Percorre o array "days"
      for (let index in days) {
        // Verifica se a classe atual é igual ao valor em "days"
        if (days[index] == curDayHovClass) {
          // Verifica se é o dia "sun" e retorna o valor correspondente em "amounts"
          if (days[index] == "sun") return amounts[6];
          // Retorna o valor correspondente em "amounts" para o dia atual
          return amounts[index - 1];
        }
      }
    }

    // Adiciona a classe 'show' ao elemento "amountDiv"
    amountDiv.classList.add('show');

    // Define o conteúdo de texto do elemento "amountDiv" com o valor retornado por getAmount()
    amountDiv.textContent = `$${getAmount()}`;

    // Insere "amountDiv" como o primeiro filho de "curDayHov"
    curDayHov.insertBefore(amountDiv, curDayHov.firstChild);

    // Define o estilo de "bottom" de "amountDiv" com base na altura do elemento alvo do evento mais 40 pixels
    amountDiv.style.bottom = `${e.target.clientHeight + 40}px`;
  });
});


daysRect.forEach(rect => {
  rect.addEventListener("mouseleave", (e) => {
    let curDayHov = e.target.parentNode;
    e.target.style.backgroundColor = "hsl(10, 79%, 65%)";
    currentDayRect.style.backgroundColor = "hsl(186, 34%, 60%)";
    curDayHov.removeChild(curDayHov.firstElementChild);
  })
})

