// ====================================================================

var productsApi = "https://614075955cb9280017a112f9.mockapi.io/products";

function start() {
  getProducts(function (data) {
    renderProducts(data);
  });
}
start();

// ========================= Handle Functions =========================

function getProducts(callback) {
  fetch(productsApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function postProducts() {

  document.querySelector(".popup-addProduct").classList.add("show-popup");
  document.querySelector(".effect-background").classList.add("show-effect");

  document.querySelector(".btn-add").onclick = function(e) {
    e.preventDefault();
    var dataPost = {
      nameProduct: document.querySelector("input[name='name']").value,
      priceProduct: document.querySelector("input[name='price']").value,
      discount: document.querySelector("input[name='discount']").value,
      statusProduct: document.querySelector("input[name='status']").value,
      imageProduct: document.querySelector("input[name='img']").value,
      description: document.querySelector("input[name='description']").value,
      id: Math.random(),
    };
    fetch(productsApi, {
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

  document.querySelector(".popup-addProduct").classList.remove("show-popup");
  document.querySelector(".effect-background").classList.remove("show-effect");
  }

  document.querySelector(".btn-cancel-add").onclick = function(e) {
    e.preventDefault();
    document.querySelector(".popup-addProduct").classList.remove("show-popup");
    document.querySelector(".effect-background").classList.remove("show-effect");
  }
}


var nameItem = document.querySelector("input[name='nameEdit']");
var price = document.querySelector("input[name='priceEdit']");
var discount = document.querySelector("input[name='discountEdit']");
var statusItem = document.querySelector("input[name='statusEdit']");
var img = document.querySelector("input[name='imgEdit']");
var description = document.querySelector("input[name='descriptionEdit']");
var idItem = document.querySelector("input[name='idEdit']");

function editProducts(idProduct) {
    document.querySelector(".popup-editProduct").classList.add("show-popup");
    document.querySelector(".effect-background").classList.add("show-effect");
    
    getProducts(function (data) {
      var productEdit = data.filter(function (item) {
        return item.id === idProduct;
      });
      productEdit.map(function (item) {
        nameItem.value = item.nameProduct;
        price.value = item.priceProduct;
        discount.value = item.discount;
        statusItem.value = item.statusProduct;
        img.value = item.imageProduct;
        description.value = item.description;
        idItem.value = item.id;
      });
    });

    document.querySelector(".btn-save").onclick = function(e) {
      e.preventDefault();
      var dataPut = {
        nameProduct: nameItem.value,
        priceProduct: price.value,
        discount: discount.value,
        statusProduct: statusItem.value,
        imageProduct: img.value,
        description: description.value,
        id: idItem.value,
      };
      fetch(productsApi + "/" + idItem.value, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPut),
      })
      .then(function (response) {
        return response.json();
      })
      .then(function () {
        start();
      });
      document.querySelector(".popup-editProduct").classList.remove("show-popup");
      document.querySelector(".effect-background").classList.remove("show-effect");
    }

    document.querySelector(".btn-cancel-edit").onclick = function(e) {
      e.preventDefault();
      document.querySelector(".popup-editProduct").classList.remove("show-popup");
      document.querySelector(".effect-background").classList.remove("show-effect");
    }
}


function deleteProducts(id) {
  document.querySelector(".popup-deleteProduct").classList.add("show-popup");
  document.querySelector(".effect-background").classList.add("show-effect");

  document.querySelector(".btn-confirm").onclick = function(e) {
    e.preventDefault();
    fetch(productsApi + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      },
    });
    var productItem = document.querySelector(".product-" + id);
    if (productItem) {
      productItem.remove();
    }
    document.querySelector(".popup-deleteProduct").classList.remove("show-popup");
    document.querySelector(".effect-background").classList.remove("show-effect");
  }

  document.querySelector(".btn-cancel-delete").onclick = function(e) {
    e.preventDefault();
    document.querySelector(".popup-deleteProduct").classList.remove("show-popup");
    document.querySelector(".effect-background").classList.remove("show-effect");
  }
}

function renderProducts(data) {
  var listProducts = document.querySelector(".product-element");
  var htmls = data.map((item, index) => {
    return `<tr style="padding: 10px 0" class="product-${item.id}">
              <td>${index + 1}</td>
              <td>${item.nameProduct}</td>
              <td>${item.priceProduct} VNĐ</td>
              <td>${item.discount} %</td>
              <td>${item.statusProduct ? "Còn hàng" : "Hết hàng"}</td>
              <td>${item.imageProduct}</td>
              <td>${item.description}</td>
              <td><a href="#" onclick="editProducts('${item.id}')" class="btn-update btn-blue">Cập nhật</a></td>
              <td><a href="#" class="btn-delete btn-red" onclick="deleteProducts(${item.id})"></i>Xóa</a></td>
            </tr>`;
  });
  listProducts.innerHTML = htmls.join("");
}


