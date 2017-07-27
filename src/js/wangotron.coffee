class Wangotron

    constructor: ->

        @initDom()

        $(document).ready =>

            @pillars.on('click', @showPillarDetails)
            @modalClose.on('click', @hidePillarDetails)

            @showWangotron = =>
                @showWangTimeout = setTimeout( =>
                    @wangResetThrottle = false
                    TweenLite.to @wangotron, 1, {opacity: 1}
                , 700)
            $(window).resize =>
                @resetWangotron()
                clearTimeout @showWangTimeout
                @showWangotron()
                    
    resetWangotron: =>
        if !@wangResetThrottle
            @wangResetThrottle = true
            TweenLite.set @wangotron, {x: "0%", opacity: 0}
            TweenLite.set @wang_items, {rotation: 0, clearProps:"all"}
            TweenLite.set @wang_products, {rotation: 0}
            TweenLite.set @wang_planet, {rotation: 0}
            TweenLite.set @wang_people, {rotation: 0}
            TweenLite.set @wang_pwp, {rotation: 0}
            TweenLite.set @wang_spin, {rotation: 0}
            TweenLite.set @wangotron, {x: "0%"}
            TweenLite.set @modal, {x: "0%", display: 'none'}
            @modal.removeClass 'products people planet'
            TweenLite.set @wang_grad, {opacity: 0, rotation: 0,}
            @opening_throttle = false

    showPillarDetails: (e) =>

        pillarName = $(e.currentTarget).attr('data-pillar')

        return if @modal.hasClass pillarName

        if window.innerWidth < 1024
            TweenMax.set @modal, {display: 'block'}
            @modal.addClass pillarName
            TweenMax.to @modal, 0.5, {opacity: 1}

        else
            spd = 1.4

            TweenMax.to @modal, 0.5, {opacity: 0}

            switch pillarName

                when 'products'
                    TweenLite.to @wang_items, spd, {rotation: 150, transformOrigin: '50% 36.2%'}
                    TweenLite.to @wang_products, spd, {rotation: -150, transformOrigin: '50% 50%'}
                    TweenLite.to @wang_planet, spd, {rotation: -150, transformOrigin: '50% 50%'}
                    TweenLite.to @wang_people, spd, {rotation: -150, transformOrigin: '50% 50%'}
                    TweenLite.to @wang_pwp, spd, {rotation: -150, transformOrigin: '50% 50%'}

                when 'planet'
                    TweenLite.to @wang_items, spd, {rotation: 30, transformOrigin: '50% 36.2%'}
                    TweenLite.to @wang_products, spd, {rotation: -30, transformOrigin: '50% 50%'}
                    TweenLite.to @wang_planet, spd, {rotation: -30, transformOrigin: '50% 50%'}
                    TweenLite.to @wang_people, spd, {rotation: -30, transformOrigin: '50% 50%'}
                    TweenLite.to @wang_pwp, spd, {rotation: -30, transformOrigin: '50% 50%'}

                when 'people'
                    TweenLite.to @wang_items, spd, {rotation: -90, transformOrigin: '50% 36.2%'}
                    TweenLite.to @wang_products, spd, {rotation: 90, transformOrigin: '50% 50%'}
                    TweenLite.to @wang_planet, spd, {rotation: 90, transformOrigin: '50% 50%'}
                    TweenLite.to @wang_people, spd, {rotation: 90, transformOrigin: '50% 50%'}
                    TweenLite.to @wang_pwp, spd, {rotation: 90, transformOrigin: '50% 50%'}
            
            TweenLite.to @wang_spin, spd, {rotation: "+=360", transformOrigin: '50% 50%'}

            if !@opening_throttle
                TweenLite.set @modal, {display: 'block'}
                TweenLite.to @wang_grad, spd, {opacity: 1, force3D:false, rotation: -360, transformOrigin: '20% 50%'}
                TweenLite.to @wangotron, spd, {x: "-60%", force3D:false}
                TweenLite.to @modal, spd, {x: "110%", force3D:false}
                @opening_throttle = true

            setTimeout( =>
                @modal.removeClass 'products people planet'
                @modal.addClass pillarName
                TweenMax.to @modal, 0.5, {opacity: 1}
            , 1000)

    hidePillarDetails: =>
        if window.innerWidth < 1024
            TweenMax.to @modal, 0.2, {opacity: 0}
            setTimeout( =>
                TweenMax.set @modal, {display: 'none'}
                @modal.removeClass 'products people planet'
            , 200)
            
    isMobile: ->
        (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ))

    initDom: =>
        @pillars        = $('.wangotron__pillar')
        @modal          = $('#wangotron__details-modal')
        @modalClose     = $('#wangotron__details-modal__close')
        @wang_arms      = $('#wangotron__arms')
        @wangotron      = $('#wangotron')
        @wang_items     = $('#wangotron__items')
        @wang_products  = $('#wangotron__button--products')
        @wang_people    = $('#wangotron__button--people')
        @wang_planet    = $('#wangotron__button--planet')
        @wang_pwp       = $('#wangotron__pwp')
        @wang_grad      = $('#wangotron__gradient')
        @wang_spin      = $('#wangotron__spinner')
        @discover        = $('.btn.discover')

@Wangotron = new Wangotron