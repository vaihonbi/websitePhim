$(document).ready(function() {
    var autoplaySlider = $('#autoplay').lightSlider({
        speed: 1000,
        item: 4,
        pause: 3000,
        auto: false,
        loop: true,
        pauseOnHover: true,
        slideEndAnimation: true,

        responsive: [{
                breakpoint: 800,
                settings: {
                    item: 3,
                    slideMove: 1,
                    slideMargin: 6,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    item: 2,
                    slideMove: 1
                }
            }
        ]

    });
});