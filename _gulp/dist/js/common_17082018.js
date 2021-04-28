'use strict'

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  mainSlider();
  headerScroll();
  headerCart();
  menuNavigation();
  menuImg();
  menuMobile();
  phoneMask();

  $('.selectric').selectric();

  productGallery();
  formRating();
  productNumberTest();

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  // $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() {
  var header = $('.header');
  var shadow = $('.shadow-background');
  var cart = header.find('.header__cart');
  var width = $(window).width();

  headerScroll();

  if (header.hasClass('is-scroll') && cart.hasClass('is-open') && !shadow.hasClass('is-open')) {
    shadow.addClass('is-open');
  } else if (!header.hasClass('is-scroll') && cart.hasClass('is-open') && shadow.hasClass('is-open') && width > 1199) {
    shadow.removeClass('is-open');
  }

});
$(window).on('resize', function() {
  var header = $('.header');
  var shadow = $('.shadow-background');
  var cart = header.find('.header__cart');
  var menu = $('.menu__mobile');
  var width = $(window).width();

  if (!header.hasClass('is-scroll') && cart.hasClass('is-open') && shadow.hasClass('is-open') && width > 1199) {
    shadow.removeClass('is-open');
  } else if (cart.hasClass('is-open') && !shadow.hasClass('is-open') && width <= 1199) {
    shadow.addClass('is-open');
  }

  menuNavigation();
  menuImg();

  if (width > 1199) {
    $('.menu__mobile').attr('style', '');
    $('.menu__mobile').find('ul').attr('style', '');
    $('.menu__mobile').find('.is-active').removeClass('is-active');
  }

});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function mainSlider(){
  $('.main-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false
  })
}

function headerScroll(){
  var header = $('.header');
  var shadow = $('.shadow-background');
  var width = $(window).width();

  if ($(window).scrollTop() > 0) {
    header.addClass('is-scroll');
  } else {
    header.removeClass('is-scroll');
  }
}

function headerCart(){
  var header = $('header.header');
  var shadow = $('.shadow-background');
  var cart = header.find('.header__cart');
  var cartPopup = cart.find('.header__cart-popup');
  var cartTop = cart.find('.header__cart-top');
  var div2 = $('.menu__div2');
  var li1 = $('.menu__li1');
  var menu = $('.menu__mobile');

  cartTop.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    var width = $(window).width();
    var _this = $(this);

    if (width > 1199) {
      if (header.hasClass('is-scroll') && !cart.hasClass('is-open') && !shadow.hasClass('is-open')) {
        cart.addClass('is-open');
        shadow.addClass('is-open');
      } else if (!header.hasClass('is-scroll') && !cart.hasClass('is-open') && !shadow.hasClass('is-open')) {
        cart.addClass('is-open')
        shadow.removeClass('is-open');
      } else {
        cart.removeClass('is-open');
        shadow.removeClass('is-open');
      }
    } else if (width <= 1199) {
      if (header.hasClass('is-scroll') && !cart.hasClass('is-open') && !shadow.hasClass('is-open')) {
        cart.addClass('is-open');
        shadow.addClass('is-open')
      } else if (!header.hasClass('is-scroll') && !cart.hasClass('is-open') && !shadow.hasClass('is-open')) {
        cart.addClass('is-open');
        shadow.addClass('is-open');
      } else {
        cart.removeClass('is-open');
        shadow.removeClass('is-open');
      }
    }

    div2.removeClass('is-open');
    li1.removeClass('is-active');
  });

  cartPopup.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
  });

  $(document).on('click', function(){
    if (cart.hasClass('is-open')) {
      cart.removeClass('is-open');
      shadow.removeClass('is-open');
    }
  });
}

function menuNavigation(){
  var menu = $('.header__navigation');
  var a1 = menu.find('.menu__a1');
  var div2 = $('.menu__div2');
  var li1 = $('.menu__li1');
  var shadow = $('.shadow-background');
  var cart = $('.header__cart');

  // a1.each(function(){
  //   var _this = $(this);
  //   var li1 = _this.parent('.menu__li1');
  //   var div2 = _this.next('.menu__div2');
  //
  //   _this.on('hover', function(e){
  //     e.preventDefault();
  //     $('.menu__div2').removeClass('is-open');
  //     $('.menu__li1').removeClass('is-active');
  //     cart.removeClass('is-open');
  //     shadow.removeClass('is-open');
  //
  //     if (li1.hasClass('is-active') && div2.hasClass('is-active')) {
  //       li1.removeClass('is-active');
  //       div2.removeClass('is-open');
  //     } else {
  //       li1.addClass('is-active')
  //       div2.addClass('is-open');
  //     }
  //   });
  // });
  //
  // $(document).on('click', function(){
  //   div2.removeClass('is-open');
  //   li1.removeClass('is-active');
  // });
  //
  // div2.on('click', function(e){
  //   e.preventDefault();
  //   e.stopPropagation();
  // });
  // li1.on('click', function(e){
  //   e.preventDefault();
  //   e.stopPropagation();
  // });

}

function menuMobile(){
  var btn = $('.header__mobile');
  var menu = $('.menu__mobile');
  var i = $('.menu__mobile i');

  btn.on('click', function(){
    menu.stop().slideToggle(300);
  });

  i.each(function(){
    var _this = $(this);
    _this.on('click', function(){
      _this.stop().next('ul').slideToggle(300);
      _this.parent('li').toggleClass('is-active');
    });
  });
}

function menuImg() {
  var width = $(window).width();
  var block = $('.menu__div2');
  var a = $('.menu__a2');

  block.each(function(){
    var _this = $(this);
    var a = _this.find('.menu__a2');
    var li = _this.find('.menu__li2');
    var img = _this.find('img');
    var active = _this.find('.menu__li2.active');

    if (active.length) {
      img.attr('src', active.find('a').data('img'));
    } else {
      img.attr('src', a.eq(0).data('img'));
    }

    a.each(function(){
      var _this = $(this);
      _this.on('hover', function(e){
        li.removeClass('active');
        _this.parents('.menu__ul2').next('img').attr('src', _this.data('img'));
      });
    });
  });
}

function phoneMask(){
	var phone = $('.phone-mask');
	phone.each(function(){
		$(this).mask("+38 (999) 999 99 99");
	})
}

function productGallery(){
  $('.single-product__gallery-carousel-big').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dots: false,
    asNavFor: '.single-product__gallery-carousel-left',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          dots: true
        }
      }
    ]
  });
  $('.single-product__gallery-carousel-left').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.single-product__gallery-carousel-big',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    vertical: true,
    arrows: false,
    centerPadding: '75px',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          centerPadding: '20px'
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          centerPadding: '52px'
        }
      }
    ]
  });
}

function formRating(){
  $(".form-rating-block input:radio").attr("checked", false);
  $('.form-rating-block input').click(function () {
      $(".form-rating-block span").removeClass('checked');
      $(this).parent().addClass('checked');
  });
}

function productNumberTest(){
  var body = $('.cart__number');

  body.each(function(){
    var _this = $(this);
    var plus = _this.find('.cart__number-plus');
    var minus = _this.find('.cart__number-minus');
    var input = _this.find('input');

    plus.on('click', function(e){
      e.preventDefault();
      var number = parseFloat(input.val());

      if (number >= 0) {
        input.val(number + 1)
      } else {
        input.val(0)
      }
    })
    minus.on('click', function(e){
      e.preventDefault();
      var number = parseFloat(input.val());

      if (number > 0) {
        input.val(number - 1)
      } else {
        input.val(0)
      }
    })
  })

}
