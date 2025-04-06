document.getElementById('register').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('gameName');
    const discord = document.getElementById('discord');
    const age = document.getElementById('age');
    const freetime = document.getElementById('onlineTime');
    const onlineExplanation = document.getElementById('onlineExplanation');
    const platform = document.getElementById('platform');
    const aboutYourself = document.getElementById('aboutYourself');
    const phone = document.getElementById('phone');
    
    if (!name.value) {
        Swal.fire({ title: 'Error', text: 'Please enter your game name.', icon: 'error' });
        return;
    }
    if (!discord.value) {
        Swal.fire({ title: 'Error', text: 'Please enter your Discord username.', icon: 'error' });
        return;
    }
    if (!age.value) {
        Swal.fire({ title: 'Error', text: 'Please enter your age.', icon: 'error' });
        return;
    }
    if (!freetime.value) {
        Swal.fire({ title: 'Error', text: 'Please specify your free time availability.', icon: 'error' });
        return;
    }
    if (!onlineExplanation.value) {
        Swal.fire({ title: 'Error', text: 'Please explain your online activity.', icon: 'error' });
        return;
    }
    if (!platform.value) {
        Swal.fire({ title: 'Error', text: 'Please select a platform.', icon: 'error' });
        return;
    }
    if (!aboutYourself.value) {
        Swal.fire({ title: 'Error', text: 'Please provide some information about yourself.', icon: 'error' });
        return;
    }

    function checkSubmissionLimit() {
        const currentDate = new Date().toLocaleDateString();
        const lastSubmissionDate = localStorage.getItem('lastSubmissionDate');

        if (!lastSubmissionDate || lastSubmissionDate !== currentDate) {
            localStorage.setItem('submissionCount', 0);
            localStorage.setItem('lastSubmissionDate', currentDate);
        }

        const submissionCount = parseInt(localStorage.getItem('submissionCount')) || 0;

        if (submissionCount < 1) {
            localStorage.setItem('submissionCount', submissionCount + 1);
            const submitButton = document.getElementById('submit');
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
        phone: phone.value,
    };

    const webhookURL = 'https://discord.com/api/webhooks/1307592438218494133/eqPVJwJ82g0QdyYNekwfkxkHi_pMpgIuZSUtV_xJ2Eanc1htQbcc3gI29KA-V9LXBqSM';
    const BuyDate = new Date().toLocaleDateString();

    const embedData = {
        title: 'Submission Register',
        description: `💠 **Username**: ${formData.name}\n🧢 **Discord**: ${formData.discord}\n🌌 **Platform**: ${formData.platform}\n💎 **Age**: ${formData.age}\n⌚ **Online**: ${formData.onlineTime}\n🎓 **Online Explain**: ${formData.onlineExplanation}\n📞 **Phone**: ${formData.phone}\n💬 **About Yourself**: ${formData.aboutYourself}`,
        color: 16777215,
    };

    const payload = {
        embeds: [embedData],
        content: '>>> ## **New! Register Submit** \n\n<@831061671514341407> Check merl register muy mk bro!',
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
        .then(response => {
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
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'There was an error submitting your form. Please try again later.',
            });
        });
});
