
var productsApi = "https://614075955cb9280017a112f9.mockapi.io/products";
var importApi = "https://614075955cb9280017a112f9.mockapi.io/import";

function start() {
  getProducts(function (data) {
    renderProducts(data);
  },importApi);
  getProducts(function (data) {
    renderSelect(data);
  },productsApi);
}
start();

// ========================= Handle Functions =========================

function getProducts(callback,api) {
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderDate(){
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return year + '-' + month + '-' + date;
}

//thêm sản phẩm

function postProducts() {
  getProducts(renderSelect,productsApi);
  
  document.querySelector("input[name='dateImport']").value = renderDate();
  document.querySelector(".popup-addProduct").classList.add("show-popup");
  document.querySelector(".effect-background").classList.add("show-effect");

  document.querySelector(".btn-add").onclick = function(e) {
    e.preventDefault();
    let nameImport = document.querySelector("input[name='name']").value;
    let categoryImport = document.querySelector("input[name='category']").value;
    let totalImport = document.querySelector("input[name='totalImport']").value;
    let dateImport = document.querySelector("input[name='dateImport']").value;
    let priceImport = document.querySelector("input[name='price']").value;
    let idProduct = document.querySelector("input[name='idImport']").value;
    
    var dataPost = {
      nameProduct: nameImport,
      categoryProduct: categoryImport,
      totalImport: Number.parseInt(totalImport),
      dateImport: dateImport,
      priceProduct: Number.parseInt(priceImport),
      idProduct: idProduct
    };
    fetch(importApi, {
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

    getProducts(function (data){
      var presentTotal = data.find(function (item) {
        return item.id === document.querySelector("input[name='idImport']").value;
      }).totalProduct;
      var updateTotalProduct =  {totalProduct: presentTotal + Number.parseInt(document.querySelector("input[name='totalImport']").value)};

      fetch(productsApi + "/" + document.querySelector("input[name='idImport']").value, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTotalProduct),
      })
    },productsApi);



  document.querySelector(".popup-addProduct").classList.remove("show-popup");
  document.querySelector(".effect-background").classList.remove("show-effect");
  }

  document.querySelector(".btn-cancel-add").onclick = function(e) {
    e.preventDefault();
    document.querySelector(".popup-addProduct").classList.remove("show-popup");
    document.querySelector(".effect-background").classList.remove("show-effect");
  }
}

function renderInputAddProduct(){
    var idProduct = document.getElementById('selbox-manage').value;
    var nameItem = document.querySelector("input[name='name']");
    var category = document.querySelector("input[name='category']");
    var price = document.querySelector("input[name='price']");
    var totalImport = document.querySelector("input[name='totalImport']");
    var dateImport = document.querySelector("input[name='dateImport']");
    var idItem = document.querySelector("input[name='idImport']");
    
    getProducts(function (data) {
      var productAdd = data.filter(function (item) {
        return item.id === idProduct;
      });
      productAdd.map(function (item) {
        nameItem.value = item.nameProduct;
        category.value = item.categoryProduct;
        price.value = item.priceProduct;
        totalImport.value = '';
        dateImport.value = renderDate();
        idItem.value = item.id;
      });
    },productsApi);
}

function filterCat(){
  getProducts(function (data) {
    renderCatProducts(data);
  },importApi);
}

function deleteProducts(id) {
  document.querySelector(".popup-deleteProduct").classList.add("show-popup");
  document.querySelector(".effect-background").classList.add("show-effect");

  document.querySelector(".btn-confirm").onclick = function(e) {
    e.preventDefault();
    fetch(importApi + "/" + id, {
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
      var totalPrice = item.priceProduct * item.totalImport;
      return `<tr style="padding: 10px 0" class="product-${item.idImport}">
                <td>${index + 1}</td>
                <td>${item.nameProduct}</td>
                <td>${item.categoryProduct}</td>
                <td>${item.totalImport}</td>
                <td>${totalPrice} VNĐ</td>
                <td>${item.dateImport}</td>
                <td><a href="#" class="btn-delete btn-red" onclick="deleteProducts(${item.idImport})"></i>Xóa</a></td>
              </tr>`;
    });
    listProducts.innerHTML = htmls.join("");
}

function renderCatProducts(data){
  var id = document.getElementById('selCat').value;
  var listProducts = document.querySelector(".product-element");
  var htmls = data.map((item, index) => {
    if(item.idProduct === id){
      var totalPrice = item.priceProduct * item.totalImport;
      return `<tr style="padding: 10px 0" class="product-${item.idImport}">
              <td>${index + 1}</td>
              <td>${item.nameProduct}</td>
              <td>${item.categoryProduct}</td>
              <td>${item.totalImport}</td>                              
              <td>${totalPrice} VNĐ</td>
              <td>${item.dateImport}</td>
              <td><a href="#" class="btn-delete btn-red" onclick="deleteProducts(${item.idImport})"></i>Xóa</a></td>
            </tr>`;
    }
  });
  listProducts.innerHTML = htmls.join("");
}

function renderSelect(data){
  var selBox = document.getElementById('selbox-manage');
  var selBoxCat = document.getElementById("selCat");
  var html = data.map(function(item) {
      return `<option value="${item.id}">${item.nameProduct}</option>`;
})

  selBox.innerHTML = html.join('');
  selBoxCat.innerHTML = html.join("");
  
}


function filterDate(){
  getProducts(function (data) {
    renderDateProducts(data);
  },importApi);
}

function renderDateProducts(data){
  var dateSel = new Date(document.querySelector("input[name='dateSel']").value);
  var listProducts = document.querySelector(".product-element");
  var htmls = data.map((item, index) => {
    var dateTemp = new Date(item.dateImport);
    if(dateTemp.getDate() === dateSel.getDate() && dateTemp.getMonth() === dateSel.getMonth() && dateTemp.getFullYear() === dateSel.getFullYear()) {
      var totalPrice = item.priceProduct * item.totalExport;
      return `<tr style="padding: 10px 0" class="product-${item.idImport}">
              <td>${index + 1}</td>
              <td>${item.nameProduct}</td>
              <td>${item.categoryProduct}</td>
              <td>${item.totalImport}</td>                              
              <td>${totalPrice} VNĐ</td>
              <td>${item.dateImport}</td>
              <td><a href="#" class="btn-delete btn-red" onclick="deleteProducts(${item.idImport})"></i>Xóa</a></td>
            </tr>`;
    }
  });
  listProducts.innerHTML = htmls.join("");
}