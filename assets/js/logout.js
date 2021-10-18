document.querySelector(".btn-logout").onclick = function (e) {
  e.preventDefault();
  localStorage.removeItem("dataAccount");
  window.location.href = "index.html";
};
