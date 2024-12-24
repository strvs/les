$('[data-fancybox]').fancybox({
    buttons : [
        'close'
    ],
    lang : 'ru',
    i18n : {
        'ru' : {
            CLOSE   : 'Закрыть'
        }
    }
});

$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.header-menu-link', function(e) {
        if ($('html').hasClass('menu-open')) {
            $('html').removeClass('menu-open');
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        } else {
            if ($('html').hasClass('select-list-filter-open')) {
                $('html').removeClass('select-list-filter-open');
                $('.wrapper').css({'top': 'auto'});
                $(window).scrollTop($('.wrapper').data('curScroll'));
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('menu-open');
            $('.wrapper').css({'top': -curScroll});
            $('.wrapper').data('curScroll', curScroll);
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.menu').length == 0 && !$(e.target).hasClass('menu') && $(e.target).parents().filter('.header-menu-link').length == 0 && !$(e.target).hasClass('header-menu-link')) {
            if ($('html').hasClass('menu-open')) {
                $('html').removeClass('menu-open');
                $('.wrapper').css({'top': 'auto'});
                $(window).scrollTop($('.wrapper').data('curScroll'));
            }
        }
    });

    $('.menu-main a, .menu-add a').click(function(e) {
        var curHREF = $(this).attr('href').split('#')[1];
        if (typeof(curHREF) != 'undefined') {
            var curBlock = $('[data-id="' + curHREF +  '"]');
            if (curBlock.length == 1) {
                $('html').removeClass('menu-open');
                $('.wrapper').css({'top': 'auto'});
                $(window).scrollTop($('.wrapper').data('curScroll'));
                $('html, body').animate({'scrollTop': curBlock.offset().top - $('header').outerHeight()});
                e.preventDefault();
            }
        }
    });

    $('.footer-menu a, .header-mortgage, .header-progress-link').click(function(e) {
        var curHREF = $(this).attr('href').split('#')[1];
        if (typeof(curHREF) != 'undefined') {
            var curBlock = $('[data-id="' + curHREF +  '"]');
            if (curBlock.length == 1) {
                $('html, body').animate({'scrollTop': curBlock.offset().top - $('header').outerHeight()});
                e.preventDefault();
            }
        }
    });

    $('body').on('click', '.window-link', function(e) {
        if ($('html').hasClass('menu-open')) {
            $('html').removeClass('menu-open');
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        }
        if ($('html').hasClass('select-list-filter-open')) {
            $('html').removeClass('select-list-filter-open');
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        }

        var curLink = $(this);
        $('.window-link').removeClass('last-active');
        curLink.addClass('last-active');
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.main-presentation-text-more-link a').click(function(e) {
        $('.main-presentation-text').toggleClass('open');
        e.preventDefault();
    });

    $('.main-prefs-photos').each(function() {
        var curSlider = $(this);
        if (curSlider.find('.swiper-slide').length > 1) {
            curSlider.find('.main-prefs-photos-fraction strong').html(curSlider.find('.swiper-slide').length);
        } else {
            curSlider.find('.main-prefs-photos-fraction').remove();
        }
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            autoHeight: true,
            slidesPerView: 1,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
            pagination: {
                el: curSlider.find('.swiper-pagination')[0],
                clickable: true
            },
            on: {
                realIndexChange: function () {
                    curSlider.find('.main-prefs-photos-fraction span').html(swiper.realIndex + 1);
                },
            },
        });
    });

    $('.main-location-steps-menu a').click(function(e) {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.main-location-steps-menu a.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.main-location-steps-menu a').index(curItem);
            $('.main-location-steps-item.active').removeClass('active');
            $('.main-location-steps-window.active').removeClass('active');
            $('.main-location-steps-item').eq(curIndex).addClass('active');
            $('.main-location-steps-window').eq(curIndex).addClass('active');
            $('.main-location-steps').addClass('active');
        } else {
            curItem.removeClass('active');
            $('.main-location-steps').removeClass('active');
            $('.main-location-steps-item.active').removeClass('active');
            $('.main-location-steps-window.active').removeClass('active');
        }
        e.preventDefault();
    });

    $('.main-location-steps-container').scroll(function() {
        $('.main-location-steps-drag').fadeOut();
    });

    $('.main-front-container').scroll(function() {
        $('.main-front-drag').fadeOut();
    });

    $('.main-forest-scheme-img').scroll(function() {
        $('.main-forest-scheme-drag').fadeOut();
    });

    $('.main-forest-scheme-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-forest-scheme-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.main-forest-scheme-menu ul li').index(curLi) + 1;
            $('.main-forest-scheme-item').removeClass('active');
            $('.main-forest-scheme-item').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.main-gallery-menu a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-gallery-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.main-gallery-menu ul li').index(curLi);
            $('.main-gallery-item.active').removeClass('active');
            $('.main-gallery-item').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.main-gallery-item').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            autoHeight: true,
            slidesPerView: 1,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0]
            },
        });
    });

    $('.main-progress-select-current').click(function() {
        var curSelect = $(this).parent();
        curSelect.toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.main-progress-select').length == 0) {
            $('.main-progress-select.open').removeClass('open');
        }
    });

    $('.main-progress-select ul li').click(function() {
        var curLi = $(this);
        var curSelect = curLi.parents().filter('.main-progress-select');
        curSelect.removeClass('open');
        if (!curLi.hasClass('active')) {
            curSelect.find('ul li.active').removeClass('active');
            curLi.addClass('active');
            curSelect.find('.main-progress-select-current span').html(curLi.html());
            var curIndex = curSelect.find('ul li').index(curLi);
            $('.main-progress-item.active').removeClass('active');
            $('.main-progress-item').eq(curIndex).addClass('active');
        }
    });

    $('.main-progress-menu a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-progress-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.main-progress-menu ul li').index(curLi);
            $('.main-progress-item.active').removeClass('active');
            $('.main-progress-item').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.main-media-filter a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-media-filter ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.main-media-filter ul li').index(curLi);
            $('.main-media-tab.active').removeClass('active');
            $('.main-media-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.main-media-item-header').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault()
    });

    $('.select-filter-group-title').click(function() {
        $(this).parent().toggleClass('open');
    });

    $('.select-filter-slider').each(function() {
        var curSlider = $(this);
        var curRange = curSlider.find('.select-filter-slider-range-inner')[0];
        var curStartFrom = Number(curSlider.find('.select-filter-slider-min').html());
        if (Number(curSlider.find('.select-filter-slider-from').val()) !== 0) {
            curStartFrom = Number(curSlider.find('.select-filter-slider-from').val());
        }
        var curStartTo = Number(curSlider.find('.select-filter-slider-max').html());
        if (Number(curSlider.find('.select-filter-slider-to').val()) !== 0) {
            curStartTo = Number(curSlider.find('.select-filter-slider-to').val());
        }
        noUiSlider.create(curRange, {
            start: [curStartFrom, curStartTo],
            connect: true,
            range: {
                'min': Number(curSlider.find('.select-filter-slider-min').html()),
                'max': Number(curSlider.find('.select-filter-slider-max').html())
            },
            step: Number(curSlider.find('.select-filter-slider-step').html()),
            format: wNumb({
                decimals: 0
            })
        });
        curRange.noUiSlider.on('update', function(values, handle) {
            if (handle == 0) {
                curSlider.find('.select-filter-slider-from').val(values[handle]);
                curSlider.find('.select-filter-slider-text-from span').html(values[handle]);
            } else {
                curSlider.find('.select-filter-slider-to').val(values[handle]);
                curSlider.find('.select-filter-slider-text-to span').html(values[handle]);
            }
        });
    });

    $('.select-params').each(function() {
        updateSelectParams();
    });

    $('.select-filter-container form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        if (validator) {
            validator.destroy();
        }
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                if ($('html').hasClass('select-list-filter-open')) {
                    $('html').removeClass('select-list-filter-open');
                    $('.wrapper').css({'top': 'auto'});
                    $(window).scrollTop($('.wrapper').data('curScroll'));
                }
                $('html, body').animate({'scrollTop': $('.select-list').offset().top - $('header').outerHeight()});
                updateSelectList();
            }
        });
    });

    $('.select-filter-clear a').click(function(e) {
        $('.select-filter-rooms input').prop('checked', false);
        $('.select-filter-slider').each(function() {
            var curSlider = $(this);
            var curRange = curSlider.find('.select-filter-slider-range-inner')[0];
            curRange.noUiSlider.set([Number(curSlider.find('.select-filter-slider-min').html()), Number(curSlider.find('.select-filter-slider-max').html())]);
        });
        $('.select-filter-container form').trigger('submit');
        e.preventDefault();
    });

    $('body').on('click', '.select-list-item-header-favourite', function() {
        var curItem = $(this);
        curItem.toggleClass('active');
        var curID = curItem.attr('data-favourite');
        if (curItem.hasClass('active')) {
            $.cookie('favourite-' + curID, 'true', {expires: 365});
        } else {
            $.removeCookie('favourite-' + curID);
        }
        return false;
    });

    $('.select-list-header-favourite a').click(function(e) {
        $(this).parent().toggleClass('active');
        updateSelectList();
        e.preventDefault();
    });

    $('.select-list-header-sort-current').click(function() {
        $('.select-list-header-sort-select').toggleClass('open');
        $('html').toggleClass('select-list-header-sort-open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.select-list-header-sort-select').length == 0) {
            $('.select-list-header-sort-select').removeClass('open');
            $('html').removeClass('select-list-header-sort-open');
        }
    });

    $('.select-list-header-sort-select ul li').click(function() {
        var curLi = $(this);
        if (!curLi.hasClass('active')) {
            $('.select-list-header-sort-select ul li.active').removeClass('active reverse');
            curLi.addClass('active');
            $('.select-list-header-sort-current span').html(curLi.html());
        } else {
            curLi.toggleClass('reverse');
        }
        if ($('.select-list-header-sort-select ul li.active').hasClass('reverse')) {
            $('.select-list-header-sort-select').addClass('reverse');
        } else {
            $('.select-list-header-sort-select').removeClass('reverse');
        }
        $('.select-list-header-sort-select').removeClass('open');
        $('html').removeClass('select-list-header-sort-open');
        updateSelectList();
    });

    $('.select-list-filter-link').click(function(e) {
        var curScroll = $(window).scrollTop();
        $('html').addClass('select-list-filter-open');
        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        e.preventDefault();
    });

    $('.select-filter-close a').click(function(e) {
        $('html').removeClass('select-list-filter-open');
        $('.wrapper').css({'top': 'auto'});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        e.preventDefault();
    });

    $('.select-list-more a').click(function(e) {
        var countVisible = $('.select-list-item.visible').length;
        countVisible += listSize;
        $('.select-list-item:lt(' + countVisible + ')').addClass('visible');
        if ($('.select-list-item:not(.visible)').length == 0) {
            $('.select-list-more').removeClass('visible');
        }
        e.preventDefault();
    });

    $('.detail-scheme-prefs').each(function() {
        $('.detail-scheme-prefs-mobile').html($('.detail-scheme-prefs').html());
    });

    $('.detail-scheme-menu ul li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.detail-scheme-menu ul li.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.detail-scheme-menu ul li').index(curLi);
            $('.detail-scheme-content.active').removeClass('active');
            $('.detail-scheme-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.detail-info-favourite a').click(function(e) {
        var curItem = $(this).parent();
        curItem.toggleClass('active');
        var curID = curItem.attr('data-favourite');
        if (curItem.hasClass('active')) {
            $.cookie('favourite-' + curID, 'true', {expires: 365});
        } else {
            $.removeCookie('favourite-' + curID);
        }
        e.preventDefault();
    });

    $('.detail-info-favourite').each(function() {
        var curItem = $(this);
        var curID = curItem.attr('data-favourite');
        if (typeof $.cookie('favourite-' + curID) != 'undefined' && $.cookie('favourite-' + curID) == 'true') {
            curItem.addClass('active');
        }
    });

    $('.main-media-more').each(function() {
        if ($(this).prev().find('.main-media-item').length > 3) {
            $(this).addClass('visible');
        }
    });

    $('.main-media-more a').click(function(e) {
        $(this).parent().prev().toggleClass('open');
        e.preventDefault();
    });

    $('.main-news-more a').click(function(e) {
        $('.main-news-list').toggleClass('open');
        var curType = $('.main-news-filter li.active').attr('data-filter');
        $('.main-news-item.visible').removeClass('visible');
        var curFilter = '';
        if (curType != '') {
            curFilter = '[data-type="' + curType + '"]';
        }
        if ($('.main-news-list').hasClass('open')) {
            $('.main-news-item' + curFilter).addClass('visible');
        } else {
            $('.main-news-item' + curFilter + ':lt(3)').addClass('visible');
        }
        e.preventDefault();
    });

    $('.main-news-filter a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.main-news-filter ul li.active').removeClass('active');
            curLi.addClass('active');
            var curType = curLi.attr('data-filter');
            $('.main-news-item.visible').removeClass('visible');
            var curFilter = '';
            if (curType != '') {
                curFilter = '[data-type="' + curType + '"]';
            }
            $('.main-news-item' + curFilter + ':lt(3)').addClass('visible');
            $('.main-news-list').removeClass('open');
            if ($('.main-news-item' + curFilter).length > 3) {
                $('.main-news-more').addClass('visible');
            } else {
                $('.main-news-more').removeClass('visible');
            }
        }
        e.preventDefault();
    });

    $('.main-news-filter li.active').each(function() {
        var curType = $(this).attr('data-filter');
        $('.main-news-item.visible').removeClass('visible');
        var curFilter = '';
        if (curType != '') {
            curFilter = '[data-type="' + curType + '"]';
        }
        $('.main-news-item' + curFilter + ':lt(3)').addClass('visible');
        if ($('.main-news-item' + curFilter).length > 3) {
            $('.main-news-more').addClass('visible');
        } else {
            $('.main-news-more').removeClass('visible');
        }
    });

    $('.main-news-item-header').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault()
    });

});

