class Pwp

    constructor: ->

        @initDom()

        TweenLite.to @wn, 2, {y: 100}


    isMobile: ->
        (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ))

    initDom: =>
        @wn = $('.wangotron-wrap')


@Pwp = new Pwp