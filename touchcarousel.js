$(function() {
    var
        $touchCarouselContainer = $('section[data-carousel]'),
        $touchCarouselSlides = $touchCarouselContainer.children('article'),
        $currentSlide = false,
        sliderWidth = $touchCarouselContainer.width(),
        touchCarouselStartPageX = 0
    ;

    $(window).on('resize', function() {
        /* We recalculate the width on resize to maintain functionality.
         */
        sliderWidth = $touchCarouselContainer.width();
    });

    $touchCarouselSlides.each(function() {
        var
            $this = $(this),
            background = $this.attr('data-carousel-bg'),
            isImage = false
        ;

        /* Set the first slide as the current slide on load.
         */
        if (!$currentSlide)
            $currentSlide = $this;

        if (!background || background === '')
        /* If there is no data-carousel-bg property of if it is empty we
         * set the background to white (#fff).
         */
            background = '#fff';
        else if (background.charAt(0) !== '#')
        /* If the data-carousel-bg property doesn't being with a hash
         * (#) we process it as an image rather than a hex colour code.
         */
            isImage = true;

        if (isImage)
            $this.css({backgroundImage: 'url(' + background + ')'});
        else
            $this.css({backgroundColor: background});
    });

    $touchCarouselContainer.on('touchstart', $touchCarouselSlides, function(e) {
        $(this).bind('touchmove', touchMovement);
        touchCarouselStartPageX = e.originalEvent.touches[0].pageX;
        e.stopPropagation();
    });

    $touchCarouselContainer.on('touchcancel touchend', $touchCarouselSlides, function() {
        $(this).unbind('touchmove', touchMovement);
    });

    $touchCarouselContainer.on('mousedown', $touchCarouselSlides, function(e) {
        $(this).bind('mousemove', mouseMovement);
        touchCarouselStartPageX = e.pageX;
        e.stopPropagation();
    });

    $touchCarouselContainer.on('mouseup', $touchCarouselSlides, function() {
        $(this).unbind('mousemove', mouseMovement);
    });

    var touchMovement = function(e) {
        moveCarousel(touchCarouselStartPageX - e.originalEvent.touches[0].pageX);

    }

    var mouseMovement = function(e) {
        moveCarousel(touchCarouselStartPageX - e.pageX);
    }

    var moveCarousel = function(touchOffset) {
        var
            $nextSlide = $currentSlide.is(':last')
                            ? $currentSlide.siblings(':first')
                            : $currentSlide.next(),
            $prevSlide = $currentSlide.is(':first')
                            ? $currentSlide.siblings(':last')
                            : $currentSlide.prev(),
            direction = touchOffset > 0
                            ? "left"
                            : "right",
            offset =
        ;

        if (direction === "right") {
            $prevSlide.css({
                left: -sliderWidth
            });

            $currentSlide.animate({
                left:
            })
        }

        console.log(direction);
    }
});