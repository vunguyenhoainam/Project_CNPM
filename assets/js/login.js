if (localStorage.getItem("dataAccount") !== null) {
  window.location.href = "listProducts.html";
}

var account = document.querySelector(".account");
var password = document.querySelector(".password");

function run() {
  var check = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (check.test(account.value)) {
    if (account.value !== "" || password.value !== "") {
      if (account.value === "admin@gmail.com" && password.value === "123456") {
        localStorage.setItem(
          "dataAccount",
          JSON.stringify({ account: account.value, password: password.value })
        );
        window.location.href = "listProducts.html";
      } else {
        alert(
          "Thông tin tài khoản hoặc mật khẩu không chính xác \nVui lòng nhập lại ❤"
        );
      }
    } else {
      alert("Tài khoản hoặc mật khẩu không được để trống.");
    }
  } else {
    alert("Tài khoản hoặc mật khẩu không hợp lệ  \n Vui lòng nhập lại ❤");
  }
  account.value = "";
  password.value = "";
}

document.querySelector(".btn-login").onclick = function (e) {
  e.preventDefault();
  run();
};

document.onkeydown = function (e) {
  if (e.which === 13) {
    run();
  }
};
