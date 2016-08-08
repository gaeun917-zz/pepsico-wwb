class ProgressTimeline

    constructor: ->

        @initDom()

        $(document).ready =>

            @setWidth()

            @initMobileTimelineSwiper()

            @initDesktopTimeline()

            @initSlider()

            @years.on('click', @goToYear)

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
        # easez = Expo.easeOut

        for s, i in @slides

            if i < @slides.length-1

                if i is 0
                    @tml.addLabel("step#{i}")
                    @tml.add TweenLite.to $("#prog-tl-#{i}"), nmspd, {opacity: lopac, top: lotop, left: lolef, scale: loscl, ease: easez}
                else
                    @tml.add TweenLite.to $("#prog-tl-#{i-1}"), lospd, {opacity: 0, left: nolef, ease: easez}
                    @tml.add TweenLite.to $("#prog-tl-#{i}"), nmspd, {opacity: lopac, left: lolef, scale: loscl, ease: easez, delay: -lospd}

                @tml.add TweenLite.set $("#prog-tl-#{i}"), {clearProps: 'z-index'}
                @tml.add TweenLite.to $("#prog-tl-#{i+1}"), nmspd, {zIndex: 1000, opacity: 1, top: '0%', left: "50%", scale: 1, ease: easez, delay: -nmspd}
                
                if i < @slides.length-2
                    @tml.add TweenLite.to $("#prog-tl-#{i+2}"), lospd, {clearProps: 'z-index', opacity: lopac, left: hilef, ease: easez, delay: -lospd}
                
                @tml.addLabel("step#{i+1}")


    goToYear: (e) =>
        step = $(e.currentTarget).attr('data-index')
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

        stepNum = Math.round(delta / @d10)

        $('.progress-timeline--desktop__year').removeClass 'selected'

        $("#progress-timeline--desktop__year-#{stepNum}").addClass 'selected'

        stepNum = 9 if stepNum > 9

        slidesNum = @slides.length

        snapFigure = stepNum * @d10

        TweenLite.to @prog_dt_slider, 0.5, {left: snapFigure, ease: Expo.easeOut}

        @tml.tweenTo("step#{stepNum}", {ease: Expo.easeOut}).duration(0.5)

        @revealCopy(stepNum)

    revealCopy: (n) =>
        @copyTimeout = setTimeout( =>
            TweenLite.to $("#progress-timeline--desktop__copy-#{n}"), 0.2, {opacity: 1}
            @copyHideThrottle = false
        , 400)


    updateTimeline: (delta) =>

        stepNum = Math.round(delta / @d10)

        $('.progress-timeline--desktop__year').removeClass 'selected'

        $("#progress-timeline--desktop__year-#{stepNum}").addClass 'selected'

        if !@copyHideThrottle
            @copyHideThrottle = true
            TweenLite.to @slidesCopy, 0.2, {opacity: 0}
        
        clearTimeout @copyTimeout

        prog = delta/@rangeWidth
        @tml.progress(prog)


    initMobileTimelineSwiper: =>

        @sw = new Swiper @prog_tl_swiper_container, {
            spaceBetween: 0
            speed: 600 # Duration of transition between slides
            loop: true
            autoplay: if @isMobile() then 3800 else false # Delay between transitions
            autoplayDisableOnInteraction: false
            effect: 'slide'
            observer: true
            observeParents: true
            pagination: '#progress-timeline__pagination'
        }

            
    isMobile: ->
        (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ))

    initDom: =>

        # Mobile
        @prog_tl_swiper_container = $('#progress-timeline__carousel-wrapper')

        # Desktop
        @prog_dt_slider = $('#progress-timeline--desktop__slider')
        @prog_dt_slider_container = $('#progress-timeline--desktop__slider-container')
        
        @slides = $('.progress-timeline--desktop__image')
        @slidesCopy = $('.progress-timeline--desktop__copy-item')

        @years = $('.progress-timeline--desktop__year')




@ProgressTimeline = new ProgressTimeline