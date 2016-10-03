class Global

    constructor: ->

        @initDom()

        # shim layer with setTimeout fallback
        window.requestAnimFrame = do ->
          window.requestAnimationFrame or window.webkitRequestAnimationFrame or window.mozRequestAnimationFrame or (callback) ->
            window.setTimeout callback, 1000 / 60
            return

        $ =>

            if _isMobile then FastClick.attach(document.body)

            $('body').addClass if _isMobile then 'mobile' else 'desktop'

            window.lazySizesConfig =
                addClasses: true

        $(window).on 'load', =>

            if !_isMobile
                window.CinemagraphHero.doSpeedTest window.CinemagraphHero.initCinemagraph
                


    initDom: =>

@Global = new Global