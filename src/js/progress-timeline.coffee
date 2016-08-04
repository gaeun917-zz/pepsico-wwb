class ProgressTimeline

    constructor: ->

        @initDom()

        $(document).ready =>

            @initMobileTimelineSwiper()

            @initDesktopTimeline()

            @initSlider()

    initDesktopTimeline: =>

        @tml = new TimelineMax({delay: 0, paused: true})

        spd = 0.4

        @tml
            .addLabel('step0')
            
            .to @s1, spd, {opacity: 0.3, left: "20%", scale: 0.8, ease: Power0.easeNone}
            .set @s1, {zIndex: 995}
            .set @s2, {zIndex: 1000}
            .to @s2, spd, {opacity: 1, left: "50%", scale: 1, ease: Power0.easeNone}, "-=#{spd}"
            .to @s3, spd*0.1, {opacity: 0.3, left: "80%", ease: Power0.easeNone}, "-=#{spd*0.1}"
            .addLabel('step1')

            .to @s1, spd*0.1, {opacity: 0, left: "15%", ease: Power0.easeNone}
            .to @s2, spd, {opacity: 0.3, left: "20%", scale: 0.8, ease: Power0.easeNone}, "-=#{spd*0.1}"
            .set @s2, {zIndex: 995}
            .set @s3, {zIndex: 1000}
            .to @s3, spd, {opacity: 1, left: "50%", scale: 1, ease: Power0.easeNone}, "-=#{spd}"
            .to @s4, spd*0.1, {opacity: 0.3, left: "80%", ease: Power0.easeNone}, "-=#{spd*0.1}"
            .addLabel('step2')
            
            .to @s2, spd*0.1, {opacity: 0, left: "15%", ease: Power0.easeNone}
            .to @s3, spd, {opacity: 0.3, left: "20%", scale: 0.8, ease: Power0.easeNone}, "-=#{spd*0.1}"
            .set @s3, {zIndex: 995}
            .set @s4, {zIndex: 1000}
            .to @s4, spd, {opacity: 1, left: "50%", scale: 1, ease: Power0.easeNone}, "-=#{spd}"
            .to @s5, spd*0.1, {opacity: 0.3, left: "80%", ease: Power0.easeNone}, "-=#{spd*0.1}"
            .addLabel('step3')

            .to @s3, spd*0.1, {opacity: 0, left: "15%", ease: Power0.easeNone}
            .to @s4, spd, {opacity: 0.3, left: "20%", scale: 0.8, ease: Power0.easeNone}, "-=#{spd*0.1}"
            .set @s4, {zIndex: 995}
            .set @s5, {zIndex: 1000}
            .to @s5, spd, {opacity: 1, left: "50%", scale: 1, ease: Power0.easeNone}, "-=#{spd}"
            .to @s6, spd*0.1, {opacity: 0.3, left: "80%"}, "-=#{spd*0.1}"
            .addLabel('step4')

            .to @s4, spd*0.1, {opacity: 0, left: "15%", ease: Power0.easeNone}
            .to @s5, spd, {opacity: 0.3, left: "20%", scale: 0.8, ease: Power0.easeNone}, "-=#{spd*0.1}"
            .set @s5, {zIndex: 995}
            .set @s6, {zIndex: 1000}
            .to @s6, spd, {opacity: 1, left: "50%", scale: 1, ease: Power0.easeNone}, "-=#{spd}"
            .to @s7, spd*0.1, {opacity: 0.3, left: "80%"}, "-=#{spd*0.1}"
            .addLabel('step5')

            .to @s5, spd*0.1, {opacity: 0, left: "15%", ease: Power0.easeNone}
            .to @s6, spd, {opacity: 0.3, left: "20%", scale: 0.8, ease: Power0.easeNone}, "-=#{spd*0.1}"
            .set @s6, {zIndex: 995}
            .set @s7, {zIndex: 1000}
            .to @s7, spd, {opacity: 1, left: "50%", scale: 1, ease: Power0.easeNone}, "-=#{spd}"
            .to @s8, spd*0.1, {opacity: 0.3, left: "80%"}, "-=#{spd*0.1}"
            .addLabel('step6')

            .to @s6, spd*0.1, {opacity: 0, left: "15%", ease: Power0.easeNone}
            .to @s7, spd, {opacity: 0.3, left: "20%", scale: 0.8, ease: Power0.easeNone}, "-=#{spd*0.1}"
            .set @s7, {zIndex: 995}
            .set @s8, {zIndex: 1000}
            .to @s8, spd, {opacity: 1, left: "50%", scale: 1, ease: Power0.easeNone}, "-=#{spd}"
            .to @s9, spd*0.1, {opacity: 0.3, left: "80%"}, "-=#{spd*0.1}"
            .addLabel('step7')

            .to @s7, spd*0.1, {opacity: 0, left: "15%", ease: Power0.easeNone}
            .to @s8, spd, {opacity: 0.3, left: "20%", scale: 0.8, ease: Power0.easeNone}, "-=#{spd*0.1}"
            .set @s8, {zIndex: 995}
            .set @s9, {zIndex: 1000}
            .to @s9, spd, {opacity: 1, left: "50%", scale: 1, ease: Power0.easeNone}, "-=#{spd}"
            .to @s10, spd*0.1, {opacity: 0.3, left: "80%"}, "-=#{spd*0.1}"
            .addLabel('step8')

            .to @s8, spd*0.1, {opacity: 0, left: "15%", ease: Power0.easeNone}
            .to @s9, spd, {opacity: 0.3, left: "20%", scale: 0.8, ease: Power0.easeNone}, "-=#{spd*0.1}"
            .set @s9, {zIndex: 995}
            .set @s10, {zIndex: 1000}
            .to @s10, spd, {opacity: 1, left: "50%", scale: 1, ease: Power0.easeNone}, "-=#{spd}"
            .addLabel('step9')





    initSlider: =>

        @prog_dt_slider.draggable
            axis: 'x'
            containment: 'parent'
            ,
            drag: (e) =>
              @updateTimeline e.target.offsetLeft

            # ,
            # stop: (e) =>
            #   @animateStop e.target.offsetLeft

    updateTimeline: (delta) =>

        dist = @prog_dt_slider_container.width() - 30

        @tml.progress delta / dist




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