class Philanthropy

    constructor: ->

        $ =>
            @initDom()

            @btn_up.on('click', @img_up)
            @btn_down.on('click', @img_down)


    img_up: (e) =>
        if @img.hasClass('level-2') then @img.addClass('level-3') else @img.addClass('level-2') @img_wrapper.addClass('level-2')
        if @img.hasClass('level-3') then @img.removeClass('level-2') @img_wrapper.removeClass('level-2')


    img_down: (e) =>
        if @img.hasClass('level-3') then @img.removeClass('level-3') @img.addClass('level-2')
        if @img.hasClass('level-2') then @img.removeClass('level-2')
        if @img_wrapper.hasClass('level-2') then @img_wrapper.removeClass('level-2')


    initDom: =>
        @btn_up         = $('#btn-hww-up')
        @btn_down       = $('#btn-hww-down')
        @img            = $('#img-hww')
        @img_wrapper    = $('.image_wrapper-hww')

@Philanthropy = new Philanthropy