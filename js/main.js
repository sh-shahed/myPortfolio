/*global $, jQuery, alert*/
$(document).ready(function() {
  "use strict";

  // ========================================================================= //
  //  //SMOOTH SCROLL
  // ========================================================================= //

  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on("click", function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $("a").each(function() {
      $(this).removeClass("active");
      if ($(window).width() < 768) {
        $(".nav-menu").slideUp();
      }
    });

    $(this).addClass("active");

    var target = this.hash,
      menu = target;

    target = $(target);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: target.offset().top - 80
        },
        500,
        "swing",
        function() {
          window.location.hash = target.selector;
          $(document).on("scroll", onScroll);
        }
      );
  });

  function onScroll(event) {
    if ($(".home").length) {
      var scrollPos = $(document).scrollTop();
      $("nav ul li a").each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
      });
    }
  }

  // ========================================================================= //
  //  //NAVBAR SHOW - HIDE
  // ========================================================================= //

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 200) {
      $("#main-nav, #main-nav-subpage").slideDown(700);
      $("#main-nav-subpage").removeClass("subpage-nav");
    } else {
      $("#main-nav").slideUp(700);
      $("#main-nav-subpage").hide();
      $("#main-nav-subpage").addClass("subpage-nav");
    }
  });

  // ========================================================================= //
  //  // RESPONSIVE MENU
  // ========================================================================= //

  $(".responsive").on("click", function(e) {
    $(".nav-menu").slideToggle();
  });

  // ========================================================================= //
  //  Typed Js
  // ========================================================================= //

  var typed = $(".typed");

  $(function() {
    typed.typed({
      strings: [
        "Sharareh Shahed",
        "Film Maker",
        "Video Designer",
        "Photographer"
      ],
      typeSpeed: 100,
      loop: true
    });
  });

  // ========================================================================= //
  //  Owl Carousel Services
  // ========================================================================= //

  $(".services-carousel").owlCarousel({
    autoplay: true,
    // loop: false,
    margin: 20,
    dots: true,
    nav: true,
    // responsiveClass: false,
    responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 4 } }
  });

  // ========================================================================= //
  //  tabs group
  // ========================================================================= //

  $("#tabs div i:not(:first)").addClass("inactive");
  $(".containerTab").hide();
  $(".containerTab:first").show();

  $("#tabs div i").click(function() {
    var t = $(this).attr("id");

    if ($(this).hasClass("inactive")) {
      //this is the start of our condition
      $("#tabs div i").addClass("inactive");
      $(this).removeClass("inactive");

      $(".containerTab").hide();
      $("#" + t + "C").fadeIn("slow");
    }
  });

  // ========================================================================= //
  //  movie Carousel Services
  // ========================================================================= //

  // $(".movie-carousel").owlCarousel({
  //   autoplay: false,
  //   loop: false,
  //   margin: 20,
  //   dots: false,
  //   nav: false,
  //   responsiveClass: false,
  //   responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 4 } }
  // });

  // ========================================================================= //
  //  magnificPopup
  // ========================================================================= //

  var magnifPopup = function() {
    $(".popup-img").magnificPopup({
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-with-zoom",
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: "ease-in-out", // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        }
      }
    });
  };

  // Call the functions
  magnifPopup();
});

// ========================================================================= //
//  Porfolio isotope and filter
// ========================================================================= //
$(window).load(function() {
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-thumbnail",
    layoutMode: "fitRows"
  });

  $("#portfolio-flters li").on("click", function() {
    $("#portfolio-flters li").removeClass("filter-active");
    $(this).addClass("filter-active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });
});

// ========================================================================= //
//  Porfolio get in touch
// ========================================================================= //
$(document).ready(function() {
  $("#submit").click(function() {
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var subject = $("#subject").val();

    // $.ajax({
    //   type: "POST",
    //   url: "https://mandrillapp.com/api/1.0/messages/send.json",
    //   data: {
    //     key: "70084c3e044da93014902064f75c5e2b-us4",
    //     message: {
    //       from_email: email,
    //       to: [
    //         {
    //           email: "pooya.nodehi@gmail.com",
    //           name: name,
    //           type: "to"
    //         }
    //       ],
    //       autotext: "true",
    //       subject: subject,
    //       html: message
    //     }
    //   }
    // }).done(function(response) {
    //   console.log(response); // if you're into that sorta thing
    // });

    // window.location.href = "mailto:pooya.nodehi@dmail.com";

    // $(".contactForm")[0].reset(); // To reset form fields on success.

    console.log(name, email, message, subject);
  });
  function sendMail() {}
});
