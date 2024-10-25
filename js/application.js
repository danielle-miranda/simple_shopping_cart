//calculate subtotals
var calcSubTot = function (ele) {
  var qtyItem = Number(`${$(ele).find(".quantity input").val()}`);
  var priceItem = Number(
    `${$(ele).children(".price").text()}`.replace(/[^0-9.-]+/g, "")
  );

  var subTotal = qtyItem * priceItem;
  if (subTotal >= 0) {
    $(ele)
      .children(".subtotal")
      .html(`$${parseFloat(Math.round(subTotal * 100) / 100).toFixed(2)}`);
  }

  return subTotal;
};

var sum = function (acc, x) {
  return acc + x;
};

//calculate total cart price
var updateTotalCart = function () {
  var allSubTotals = [];

  $("tbody tr").each(function (i, ele) {
    var subTotal = calcSubTot(ele);
    allSubTotals.push(subTotal || 0); 
  });

  if (allSubTotals.length == 0) {
    $("#totalCart").html(`$--.--`);
  } else {
    var totalCart = allSubTotals.reduce(sum);
    $("#totalCart").html(
      `$${parseFloat(Math.round(totalCart * 100) / 100).toFixed(2)}`
    );
  }
};

//Execute functions
$(document).ready(function () {
  updateTotalCart();
  // remove button
  $("body").on("click", ".remove", function (event) {
    $(this).closest("tr").remove();
    updateTotalCart();
  });

  //update cart
  var timeout;
  $("body").on("input", "tr input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotalCart();
    }, 500);
  });

  //Add item 
  $("#addItem").on("submit", function (event) {
    event.preventDefault();
    var item = $(this).children(".item").val();
    var price = $(this).children(".price").val();

    //inject into DOM
    $("tbody").append(`<tr> 
  <td class="item">${item}</td>
  <td class="price">$${price}</td>
  <td class="quantity">
    <label>QTY</label><input type="number" min="0" value="1"/>
    <button class="btn btn-light btn-sm mb-1 remove">Remove</button>
  </td>
  <td class="subtotal"></td>
  </tr>
  `);
    updateTotalCart();
    $(this).children(".item").val("");
    $(this).children(".price").val("");
  });
});
