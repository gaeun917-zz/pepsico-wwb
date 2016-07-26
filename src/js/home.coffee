class Homepage

    constructor: ->

        @initDom()

        # It's business time
        $ =>

            if @isMobile then FastClick.attach(document.body)

            @principlesSwiper = new Swiper @principles_swiper, {
                spaceBetween: 0
                speed: 600 # Duration of transition between slides
                loop: true
                # autoplay: 3800 # Delay between transitions
                autoplayDisableOnInteraction: false
                effect: 'slide'
            }


         

    isMobile: ->
        (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ))

    initDom: =>
        @principles_swiper = $('#principles--mobile')


@Homepage = new Homepage