var productsApi = "https://614075955cb9280017a112f9.mockapi.io/products";
var exportApi = "https://614075955cb9280017a112f9.mockapi.io/export";

function start() {
  getProducts(function (data) {
    renderProducts(data);
  }, exportApi);
}
start();

// ========================= Handle Functions =========================

function getProducts(callback, api) {
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderDate() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return year + "-" + month + "-" + date;
}

//Add new

function postProducts() {
  getProducts(renderSelect, productsApi);

  document.querySelector("input[name='dateExport']").value = renderDate();
  document.querySelector(".popup-addProduct").classList.add("show-popup");
  document.querySelector(".effect-background").classList.add("show-effect");

  document.querySelector(".btn-add").onclick = function (e) {
    e.preventDefault();
    var dataPost = {
      nameProduct: document.querySelector("input[name='name']").value,
      categoryProduct: document.querySelector("input[name='category']").value,
      totalExport: Number.parseInt(
        document.querySelector("input[name='totalExport']").value
      ),
      dateExport: document.querySelector("input[name='dateExport']").value,
      priceProduct: Number.parseInt(
        document.querySelector("input[name='price']").value
      ),
      idProduct: document.querySelector("input[name='idExport']").value,
    };
    fetch(exportApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function () {
        start();
      });

    getProducts(function (data) {
      var presentTotal = data.find(function (item) {
        return (
          item.id === document.querySelector("input[name='idExport']").value
        );
      }).totalProduct;
      var updateTotalProduct = {
        totalProduct:
          presentTotal -
          Number.parseInt(
            document.querySelector("input[name='totalExport']").value
          ),
      };

      fetch(
        productsApi +
          "/" +
          document.querySelector("input[name='idExport']").value,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateTotalProduct),
        }
      );
    }, productsApi);

    document.querySelector(".popup-addProduct").classList.remove("show-popup");
    document
      .querySelector(".effect-background")
      .classList.remove("show-effect");
  };

  document.querySelector(".btn-cancel-add").onclick = function (e) {
    e.preventDefault();
    document.querySelector(".popup-addProduct").classList.remove("show-popup");
    document
      .querySelector(".effect-background")
      .classList.remove("show-effect");
  };
}

function renderInputAddProduct() {
  var idProduct = document.getElementById("selbox-manage").value;
  var nameItem = document.querySelector("input[name='name']");
  var category = document.querySelector("input[name='category']");
  var price = document.querySelector("input[name='price']");
  var totalExport = document.querySelector("input[name='totalExport']");
  var dateExport = document.querySelector("input[name='dateExport']");
  var idExport = document.querySelector("input[name='idExport']");

  getProducts(function (data) {
    var productAdd = data.filter(function (item) {
      return item.id === idProduct;
    });
    productAdd.map(function (item) {
      nameItem.value = item.nameProduct;
      category.value = item.categoryProduct;
      price.value = item.priceProduct;
      totalExport.value = "";
      dateExport.value = renderDate();
      idExport.value = item.id;
    });
  }, productsApi);
}

function deleteProducts(id) {
  document.querySelector(".popup-deleteProduct").classList.add("show-popup");
  document.querySelector(".effect-background").classList.add("show-effect");

  document.querySelector(".btn-confirm").onclick = function (e) {
    e.preventDefault();
    fetch(exportApi + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    var productItem = document.querySelector(".product-" + id);
    if (productItem) {
      productItem.remove();
    }
    document
      .querySelector(".popup-deleteProduct")
      .classList.remove("show-popup");
    document
      .querySelector(".effect-background")
      .classList.remove("show-effect");
  };

  document.querySelector(".btn-cancel-delete").onclick = function (e) {
    e.preventDefault();
    document
      .querySelector(".popup-deleteProduct")
      .classList.remove("show-popup");
    document
      .querySelector(".effect-background")
      .classList.remove("show-effect");
  };
}

function renderProducts(data) {
  var listProducts = document.querySelector(".product-element");
  var htmls = data.map((item, index) => {
    var totalPrice = item.priceProduct * item.totalExport;
    return `<tr style="padding: 10px 0" class="product-${item.idExport}">
                <td>${index + 1}</td>
                <td>${item.nameProduct}</td>
                <td>${item.categoryProduct}</td>
                <td>${item.totalExport}</td>
                <td>${totalPrice} VNĐ</td>
                <td>${item.dateExport}</td>
                <td><a href="#" class="btn-delete btn-red" onclick="deleteProducts(${
                  item.idExport
                })"></i>Xóa</a></td>
              </tr>`;
  });
  listProducts.innerHTML = htmls.join("");
}

function renderSelect(data) {
  var selBox = document.getElementById("selbox-manage");
  var html = data.map(function (item) {
    return `<option value="${item.id}">${item.nameProduct}</option>`;
  });

  selBox.innerHTML = html.join("");
}
