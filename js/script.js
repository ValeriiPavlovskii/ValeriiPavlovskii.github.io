

$(document).ready(function(){
    
    //Modal

    $('[data-modal=consultation]').on('click', function() {
       $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modally__close').on('click', function() {
        $('.overlay, #consultation, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    //Validate


    function valideForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите Ваш номер телефона",
                email: {
                  required: "Пожалуйста, введите Вашу почту",
                  email: "Не правильно введен адрес почты. Пример: name@domain.com"
                }
            }
        });
    };

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    //MaskedInputJS-phone

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //Smooth scroll and pageup
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    
    //Slow scroll
    $("a[href^=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    //wow animate
    new WOW().init();

    //Send form
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");


            $('form').trigger('reset');
        });
        return false;
    });
});