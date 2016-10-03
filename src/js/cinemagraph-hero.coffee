class CinemagraphHero

    constructor: ->

        @initDom()

        pillars = ['products', 'people', 'planet']

        return false if $.inArray(_pageID, pillars) < 0

        # $(document).ready =>
        #     return false if _isMobile
        #     @doSpeedTest @initCinemagraph

    initCinemagraph: (speed) =>
 
        return console.log "Connection is too slow (#{speed} seconds to load page): hero fallback to static image." if (speed > 2)

        console.log "Connection is reasonable (#{speed} seconds to load page): injecting hero video."

        video_filename = switch _pageID
            when 'products' then 'soda'
            when 'people' then 'orange'
            when 'planet' then 'nature'

        videoHtml = """
        <video loop class="hero-video" style='width:100%;height:auto'>
            <source src="../vid/#{video_filename}.mp4" type="video/mp4">
            <source src="../vid/#{video_filename}.webm" type="video/webm">
            <source src="../vid/#{video_filename}.ogg" type="video/ogg">
        </video>
        """

        @video_container.html videoHtml

        videoElem = @video_container.find 'video'

        videoPlayCallback = =>
            videoElem[0].play()
            TweenLite.to @video_initial_frame, 0.3, {opacity: 0}

        videoElem.on 'canplaythrough', videoPlayCallback

        if videoElem.readyState > 3
            videoPlayCallback()




    doSpeedTest: (callback) =>

        # imageAddr = "https://s3-eu-west-1.amazonaws.com/howwillwe/production/images/fertilizer-close-up.jpg"
        # downloadSize = 162580

        _loadEnd = new Date().getTime()

        MeasureConnectionSpeed = =>
            # endTime = 0
            # startTime = (new Date()).getTime()
            speedMbps = ''
            
            # download = new Image()
            # cacheBuster = "?nnn=" + startTime
            # download.src = imageAddr + cacheBuster
            
            duration = (_loadEnd - _loadStart) / 1000
            
            
            console.log "Page load duration: " + duration

            callback(parseFloat duration)

            # download.onload = =>
            #     endTime = (new Date()).getTime()
            #     duration = (endTime - startTime) / 1000
            #     bitsLoaded = downloadSize * 8
            #     speedBps = (bitsLoaded / duration).toFixed(2)
            #     speedKbps = (speedBps / 1024).toFixed(2)
            #     speedMbps = (speedKbps / 1024).toFixed(2)
            #     console.log "Test complete."
            #     callback(parseFloat speedMbps)

        InitiateSpeedDetection = =>
            window.setTimeout(MeasureConnectionSpeed, 1)

        InitiateSpeedDetection()


    initDom: =>
        @body                   = $('body')
        @video_container        = $('#hero--cinemagraph__video-container')
        @video_initial_frame    = $('#hero__initial-frame')

@CinemagraphHero = new CinemagraphHero