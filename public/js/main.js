/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

    "use strict";

    var $surveyResult = $('#step3');

    /*---------------------------------------------------- */
    /* Preloader
     ------------------------------------------------------ */
    $(window).load(function () {
        // will first fade out the loading animation
        $("#loader").fadeOut("slow", function () {
            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");
        });

        $surveyResult.hide();
    });

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

        var  $name = $('#pname')
            ,$email = $('#email')
            ,$phone = $('#phone')
            ,$comment = $('#comment')
            ,$btnPrev = $('.Wallop-buttonPrevious')
            ,$btnSend = $('#btnSend')
            ,$surveyTitle = $('#surveyTitle')
        ;

        //contact form, send info routine
        $btnSend.click(function(e){

            $name.css("background-color", "white");
            $email.css("background-color", "white");
            $phone.css("background-color", "white");
            $comment.css("background-color", "white");

            var  url = 'ajax_message'
                ,params
            ;

            params = {
                 name: $name.val()
                ,email: $email.val()
                ,phone: $phone.val()
                ,comment: $comment.val()
            };

            $.ajax({
                method: 'POST',
                url: url,
                data: params
            })
            .done(function( response ){

                console.log(response);
                if( response.result == true ){
                    $('#confirmationBtn').click();
                }

                if( response.result == false ){
                    for( var ind in response.error_elements ){
                        if( $('#' + response.error_elements[ind]) )
                            $('#' + response.error_elements[ind]).css("background-color", "lightpink");
                    }

                    if( response.error ){
                        $('#errorMessage').text(response.error);
                    }
                }
            })
            .fail(function( response ){
                console.log('FAILED to receive request response');
                console.log(response);
            });
        });

        wallop.on('change', function(event) {
            // event.detail.wallopEl
            // => <div class="Wallop">…</div>

            // event.detail.currentItemIndex
            // => number

            if( event.target.nodeName.toLowerCase() != "div" )return;

            //wallop bugfix, last page form elements shows up on previous pages
            if( event.detail.currentItemIndex < 2 ){
                //if it is not last choice hide
                $name.hide();
                $email.hide();
                $phone.hide();
                $comment.hide();
                $surveyTitle.fadeIn("slow");
            }else{
                //show form elements on last page
                $name.show();
                $email.show();
                $phone.show();
                $comment.show();
                $surveyTitle.hide();
            }

            if( event.detail.currentItemIndex > 0 ){
                if( $btnPrev.hasClass('mfp-hide') )
                    $btnPrev.removeClass('mfp-hide');
            }
            else{
                if( !$btnPrev.hasClass('mfp-hide') )
                    $btnPrev.addClass('mfp-hide');
            }

            if( event.detail.currentItemIndex < 2 ){
                if( !$btnSend.hasClass('mfp-hide') )
                    $btnSend.addClass('mfp-hide');

                $surveyResult.hide();
            }
            else{
                if( $btnSend.hasClass('mfp-hide') )
                    $btnSend.removeClass('mfp-hide');

                $surveyResult.fadeIn("slow");
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
    /*	Modal Popup
     ------------------------------------------------------ */

    $('#confirmationBtn').magnificPopup({

        type: 'inline',
        fixedContentPos: false,
        removalDelay: 200,
        showCloseBtn: false,
        mainClass: 'mfp-fade'

    });

    $('#personalDataPopup').magnificPopup({

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
                "choice": "Мне все понятно. Обсудили, оценили, поехали."
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