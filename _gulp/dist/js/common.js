'use strict'

// Document ready
$(document).on('ready', function(){

    // E-mail Ajax Send
    // Documentation & Example: https://github.com/agragregra/uniMail
    $(document).on('beforeSubmit', "form.subscription__form", function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "/subs/submit.json", //Change
            data: th.serialize()
        }).done(function(data) {
            if (data.validate) {
                alert(data.massage);
            }
        });
        return false;
    });

    // Magnific popup gallery
    $('.gallery').each(function() {
        $(this).magnificPopup({
            delegate: '.gallery-item',
            type: 'image',
            gallery:{
                enabled:true
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

    mainSliderTop();
    headerScroll();
    headerCart();
    menuNavigation();
    menuImg();
    menuMobile();
    phoneMask();

    $('.selectric').selectric();

    productGallery();
    formRating();
    sticky();
    footerToggle();

    // Chrome Smooth Scroll
    try {
        $.browserSelector();
        if($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch(err) {

    };
});

$(window).on('load', function() {
    $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() {
    var header = $('.header');
    var shadow = $('.shadow-background');
    var cart = header.find('.header__cart');
    var width = $(window).width();

    headerScroll();

    if (header.hasClass('header--main is-scroll') && cart.hasClass('is-open') && !shadow.hasClass('is-open')) {
        shadow.addClass('is-open')
    } else if (!header.hasClass('is-scroll') && header.hasClass('header--main') && cart.hasClass('is-open') && shadow.hasClass('is-open') && width > 1199) {
        shadow.removeClass('is-open')
    }
});

$(window).on('resize', function() {
    var header = $('.header');
    var shadow = $('.shadow-background');
    var cart = header.find('.header__cart');
    var menu = $('.menu__mobile');
    var width = $(window).width();

    if (!header.hasClass('is-scroll') && header.hasClass('header--main') && cart.hasClass('is-open') && shadow.hasClass('is-open') && width > 1199) {
      shadow.removeClass('is-open')
    } else if (cart.hasClass('is-open') && !shadow.hasClass('is-open') && width <= 1199) {
        shadow.addClass('is-open')
    }

    menuNavigation();
    menuImg();

    if (width > 1199) {
      $('.menu__mobile').attr('style', '');
      $('.menu__mobile').find('ul').attr('style', '');
      $('.menu__mobile').find('.is-active').removeClass('is-active');
      $('.menu__mobile.is-active').removeClass('is-active');
      $('.header__mobile').removeClass('is-active');
      $('body').attr('style', '');
    }

});

function mainSliderTop(){
  $('.main-sliderTop').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    dots: true,
    // autoplay: true,
    // autoplaySpeed: 3000,
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

function headerCart() {
    var header = $('header.header');
    var shadow = $('.shadow-background');
    var cart = header.find('.header__cart');
    var cartPopup = cart.find('.header__cart-popup');
    var cartTop = cart.find('.header__cart-top');
    var div2 = $('.menu__div2');
    var li1 = $('.menu__li1');
    var menu = $('.menu__mobile');

    cartTop.on('mouseover', function(e) {
        e.preventDefault();
        console.log(e);
        e.stopPropagation();
        var width = $(window).width();
        var _this = $(this);

        if (width > 1199) {
          if (header.hasClass('header--inside') && !cart.hasClass('is-open') && !shadow.hasClass('is-open')) {
            cart.addClass('is-open');
            shadow.addClass('is-open');
          } else if (header.hasClass('is-scroll') && !cart.hasClass('is-open') && !shadow.hasClass('is-open')) {
            cart.addClass('is-open');
            shadow.addClass('is-open');
          } else if (!header.hasClass('is-scroll') && !cart.hasClass('is-open') && !shadow.hasClass('is-open')) {
            cart.addClass('is-open');
            shadow.removeClass('is-open');
          }

          div2.removeClass('is-open');
          li1.removeClass('is-active');
          shadow.removeClass('is-open');
          header.removeClass('is-bg');
        }
    });

    cartTop.on('click', function(e) {
        e.preventDefault();
        console.log(e);
        e.stopPropagation();
        var width = $(window).width();
        var _this = $(this);

        if (width <= 1199) {
          if (header.hasClass('is-scroll') && !cart.hasClass('is-open') && !shadow.hasClass('is-open')) {
            cart.addClass('is-open');
            shadow.addClass('is-open');
            $('body').attr('style', 'overflow: hidden;');
          } else if (!header.hasClass('is-scroll') && !cart.hasClass('is-open') && !shadow.hasClass('is-open')) {
            cart.addClass('is-open');
            shadow.addClass('is-open');
            $('body').attr('style', 'overflow: hidden;');
          } else {
            cart.removeClass('is-open');
            shadow.removeClass('is-open');
            $('body').attr('style', '');
          }

          // div2.removeClass('is-open');
          // li1.removeClass('is-active');
          // shadow.removeClass('is-open');
          // header.removeClass('is-bg');
        }
    });

    $('.header__cart-close').on('click', function(){
      cart.removeClass('is-open');
      shadow.removeClass('is-open');
      $('body').attr('style', '');
    });

    cartPopup.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    /*    $(document).on('click', '[data-role=cart-buy-button]', function (e) {
            $(cart).fadeTo('fast', 0).fadeTo('fast', 1);
        });*/

    $(cartPopup).on('click', 'a.dartc-cart-delete-button', function (e) {
        e.preventDefault();

        var self = this,
            url = jQuery(self).data('url'),
            elementId = jQuery(self).data('id');

        dartc.cart.deleteElement(elementId, url);

        return false;
    });

    $(cartPopup).on('click', 'a.dartc-cart-delete-button', function (e) {
        e.preventDefault();

        var self = this,
            url = jQuery(self).data('url'),
            elementId = jQuery(self).data('id');

        dartc.cart.deleteElement(elementId, url);

        return false;
    });

    $(document).on('click', function () {
        if (cart.hasClass('is-open')) {
            cart.removeClass('is-open');
            shadow.removeClass('is-open');
            $('body').attr('style', '');
        }
    });

    if ( $('.dartc-cart-count').html() === '0') {
        $('.dartc-cart-count').hide();
        $('#nous-checkout-info').hide();
    } else {
        $('.dartc-cart-count').show();
        $('#nous-checkout-info').show();
    }


    $('.dartc-cart-count').bind("DOMSubtreeModified", function() {

        if ( $(this).html() === '0') {
            $('.dartc-cart-count').hide();
            $('#nous-checkout-info').hide();
        } else {
            $('.dartc-cart-count').show();
            $('#nous-checkout-info').show();
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
  var header = $('.header--main');

  li1.each(function(){
    var _this = $(this);

    _this.on('mouseover', function(e){
      // e.stopPropagation();
      var width = $(window).width();
      if (width > 1199) {
        cart.removeClass('is-open');
        shadow.removeClass('is-open');
        li1.removeClass('is-active');
        div2.removeClass('is-open');
        // header.removeClass('is-bg');


        header.addClass('is-bg');
        shadow.addClass('is-open');
        _this.addClass('is-active');
        _this.find(div2).addClass('is-open');
      }
    });

    menu.on('mouseover', function(e){
      e.stopPropagation();
    });
  });

  $(document).on('mouseover', function(){
    div2.removeClass('is-open');
    li1.removeClass('is-active');
    header.removeClass('is-bg');
    shadow.removeClass('is-open');
    cart.removeClass('is-open');
    $('body').attr('style', '');
  });

  cart.on('mouseover', function(e){
    e.preventDefault();
    e.stopPropagation();
  });

  $('.header').on('mouseover', function(e){
    e.preventDefault();
    e.stopPropagation();
  });
}

function menuMobile(){
    var btn = $('.header__mobile');
    var menu = $('.menu__mobile');
    var i = $('.menu__mobile i');

    btn.on('click', function(){
        $(this).toggleClass('is-active');
        menu.stop().toggleClass('is-active');
        $('body, html').toggleClass('is-fixed');
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
            _this.on('mouseover', function(e){
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
    dots: true,
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
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.single-product__gallery-carousel-big',
    dots: false,
    // centerMode: true,
    focusOnSelect: true,
    vertical: true,
    // touchMove: false,
    arrows: false,
    centerPadding: '75px',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          centerPadding: '20px'
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 6,
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

function flyToElement(flyer, flyingTo) {
    var $func = $(this);
    var divider = 5;
    var flyerClone = $(flyer).clone();
    $(flyerClone).css({position: 'absolute', top: $(flyer).offset().top + "px", left: $(flyer).offset().left + "px", opacity: 1, 'z-index': 1000});
    $('body').append($(flyerClone));
    var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width()/divider)/2;
    var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(flyer).height()/divider)/2;

    $(flyerClone).animate({
            opacity: 0.1,
            left: gotoX,
            top: gotoY,
            width: $(flyer).width()/divider,
            height: $(flyer).height()/divider
        }, 1200,
        function () {
            $(flyingTo).fadeOut('fast', function () {
                $(flyingTo).fadeIn('fast', function () {
                    $(flyerClone).fadeOut('fast', function () {
                        $(flyerClone).remove();
                    });
                });
            });
        });
}

function sticky(){
  var header = $('.header--product');
  var tab = $('.single-product__nav');
  var body = $('.single-product__tab');
  var tabTop = tab.offset().top;

  if (header.length <= 0) return;

  var position = $(window).scrollTop() - tabTop;
  if (position >= 0) {
    header.css({
      top: -(position+header.height())
    });
    tab.stick_in_parent();
  }

  $(window).on('scroll', function(){
    var position = $(window).scrollTop() - tabTop;

    // top:m<0?-109:m>109?0:m-109
    tab.stick_in_parent();
    header.css({
      top: position<-header.height()?0:position>0?-header.height():-(position+header.height())
    });
  })

}

function footerToggle(){
  var dt = $('.footer dt');
  dt.each(function(){
    var _this = $(this);
    _this.on('click', function(e){
      e.preventDefault();
      var parent = _this.parent();
      if (parent.hasClass('active')) {
        parent.removeClass('active').addClass('false');
      } else {
        parent.removeClass('false').addClass('active');
      }
    });
  });
}
