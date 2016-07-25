class Homepage

    constructor: ->

        @initDom()

        # It's business time
        $ =>

            if @isMobile then FastClick.attach(document.body)


         

    isMobile: ->
        (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ))

    initDom: =>
        


@Homepage = new Homepage