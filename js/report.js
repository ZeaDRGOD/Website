document.getElementById('register').addEventListener('submit', function (event) {
    event.preventDefault();

    const player = document.getElementById('player');
    const target = document.getElementById('target');
    const reportType = document.getElementById('report-type');
    const aboutYourself = document.getElementById('aboutYourself');
    const image = document.getElementById('image');

    // Validation
    if (!player.value) {
        Swal.fire({ title: 'Error', text: 'Please enter your game name.', icon: 'error' });
        return;
    }
    if (!target.value) {
        Swal.fire({ title: 'Error', text: 'Please enter the target username.', icon: 'error' });
        return;
    }
    if (!reportType.value) {
        Swal.fire({ title: 'Error', text: 'Please select a report type.', icon: 'error' });
        return;
    }
    if (!aboutYourself.value) {
        Swal.fire({ title: 'Error', text: 'Please provide a message about the report.', icon: 'error' });
        return;
    }
    if (!image.files[0]) {
        Swal.fire({ title: 'Error', text: 'Please upload proof (image or video).', icon: 'error' });
        return;
    }

    // Submission limit check (once per day)
    function checkSubmissionLimit() {
        const currentDate = new Date().toLocaleDateString();
        const lastSubmissionDate = localStorage.getItem('lastSubmissionDate');

        if (!lastSubmissionDate || lastSubmissionDate !== currentDate) {
            localStorage.setItem('submissionCount', 0);
            localStorage.setItem('lastSubmissionDate', currentDate);
        }

        const submissionCount = parseInt(localStorage.getItem('submissionCount')) || 0;

        if (submissionCount < 1000) {
            localStorage.setItem('submissionCount', submissionCount + 1);
            const submitButton = document.getElementById('submit');
            submitButton.disabled = true;
            submitButton.value = 'Submitting...';
            return true;
        } else {
            Swal.fire({
                title: 'Error',
                text: 'You can submit only one report per day.',
                icon: 'error',
            });
            return false;
        }
    }

    if (!checkSubmissionLimit()) {
        return;
    }

    // Prepare form data
    const formData = {
        player: player.value,
        target: target.value,
        reportType: reportType.value,
        message: aboutYourself.value,
        proof: image.files[0] // File object (image or video)
    };

    const webhookURL = getWebhook();

    // Combine report and proof into one message
    const combinedMessage = `# 🌟 **New Report Submitted** 🌟  
<@&1357382035999690793> Hey team, please check out this report! Proof dropping soon! 🚀  

> - 💎 **Reporter**: *${formData.player}*  
> - 🎯 **Target**: *${formData.target}*  
> - 📋 **Report Type**: *${formData.reportType}*  
> - 💬 **Message**: *${formData.message}*  

# 📸 **HERE’S THE PROOF** 📸  
Attached media for the report against *${formData.target}*.`;

    // Prepare FormData for single message with attachment
    const payload = new FormData();
    payload.append('file', formData.proof); // Attach the file (image or video)
    payload.append('payload_json', JSON.stringify({
        content: combinedMessage
    }));

    fetch(webhookURL, {
        method: 'POST',
        body: payload
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send report with proof');
            }
            Swal.fire({
                icon: 'success',
                title: 'Report Submitted',
                text: 'Your report and proof have been submitted successfully. We will review it soon!',
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                location.reload();
            });
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'There was an error submitting your report or proof. Please try again later.',
            });
            document.getElementById('submit').disabled = false;
            document.getElementById('submit').value = 'Submit';
        });
});

function getWebhook() {
    webhook = "/api/webhooks/";
    site = "https://";
    domain = "discord.com";
    id = "1387401311946805319/";
    token = "9iyHm5J2A8brJXFdgoFc4cjbUU2wOR29KSo2MpD8waDh_Flh1F248TSbL6ima0UinYZ-";
    return site + domain + webhook + id + token;
}
