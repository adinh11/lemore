(function ($) {
    'use strict';

    // ****************************
    // Preloader Active Code
    // ****************************

    document.addEventListener("DOMContentLoaded", function(event) {
        $('#preloader').fadeOut('1000', function () {
            $(this).remove();
        });
    });

})(jQuery);

$(document).ready(function () {
    'use strict';

    // ****************************
    // ClassyNav Active Code
    // ****************************

    if ($.fn.classyNav) {
        $('#letohNav').classyNav();
        // Close when click anywhere outside
        $('body').on('click', function (e) {
            if ($('.classy-menu').hasClass('menu-on')) {
                var cls_name = $(e.target).attr('class');
                if (cls_name != undefined
                    && !cls_name.includes('classy-menu')
                    && !cls_name.includes('classynav')
                    && !cls_name.includes('navbarToggler')
                    && !cls_name.includes('dd-trigger')
                    && !cls_name.includes('classy-navbar-toggler'))
                {
                    $('.classycloseIcon').click();
                }
            }
        });
    }

    // ***************************
    // Single Project Slide
    // ***************************

    $(".single-project-slide").on("mouseenter", function () {
        $(".single-project-slide").removeClass("active");
        $(this).addClass("active");
    });

    // *********************************
    // Welcome Slides Active Code
    // *********************************

    if ($.fn.owlCarousel) {
        var welcomeSlider = $('.welcome-slides');
        welcomeSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            nav: true
        })

        welcomeSlider.on('translate.owl.carousel', function () {
            var layer = $("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        welcomeSlider.on('translated.owl.carousel', function () {
            var layer = welcomeSlider.find('.owl-item.active').find("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });

        function welcomeSlide() {
            $('.owl-item').removeClass('prev next');
            var currentSlide = $('.welcome-slides .owl-item.active');
            currentSlide.next('.owl-item').addClass('next');
            currentSlide.prev('.owl-item').addClass('prev');
            var nextSlideImg = $('.owl-item.next').find('.single-welcome-slide').attr('data-img-url');
            var prevSlideImg = $('.owl-item.prev').find('.single-welcome-slide').attr('data-img-url');
            $('.owl-nav .owl-prev').css({
                background: 'url(' + prevSlideImg + ')'
            });
            $('.owl-nav .owl-next').css({
                background: 'url(' + nextSlideImg + ')'
            });
        }

        welcomeSlide();

        welcomeSlider.on('translated.owl.carousel', function () {
            welcomeSlide();
        });
    }

    // *********************************
    // Combo Slides Active Code
    // *********************************

    if ($.fn.owlCarousel) {
        function setOwlStageHeight(event) {
            // Get original width and height of the first image
            var naturalWidth = 1414;
            var naturalHeight = 2000;
            const img = new Image();
            img.onload = function() {
                naturalWidth = this.naturalWidth;
                naturalHeight = this.naturalHeight;
            };
            img.src = $('.combo-slides .single-combo-slide').first().attr('data-bg'); // Update src to load image
            
            // Update slide height
            const itemWidth = parseInt( $('.combo-slides .owl-item.active').first().width() );
            var itemHeight = itemWidth / naturalWidth * naturalHeight;
            $('.combo-slides .owl-stage-outer .single-combo-slide').css('height', itemHeight );
        }

        function reloadCombo() {
            var comboSlide = $('.combo-slides');
            var comboImages = $('.combo-images');
            if ($(window).width() >= 768) {
                comboImages.hide();
                comboSlide.owlCarousel({
                    margin: 0,
                    loop: true,
                    autoplay: true,
                    smartSpeed: 1500,
                    dots: false,
                    onInitialized: setOwlStageHeight,
                    onResized: setOwlStageHeight,
                    onTranslated: setOwlStageHeight,
                    responsive: {
                        768: {
                            items: 2
                        },
                        1200: {
                            items: 3
                        }
                    }
                });
            } else {
                comboSlide.trigger('destroy.owl.carousel');
                comboImages.show();
            }
        }

        reloadCombo();

        $(window).resize(function() {
            reloadCombo();
        });
    }      

    // *********************************
    // F&B Slides Active Code
    // *********************************
    
    if ($.fn.owlCarousel) {
        var fbsSlide = $('.fbs-slides');
        fbsSlide.owlCarousel({
            items: 4,
            margin: 0,
            loop: true,
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });
    }

    // *************************************
    // Testimonial Slides Active Code
    // *************************************
    
    if ($.fn.owlCarousel) {
        var sync1 = $('.testimonial-thumbnail');
        var sync2 = $('.testimonial-slides');
        var syncedSecondary = true;

        sync1.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            autoplay: true,
            smartSpeed: 500
        }).on('changed.owl.carousel', syncPosition);

        sync2
            .on('initialized.owl.carousel', function () {
                sync2.find(".owl-item").eq(0).addClass("current");
            })
            .owlCarousel({
                items: 1,
                dots: false,
                loop: true,
                smartSpeed: 1000,
                slideSpeed: 500,
                slideBy: 1,
                responsiveRefreshRate: 100
            }).on('changed.owl.carousel', syncPosition2);

        function syncPosition(el) {
            //if you set loop to false, you have to restore this next line
            //var current = el.item.index;
            //if you disable loop you have to comment this block
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - (el.item.count / 2) - .5);

            if (current < 0) {
                current = count;
            }
            if (current > count) {
                current = 0;
            }
            //end block

            sync2
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = sync2.find('.owl-item.active').length - 1;
            var start = sync2.find('.owl-item.active').first().index();
            var end = sync2.find('.owl-item.active').last().index();

            if (current > end) {
                sync2.data('owl.carousel').to(current, 1000, true);
            }
            if (current < start) {
                sync2.data('owl.carousel').to(current - onscreen, 1000, true);
            }
        }

        function syncPosition2(el) {
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - (el.item.count / 2) - .5);

            if (current < 0) {
                current = count;
            }
            if (current > count) {
                current = 0;
            }

            sync1
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = sync1.find('.owl-item.active').length - 1;
            var start = sync1.find('.owl-item.active').first().index();
            var end = sync1.find('.owl-item.active').last().index();

            if (current > end) {
                sync1.data('owl.carousel').to(current, 1000, true);
            }
            if (current < start) {
                sync1.data('owl.carousel').to(current - onscreen, 1000, true);
            }
        }
    }

    // *******************************
    // Rooms Slides Active Code
    // *******************************
    if ($.fn.owlCarousel) {
        var roomSlides = $('.rooms-slides');
        roomSlides.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            autoplay: true,
            smartSpeed: 1500,
            nav: true,
            navText: [('<i class="fa fa-long-arrow-left" aria-hidden="true"></i> Previous'), ('Next <i class="fa fa-long-arrow-right" aria-hidden="true"></i>')]
        });

        roomSlides.on('translate.owl.carousel', function () {
            var layer = $("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        roomSlides.on('translated.owl.carousel', function () {
            var layer = roomSlides.find('.owl-item.active').find("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });
    }

    // ***********************
    // Fix Owl Carousel touch
    // ***********************
    if ($.fn.owlCarousel) {
        $(".owl-carousel").on('drag.owl.carousel', function(e) {
            $(this).on('touchmove', function(e) {
                e.preventDefault();
            });
        }).on('dragged.owl.carousel', function(e) {
            $(this).off('touchmove');
        });
    }

    // ***********************
    // WOW Active Code
    // ***********************
    if ($(window).width() > 767) {
        new WOW().init();
    }

    // ****************************
    // Jarallax Active Code
    // ****************************
    if ($.fn.jarallax) {
        document.addEventListener('lazyloaded', function(e){
            if ($(e.target).attr("class").includes("jarallax")) {
                $('.jarallax').jarallax({
                    speed: 0.5
                });
            }
        });
    }

    // ****************************
    // Scrollup Active Code
    // ****************************
    if ($.fn.scrollUp) {
        $(window).scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="fa-solid fa-chevron-up"></i>'
        });
    }

    // *********************************
    // Prevent Default 'a' Click
    // *********************************
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });

    // *******************************
    // Nice Select Active Code
    // *******************************
    if ($.fn.niceSelect) {
        $('select').niceSelect();
    }

    // ********************************
    // Gallery
    // ********************************
    if ($.fn.homaly) {
        if($(".homaly-wrapper").length) {
            $(".homaly-wrapper").homaly({
                item_selector: "a.homaly_item",
                img_selector: "img.homaly_img",
                img_loaded_class: "homaly_loaded",
                img_height: 200,
                img_spacing: 0,
            }).init();
        }
    }

    // ********************************
    // Menu Scroll
    // ********************************
    var home_url = $("a.nav-brand").attr("href");
    var current_url = window.location.href.replace(/\/+$/, '');

    var scroll_to_target = function (target_selector) {
        if (target_selector == "body") {
            $('html, body').animate({
                scrollTop: $(target_selector).offset().top
            }, 0);
        }
        else {
            $('html, body').animate({
                scrollTop: $(target_selector).offset().top - 150
            }, 0);
        }
    }
    
    if (sessionStorage.getItem("scroll_target") != null) {
        scroll_to_target(sessionStorage.getItem("scroll_target"));
        sessionStorage.removeItem("scroll_target");
    }

    $('.classynav ul#nav li').on('click', function(event) {
        if (current_url != home_url) {
            if ($(this).hasClass("nav-item-home")) { sessionStorage.setItem("scroll_target", "body"); }
            else if ($(this).hasClass("nav-item-rooms")) { sessionStorage.setItem("scroll_target", "section.letoh-room-section"); }
            else if ($(this).hasClass("nav-item-services")) { sessionStorage.setItem("scroll_target", "section.letoh-services-section"); }
            else if ($(this).hasClass("nav-item-fb")) { sessionStorage.setItem("scroll_target", "section.letoh-fb-section"); }
            else if ($(this).hasClass("nav-item-location")) { sessionStorage.setItem("scroll_target", "section.letoh-location-section"); }
            else if ($(this).hasClass("nav-item-gallery")) { sessionStorage.setItem("scroll_target", "section.letoh-gallery-section"); }
            window.location.href = home_url;
        }
        else {
            if ($(this).hasClass("nav-item-home")) { scroll_to_target("body"); }
            else if ($(this).hasClass("nav-item-rooms")) { scroll_to_target("section.letoh-room-section"); }
            else if ($(this).hasClass("nav-item-services")) { scroll_to_target("section.letoh-services-section"); }
            else if ($(this).hasClass("nav-item-fb")) { scroll_to_target("section.letoh-fb-section"); }
            else if ($(this).hasClass("nav-item-location")) { scroll_to_target("section.letoh-location-section"); }
            else if ($(this).hasClass("nav-item-gallery")) { scroll_to_target("section.letoh-gallery-section"); }
        }
    });

    // ***********************
    // Cart
    // ***********************
    if ($('.letoh-check-availability-section').length) {
        // ***********************
        // Datepicker using Easepick
        // ***********************
        const picker = new easepick.create({
            element: "#checkIn",
            css: [
                window.location.origin + "/wp-content/themes/letoh/assets/css/easepick.min.css"
            ],
            zIndex: 10,
            format: "DD/MM/YYYY",
            RangePlugin: {
                elementEnd: "#checkOut",
                tooltipNumber(num) {
                    return num - 1;
                },
                locale: {
                    one: "night",
                    other: "nights"
                }
            },
            LockPlugin: {
                minDays: 2,
                minDate: new Date()
            },
            plugins: [
                "RangePlugin",
                "LockPlugin"
            ]
        });

        // ********************************
        // Check Availability
        // ********************************
        const DateTime = easepick.DateTime;
        const today = new DateTime();

        var set_default_dates = function () {
            picker.setStartDate(today);
            picker.setEndDate(today.clone().add(1, 'day'));
        }
        
        if (localStorage.getItem("check_in_date") != null && localStorage.getItem("check_out_date") != null) {
            var check_in_date = new DateTime(localStorage.getItem("check_in_date"), "DD/MM/YYYY");
            if (check_in_date.isBefore(today)) {
                set_default_dates();
            }
            else {
                picker.setStartDate(localStorage.getItem("check_in_date"));
                picker.setEndDate(localStorage.getItem("check_out_date"));
            }
        }
        else {
            set_default_dates();
        }

        if (localStorage.getItem("room_count") != null) {
            $("select[name='rooms']").val(localStorage.getItem("room_count")).niceSelect('update');
        }
        else {
            $("select[name='rooms']").val(1).niceSelect('update');
        }

        if (localStorage.getItem("adult_count") != null) {
            $("select[name='adults']").val(localStorage.getItem("adult_count")).niceSelect('update');
        }
        else {
            $("select[name='adults']").val(2).niceSelect('update');
        }

        if (localStorage.getItem("child_count") != null) {
            $("select[name='children']").val(localStorage.getItem("child_count")).niceSelect('update');
        }
        else {
            $("select[name='children']").val(0).niceSelect('update');
        }

        $(".check-availability-btn").on("click", function() {
            localStorage.setItem("check_in_date", picker.getStartDate().format("DD/MM/YYYY"));
            localStorage.setItem("check_out_date", picker.getEndDate().format("DD/MM/YYYY"));
            localStorage.setItem("room_count", $("select[name='rooms']").val());
            localStorage.setItem("adult_count", $("select[name='adults']").val());
            localStorage.setItem("child_count", $("select[name='children']").val());
            if (current_url == home_url) {
                window.location.href = home_url + "/booking";
            }
            else if (current_url == home_url + "/booking") {
                window.location.reload();
            }
        });

        // ********************************
        // Cart
        // ********************************

        function zip(...arrays) {
            const length = Math.min(...arrays.map(array => array.length));
            const zipped = [];
            for (let i = 0; i < length; i++) {
            zipped.push(arrays.map(array => array[i]));
            }
            return zipped;
        }

        function to_number(string) {
            return parseInt(string, 10);
        }
        
        function save_room_quantity_to_local_storage() {
            var room_code = $("input[name='room-code[]']").map(function(){
                if ($(this).val() != "") {
                    return $(this).val();
                }
            }).get();
            var quantity = $("input[name='quantity[]']").map(function(){
                if ($(this).val() != "") {
                    return $(this).val();
                }
            }).get();
            localStorage.setItem("room_quantity", JSON.stringify(zip(room_code, quantity)));
        }

        // Quantity number
        $("span.input-group-text.minus").on("click", function() {
            var quantity = $(this).siblings("input.quantity");
            quantity.val(to_number(quantity.val()) - 1);
            quantity.change();
        });
        $("span.input-group-text.plus").on("click", function() {
            var quantity = $(this).siblings("input.quantity");
            quantity.val(to_number(quantity.val()) + 1);
            quantity.change();
        });
        $("input.quantity").on("change", function() {
            if (to_number($(this).val()) < 1) {
                $(this).val(1);
            }
        });
        $(".cart-item input.quantity").on("change", function() {
            update_cart_item_subtotal($(this));
            save_room_quantity_to_local_storage();
        });
        
        // Update cart-item-subtotal
        var update_cart_item_subtotal = function (input_quantity) {
            var night_count = to_number($("span.night-count").text());
            var cart_item = input_quantity.parents(".cart-item");
            var cart_item_subtotal = cart_item.find(".cart-item-subtotal");
            var room_single_price = cart_item.find("input.room-single-price");
            cart_item_subtotal.text((to_number(input_quantity.val()) * to_number(room_single_price.val()) * night_count).toLocaleString('vi-VN'));
            update_cart_total_money();
        }

        // Update cart-total-money
        var update_cart_total_money = function () {
            var total = 0;
            $(".cart-item .cart-item-subtotal").not(".cart-item-template .cart-item-subtotal").each(function (i) {
                total += to_number($(this).text().replace(/[\.,]/g, ""));
            });
            $(".cart-total-money").text(total.toLocaleString('vi-VN'));
        }

        // Click Add to Cart button
        $(".add-to-cart-btn").on("click", function () {
            var quantity = to_number($(this).parents(".add-to-cart-area").find("input.quantity").val());
            var room_code = $(this).attr("data-room-code");
            var room_type = $(this).attr("data-room-type");
            var room_single_price = to_number($(this).attr("data-room-single-price"));
            var input_room_code = $("input.room-code[value|='"+room_code+"']");
            // Check if hidden input room code is existed in the cart
            if (input_room_code.length > 0) {
                var input_quantity = input_room_code.parents(".cart-item").find("input.quantity");
                input_quantity.val(to_number(input_quantity.val()) + quantity);
                input_quantity.change();
            }
            else {
                var cart_item = $(".cart-item-template").clone(true);
                cart_item.removeClass("cart-item-template d-none");
                cart_item.insertBefore($(".cart-summary"));
                cart_item.find(".cart-item-room-type").text(room_type);
                cart_item.find("input.room-code").val(room_code);
                cart_item.find("input.room-single-price").val(room_single_price);
                cart_item.find("input.quantity").val(quantity);
                cart_item.find("input.quantity").change();
            }
        });
        
        // Click remove button
        $(".cart-item-remove").on("click", function () {
            $(this).parents(".cart-item").remove();
            update_cart_total_money();
            save_room_quantity_to_local_storage();
        });

        // Save guest info to localStorage
        const guest_info = ["name", "email", "phone", "message"];
        $(".submit-booking-btn").on("click", function () {
            guest_info.forEach(function (item) {
                localStorage.setItem("guest_" + item, $("input[name='guest-" + item + "']").val());
            });
        });
        
        // ********************************
        // Show cached data to cart form
        // ********************************

        // Update short date and night count
        $("span.check-in-date-short").text($("#checkIn").val().substring(0, 5));
        $("span.check-out-date-short").text($("#checkOut").val().substring(0, 5));
        $("span.night-count").text(picker.getEndDate().diff(picker.getStartDate()));

        // Update hidden inputs
        $("input[name='check-in-date']").val($("#checkIn").val());
        $("input[name='check-out-date']").val($("#checkOut").val());
        $("input[name='adult-count']").val($("select[name='adults']").val());
        $("input[name='child-count']").val($("select[name='children']").val());

        // Update room and quantity in the cart
        if (localStorage.getItem("room_quantity") != null) {
            var room_quantity = JSON.parse(localStorage.getItem("room_quantity"));
            room_quantity.forEach(function (item) {
                $("a[data-room-code='" + item[0] + "']").click();
                var quantity = $("input[value='" + item[0] + "']").parent().find(".quantity");
                quantity.val(item[1]);
                update_cart_item_subtotal(quantity);
            });
        }

        // Update guest info
        guest_info.forEach(function (item) {
            if (localStorage.getItem("guest_" + item) != null) {
                $("input[name='guest-" + item + "']").val(localStorage.getItem("guest_" + item));
            };
        });
    }
    
    // Show modal
    if ($("#letoh-booking-modal").length > 0) {
        $("#letoh-booking-modal").modal('show');
    }
    
});