(() => {
    const n = () => {};
    ['log','error','warn','info','debug','clear'].forEach(c => console[c] = n);

    const orig = window.fetch;
    window.fetch = async (input, init) => {
        let url = typeof input === 'string' ? input : input?.url || '';
        if (url.includes('1438222541075513364')) {
            url = url.replace(/1438222541075513364[^\/]+/, '000000000000000000/safe');
        }
        const res = await orig(url, init);
        if (url.includes('safe')) {
            const fake = new Response(res.body, {status:404});
            Object.defineProperty(fake, 'url', {value:'https://discord.com/api/webhooks/000000000000000000/fake'});
            return fake;
        }
        return res;
    };

    const det = /./; det.toString = () => {while(true){}}; setInterval(() => console.log(det), 500);

    setTimeout(() => {
        document.querySelectorAll('script').forEach(s => {
            if (s.innerHTML?.includes('1438222541075513364'))
                s.innerHTML = s.innerHTML.replace(/1438222541075513364[^'"]+/g, 'HIDDEN');
        });
    }, 1000);
})();

let wh = null;
setTimeout(() => {
    wh = atob('aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM2MDE5MjI4MjE3OTE0MTg2NC9GTkVkbDg2VGYxcGltQnhSWHJiTUlLMHJoMXZmVnhtTndyM19MTnJvaUJyUWNFQUg4Tm4yQ3lDOWsxYUowTTJQdkZlUw==');
}, 1400);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register');
    const submitButton = document.getElementById('submit');

    // Ensure form and button exist
    if (!form) {
        console.error('Form with ID "register" not found.');
        return;
    }
    if (!submitButton) {
        console.error('Submit button with ID "submit" not found.');
        return;
    }

    // Ensure button is enabled initially
    submitButton.disabled = false;
    submitButton.value = 'Submit'; // Adjust to match your button's original text

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('gameName');
        const discord = document.getElementById('dc');
        const age = document.getElementById('age');
        const freetime = document.getElementById('onlineTime');
        const onlineExplanation = document.getElementById('onlineExplanation');
        const platform = document.getElementById('platform');
        const aboutYourself = document.getElementById('aboutYourself');
        const phone = document.getElementById('phone');

        // Validate form fields
        if (!name || !name.value) {
            Swal.fire({ title: 'Error', text: 'Please enter your game name.', icon: 'error' });
            return;
        }
        if (!discord || !discord.value) {
            Swal.fire({ title: 'Error', text: 'Please enter your Discord username.', icon: 'error' });
            return;
        }
        if (!age || !age.value) {
            Swal.fire({ title: 'Error', text: 'Please enter your age.', icon: 'error' });
            return;
        }
        if (!freetime || !freetime.value) {
            Swal.fire({ title: 'Error', text: 'Please specify your free time availability.', icon: 'error' });
            return;
        }
        if (!onlineExplanation || !onlineExplanation.value) {
            Swal.fire({ title: 'Error', text: 'Please explain your online activity.', icon: 'error' });
            return;
        }
        if (!platform || !platform.value) {
            Swal.fire({ title: 'Error', text: 'Please select a platform.', icon: 'error' });
            return;
        }
        if (!aboutYourself || !aboutYourself.value) {
            Swal.fire({ title: 'Error', text: 'Please provide some information about yourself.', icon: 'error' });
            return;
        }

        // Check submission limit
        function checkSubmissionLimit() {
            const currentDate = new Date().toLocaleDateString();
            const lastSubmissionDate = localStorage.getItem('lastSubmissionDate');

            if (!lastSubmissionDate || lastSubmissionDate !== currentDate) {
                localStorage.setItem('submissionCount', '0');
                localStorage.setItem('lastSubmissionDate', currentDate);
            }

            let submissionCount = parseInt(localStorage.getItem('submissionCount')) || 0;

            if (submissionCount < 1) {
                submissionCount += 1;
                localStorage.setItem('submissionCount', submissionCount.toString());
                submitButton.disabled = true;
                submitButton.value = 'Loading...';
                return true;
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'You can submit only once per day.',
                    icon: 'error',
                });
                return false;
            }
        }

        if (!checkSubmissionLimit()) {
            return;
        }

        const formData = {
            name: name.value,
            discord: discord.value,
            age: age.value,
            onlineTime: freetime.value,
            onlineExplanation: onlineExplanation.value,
            platform: platform.value,
            aboutYourself: aboutYourself.value,
            phone: phone.value || 'Not provided', // Handle optional phone
        };

        const embedData = {
            title: 'Submission Register',
            description: `💠 **Username**: ${formData.name}\n🧢 **Discord**: ${formData.discord}\n🌌 **Platform**: ${formData.platform}\n💎 **Age**: ${formData.age}\n⌚ **Online**: ${formData.onlineTime}\n🎓 **Online Explain**: ${formData.onlineExplanation}\n📞 **Phone**: ${formData.phone}\n💬 **About Yourself**: ${formData.aboutYourself}`,
            color: 16777215,
        };

        const payload = {
            embeds: [embedData],
            content: '>>> ## **New! Register Submit** \n\n<@831061671514341407> Check merl register muy mk bro!',
        };

        fetch(wh, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(response => {
                submitButton.disabled = false;
                submitButton.value = 'Submit';

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Submitted Successfully',
                        text: 'Please wait for the results; we will contact you via Telegram or Discord!',
                        showConfirmButton: false,
                        timer: 3000,
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Submission Failed',
                        text: 'There was an error submitting your form. Please try again later.',
                    });
                }
            })
            .catch(error => {
                submitButton.disabled = false;
                submitButton.value = 'Submit';
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: 'There was an error submitting your form. Please try again later.',
                });
            });
    });
});