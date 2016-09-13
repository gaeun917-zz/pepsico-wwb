class Global

    constructor: ->

        @initDom()

        # shim layer with setTimeout fallback
        window.requestAnimFrame = do ->
          window.requestAnimationFrame or window.webkitRequestAnimationFrame or window.mozRequestAnimationFrame or (callback) ->
            window.setTimeout callback, 1000 / 60
            return

        $ =>

            @doHeroLoad()

            if _isMobile then FastClick.attach(document.body)

            window.lazySizesConfig =
                addClasses: true

            $('body').addClass if _isMobile then 'mobile' else 'desktop'


            @readz.on('click', @toggleReadMore)


    doHeroLoad: =>

        



    toggleReadMore: (e) =>

        parent = $(e.currentTarget).parent()
        parent.toggleClass 'open'



    initDom: =>

        @truncated  = $('.truncated')
        @readz      = $('.readz')
       


@Global = new Global