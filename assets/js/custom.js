(function ($) {

  "use strict";

  // =========================
  // 🔥 API CONFIG
  // =========================
  const API_KEY = "YOUR_API_KEY_HERE";
  const BASE_URL = "https://newsapi.org/v2/top-headlines";

  let articles = [];

  // =========================
  // HEADER SCROLL EFFECT
  // =========================
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  // =========================
  // OWL CAROUSEL
  // =========================
  $('.loop').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    autoplay: true,
    nav: true,
    margin: 0,
    responsive: {
      1200: { items: 5 },
      992: { items: 3 },
      760: { items: 2 }
    }
  });

  // =========================
  // MODAL LOGIN SYSTEM
  // =========================
  $("#modal_trigger").leanModal({
    top: 100,
    overlay: 0.6,
    closeButton: ".modal_close"
  });

  $("#login_form").click(function () {
    $(".social_login").hide();
    $(".user_login").show();
    return false;
  });

  $("#register_form").click(function () {
    $(".social_login").hide();
    $(".user_register").show();
    $(".header_title").text('Register');
    return false;
  });

  $(".back_btn").click(function () {
    $(".user_login, .user_register").hide();
    $(".social_login").show();
    $(".header_title").text('Login');
    return false;
  });

  // =========================
  // 📰 FETCH GAMING NEWS (API)
  // =========================
  async function loadGamingNews() {
    try {
      const res = await fetch(
        `${BASE_URL}?category=gaming&language=en&pageSize=10&apiKey=${API_KEY}`
      );

      const data = await res.json();
      articles = data.articles || [];

      renderNews();
      activateFirstArticle();

    } catch (err) {
      console.error("API Error:", err);
    }
  }

  // =========================
  // 🧩 RENDER NEWS UI
  // =========================
  function renderNews() {

    let menuHTML = "";
    let listHTML = "";

    articles.forEach((article, index) => {

      // LEFT SIDE (menu)
      menuHTML += `
        <div class="news-item ${index === 0 ? "active" : ""}" data-index="${index}">
          <div class="thumb">
            <div class="row">
              <div class="col-lg-4 col-sm-4 col-12">
                <h4>${(article.title || "No Title").slice(0, 30)}...</h4>
                <span class="date">
                  ${article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Today"}
                </span>
              </div>

              <div class="col-lg-4 col-sm-4 d-none d-sm-block">
                <span class="category">Gaming</span>
              </div>

              <div class="col-lg-4 col-sm-4 col-12">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <span class="rating">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      `;

      // RIGHT SIDE (detail system)
      listHTML += `
        <li class="${index === 0 ? "active" : ""}">
          <div class="thumb">
            <div class="row">
              <div class="col-lg-12">

                <div class="client-content">
                  <img src="assets/images/quote.png" alt="">
                  <p>${article.description || "No description available."}</p>
                </div>

                <div class="down-content">
                  <img src="${article.urlToImage || 'assets/images/client-image.jpg'}" alt="">
                  <div class="right-content">
                    <h4>${article.author || "Gaming News"}</h4>
                    <span>${article.source?.name || "Source"}</span>
                  </div>
                </div>

                <a href="${article.url}" target="_blank">Read Full Article →</a>

              </div>
            </div>
          </div>
        </li>
      `;
    });

    $(".naccs .menu").html(menuHTML);
    $(".naccs ul").html(listHTML);
  }

  // =========================
  // 🎯 ACTIVATE FIRST ARTICLE
  // =========================
  function activateFirstArticle() {
    $(".naccs .menu div:first").addClass("active");
    $(".naccs ul li:first").addClass("active");
  }

  // =========================
  // 🖱️ CLICK HANDLER (NEWS SWITCHING)
  // =========================
  $(document).on("click", ".naccs .menu div", function () {

    const index = $(this).data("index");

    $(".naccs .menu div").removeClass("active");
    $(this).addClass("active");

    $(".naccs ul li").removeClass("active");
    $(".naccs ul li").eq(index).addClass("active");
  });

  // =========================
  // NAVIGATION / SCROLL MENU
  // =========================
  $('.menu-trigger').on('click', function () {
    $(this).toggleClass('active');
    $('.header-area .nav').slideToggle(200);
  });

  $('.scroll-to-section a[href*=\\#]').on('click', function () {
    if (location.pathname === this.pathname && location.hostname === this.hostname) {
      const target = $(this.hash);
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top + 1
        }, 700);
        return false;
      }
    }
  });

  // =========================
  // PAGE LOAD ANIMATION
  // =========================
  $(window).on('load', function () {
    $('#js-preloader').addClass('loaded');
  });

  // =========================
  // INIT APP
  // =========================
  $(document).ready(function () {
    loadGamingNews();
  });

})(window.jQuery);