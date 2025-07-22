document.addEventListener("DOMContentLoaded", () => {
  const products = [
    // Shirts
    {
      name: "Polo Ralph Lauren Classic Fit Shirt",
      price: "$110.00",
      type: "shirts",
      image: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1266689_alternate10?$rl_4x5_pdp$"
    },
    {
      name: "Nautica Deck Polo Shirt",
      price: "$59.50",
      type: "shirts",
      image: "https://www.nautica.com/dw/image/v2/BDCV_PRD/on/demandware.static/-/Sites-nautica-master-catalog/default/dw3a4ddb82/images/0731516000016_KR8100_401_A.jpg?sw=2000&sh=2000&sm=fit"
    },
    {
      name: "Columbia PFG Bahama Shirt",
      price: "$75.00",
      type: "shirts",
      image: "https://columbia.scene7.com/is/image/ColumbiaSportswear2/1011651_357_f_om?wid=768&hei=806&v=1752269256"
    },
    {
      name: "Tommy Hilfiger Tartan Shirt",
      price: "$95.00",
      type: "shirts",
      image: "https://shoptommy.scene7.com/is/image/ShopTommy/MW33319_0QY_FNT?wid=807&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp"
    },

    // Pants
    {
      name: "Nautica Linen Drawstring Pants",
      price: "$79.50",
      type: "pants",
      image: "https://www.nautica.com/dw/image/v2/BDCV_PRD/on/demandware.static/-/Sites-nautica-master-catalog/default/dw3a86a6af/images/0731516000016_PR2600_482_A.jpg?sw=2000&sh=2000&sm=fit"
    },
    {
      name: "Ralph Lauren Classic Chino Pants",
      price: "$125.00",
      type: "pants",
      image: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1390072_alternate10?$rl_4x5_pdp$"
    },
    {
      name: "Columbia Deck Pants",
      price: "$89.99",
      type: "pants",
      image: "https://columbia.scene7.com/is/image/ColumbiaSportswear2/2142151_257_f_om?wid=768&hei=806&v=1752269256"
    },
    {
      name: "Tommy Hilfiger Slim Fit Pants",
      price: "$79.50",
      type: "pants",
      image: "https://shoptommy.scene7.com/is/image/ShopTommy/78J1764_260_FNT?wid=807&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp"
    },

    // Shoes
    {
      name: "Columbia Newton Ridge Boots",
      price: "$100.00",
      type: "shoes",
      image: "https://images.pexels.com/photos/31721671/pexels-photo-31721671.jpeg"
    },
    {
      name: "Columbia Fairbanks Low Sneaker",
      price: "$80.00",
      type: "shoes",
      image: "https://images.pexels.com/photos/32898961/pexels-photo-32898961.jpeg"
    },
    {
      name: "Columbia Bahama Vent Boat Shoe",
      price: "$75.00",
      type: "shoes",
      image: "https://columbia.scene7.com/is/image/ColumbiaSportswear2/2079411_063_f_tt?wid=768&hei=806&v=1752269256"
    },
    {
      name: "Columbia Crestwood Hiking Shoe",
      price: "$69.99",
      type: "shoes",
      image: "https://columbia.scene7.com/is/image/ColumbiaSportswear2/6_27_2053463_CSC_NA_Q3_A%2B_Mens_Castback_TC_Tech1?$aem_pjpeg$"
    },

    // Accessories
    {
      name: "Ralph Lauren Leather Belt",
      price: "$128.00",
      type: "accessories",
      image: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1287952_lifestyle?$rl_1x1_pdp$"
    },
    {
      name: "Ralph Lauren Polo Bear Wallet",
      price: "$105.00",
      type: "accessories",
      image: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1403090_lifestyle?$rl_1x1_pdp$"
    },
    {
      name: "Ralph Lauren Twill Cap",
      price: "$49.50",
      type: "accessories",
      image: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1379863_lifestyle?$rl_1x1_pdp$"
    },
    {
      name: "Ralph Lauren Sunglasses",
      price: "$186.00",
      type: "accessories",
      image: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI461980475002_lifestyle?$rl_1x1_pdp$"
    }
  ];

  const container = document.getElementById("productList");
  const cartMsg = document.getElementById("cartMessage");

  // This function shows all products as cards on the page
  function showProducts(list = products) {
    container.innerHTML = ""; // clear previous products

    list.forEach((p) => {
      // create each product card
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-image" />
        <div class="product-info">
          <h3 class="product-title">${p.name}</h3>
          <p class="product-price">${p.price}</p>
          <div class="card-buttons">
            <button class="details-btn">View Details</button>
            <button class="buy-btn">Buy</button>
            <button class="fav-btn">❤️</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    // here we add the click event to all buy buttons
    document.querySelectorAll(".buy-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        // show "added to cart" message for 2.5 sec
        cartMsg.classList.remove("hidden");
        cartMsg.classList.add("show");
        setTimeout(() => {
          cartMsg.classList.remove("show");
          cartMsg.classList.add("hidden");
        }, 2500);
      });
    });
  }

  // load all products when the page loads
  showProducts();

  // when we select a category, filter products by type
  document.getElementById("filter").addEventListener("change", (e) => {
    const type = e.target.value;
    const filtered = type === "all" ? products : products.filter(p => p.type === type);
    showProducts(filtered);
  });

  // when we click "Show Offer", just show a simple alert with the offer
  document.getElementById("offer").addEventListener("click", () => {
    alert("✨ Limited time offer: 15% OFF on all shirts!");
  });

  // change background with different light colors every click
  const bgColors = ["#f4f4fa", "#e6f2ff", "#fff7e6", "#ffe6f2", "#f9f9f9"];
  let currentBg = 0;

  document.getElementById("bgToggle").addEventListener("click", () => {
    currentBg = (currentBg + 1) % bgColors.length;
    document.body.style.backgroundColor = bgColors[currentBg];
  });

  // toggle dark mode class on body
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
});
