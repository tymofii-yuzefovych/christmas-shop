window.onload = function() {
    //canvas init
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //snowflake particles
    var mp = 25; //max particles
    var particles = [];
    for (var i = 0; i < mp; i++) {
        particles.push({
            x: Math.random() * W, //x-coordinate
            y: Math.random() * H, //y-coordinate
            r: Math.random() * 4 + 1, //radius
            d: Math.random() * mp //density
        })
    }

    //Lets draw the flakes
    function draw() {
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;

    function update() {
        angle += 0.01;
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                if (i % 3 > 0) //66.67% of the flakes
                {
                    particles[i] = {
                        x: Math.random() * W,
                        y: -10,
                        r: p.r,
                        d: p.d
                    };
                } else {
                    //If the flake is exitting from the right
                    if (Math.sin(angle) > 0) {
                        //Enter from the left
                        particles[i] = {
                            x: -5,
                            y: Math.random() * H,
                            r: p.r,
                            d: p.d
                        };
                    } else {
                        //Enter from the right
                        particles[i] = {
                            x: W + 5,
                            y: Math.random() * H,
                            r: p.r,
                            d: p.d
                        };
                    }
                }
            }
        }
    }

    //animation loop
    setInterval(draw, 33);



    //timer

    var deadline = new Date("January 1, 2019 00:00:00");
    var daysSpan = document.getElementById('days');
    var hoursSpan = document.getElementById('hours');
    var minutesSpan = document.getElementById('minutes');
    var secondsSpan = document.getElementById('seconds');

    updateClock(deadline);
    var interval = setInterval(updateClock, 1000);

    function addDaysToDate(startDate, numberOfDays) {
        return new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + numberOfDays,
            startDate.getHours(),
            startDate.getMinutes(),
            startDate.getSeconds()
        );
    }

    function getRemainingTime(deadline) {
        var total = deadline - new Date().getTime();

        if (isNaN(total)) {
            return false;
        }

        var seconds = Math.floor((total / 1000) % 60);
        var minutes = Math.floor((total / 1000 / 60) % 60);
        var hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        var days = Math.floor(total / (1000 * 60 * 60 * 24));

        return {
            'total': total,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function updateClock() {
        var remainingTime = getRemainingTime(deadline);

        if (remainingTime.total <= 0) {
            clearInterval(interval);

            document.getElementById('expired').classList.add('show');

            return false;
        } else if (!remainingTime) {
            return false;
        }

        daysSpan.innerText = addLeadingZeros(remainingTime.days);
        hoursSpan.innerText = addLeadingZeros(remainingTime.hours);
        minutesSpan.innerText = addLeadingZeros(remainingTime.minutes);
        secondsSpan.innerText = addLeadingZeros(remainingTime.seconds);
    }

    function addLeadingZeros(time) {
        return ('0' + time).slice(-2);
    }
}

$(document).ready(function() {
    $('#owl1, #owl3, #owl4, #owl5, #owl6').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: false,
        autoPlayTimeout: 3000,
        navText: ['<img src="./img/arrow.svg" height="100%" width="100%"/>',
            '<img src="./img/arrow.svg" height="100%" width="100%"/>'
        ],
        responsive: {
            0: {
                items: 1
            },
            580: {
                items: 2
            },
            992: {
                items: 3
            },
            1140: {
                items: 4
            }
        }
    });
    $('#owl2').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: false,
        autoPlayTimeout: 3000,
        navText: ['<img src="./img/arrow-red.svg" height="100%" width="100%"/>',
            '<img src="./img/arrow-red.svg" height="100%" width="100%"/>'
        ],
        responsive: {
            0: {
                items: 1
            },
            580: {
                items: 1
            },
            730: {
                items: 1
            },
            1140: {
                items: 1
            }
        }
    });
});
//        window.onscroll = function () {
//            var buton = document.getElementById('popup__toggle');
//            if(document.documentElement.scrollTop > 450){
//                buton.classList.add('active-call');
//                buton.classList.remove('disactive-call')
//
//            }
//            else{
//                buton.classList.remove('active-call')
//                buton.classList.add('disactive-call');
//            }
//        };
