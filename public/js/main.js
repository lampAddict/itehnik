/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

    "use strict";

    /*---------------------------------------------------- */
    /* Preloader
     ------------------------------------------------------ */
    $(window).load(function () {

        // will first fade out the loading animation
        $("#loader").fadeOut("slow", function () {

            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");

        });

    })


    /*----------------------------------------------------*/
    /*	Sticky Navigation
     ------------------------------------------------------*/
    $(window).on('scroll', function () {

        var y = $(window).scrollTop(),
            topBar = $('header');

        if (y > 1) {
            topBar.addClass('sticky');
        }
        else {
            topBar.removeClass('sticky');
        }

    });


    /*-----------------------------------------------------*/
    /* Mobile Menu
     ------------------------------------------------------ */
    var toggleButton = $('.menu-toggle'),
        nav = $('.main-navigation');

    toggleButton.on('click', function (event) {
        event.preventDefault();

        toggleButton.toggleClass('is-clicked');
        nav.slideToggle();
    });

    if (toggleButton.is(':visible')) nav.addClass('mobile');

    $(window).resize(function () {
        if (toggleButton.is(':visible')) nav.addClass('mobile');
        else nav.removeClass('mobile');
    });

    $('#main-nav-wrap li a').on("click", function () {

        if (nav.hasClass('mobile')) {
            toggleButton.toggleClass('is-clicked');
            nav.fadeOut();
        }
    });


    /*----------------------------------------------------*/
    /* Highlight the current section in the navigation bar
     ------------------------------------------------------*/
    var sections = $("section"),
        navigation_links = $("#main-nav-wrap li a");

    sections.waypoint({

        handler: function (direction) {

            var active_section;

            active_section = $('section#' + this.element.id);

            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },

        offset: '25%'

    });


    /*----------------------------------------------------*/
    /* Flexslider
     /*----------------------------------------------------*/
    $(window).load(function () {

        $('#testimonial-slider').flexslider({
            namespace: "flex-",
            controlsContainer: "",
            animation: 'slide',
            controlNav: true,
            directionNav: true,
            smoothHeight: true,
            slideshowSpeed: 7000,
            animationSpeed: 600,
            randomize: false,
            touch: true,
        });


        var slider = $('.Wallop');
        var wallop = new Wallop(slider[0], {
            carousel: false
        });

        var $name = $('#name'),
            $email = $('#email'),
            $phone = $('#phone'),
            $comment = $('#comment');

        wallop.on('change', function(event) {
            // event.detail.wallopEl
            // => <div class="Wallop">…</div>

            // event.detail.currentItemIndex
            // => number

            //wallop bugfix, last page form elements shows up on previous pages
            if( event.detail.currentItemIndex < 2 ){
                //if it is not last choice hide
                $name.hide();
                $email.hide();
                $phone.hide();
                $comment.hide();
            }else{
                //show form elements on last page
                $name.show();
                $email.show();
                $phone.show();
                $comment.show();
            }

            var $btnPrev, $btnSend;
            $btnPrev = $('.Wallop-buttonPrevious');
            if( event.detail.currentItemIndex > 0 ){
                if( $btnPrev.hasClass('mfp-hide') )
                    $btnPrev.removeClass('mfp-hide');
            }
            else{
                if( !$btnPrev.hasClass('mfp-hide') )
                    $btnPrev.addClass('mfp-hide');
            }

            $btnSend = $('#btnSend');
            if( event.detail.currentItemIndex < 2 ){
                if( !$btnSend.hasClass('mfp-hide') )
                    $btnSend.addClass('mfp-hide');
            }
            else{
                if( $btnSend.hasClass('mfp-hide') )
                    $btnSend.removeClass('mfp-hide');
            }
        });

    });


    /*----------------------------------------------------*/
    /* Smooth Scrolling
     ------------------------------------------------------*/
    $('.smoothscroll').on('click', function (e) {

        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });

    });


    /*----------------------------------------------------*/
    /*  Placeholder Plugin Settings
     ------------------------------------------------------*/

    $('input, textarea, select').placeholder()


    /*---------------------------------------------------- */
    /* ajaxchimp
     ------------------------------------------------------ */

    // Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    var mailChimpURL = 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d'

    $('#mc-form').ajaxChimp({

        language: 'es',
        url: mailChimpURL

    });

    // Mailchimp translation
    //
    //  Defaults:
    //	 'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.es = {
        'submit': 'Submitting...',
        0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
        1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
        2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
        5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
    };


    /*---------------------------------------------------- */
    /* FitVids
     ------------------------------------------------------ */
    $(".fluid-video-wrapper").fitVids();


    /*---------------------------------------------------- */
    /*	Modal Popup
     ------------------------------------------------------ */

    $('.video-link a').magnificPopup({

        type: 'inline',
        fixedContentPos: false,
        removalDelay: 200,
        showCloseBtn: false,
        mainClass: 'mfp-fade'

    });

    $(document).on('click', '.close-popup', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });


    /*----------------------------------------------------- */
    /* Back to top
     ------------------------------------------------------- */
    var pxShow = 300; // height on which the button will show
    var fadeInTime = 400; // how slow/fast you want the button to show
    var fadeOutTime = 400; // how slow/fast you want the button to hide
    var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

    // Show or hide the sticky footer button
    jQuery(window).scroll(function () {

        if (!( $("#header-search").hasClass('is-visible'))) {

            if (jQuery(window).scrollTop() >= pxShow) {
                jQuery("#go-top").fadeIn(fadeInTime);
            } else {
                jQuery("#go-top").fadeOut(fadeOutTime);
            }

        }

    });

    $('a.choice').click(function (e) {
        var $this = $(this);

        var choice = $this.attr('data-choice'),
            prevchoice = $this.attr('data-prevchoice') || 0,
            prev_choices,
            step = $this.attr('data-step') || 0;

        if( prevchoice == 0  ){
            for( var q in quizOptions[choice] ){
                if( quizOptions[choice].hasOwnProperty(q) ){
                    $('#step' + step + q).text(quizOptions[ choice ][ q ][ 'choice' ]);
                    $('#step' + step + q).attr('data-prevchoice', choice+'_'+q);
                }
            }
        }
        else{
            prev_choices = prevchoice.split('_');
            $('#step' + step).text(quizOptions[ prev_choices[0] ][ prev_choices[1] ][ 'answer' ]);
        }

        $('.Wallop-buttonNext').click();
    });

    var quizOptions = {
        "low": {

             "1": {
                 "choice": "Мой приоритет: низкая стоимость, максимум своими силами, быстро."
                ,"answer": "Мы можем предложить: Облако, 1С:ГТД. Курсы, либо покупку софта и ИТС. Оставьте, пожалуйста, ваши контакты."
             }
            ,"2": {
                 "choice": "Мне нужно понять - обслуживание какого качества я могу получить за свои деньги."
                ,"answer": "Если мы сможем открыто говорить о бюджете, то сможем сформулировать некоторый стандарт качества услуг, на который можно рассчитывать. Оставьте, пожалуйста, ваши контакты и мы все обстоятельно обсудим."
            }
            ,"3": {
                 "choice": "Я - энтузиаст.  Меня интересует качество прежде всего."
                ,"answer": "Осторожнее, пожалуйста! Энтузиазм при внедрении нужно нормировать, т.к. это длинная дистанция. Такие клиенты наши любимые - с ними всегда что-то интересное делаем. Оставьте, пожалуйста, ваши контакты и мы сможем предложить что-то интересное."
            }
        },
        "medium": {

             "1": {
                  "choice": "Подрядчика нет или у нас с подрядчиком \"всё плохо\"."
                 ,"answer": "Это бывает. Давайте посмотрим что у вас не получается в текущей ситуации. Поговорите с нами об этом, и мы постараемся придумать, как вам помочь. Оставьте, пожалуйста, ваши контакты."
             }
            ,"2": {
                 "choice": "Мне интересно грамотное использование уже имеющегося функционала."
                ,"answer": "Давайте посмотрим, что осталось \"за бортом\" автоматизации и вместе подумаем как можно использовать имеющийся функционал. Оставьте, пожалуйста, ваши контакты."
            }
            ,"3": {
                 "choice": "Мне требуется развитие или пересмотр имеющейся системы."
                ,"answer": "Здесь видится полезным аудит и предложения по оптимизации. Оставьте, пожалуйста, ваши контакты."
            }
        }
        ,
        "pro": {

            "1": {
                "choice": "Мое понимание не требует формализации. Обсудили, оценили, поехали."
                ,"answer": "Надо встречаться и обсуждать. Оставьте, пожалуйста, ваши контакты."
            }
            ,"2": {
                "choice": "У меня описаны требования. Нужно грамотно исполнить."
                ,"answer": "Надо встречаться и обсуждать. Оставьте, пожалуйста, ваши контакты."
            }
            ,"3": {
                "choice": "Мне нужно, чтобы вы сами собрали информацию с ответственных лиц, оценили ситуацию и предложили решение."
                ,"answer": "Надо встречаться и обсуждать. Оставьте, пожалуйста, ваши контакты."
            }
        }
};

})(jQuery);