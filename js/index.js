AOS.init();
let url = "mikitamc.ink";
$(document).ready(() => {
    $.getJSON("https://api.mcsrvstat.us/1/" + url, (status) => {
        if (status.debug.ping) {
            $("#status").append("ONLINE");
            $("#status2").append("PLAYER");
            $("#players_num").append(status.players.online)
            $("#players_num2").append(status.players.online)
        } else {
            $("#status").append("OFFLINE");
            $("#status2").append("OFFLINE");
            $("#players_num").append("0");
            $("#players_num2").append("0");
        }
        $("body").fadeIn(2000);
    });
});
function copyServerIP() {
    var serverIP = "mikitamc.ink:25565";
    var tempInput = document.createElement("input");
    tempInput.value = serverIP;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(tempInput);

    Swal.fire({
        title: "Copy IP",
        text: "Server IP copied to clipboard!",
        icon: "success"
    });
}
function openURL() {
    window.open("https://discord.gg/n6ew7mfj3J", "_blank");
}

new Swiper(".games-swiper", {
    loop: true,
    autoplay: true,
    autoplay: {
        delay: 2500,
    },
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: -50,
    slideActiveClass: "active",
    navigation: {
        nextEl: ".games-swiper-button-next",
        prevEl: ".games-swiper-button-prev",
    },
    breakpoints: {
        992: {
            slidesPerView: 2,
        },
    },
});
new Swiper(".sponsor-swiper", {
    loop: true,
    autoplay: true,
    autoplay: {
        delay: 2500,
    },
    slidesPerView: 1,
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
});
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.head ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
document.querySelectorAll('.head ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
        }
    });
});
function disableScrollX() {
    document.body.classList.add('no-scroll-x');
}
function enableScrollX() {
    document.body.classList.remove('no-scroll-x');
}
window.addEventListener('load', disableScrollX);

