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
    // Server IP to copy
    var serverIP = "mikitamc.ink:19213"; // Replace with your server IP

    // Create a temporary input element
    var tempInput = document.createElement("input");
    tempInput.value = serverIP;
    document.body.appendChild(tempInput);

    // Select the text in the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Show alert message
    Swal.fire({
        title: "Copy IP",
        text: "Server IP copied to clipboard!",
        icon: "success"
    });
}
function openURL() {
    // Open a new URL in a new tab/window
    window.open("https://discord.gg/n6ew7mfj3J", "_blank"); // Replace with your desired URL
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

// Close menu when clicking a link on mobile
document.querySelectorAll('.head ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
        }
    });
});

// Function to disable X scrolling
function disableScrollX() {
    document.body.classList.add('no-scroll-x');
}

// Function to enable X scrolling (if needed later)
function enableScrollX() {
    document.body.classList.remove('no-scroll-x');
}

// Disable X scroll on page load
window.addEventListener('load', disableScrollX);