function initForm(curForm) {
    curForm.find('input.phoneRU').attr('autocomplete', 'off');
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);
            if (!curForm.find('.form-submit button').prop('disabled')) {
                if (curForm.hasClass('window-form')) {
                    curForm.find('.form-submit button').prop('disabled', true);
                    var formData = new FormData(form);
                    windowOpen(curForm.attr('data-action'), formData);
                } else {
                    form.submit();
                }
            }
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
        }
        $('.window .window-loading').remove();
        window.setTimeout(function() {
            $('.window-container').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));

            var windowLink = $('.window-link.last-active');
            if (windowLink.length == 1 && typeof windowLink.attr('data-hiddenname') != 'undefined' && typeof windowLink.attr('data-hiddenvalue') != 'undefined') {
                $(this).append('<input type="hidden" name="' + windowLink.attr('data-hiddenname') + '" value="' + windowLink.attr('data-hiddenvalue') + '">');
            }
        });
    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window-container').addClass('window-container-preload');
        window.setTimeout(function() {
            $('.window').remove();
            $('html').removeClass('window-open');
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        }, 300);
    }
}

$(window).on('load', function() {
    if (window.location.hash != '') {
        var curID = window.location.hash.replace('#', '');
        var curBlock = $('[data-id="' + curID +  '"]');
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - $('header').outerHeight()});
        }
    }
});

