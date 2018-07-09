"use strict";
$(document).ready(function( ) {

    $(".time1").datetimepicker({
        format: 'Y-m-d g:i a'
    });
    $(".productQuantity-box").click(function(e) {
        var offset = $(this).offset();
        var relativeX = (e.pageX - offset.left- $('.xdsoft_datetimepicker').width()/2);
        var relativeY = (e.pageY - offset.top+50);
        $('.xdsoft_datetimepicker').css({"top":relativeY, "left":relativeX});
        console.log("X: " + relativeX + "  Y: " + relativeY);
    });




    $('.mapAdress').click(function (event) {
        console.log('dfhjs');
        var thisis = $(this).attr('id');
        var templateDir = "/img/favicon/png_fav.png";
        var templateDir1 = "/img/favicon/flag-green.png";
        var chefs = [
            {
                id: "1",
                name: "Катерина Константиновна",
                latitude: 47.827558,
                longitude: 35.1609022,
                adress: "пр.Соборный,102",
                link: "/chef-card.html"
               
            },
            {
                id: "2",
                name: "Константин Констанинопольский",
                latitude: 47.8199447,
                longitude: 35.1700849,
                adress: "пр.Соборный,85",
                link: "/chef-card.html"

            },
            {
                id: "3",
                name: "Джеки Чак",
                latitude: 47.818412,
                longitude: 35.1723803,
                adress: "пр.Соборный,65",
                link: "/chef-card.html",
                food: ["рис по флотски", "карась под шубой"]
            },
            {
                id: "4",
                name: "Арнольд Шварцнегер ",
                latitude: 47.808126,
                longitude: 35.1843108,
                adress: "пр.Соборный,102",
                link: "/chef-card.html",
                food: ["отбивные по почкам", "гуляш по коридору"]
            },
            {
                id: "5",
                name: "Арнольд Шварцнегер ",
                latitude: 47.808126,
                longitude: 35.1843108,
                adress: "пр.Соборный,102",
                link: "/chef-card.html",
                food: ["отбивные по почкам", "гуляш по коридору"]
            }
        ];
        function activeMap() {
            console.log('ghf');
            var centLat = 0;
            var centLon = 0;

            chefs.forEach(function (item) {
                centLat += item.latitude;
                centLon += item.longitude;
            })
            var element = document.getElementById('map');

            var icon = {
                url: templateDir,
                scaledSize: new google.maps.Size(60, 60)
            };



            var myMap;

            function addMarker(props) {
                var marker = new google.maps.Marker({
                    position: props.latlng,
                    map: myMap,
                    icon: icon,
                    animation: google.maps.Animation.DROP
                });
                var infowindow = new google.maps.InfoWindow({
                    content: props.info
                });
                marker.addListener('click', function () {
                    infowindow.open(myMap, marker);
                });
            }

            chefs.forEach(function (item, index) {


                if( item.id == thisis){
                    var info = '<a style="color: red;text-decoration: underline " href="' + item.link + '">'+item.name+'</a>'+"<br>"+""+item.adress+"";
                    var options = {
                        zoom: 18,
                        scrollwheel: false,
                        center: {lat: item.latitude, lng: item.longitude,}
                    };
                    myMap = new google.maps.Map(element, options, icon);
                    addMarker({
                        latlng: {lat: item.latitude, lng: item.longitude},
                        info: info,
                    });
                }

            })


        }
        activeMap();

        event.preventDefault();
    })

    $(".myLocation").click(function (event) {
        localStorage.setItem('findPlace', '');
        navigator.geolocation.getCurrentPosition(function (a) {
            localStorage.setItem('myLat', a.coords.latitude);
            localStorage.setItem('myLon', a.coords.longitude);
        });
        var res = $(this).attr("data-src");
        setTimeout(function () {
            window.location.href = res;
        },100);

        event.preventDefault();


    })

    $('.tabs-content form').submit(function () {
        return false;
    })
    $('.tabs-content form .findPlace').click(function () {
        localStorage.setItem('myLat', "");
        localStorage.setItem('myLon', "");
        localStorage.setItem('findPlace', $("#newLocation").val());
        var res = $(this).attr("data-src");
        setTimeout(function () {
            window.location.href = res;
        },100)
    })


    $("#menu").mmenu(
        {
            "extensions": [

                "theme-dark",
                "pagedim-black"
            ],

            "offCanvas": {
                "position": "right",
                "zposition" : "next"

            }
        }
    );
    $(window).scroll(function () {
        if($(this).scrollTop()>400){
              $(".header1").addClass("show-menu");
        }
        else {
          $(".header1").removeClass("show-menu");
        }
    });
    $('.catalog-button').click(function () {
        $(this).toggleClass('hover-effect');
        $(".open-catalog .open-catalog-parent").slideToggle({
            duration: 'slow'

        });

    });
    $('.add').click(function () {
        var stop =80;
        $('.add').not(this).removeClass('add-minus');
        $('.faq-content').not($(this).parent().children('.faq-content')).slideUp({
            duration: 'slow'
        });
        $(this).toggleClass('add-minus');
        $(this).parent().children('.faq-content').slideToggle({
            duration: 'slow'
        });
         var res = 1;
        var stopSet = setInterval(function (params) {
            $(".scroll-container").getNiceScroll().resize();
            res++;
            if(res>stop){
                clearInterval(stopSet);
            }

        },10)
    });

    $('input[type="radio"]').change(function () {
        var res = 1;
        var stopSet = setInterval(function (params) {
            $(".scroll-container").getNiceScroll().resize();
            res++;
            if(res>stop){
                clearInterval(stopSet);
            }

        },10)
    })
    $('.cart-button').click(function () {
        $(this).toggleClass('cart-button1');
        $('.shopping-cart').toggleClass('open');
    })
    $('.cl').click(function () {
        $('.form-sec').removeClass('formShow');
        $('.form-sec').removeClass('formShow1');
    })



    $(".change-language p").click(function () {
        var val=$(this).clone();
        $(".language-block").html(val);
    });

    function showForm(button, form , addclass) {
        $(button).click(function () {
$('.form-sec').removeClass("formShow");
            $(form).addClass(addclass);
            return false;
        })
        $(form).click(function (e) {
            if ( e.target.classList[0] == "form-sec" ){
                $(form).removeClass(addclass);
            }
        })
    }
    showForm('.mapAdress', '.serv-map', 'formShow1' );
    showForm('.chef-b', '.chef', 'formShow' );
    showForm('.serv-b', '.serv', 'formShow' );
    showForm('.serv-v', '.serv-video', 'formShow' );
    showForm('.serv-gr', '.serv-time', 'formShow' );
    showForm('.serv-fv', '.serv-add', 'formShow' );
    $('.about-button').click(function () {
        $('.about').css('display','block');
        $('.left-content').css('display','none');
        $(this).css('display','none');
    })
    $('.about-beck').click(function () {
        $('.about').css('display','none');
        $('.left-content').css('display','block');
        $('.about-button').css('display','block');
    })
    $('.feedback-form').on('submit', function(evt){
        var http = new XMLHttpRequest(), f = this;
        var parameter = $(this).attr('data-parameter');
        var site='';
        if(f.site){
            site=f.site.value;
        }
        http.open("POST", "http://www.mychef.com.ua/contacts.php", true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send($( this ).serialize());
        evt.preventDefault();
        location.reload();


    });
/////////////////////////////////////////////////////////

    /////////////////line-effect///////////////
    $(window).scroll(function() {
        $('.title').each(function(){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 500) {
                $(this).addClass('title-new');
            }
        });
    })
    /////////////////////video-block///////////////
    $('.slider-second').slick({
        infinite: true,
        slidesToShow: 1,
        prevArrow:'<button class="prev"></button>',
        nextArrow:'<button class="next"></button>',
        dots: true

    });

    ///////////////////favorite-slider///////////

    $('.favorite-slider').slick({
        slidesToShow: 4,
        prevArrow:'<button class="prev"></button>',
        nextArrow:'<button class="next"></button>',
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 2,

                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 620,
                settings: {

                    slidesToShow: 1,

                }
            }

        ]
    }).on('breakpoint', function () {
        console.log('sdfsdfsd');
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    $('.big').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        asNavFor: '.small',
        adaptiveHeight: true,
        prevArrow:'<button class="prev"></button>',
        nextArrow:'<button class="next"></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {

                }
            },
            {
                breakpoint: 1062,
                settings: {


                }
            },
            {
                breakpoint: 768,
                settings: {

                }
            }

        ]
    });
    $('.small').slick({
        slidesToShow:3,
        slidesToScroll: 1,
        asNavFor: '.big',
        dots: false,
        focusOnSelect: true,
        centerPadding: '40px',
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow:3
                }
            }


        ]
    });
    ////////////////////////////////////////
    // poste
    // r frame click event
    $(document).on('click','.js-videoPoster',function(ev) {
        ev.preventDefault();
        var $poster = $(this);
        var $wrapper = $poster.closest('.js-videoWrapper');
        videoPlay($wrapper);
    });

