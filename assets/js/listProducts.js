// ====================================================================

if (localStorage.getItem("dataAccount") === null) {
  window.location.href = "index.html";
}

const productsApi = "https://614075955cb9280017a112f9.mockapi.io/products";
const categoriesApi = "https://614075955cb9280017a112f9.mockapi.io/categories";

function start() {
  getProducts(function (data) {
    renderProducts(data);
  });
  getCategories(function (data) {
    renderCategoriesAdd(data);
    renderCategoriesEdit(data);
  });
}
start();

// ========================= Handle Functions =========================

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function getProducts(callback) {
  fetch(productsApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function getCategories(callback) {
  fetch(categoriesApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function postProducts() {
  $(".popup-addProduct").classList.add("show-popup");
  $(".effect-background").classList.add("show-effect");

  $(".btn-add").onclick = function (e) {
    e.preventDefault();
    var dataPost = {
      nameProduct: $("input[name='name']").value,
      categoryProduct: $("select[name='category']").value,
      priceProduct: $("input[name='price']").value,
      discount: $("input[name='discount']").value,
      totalProduct: $("input[name='total']").value,
      imageProduct: $("input[name='img']").value,
      description: $("input[name='description']").value,
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

    $(".popup-addProduct").classList.remove("show-popup");
    $(".effect-background").classList.remove("show-effect");
  };

  $(".btn-cancel-add").onclick = function (e) {
    e.preventDefault();
    $(".popup-addProduct").classList.remove("show-popup");
    $(".effect-background").classList.remove("show-effect");
  };
}

var nameItem = $("input[name='nameEdit']");
var category = $("select[name='categoryEdit']");
var price = $("input[name='priceEdit']");
var discount = $("input[name='discountEdit']");
var totalItem = $("input[name='totalEdit']");
var img = $("input[name='imgEdit']");
var description = $("input[name='descriptionEdit']");
var idItem = $("input[name='idEdit']");

function editProducts(idProduct) {
  $(".popup-editProduct").classList.add("show-popup");
  $(".effect-background").classList.add("show-effect");

  getProducts(function (data) {
    var productEdit = data.filter(function (item) {
      return item.id === idProduct;
    });
    productEdit.map(function (item) {
      nameItem.value = item.nameProduct;
      category.value = item.categoryProduct;
      price.value = item.priceProduct;
      discount.value = item.discount;
      totalItem.value = item.totalProduct;
      img.value = item.imageProduct;
      description.value = item.description;
      idItem.value = item.id;
    });
  });

  $(".btn-save").onclick = function (e) {
    e.preventDefault();
    var dataPut = {
      nameProduct: nameItem.value,
      categoryProduct: category.value,
      priceProduct: price.value,
      discount: discount.value,
      totalProduct: totalItem.value,
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
    $(".popup-editProduct").classList.remove("show-popup");
    $(".effect-background").classList.remove("show-effect");
  };

  $(".btn-cancel-edit").onclick = function (e) {
    e.preventDefault();
    $(".popup-editProduct").classList.remove("show-popup");
    $(".effect-background").classList.remove("show-effect");
  };
}

function deleteProducts(id) {
  $(".popup-deleteProduct").classList.add("show-popup");
  $(".effect-background").classList.add("show-effect");

  $(".btn-confirm").onclick = function (e) {
    e.preventDefault();
    fetch(productsApi + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    var productItem = $(".product-" + id);
    if (productItem) {
      productItem.remove();
    }
    $(".popup-deleteProduct").classList.remove("show-popup");
    $(".effect-background").classList.remove("show-effect");
  };

  $(".btn-cancel-delete").onclick = function (e) {
    e.preventDefault();
    $(".popup-deleteProduct").classList.remove("show-popup");
    $(".effect-background").classList.remove("show-effect");
  };
}

// ================ Handle Search ================
$(".btn-search").onclick = function (e) {
  e.preventDefault();
  start();
};

$(".btn-close-search").onclick = function (e) {
  e.preventDefault();
  $(".search").value = "";
  start();
};
// ================= Handle Sort =================
$(".sort").onchange = function (e) {
  e.preventDefault();
  start();
};
// ===============================================

function renderProducts(data) {
  var listProducts = $(".product-element");
  var dataSearch = $(".search").value;
  var dataSort = $(".sort").value;
  var resultSearch = data.filter(function (item) {
    return item.nameProduct
      .toLocaleLowerCase()
      .includes(dataSearch.toLocaleLowerCase());
  });

  var resultSearch = dataSearch ? resultSearch : data;

  var dataApp = resultSearch.filter(function (item) {
    if (dataSort === "0") return item;
    else if (dataSort === "1") return parseFloat(item.priceProduct) < 5000000;
    else if (dataSort === "2")
      return (
        parseFloat(item.priceProduct) >= 5000000 &&
        parseFloat(item.priceProduct) < 10000000
      );
    else if (dataSort === "3")
      return (
        parseFloat(item.priceProduct) >= 10000000 &&
        parseFloat(item.priceProduct) < 15000000
      );
    else return parseFloat(item.priceProduct) >= 15000000;
  });

  var htmls = dataApp.map((item, index) => {
    return `<tr style="padding: 10px 0" class="product-${item.id}">
                <td>${index + 1}</td>
                <td>${item.nameProduct}</td>
                <td>${item.categoryProduct}</td>
                <td>${item.priceProduct} VNĐ</td>
                <td>${item.discount} %</td>
                <td>${item.totalProduct}</td>
                <td>${item.imageProduct}</td>
                <td>${item.description}</td>
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

function renderCategoriesAdd(data) {
  var listCategories = $(".form-categories-add");
  var htmls = data.map((item) => {
    return `<option value="${item.name}">${item.name}</option>`;
  });
  listCategories.innerHTML = htmls.join("");
}

function renderCategoriesEdit(data) {
  var listCategories = $(".form-categories-edit");
  var htmls = data.map((item) => {
    return `<option value="${item.name}">${item.name}</option>`;
  });
  listCategories.innerHTML = htmls.join("");
}