var lastScrollTop = 0;
var didScroll = false;
var delta = 5;

$(window).on('scroll', function() {
    didScroll = true;
    window.setInterval(function() {
        if (didScroll) {
            var st = $(window).scrollTop();
            if (Math.abs(lastScrollTop - st) <= delta) {
                return;
            }
            if (st > lastScrollTop && st > $('header').height()) {
                $('header').addClass('header-up');
            } else {
                if (st + $(window).height() < $(document).height()) {
                    $('header').removeClass('header-up');
                }
            }
			lastScrollTop = st;
            didScroll = false;
        }
    }, 50);
});

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();

    var windowWidth = $(window).width();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    var windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

    $('.main-ambience-view').each(function() {
        var startAnimation = $('.main-ambience-view').offset().top - windowHeight;
        var stopAnimation = $('.main-ambience-view').offset().top + $('.main-ambience-view').outerHeight();
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = 1 - (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 0;
            }
        } else {
            curPercent = 1;
        }
        var curOffsetIMG = $('.main-ambience-view img').outerHeight() - $('.main-ambience-view').outerHeight();
        $('.main-ambience-view img').css({'transform': 'translateY(-' + (curOffsetIMG * curPercent) + 'px)'});
    });

    $('.main-forest-gallery-img').each(function() {
        if (windowScroll + windowHeight >= $('.main-forest-gallery-img').offset().top + windowHeight) {
            $('.main-forest-gallery-img').addClass('fixed');
            if (windowScroll + windowHeight >= $('.main-forest-gallery-inner').offset().top + $('.main-forest-gallery-inner').outerHeight()) {
                $('.main-forest-gallery-img-inner').css({'margin-top': ($('.main-forest-gallery-inner').offset().top + $('.main-forest-gallery-inner').outerHeight()) - (windowScroll + windowHeight)});
                $('.main-forest-gallery-shadow').css({'margin-top': ($('.main-forest-gallery-inner').offset().top + $('.main-forest-gallery-inner').outerHeight()) - (windowScroll + windowHeight)});
            } else {
                $('.main-forest-gallery-img-inner').css({'margin-top': 0});
                $('.main-forest-gallery-shadow').css({'margin-top': 0});
            }
        } else {
            $('.main-forest-gallery-img').removeClass('fixed');
        }
    });

    $('.main-forest-gallery-shadow').each(function() {
        var startAnimation = $('.main-forest-gallery-shadow').offset().top - windowHeight * 2 / 3;
        var stopAnimation = $('.main-forest-gallery-shadow').offset().top - windowHeight * 1 / 3;
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }
        $('.main-forest-gallery-shadow').css({'opacity': curPercent});
    });

    $('.main-forest-gallery').each(function() {
        var startAnimation = $('.main-forest-gallery').offset().top - windowHeight * 2 / 3;
        var stopAnimation = $('.main-forest-gallery').offset().top + $('.main-forest-gallery').outerHeight() - windowHeight;
        var curPercent = 0;
        if (windowScroll > startAnimation) {
            if (windowScroll < stopAnimation) {
                curPercent = (windowScroll - startAnimation) / (stopAnimation - startAnimation);
            } else {
                curPercent = 1;
            }
        } else {
            curPercent = 0;
        }

        $('.main-forest-gallery-col').eq(1).each(function() {
            var curCol = $(this);
            var curOffset = windowWidth * 0.2088;
            curCol.find('.main-forest-gallery-col-inner').css({'transform': 'translateY(-' + (curOffset * curPercent) + 'px)'});
        });

        $('.main-forest-gallery-col').eq(2).each(function() {
            var curCol = $(this);
            var curOffset = windowWidth * 0.1359;
            curCol.find('.main-forest-gallery-col-inner').css({'transform': 'translateY(-' + (curOffset * curPercent) + 'px)'});
        });
    });

});