///////////////////////iframe-style//////////////
    function videoPlay($wrapper) {
        var $iframe = $wrapper.find('.js-videoIframe');
        var src = $iframe.data('src');
        $wrapper.addClass('videoWrapperActive');
        $iframe.attr('src',src);
    }

    function videoStop($wrapper) {
        if (!$wrapper) {
            var $wrapper = $('.js-videoWrapper');
            var $iframe = $('.js-videoIframe');
        } else {
            var $iframe = $wrapper.find('.js-videoIframe');
        }
        $wrapper.removeClass('videoWrapperActive');
        $iframe.attr('src','');
    }
    //////////////////////like////////////////
    $('.like-input').on('change',function () {
        $(this).parent().toggleClass('like');
    })
    /////////////////stars/////////////////////
    $('.rating1 input').change(function () {
        var $radio = $(this);
        $('.rating1 .selected').removeClass('selected');
        $radio.closest('label').addClass('selected');
    });
/////////////////scroll-style///////////////////
    $(".scroll-container").niceScroll({
        cursorcolor: "#fff",
        cursoropacitymin: 0.3,
        background: "#737373",
        cursorborder: "0",
        autohidemode: false,
        cursorminheight: 30
    });
    $(".over-main").niceScroll({
        cursorcolor: "#b3b3b3",
        cursoropacitymin: 0.3,
        background: "#e5e5e5",
        cursorborder: "0",
        autohidemode: false,
        cursorminheight: 30
    });
    $(".form-sec").niceScroll({
        cursorcolor: "#b3b3b3",
        cursoropacitymin: 0.3,
        background: "#e5e5e5",
        cursorborder: "0",
        autohidemode: false,
        cursorminheight: 30
    });
    $('.filter .filter-button').click(function () {
        $(this).toggleClass('filter-button-n');
    })


        // $(".dtBox").DateTimePicker();


    $(".scroll-container").getNiceScroll().resize();
    $(document).scroll(function() {

        $(".scroll-container").getNiceScroll().resize();
    })
    // $(".scroll-box").niceScroll({
    //     cursorcolor: "#fff",
    //     cursoropacitymin: 0.3,
    //     background: "#737373",
    //     cursorborder: "0",
    //     autohidemode: false,
    //     cursorminheight: 30
    // });
    //
    // $(".scroll-box").getNiceScroll().resize();
    // $("html").mouseover(function() {
    //     $(".scroll").getNiceScroll().resize();
    // });
    ///////////////////////////add cart//////////////////////////
    var input = $('.in'),
        input_val = parseInt(input.val()),
        btn_add = $('.add'),
        btn_remove = $('.remove');

    input.keyup(function(e)  {
        var res = $(this);
        res = parseInt(input.val());

        var x = event.charCode || event.keyCode;
        if(x > 96 && x < 106 ){
            $(this).val(res).change();
        }
        else if( x > 48 && x < 58){
            $(this).val(res).change();

        }
        else if( x == 8 ){
            res = '';
            $(this).val(res).change();

        }
        else{
            res = 1;
            $(this).val(res).change();
        }

    });


    btn_add.click(function(e) {
        var inputVal = $(this).parent().children('.in').val();
        if (e.shiftKey) {
            inputVal += 10
        } else {
            inputVal++
        }
        $(this).parent().children('.in').val(inputVal).change();
    });

    btn_remove.click(function(e) {
        var inputVal = $(this).parent().children('.in').val();

        if (inputVal > 11 && e.shiftKey) {
            inputVal -= 10
        } else if (inputVal > 1) {
            inputVal --
        }
        $(this).parent().children('.in').val(inputVal).change();

    });
