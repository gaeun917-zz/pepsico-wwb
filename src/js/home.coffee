class Homepage

    constructor: ->

        @initDom()

        # It's business time
        $ =>

            # TweenMax.defaultEase = Expo.easeOut

            if @isMobile() then FastClick.attach(document.body)

            @principlesSwiper = new Swiper @principles_swiper, {
                spaceBetween: 0
                speed: 600 # Duration of transition between slides
                loop: true
                autoplay: if @isMobile() then 3800 else false # Delay between transitions
                autoplayDisableOnInteraction: false
                effect: if @isMobile() then 'slide' else 'fade'
                fade:
                    crossFade: true
                observer: true
                observeParents: true
                nextButton: @nextBtn
                prevButton: @prevBtn
            }

            if !@isMobile()

            #     @tl = new TimelineMax({delay: 0}).pause()

            #     @tl.set @principles_swiper, {display: 'block'}
            #         .set @overlay, {display: 'block'}
            #         .from @principles_swiper, 0.2, {autoAlpha: 0}
            #         .from @overlay, 0.2, {autoAlpha: 0}, "-=0.2"
            #         .to @principlesDt, 0.2, {opacity: 0}, "-=0.2"

            #     # Show the desktop overlay swiper on click
                @principles.on('click', @showPrinciples)

                @closeBtn.on('click', @hidePrinciples)

    showPrinciples: (e) =>
        # @tl.play()
        slide = parseInt $(e.currentTarget).attr('data-principle-index')
        @principlesSwiper.slideTo(slide + 1, 0)
        @principles_wrap.addClass 'unhide'
        setTimeout( =>
            @principles_wrap.addClass 'visible'
        , 1)

    hidePrinciples: =>
        @principles_wrap.removeClass 'visible'
        setTimeout( =>
            @principles_wrap.removeClass 'unhide'
        , 500)
        # @tl.tweenTo(0).duration(0.4)

    isMobile: ->
        (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ))

    initDom: =>
        @principles_wrap = $('#principles')
        @principles_swiper = $('#principles--mobile')
        @prevBtn = $('#principles__prev-btn')
        @nextBtn = $('#principles__next-btn')

        @principles = $('.principles--desktop__item')
        @principlesDt = $('#principles--desktop')
        @overlay = $('#principles__coloured-overlay')
        @closeBtn = $('#principles__btn-close')


@Homepage = new Homepage