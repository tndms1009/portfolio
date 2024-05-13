// 다크모드 변경
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('mode-toggle');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // 모드 상태를 로컬 스토리지에 저장
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('mode', 'dark');
        } else {
            localStorage.setItem('mode', 'light');
        }
    });

    // 페이지 로드 시 로컬 스토리지에서 모드 상태를 불러옴
    const currentMode = localStorage.getItem('mode');
    if (currentMode === 'dark') {
        body.classList.add('dark-mode');
    }
});

// 스크롤 페이드인

$(document).ready(function() {
    const sections = $('section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    const setActiveSection = (index) => {
        sections.removeClass('fade-in');
        $(sections[index]).addClass('fade-in');
        if(index==1){
            fadeInEvent();
        }
    };

    const scrollToSection = (index) => {
        isScrolling = true;
        $('html, body').animate({
            scrollTop: $(sections[index]).offset().top
        }, 1000, function() {
            isScrolling = false;
            currentSectionIndex = index;
            setActiveSection(currentSectionIndex);
        });
    };

    // 초기 상태 설정
    setActiveSection(currentSectionIndex);

    // 네비게이션 클릭 이벤트
    $('nav a').on('click', function(event) {
        event.preventDefault();
        const index = $(this).parent().index();
        scrollToSection(index-1);
        $('header').addClass('scroll');
    });

    // 휠 이벤트
    $(window).on('wheel', function(event) {
        if (isScrolling) return;
        if (event.originalEvent.deltaY > 0) {
            if (currentSectionIndex < sections.length - 1) {
                scrollToSection(currentSectionIndex + 1);
            }
            $('header').addClass('scroll');
        } else {
            if (currentSectionIndex > 0) {
                scrollToSection(currentSectionIndex - 1);
            }else{
                $('header').removeClass('scroll');
            }
        }
    });

    // 키보드 이벤트
    $(document).on('keydown', function(event) {
        if (isScrolling) return;
        switch (event.which) {
            case 38: // up
                if (currentSectionIndex > 0) {
                    scrollToSection(currentSectionIndex - 1);
                }
                break;
            case 40: // down
                if (currentSectionIndex < sections.length - 1) {
                    scrollToSection(currentSectionIndex + 1);
                }
                break;
            default:
                return;
        }
    });
    // 상단 네비 버튼 클릭
    $('nav .button').click(function (){
        $('nav ul').children('li').toggleClass('active');
    });

});
// 차트구현
const chart1 = document.querySelector('.doughnut1');
const chart2 = document.querySelector('.doughnut2');
const chart3 = document.querySelector('.doughnut3');
const chart4 = document.querySelector('.doughnut4');
const chart5 = document.querySelector('.doughnut5');

const makeChart = (percent, classname, color, timeout) => {
    let i = 1;
    let chartFn = setInterval(function() {
        if (i < percent) {
            colorFn(i, classname, color);
            i++;
        } else {
            clearInterval(chartFn);
        }
    }, timeout);
}

const colorFn = (i, classname, color) => {
    classname.style.background = "conic-gradient(" + color + " 0% " + i + "%, rgba(165,165,165,0.3) " + i + "% 100%)";
}

function fadeInEvent(){
    makeChart(95, chart1, '#66d2ce', 5);
    makeChart(95, chart2, '#66d2ce', 10);
    makeChart(85, chart3, '#66d2ce', 15);
    makeChart(30, chart4, '#66d2ce', 20);
    makeChart(20, chart5, '#66d2ce', 25);
}
// 슬라이드
var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});