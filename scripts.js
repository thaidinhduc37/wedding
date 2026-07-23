/* ============================================
   SCRIPTS.JS — Danh sách khách mời (key → tên hiển thị)

   File này chỉ được nạp trong index.html (trang bìa),
   thay chữ "Quý khách" ở #HEADLINE5 bằng tên khách mời.

   Link mời riêng: https://duclinh.vercel.app/?key=ten-khoa
   Ví dụ:          https://duclinh.vercel.app/?key=vancun
   Không có ?key   → giữ nguyên "Quý khách".
   ============================================ */

var GUESTS = {
  // --- Gia đình / bạn bè ---
  hanhthuy: "Gia đình bạn Thủy Hánh",
  tinhngoc: "Gia đình bạn Ngọc Tính",
  vancun: "Gia đình chị Thanh Vân",
  gdchitrinh: "Gia đình chị Trinh",
  phongly: "Gia đình bạn Phong Ly",
  hoailinh: "Gia đình bạn Hoài Linh",
  khanhhanh: "Gia đình bạn Khánh Hạnh",
  hoaquy: "Gia đình bạn Hoà Quý",

  // --- Khách mời kèm một nửa ---
  viettin: "Anh Việt & Tin",
  chimai: "Chị Mai & ❤️",
  chimo: "Chị Mô & ❤️",
  anhhau: "Anh Hậu & ❤️",
  anhhair: "Anh Hair & ❤️",

  // --- Khách mời cá nhân ---
  tim: "Tim",
  bantuan: "Bạn Tuấn",
  banson: "Bạn Sơn",
  bantrinh: "Bạn Trình",

  // --- Nhóm 501 (giữ lại từ danh sách cũ) ---
  cuong501: "Gia đình bạn Cường",
  an501: "Gia đình anh Ấn",
  bac501: "Gia đình anh Bắc",
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
