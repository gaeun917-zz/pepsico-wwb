class ProgressTimeline

    constructor: ->

        @initDom()

        $(document).ready =>

            @setWidth()

            @initMobileTimelineSwiper()

            @initDesktopTimeline()

            @initSlider()

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

        stepNum = Math.round(delta / (@rangeWidth / @slides.length))

        stepNum = 9 if stepNum > 9

        slidesNum = @slides.length

        snapFigure = stepNum * @d10

        TweenLite.to @prog_dt_slider, 0.5, {left: snapFigure, ease: Expo.easeOut}

        @tml.tweenTo("step#{stepNum}", 0.3)


    updateTimeline: (delta) =>
        prog = delta/@rangeWidth
        @tml.progress(prog)

        # console.log prog




    initMobileTimelineSwiper: =>

        @sw = new Swiper @prog_tl_swiper_container, {
            spaceBetween: 0
            speed: 600 # Duration of transition between slides
            loop: true
            autoplay: if @isMobile() then 3800 else false # Delay between transitions
            autoplayDisableOnInteraction: false
            effect: 'slide'
            # observer: true
            # observeParents: true
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

        @s1     = $('#prog-tl-0')
        @s2     = $('#prog-tl-1')
        @s3     = $('#prog-tl-2')
        @s4     = $('#prog-tl-3')
        @s5     = $('#prog-tl-4')
        @s6     = $('#prog-tl-5')
        @s7     = $('#prog-tl-6')
        @s8     = $('#prog-tl-7')
        @s9     = $('#prog-tl-8')
        @s10    = $('#prog-tl-9')




@ProgressTimeline = new ProgressTimeline