var dataSelect = null;

function updateSelectParams() {
    var curForm = $('.select-filter-container form');
    $.ajax({
        type: 'POST',
        url: curForm.attr('data-action'),
        processData: false,
        contentType: false,
        dataType: 'json',
        cache: false
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert('Сервис временно недоступен, попробуйте позже.');
    }).done(function(data) {
        dataSelect = data;
        updateSelectList();
    });
}

var listSize = 18;

function updateSelectList() {
    var newData = [];
    if (typeof(dataSelect) != 'undefined') {
        for (var i = 0; i < dataSelect.flats.length; i++) {
            var curFlat = dataSelect.flats[i];
            var roomsCorrect = false;
            if ($('.select-filter-rooms input:checked').length == 0 || $('.select-filter-rooms input[value="' + curFlat.rooms + '"]:checked').length == 1) {
                roomsCorrect = true;
            }

            var flatSize = Number(String(curFlat.size).replace(',', '.'));
            var sizeCorrect = false;
            var minSize = Number($('.select-filter-size-from').val());
            var maxSize = Number($('.select-filter-size-to').val());
            if (flatSize >= minSize && flatSize <= maxSize) {
                sizeCorrect = true;
            }

            var flatFloor = Number(String(curFlat.floor));
            var floorCorrect = false;
            var minFloor = Number($('.select-filter-floor-from').val());
            var maxFloor = Number($('.select-filter-floor-to').val());
            if (flatFloor >= minFloor && flatFloor <= maxFloor) {
                floorCorrect = true;
            }

            var flatPrice = Number(String(curFlat.price).replace(',', '.'));
            var priceCorrect = false;
            var minPrice = Number($('.select-filter-price-from').val()) * 1000000;
            var maxPrice = Number($('.select-filter-price-to').val()) * 1000000;
            if (flatPrice >= minPrice && flatPrice <= maxPrice) {
                priceCorrect = true;
            }

            var favouriteCorrect = true;
            if ($('.select-list-header-favourite').hasClass('active')) {
                favouriteCorrect = false;
                if (typeof $.cookie('favourite-' + curFlat.number) != 'undefined' && $.cookie('favourite-' + curFlat.number) == 'true') {
                    favouriteCorrect = true;
                }
            }

            if (roomsCorrect && sizeCorrect && floorCorrect && priceCorrect && favouriteCorrect) {
                newData.push(curFlat);
            }
        }
    }

    var typeSort = $('.select-list-header-sort-select li.active').attr('data-sort');
    var isReverse = $('.select-list-header-sort-select').hasClass('reverse');
    if (typeSort == 'price') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                if (Number(String(a.price)) < Number(String(b.price))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                if (Number(String(a.price)) > Number(String(b.price))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }
    if (typeSort == 'size') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                if (Number(String(a.size).replace(',', '.')) < Number(String(b.size).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                if (Number(String(a.size).replace(',', '.')) > Number(String(b.size).replace(',', '.'))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }
    if (typeSort == 'floor') {
        if (!isReverse) {
            newData.sort(function(a, b) {
                if (Number(String(a.floor)) < Number(String(b.floor))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        } else {
            newData.sort(function(a, b) {
                if (Number(String(a.floor)) > Number(String(b.floor))) {
                    return -1;
                } else {
                    return 1;
                }
                return 0;
            });
        }
    }

    var htmlList = '';
    var titleEmpty = $('.select-list-content').attr('data-titleempty');
    var curIndex = 1;
    $('.select-list-header-count-value').html(newData.length);
    $('.select-list-header-count-text span').html(getFlatsText(newData.length));
    for (var i = 0; i < newData.length; i++) {
        var curFlat = newData[i];
        var classFavourite = '';
        if (typeof $.cookie('favourite-' + curFlat.number) != 'undefined' && $.cookie('favourite-' + curFlat.number) == 'true') {
            classFavourite = 'active';
        }

        htmlList += '<a href="' + curFlat.url + '" class="select-list-item">' +
                        '<div class="select-list-item-header">' +
                            '<div class="select-list-item-header-title">' + curFlat.title + ' &bull; ' + curFlat.size + ' м<sup>2</sup></div>' +
                            '<div class="select-list-item-header-favourite ' + classFavourite + '" data-favourite="' + curFlat.number + '"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#icon-favourite"></use></svg></div>' +
                        '</div>' +
                        '<div class="select-list-item-preview"><img src="' + curFlat.preview + '" alt=""></div>' +
                        '<div class="select-list-item-price"><strong>' + String(curFlat.price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&thinsp;') + '</strong> <span>₽</span></div>' +
                        '<div class="select-list-item-mortgage"><span>в ипотеку</span> от ' + String(curFlat.mortgage).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&thinsp;') + ' ₽ в месяц</div>' +
                        '<div class="select-list-item-params">' + curFlat.floor + ' этаж, ' + curFlat.floors + ' ' + getFloorsText(curFlat.floors) + '</div>' +
                    '</a>';

        curIndex++;
        if (typeof(dataSelect.insets) != 'undefined') {
            for (var j = 0; j < dataSelect.insets.length; j++) {
                var curInset = dataSelect.insets[j];
                if (Number(curInset.place) == curIndex) {
                    if (typeof(curInset.link) != 'undefined') {
                        htmlList += '<a href="' + curInset.link + '" class="select-list-item select-list-inset" style="background-image:url(\'' + curInset.img + '\')">' +
                                        '<div class="select-list-inset-title">' + curInset.title + '</div>' +
                                    '</a>';
                    } else {
                        htmlList += '<div class="select-list-item select-list-inset" style="background-image:url(\'' + curInset.img + '\')">' +
                                        '<div class="select-list-inset-title">' + curInset.title + '</div>' +
                                    '</div>';
                    }

                    curIndex++;
                }
            }
        }
    }

    $('.select-list-content').html(htmlList);
    $('.select-list-item:lt(' + listSize + ')').addClass('visible');
    if ($('.select-list-item:not(.visible)').length == 0) {
        $('.select-list-more').removeClass('visible');
    } else {
        $('.select-list-more').addClass('visible');
    }

    if (newData.length == 0) {
        $('.select-list-content').html('<div class="select-list-empty">' + titleEmpty + '</div>');
    }
}

function getFloorsText(number) {
    var endings = Array('этажей', 'этаж', 'этажа');
    var num100 = number % 100;
    var num10 = number % 10;
    if (num100 >= 5 && num100 <= 20) {
        return endings[0];
    } else if (num10 == 0) {
        return endings[0];
    } else if (num10 == 1) {
        return endings[1];
    } else if (num10 >= 2 && num10 <= 4) {
        return endings[2];
    } else if (num10 >= 5 && num10 <= 9) {
        return endings[0];
    } else {
        return endings[2];
    }
}

function getFlatsText(number) {
    var endings = Array('квартир', 'квартира', 'квартиры');
    var num100 = number % 100;
    var num10 = number % 10;
    if (num100 >= 5 && num100 <= 20) {
        return endings[0];
    } else if (num10 == 0) {
        return endings[0];
    } else if (num10 == 1) {
        return endings[1];
    } else if (num10 >= 2 && num10 <= 4) {
        return endings[2];
    } else if (num10 >= 5 && num10 <= 9) {
        return endings[0];
    } else {
        return endings[2];
    }
}

var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

var supportsPassive = false;
try {
    window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;

var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    window.addEventListener('touchmove', preventDefault, wheelOpt);
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    $('html').addClass('disableScroll');
}

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    $('html').removeClass('disableScroll');
}

var mainAnimateTimer = null;

$(document).ready(function() {

    var windowWidth = $(window).width();

    if (windowWidth > 900) {

        $('.main-welcome').each(function() {

            $('.wrapper').mousewheel(function(event, delta) {
                var windowScroll = $(window).scrollTop();
                if (windowScroll == 0) {
                    if (delta == -1) {
                        if (!isWelcomeAnimate) {
                            $('.main-welcome').addClass('animated');
                            window.clearTimeout(mainAnimateTimer);
                            mainAnimateTimer = window.setTimeout(function() {
                                isWelcomeAnimate = true;
                                enableScroll();
                            }, 1000);
                        }
                    } else {
                        if (isWelcomeAnimate) {
                            $('.main-welcome').removeClass('animated');
                            window.clearTimeout(mainAnimateTimer);
                            mainAnimateTimer = window.setTimeout(function() {
                                isWelcomeAnimate = false;
                                disableScroll();
                            }, 1000);
                        }
                    }
                }
            });

            $(document).keydown(function(e) {
                var windowScroll = $(window).scrollTop();
                if (windowScroll == 0) {
                    if (e.keyCode == 40 || e.keyCode == 32 || e.keyCode == 34 || e.keyCode == 35) {
                        if (!isWelcomeAnimate) {
                            $('.main-welcome').addClass('animated');
                            window.clearTimeout(mainAnimateTimer);
                            mainAnimateTimer = window.setTimeout(function() {
                                isWelcomeAnimate = true;
                                enableScroll();
                            }, 1000);
                        }
                    }
                    if (e.keyCode == 38 || e.keyCode == 33 || e.keyCode == 36) {
                        if (isWelcomeAnimate) {
                            $('.main-welcome').removeClass('animated');
                            window.clearTimeout(mainAnimateTimer);
                            mainAnimateTimer = window.setTimeout(function() {
                                isWelcomeAnimate = false;
                                disableScroll();
                            }, 1000);
                        }
                    }
                }
            });

        });

    }

});

var isWelcomeAnimate = false;

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    var windowWidth = $(window).width();

    if (windowWidth > 900) {
        $('.main-welcome').each(function() {
            if (windowScroll == 0) {
                if (!isWelcomeAnimate) {
                    disableScroll();
                } else {
                    enableScroll();
                }
            } else {
                enableScroll();
            }
        });
    } else {
        enableScroll();
        window.clearTimeout(mainAnimateTimer);
    }
});