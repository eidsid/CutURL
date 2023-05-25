// function reload() {
//   setTimeout(function () {
//     window.location.reload(true);
//   }, 2000);
// }

document.querySelectorAll("#close").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.target.parentElement.remove();
  });
});

let labels = [];
let linksClicks = [];
let cards = document.querySelectorAll(
  ".cards-info .card .card-footer .clicks span"
);
let counter = 0;
cards.forEach((card) => {
  counter = counter + 1;
  linksClicks.push(+card.textContent);
  labels.push("link: " + counter);
});
linksClicks.push(10);

const data = {
  labels: labels,
  datasets: [
    {
      label: " total clicks",
      backgroundColor: "green",
      borderColor: "rgb(255, 99, 132)",
      data: linksClicks,
      maxBarThickness: 10,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {},
};

const likesChar = document.getElementById("Newlinks").getContext("2d");
let chart = new Chart(likesChar, config);
