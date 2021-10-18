var productsApi = "https://614075955cb9280017a112f9.mockapi.io/categories";

function start() {
  getProducts(function (data) {
    renderProducts(data);
  });
}
start();

function getProducts(callback) {
  fetch(productsApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function deleteProducts(id) {
  document.querySelector(".popup-deleteProduct").classList.add("show-popup");
  document.querySelector(".effect-background").classList.add("show-effect");

  document.querySelector(".btn-confirm").onclick = function (e) {
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

function postProducts() {
  document.querySelector(".popup-addProduct").classList.add("show-popup");
  document.querySelector(".effect-background").classList.add("show-effect");

  document.querySelector(".btn-add").onclick = function (e) {
    e.preventDefault();
    var dataPost = {
      name: document.querySelector("input[name='name']").value,
      origin: document.querySelector("input[name='origin']").value,

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

function editProducts(idProduct) {
  document.querySelector(".popup-editProduct").classList.add("show-popup");
  document.querySelector(".effect-background").classList.add("show-effect");
  var nameItem = document.querySelector("input[name='nameEdit']");
  var countryItem = document.querySelector("input[name='countryEdit']");
  var idItem = document.querySelector("input[name='idEdit']");
  getProducts(function (data) {
    var productEdit = data.filter(function (item) {
      return item.id === idProduct;
    });
    productEdit.map(function (item) {
      nameItem.value = item.name;
      countryItem.value = item.origin;
      idItem.value = item.id;
    });
  });

  document.querySelector(".btn-save").onclick = function (e) {
    e.preventDefault();
    var dataPut = {
      name: nameItem.value,
      origin: countryItem.value,
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
    document
      .querySelector(".effect-background")
      .classList.remove("show-effect");
  };

  document.querySelector(".btn-cancel-edit").onclick = function (e) {
    e.preventDefault();
    document.querySelector(".popup-editProduct").classList.remove("show-popup");
    document
      .querySelector(".effect-background")
      .classList.remove("show-effect");
  };
}

function renderProducts(data) {
  var listProducts = document.querySelector(".product-element");
  var htmls = data.map((item, index) => {
    return `<tr style="padding: 10px 0" class="product-${item.id}">
              <td>${index + 1}</td>
              <td>${item.name}</td>
              <td>${item.origin}</td>
              <td><a href="#" onclick="editProducts('${
                item.id
              }')" class="btn-update btn-blue">Cập nhật</a></td>
              <td><a href="#" class="btn-delete btn-red" onclick="deleteProducts(${
                item.id
              })"></i>Xóa</a></td>
            </tr>`;
  });
  listProducts.innerHTML = htmls.join("");
}
