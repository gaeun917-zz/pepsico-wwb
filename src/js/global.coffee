class Global

    constructor: ->

        @initDom()

        $ =>

            if _isMobile then FastClick.attach(document.body)

            window.lazySizesConfig =
                addClasses: true

            $('body').addClass if _isMobile then 'mobile' else 'desktop'

            @readz.on('click', @toggleReadMore)



    toggleReadMore: (e) =>

        parent = $(e.currentTarget).parent()
        parent.toggleClass 'open'



    initDom: =>

        @truncated  = $('.truncated')
        @readz      = $('.readz')
       


@Global = new Global