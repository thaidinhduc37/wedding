/* ============================================
   SCRIPTS.JS — Danh sách khách mời (key → tên hiển thị)

   File này chỉ được nạp trong index.html (trang bìa),
   thay chữ "Quý khách" ở #HEADLINE5 bằng tên khách mời.

   Link mời riêng: https://duclinh.vercel.app/ten-khoa
   Ví dụ:          https://duclinh.vercel.app/vancun
   Không khớp key  → giữ nguyên "Quý khách".

   Dạng path (nhờ rewrite trong vercel.json) để Facebook/Messenger
   không cắt mất key như khi dùng ?key=...
   Link ?key=... cũ vẫn chạy được để không hỏng link đã gửi.
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
  lananh: "Gia đình Lan Anh",
  chiquynh: "Gia đình chị Quỳnh",
   bemeo: "Bé Mèo + ❤️",


  // --- Khách mời kèm một nửa ---
  ngochuynh: "Gia đình chị Ngọc Huỳnh",
  dinhsan: "Anh Đinh San + ❤️",
  anhviet: "Anh Việt + Anh Phong",
  chimai: "Chị Mai & ❤️",
  chimo: "Chị Mô & ❤️",
  anhhau: "Anh Hậu & ❤️",
  anhhai: "Anh Hải & ❤️",

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
  // Ưu tiên path: /vancun → "vancun". Bỏ dấu / đầu & cuối.
  var key = "";
  try {
    key = decodeURIComponent(window.location.pathname).replace(
      /^\/+|\/+$/g,
      "",
    );
  } catch (e) {}

  // Bỏ qua khi mở thẳng file (…/index.html, file://…) — lúc đó dùng ?key=
  if (key.indexOf("/") >= 0 || key.indexOf(".") >= 0) key = "";

  // Link cũ dạng ?key=vancun
  if (!key) {
    key = new URLSearchParams(window.location.search).get("key") || "";
  }

  var name = GUESTS[key.toLowerCase()];
  if (!name) return;

  var el = document.getElementById("HEADLINE5");
  if (!el) return;
  var p = el.querySelector("p");
  if (p) p.textContent = name;
})();
