class PillarTabs

    constructor: ->

        $ =>
            @initDom()
            $(@pillar_tabs[0]).addClass('active')
            @tab_toggle.on('click', @toggleTab)

    toggleTab: (e) =>
        @pillar_tabs.removeClass('active')
        item = $(e.currentTarget).parent('.pillar-tab')
        item.toggleClass('active')


    initDom: =>
        @pillar_tabs    = $('.pillar-tab')
        @tab_toggle     = $('.pillar-tab__heading')

@PillarTabs = new PillarTabs