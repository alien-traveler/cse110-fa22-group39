function loadHome() {
  fetch("../common.html")
    .then((response) => response.text())
    .then((text) => (document.getElementById("home").innerHTML = text));
}