/////////////////////////////////////////////
    // count plus/minus
})
/////////////////////////////acrt///////////////////
var taxRate = 0.05;
var shippingRate = 15.00;
var fadeTime = 300;


/* Assign actions */
// $('.product-quantity input').change( function() {
//     updateQuantity(this);
// });
//
// $('.product-removal button').click( function() {
//     removeItem(this);
// });


/* Recalculate cart */
function recalculateCart()
{
    var subtotal = 0;

    /* Sum up row totals */
    $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#cart-shipping').html(shipping.toFixed(2));
        $('#cart-total').html(total.toFixed(2));
        if(total == 0){
            $('.checkout').fadeOut(fadeTime);
        }else{
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function() {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}


/* Remove item from cart */
function removeItem(removeButton)
{
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
    });
}

///////////////////////////catalog////////////////////////////
$('.check-filter label input:checked').parent().addClass('checked');
$('.check-filter label input').click(function () {
    $('.check-filter label input[type="radio"]').parent().removeClass('checked');
    if($(this).is(':checked')){
        $(this).parent().addClass('checked');
    }else{
        $(this).parent().removeClass('checked');
    }

});
$(".del-box .delete input").change(function () {
    $(this).parent().parent().css('display','none');
})

$('.del-but').click(function () {
    $('.del-but').removeClass('active');
    $(this).addClass('active');
})
/////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////

