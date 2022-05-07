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
