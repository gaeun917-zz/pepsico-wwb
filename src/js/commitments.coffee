class Commitments

    constructor: ->

        @initDom()

        @multiItemEnabled = false

        @pills.on('click', @togglePillarContent)

    togglePillarContent: (e) =>

        pill = $(e.currentTarget)

        if !@multiItemEnabled && !pill.hasClass 'open'
            @pill_items_content.slideUp()
            @pills.removeClass 'open'

        setTimeout( =>
            content = pill.siblings('.pillar-item__content')
            pill.toggleClass 'open'
            $(content).slideToggle()
        , 1)


        



    initDom: =>

        @pills              = $('.pillar-item__pill')
        @pill_items_content = $('.pillar-item__content')

@Commitments = new Commitments