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

function renderProducts(data) {
  var listProducts = document.querySelector(".product-element");
  var totalProceed = 0;
  var htmls = data.map((item, index) => {
    var totalSales = item.priceProduct * item.totalSale;
    totalProceed += totalSales;
    return `<tr style="padding: 10px 0" class="product-${item.id}">
                <td>${index + 1}</td>
                <td>${item.nameProduct}</td>
                <td>${item.categoryProduct}</td>
                <td>${item.priceProduct} VNĐ</td>
                <td>${item.totalSale}</td>
                <td>${totalSales} VNĐ</td>
              </tr>`;
  });
  listProducts.innerHTML = htmls.join("");
  document.querySelector(".totalProceeds").innerHTML = totalProceed + " VND ";
}
