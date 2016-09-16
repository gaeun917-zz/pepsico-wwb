class SwipeCarousel

    constructor: ->

        swipePages = ['pwp', 'products', 'planet', 'people']

        return false unless $.inArray(_pageID, swipePages) > -1

        @initDom()

        $(document).ready =>

            @setWidth()

            @initMobileTimelineSwiper()

            @initDesktopTimeline()

            @initSlider()

            @years.on('click', @goToYear)

            @prog_dt_slider_image.on('click', @goToSlide)

            @sliderPos = 0

            @HM = new Hammer document.getElementById('progress-timeline--desktop__image-carousel'),
                recognizers: [[Hammer.Pan]]
            @HM.add(new Hammer.Pan({ threshold: 0 }))
            @HM.add(new Hammer.Swipe({ threshold: 0 }))
            @HM.on 'pan swipe', (ev) =>
                @updateTimeline @sliderPos + (ev.deltaX*-0.3)
            @HM.on 'panend swipeend', (ev) =>
                dist = @sliderPos + (ev.deltaX*-0.3)
                @animateStop(dist)


    initDesktopTimeline: =>

        @tml = new TimelineMax({delay: 0, paused: true})

        spd = 0.4
        nmspd = 0.4
        lospd = 0.04
        lopac = 0.3
        lolef = '25%'
        nolef = '20%'
        lotop = "4%"
        loscl = 0.8
        hilef = '75%'
        easez = Power0.easeNone
        offst = 380

        for s, i in @slides

            wdth = @image_carousel.width()


            TweenLite.set $(s), {left: offst*i}
            TweenLite.set @image_wrapper, {left: (wdth/2)-(offst/2)}

            if i < @slides.length-1

                if i is 0
                    @tml.addLabel("step#{i}")
                    @tml.add TweenLite.to $("#prog-tl-#{i}"), nmspd, {opacity: lopac, scale: loscl, ease: easez}
                else
                    @tml.add TweenLite.to $("#prog-tl-#{i-1}"), lospd, {opacity: 0, ease: easez}
                    @tml.add TweenLite.to $("#prog-tl-#{i}"), nmspd, {opacity: lopac, scale: loscl, ease: easez, delay: -lospd}

                @tml.add TweenLite.to @image_wrapper, nmspd, {x: -offst*(i+1), ease: easez, delay: -nmspd}
                @tml.add TweenLite.to $("#prog-tl-#{i+1}"), nmspd, {opacity: 1, scale: 1, ease: easez, delay: -nmspd}
                
                if i < @slides.length-2
                    @tml.add TweenLite.to $("#prog-tl-#{i+2}"), lospd, {clearProps: 'z-index', opacity: lopac, ease: easez, delay: -lospd}
                
                @tml.addLabel("step#{i+1}")

    goToYear: (e) =>
        step = $(e.currentTarget).attr('data-index')
        delta = step * @d10
        TweenLite.to @slidesCopy, 0.2, {opacity: 0}
        @animateStop delta


    goToSlide: (e) =>
        step = $(e.currentTarget).attr('data-slide')
        delta = step * @d10
        TweenLite.to @slidesCopy, 0.2, {opacity: 0}
        @animateStop delta

    initSlider: =>

        @prog_dt_slider.draggable
            axis: 'x'
            containment: 'parent'
            ,
            drag: (e) =>
                @updateTimeline e.target.offsetLeft
            ,
            stop: (e) =>
                @animateStop e.target.offsetLeft

    setWidth: =>
        @rangeWidth = @prog_dt_slider_container.width()-30
        @d10        = @rangeWidth / (@slides.length-1)

    animateStop: (delta) =>

        stepNum = if delta <= 0 then 0 else if delta >= @rangeWidth then 9 else Math.round(delta / @d10)

        $('.progress-timeline--desktop__year').removeClass 'selected'

        $("#progress-timeline--desktop__year-#{stepNum}").addClass 'selected'

        @revealCopy(stepNum)

        if delta <= 0
            @tml.tweenTo("step0", {ease: Expo.easeOut}).duration(1)
            @sliderPos = 0
            TweenLite.to @prog_dt_slider, 0.5, {left: 0, ease: Expo.easeOut}
            return TweenLite.to @image_wrapper, 0.3, {x: 0}
        if delta >= @rangeWidth
            @sliderPos = @d10*(@slides.length-1)
            @tml.tweenTo("step#{@slides.length-1}", {ease: Expo.easeOut}).duration(1)
            TweenLite.to @prog_dt_slider, 0.5, {left: @d10*(@slides.length-1), ease: Expo.easeOut}
            return TweenLite.to @image_carousel, 0.3, {x: 0}

        slidesNum = @slides.length

        snapFigure = stepNum * @d10

        @sliderPos = snapFigure

        TweenLite.to @prog_dt_slider, 0.5, {left: snapFigure, ease: Expo.easeOut}

        @tml.tweenTo("step#{stepNum}", {ease: Expo.easeOut}).duration(1)

        

    revealCopy: (n) =>
        @copyTimeout = setTimeout( =>
            TweenLite.to $("#progress-timeline--desktop__copy-#{n}"), 0.2, {opacity: 1}
            @copyHideThrottle = false
        , 400)


    updateTimeline: (delta) =>
        # delta = if delta >= @rangeWidth then @rangeWidth else if delta <= 0 then 0 else delta

        stepNum = if delta <= 0 then 0 else if delta >= @rangeWidth then 9 else Math.round(delta / @d10)

        $('.progress-timeline--desktop__year').removeClass 'selected'

        $("#progress-timeline--desktop__year-#{stepNum}").addClass 'selected'

        if !@copyHideThrottle and delta >= 0 and delta <= @rangeWidth
            @copyHideThrottle = true
            TweenLite.to @slidesCopy, 0.2, {opacity: 0}
        
        clearTimeout @copyTimeout

        if delta <= 0
            return TweenLite.set @image_wrapper, {x: -delta*0.4}
        else if delta >= @rangeWidth
            return TweenLite.set @image_carousel, {x: (@rangeWidth - delta)*0.4}

        prog = delta/@rangeWidth
        @tml.progress(prog)


    initMobileTimelineSwiper: =>

        @sw = new Swiper @prog_tl_swiper_container, {
            spaceBetween: 0
            speed: 600 # Duration of transition between slides
            loop: true
            autoplay: if _isMobile then 3800 else false # Delay between transitions
            autoplayDisableOnInteraction: false
            effect: 'slide'
            observer: true
            observeParents: true
            pagination: '#progress-timeline__pagination'
        }

    initDom: =>

        # Mobile
        @prog_tl_swiper_container = $('#progress-timeline__carousel-wrapper')

        # Desktop
        @prog_dt_slider = $('#progress-timeline--desktop__slider')
        @prog_dt_slider_container = $('#progress-timeline--desktop__slider-container')

        @prog_dt_slider_image = $('.progress-timeline--desktop__image')
        
        @slides = $('.progress-timeline--desktop__image')
        @slidesCopy = $('.progress-timeline--desktop__copy-item')

        @years = $('.progress-timeline--desktop__year')

        @image_carousel = $('#progress-timeline--desktop__image-carousel')
        @image_wrapper  = $('#progress-timeline--desktop--image-wrapper')




@SwipeCarousel = new SwipeCarousel