/* ============================================
   HOME.JS — Danh sách khách mời (key → value)
   Link: home.html?hovaten=ten-khoa-hoc
   ============================================ */

var GUESTS = {
  vancun: "Gia đình chị Thanh Vân",
  tinhngoc: "Gia đình bạn Ngọc Tính",
  hanhthuy: "Gia đình bạn Thủy Hánh",
};

(function () {
  var params = new URLSearchParams(window.location.search);
  var key = params.get("key");
  if (key) {
    var name = GUESTS[key];
    if (name) {
      var el = document.getElementById("HEADLINE5");
      if (el) {
        var p = el.querySelector("p");
        if (p) p.innerHTML = name;
      }
    }
  }
})();
