
let currentProduct = null;
// هذا المتغير استخمته لحفظ المنتج الي بنقر عله
let cart = [];
// هاذي مصفوفه لسلة التسوق نضيف فيبه المنتجات الي اخترناها
// let cart=JSON.parse(localStorage.getItem("cart")) || [];
const products = [
  { name: "زبيب يمني", image: "pho5.jpg", description: "زبيب طبيعي فاخر من جبال اليمن", price: 10000 },
  { name: "زبيب أسود", image: "pho1.jpg", description: "زبيب مجفف أسود طازج", price: 2000 },
  { name: "زبيب ذهبي", image: "pho2.jpg", description: "زبيب لونه ذهبي وطعمه رائع", price: 1000 },
  { name: "زبيب عضوي", image: "pho3.jpg", description: "زبيب خالي من المواد الحافظة", price: 5000 },
  { name: "زبيب إيراني", image: "pho4.jpg", description: "زبيب مستورد بجودة عالية", price: 3000 },
 { name: "زبيب إيراني", image: "pho4.jpg", description: "زبيب مستورد بجودة عالية", price: 2000 }
];

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    document.getElementById("loginSection").style.display = "none";
    // هنه اذا تم ادخال البيانات اخفي لي قسم تسجيل الدخول ه
    document.getElementById("mainSection").style.display = "block";
    // وانتقل الى صفحه الرييسيه
    loadProducts();
  } else {
    alert("يرجى إدخال اسم المستخدم وكلمة المرور");
  }
}
    // هاذي دالة تحميل المنتجات
function loadProducts() {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  // يمسح كل العناصر
  // هذا يجهز حاوية المنتجات ويفرغها من الاشيا القديمه
  products.forEach((p, index) => {
    // indexهو ترتيب العنصر داخل المصفوفه يبدا من 0 ا
    const card = document.createElement("div");
    card.className = "product";
    card.onclick = () => showDetails(index);
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
    `;
    container.appendChild(card);
  });
}
// داله عرض تفاصيل المنتج
function showDetails(index) {
  currentProduct = products[index];
  document.getElementById("mainSection").style.display = "none";
  document.getElementById("detailsSection").style.display = "block";

  document.getElementById("detailTitle").innerText = currentProduct.name;
  document.getElementById("detailImage").src = currentProduct.image;
  document.getElementById("detailDescription").innerText = currentProduct.description;
}

function addToCart() {
  const quantity = parseInt(document.getElementById("quantityInput").value);
  // هاذي الكمية
  // هذا يحول النص الى رقمparseint

  if (quantity > 0) {
    cart.push({ ...currentProduct, quantity });
    // هاذي داله يضيف المنتج الحالي مع الكمية الى سلة اتسوق ت
    alert("تمت الإضافة للسلة!");
    backToMain();
  }
}

function backToMain() {
  document.getElementById("detailsSection").style.display = "none";
  document.getElementById("cartSection").style.display = "none";
  document.getElementById("invoiceSection").style.display = "none";
  document.getElementById("mainSection").style.display = "block";
}

function showCart() {
  document.getElementById("mainSection").style.display = "none";
  document.getElementById("cartSection").style.display = "block";

  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  if (cart.length === 0) {
    container.innerHTML = "<p>السلة فارغة.</p>";
    return;
  }

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    // هذا يعني لكل منتج في cart ينشي له ديف 
    div.innerHTML = `${i + 1}) ${item.name} - ${item.quantity} كيلو - ${item.quantity * item.price} ريال`;
    container.appendChild(div);
  });
}

function generateInvoice() {
  if (cart.length === 0) {
    alert("سلتك فارغة!");
    return;
  }

  document.getElementById("cartSection").style.display = "none";
  document.getElementById("invoiceSection").style.display = "block";

  const invoiceDiv = document.getElementById("invoiceContent");
  invoiceDiv.innerHTML = "";
  // هنه عشان يمسح محتوى الفاتوره السابق

  let total = 0;
  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "invoiceRow";
    row.innerHTML = `<strong>${index + 1})</strong> ${item.name} - ${item.quantity} كيلو - ${item.quantity * item.price} ريال`;
    invoiceDiv.appendChild(row);
    total += item.quantity * item.price;
  });

  const totalRow = document.createElement("p");
  totalRow.innerHTML = `<strong>الإجمالي الكلي: ${total} ريال</strong>`;
  invoiceDiv.appendChild(totalRow);

  cart = [];
  // هنه لما اخلص خليته يفرغ السله بعد ما انشيت فاتوره
  // localStorage.removeItem("cart");
}

function returnToMain() {
  document.getElementById("invoiceSection").style.display = "none";
  document.getElementById("mainSection").style.display = "block";
}


function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  // هذا يضيف او يزيل كلاس الوضع اليلي من البدي ومكانه يتحكم بملف سي اسس حق الوضع اليلي

  // تغيير كل العناصر التي تحتاج الوضع الليلي
  ["header",
    "footer",
    "aside",
    ".product",
    ".login-box",
    ".details-box", 
    "#cartItems",
      "#invoiceContent",
     "button"].forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.toggle("dark-mode");
      });
    });

  // حفظ الوضع في localStorage
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  // هذا يتحقق اذا كان البدي يحتوي على كلاس الوضع اليلي اذا نعم احفظ اليلي مالم خليه نهاري
  localStorage.setItem("mode", mode);
  // هذا يخليه محفوظ على المتصفح حتى بعد الخروج من المتصفح
  
}

// تفعيل الوضع الليلي المحفوظ تلقائيًا
window.onload = () => {
  if (localStorage.getItem("mode") === "dark") {
    toggleDarkMode();
  }
};
// هاذي الداله تنفذ الوضع اليلي عند تحميل الصفحه
// يتحقق اذا فعلت الوضع اليلي من قبل ولا لا