//////////////////////////////////////////
////////////////////////////////////////////
///////////////////////////////////////
$('.circle-box:nth-child(1)').click(function () {
   $(".enter-box").attr("data-step","1");
})
$('.circle-box:nth-child(2)').click(function () {
    $(".enter-box").attr("data-step","2");
})
$('.circle-box:nth-child(3)').click(function () {
    $(".enter-box").attr("data-step","3");
})


// var t  = prompt('hello', 'by');;
// console.log(t);
//////////////////////select-sort//////////////////////////////
$(".custom-select").each(function() {
    var classes = $(this).attr("class"),
        id      = $(this).attr("id"),
        name    = $(this).attr("name");
    var template =  '<div class="' + classes + '">';
    template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
    template += '<div class="custom-options">';
    $(this).find("option").each(function() {
        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
    });
    template += '</div></div>';

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
});
$(".custom-option:first-of-type").hover(function() {
    $(this).parents(".custom-options").addClass("option-hover");
}, function() {
    $(this).parents(".custom-options").removeClass("option-hover");
});
// $('html').on('click',function() {
//     $(".custom-select").removeClass("opened");
// });
$(document).click(function(event) {
    // if ($(event.target).closest('.custom-select').length) return;
    // $(this).deleteClass("opened");
    // event.stopPropagation();
    // console.log(5464);
    $('.custom-select').removeClass("opened");
   $('.open-change-city').removeClass("open-change-city-show");
});
$(document).click(function (e){ // событие клика по веб-документу
    var div = $(".open-search-block"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
        $('.open-search-box').removeClass('open-search-box-show'); // скрываем его
    }
});
// if ($(event.target).closest('.block').length){
//
// }
$(".custom-select").on("click", function(event) {
    $(this).toggleClass("opened");
    event.stopPropagation();
});
$('.city-box').on("click", function (event) {
    $('.open-change-city').toggleClass('open-change-city-show');
    event.stopPropagation();
});
$('.search-button').click(function () {
    $('.open-search-box').toggleClass('open-search-box-show');
    event.stopPropagation();
});
$(".custom-option").on("click", function() {
    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
});


function sortQuantity(what, where, quantity) {
    $(what).each(function (a,b) {
        if(a>quantity-1){
            $(where).append(b);

        }

    })
}
sortQuantity('.catalog-sort-chefs .favorite-cart ','.continue-box-catalog-chefs',6);
sortQuantity('.catalog-sort .favorite-cart ','.continue-box-catalog',9);
if($(document).width()<1200){
sortQuantity('.catalog-sort .favorite-cart ','.continue-box-catalog',6);
    sortQuantity('.catalog-sort-chefs .favorite-cart ','.continue-box-catalog-chefs',2);
 }


if (document.querySelector('.cart-block__amount-sum')) {
    (function () {
        'use-strict';
        var counts = document.querySelectorAll('.cart-block__amount-sum');

        var _loop = function _loop(i) {
            counts[i].querySelector('.minus').addEventListener('click', function (e) {
                e.preventDefault();
                var thisValue = counts[i].querySelector('input').value;
                if (thisValue > 1) {
                    counts[i].querySelector('input').value = thisValue - 1;
                }
            });

            counts[i].querySelector('.plus').addEventListener('click', function (e) {
                e.preventDefault();
                var thisValue = counts[i].querySelector('input').value;
                counts[i].querySelector('input').value = +thisValue + 1;
            });

            // prevent input not numbers
            counts[i].querySelector('input').addEventListener('input', function () {
                this.value = this.value.replace(/\D/gi, '').replace(/^0+/, '');
            });

            document.body.addEventListener('click', function () {
                var thisValue = counts[i].querySelector('input').value;
                if (!thisValue) {
                    counts[i].querySelector('input').value = 1;
                }
            });
        };

        for (var i = 0; i < counts.length; ++i) {
            _loop(i);
        }
    })();

}


/////////////////////// activate input search////////////////////////////

