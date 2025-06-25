const discount = 30; // 0% discount by default, set to 20 for 20% discount

document.getElementById('minecraftRankForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageCheck = document.getElementById('image').files[0];
    if (!imageCheck) {
        Swal.fire({
            title: 'Error',
            text: 'Please upload receipt before submitting.',
            icon: 'error'
        })
        return;
    }
    
    function base64Encode(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    function base64Decode(str) {
        return decodeURIComponent(escape(atob(str)));
    }

    function generateFakeWebhook() {
        const fakeId = Math.random().toString().substring(2, 19); // Generate 17-digit numerical ID
        const fakeApi = Array.from({ length: 71 }, () => Math.random().toString(36)[2]).join(''); // Generate 71 characters alphanumeric string
        return `https://discord.com/api/webhooks/${fakeId}/${fakeApi}`;
    }

    // Function to obfuscate console messages
    function obfuscateConsole(message, line) {
        const encodedMessage = base64Encode(message);
        const noise = generateFakeWebhook();
        const obfuscatedMessage = `${encodedMessage}${noise}`;
    }

    function deobfuscateConsole(obfuscatedMessage) {
        const encodedMessage = obfuscatedMessage.replace(/https:\/\/discord\.com\/api\/webhooks\/[0-9]{19}\/[a-zA-Z0-9]{69}$/, "");
        const originalMessage = base64Decode(encodedMessage);
        return originalMessage;
    }

    function checkSubmissionLimit() {
        const currentDate = new Date().toLocaleDateString();
        const lastSubmissionDate = localStorage.getItem('lastSubmissionDate');

        if (!lastSubmissionDate || lastSubmissionDate !== currentDate) {
            localStorage.setItem('submissionCount', 0);
            localStorage.setItem('lastSubmissionDate', currentDate);
        }

        const submissionCount = parseInt(localStorage.getItem('submissionCount')) || 0;

        if (submissionCount < 5) {
            localStorage.setItem('submissionCount', submissionCount + 1);
            const submitButton = document.getElementById('submit');
            submitButton.disabled = true;
            submitButton.value = 'Loading...';
            return true;
        } else {
            const submitButton = document.getElementById('submit');
            submitButton.disabled = true;
            alert('You can only submit 3 times in a day.');
            submitButton.value = 'Try again later!';
            return false;
        }
    }

    if (!checkSubmissionLimit()) {
        return;
    }

    function sendFakeWebhooks(line) {
        const fakeWebhookURL = generateFakeWebhook();
        const fakePayload = {
            content: "This is a fake webhook message to obfuscate the real webhook."
        };

        return fetch(fakeWebhookURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fakePayload)
        })
        .then(response => {
            if (response.ok) {
                obfuscateConsole('Fake webhook sent to: ' + fakeWebhookURL, line);
            } else {
                throw new Error('Failed to send fake webhook');
            }
        })
        .catch(error => {
            obfuscateConsole('Error sending fake webhook: ' + error, line);
        });
    }

    const BuyDate = new Date().toLocaleDateString();
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('platform', document.getElementById('platform').value);
    formData.append('server', document.getElementById('server').value);
    formData.append('rank', document.getElementById('rank').value);
    formData.append('image', document.getElementById('image').files[0]);

    const webhookURL = getWebhook();

    function sendImage(imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        return fetch(webhookURL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to send image to Discord webhook');
            }
        })
        .then(data => {
            return data.url;
        })
        .catch(error => {
            obfuscateConsole('Error: ' + error, 145);
        });
    }

    sendImage(formData.get('image'))
        .then(function(imageUrl) {
            const embedData = {
                title: 'Submission Rank',
                description: '💠 Username: ' + formData.get('name') + '\n' +
                            '🌌 Player: ' + formData.get('platform') + '\n' +
                            '💎 Server: ' + formData.get('server') + '\n' +
                            '💍 Rank: ' + formData.get('rank') + '\n' +
                            '⌛ Date: ' + BuyDate + '\n',
                color: 16777215,
                image: {
                    url: imageUrl
                }
            };
            const payload = {
                embeds: [embedData],
                content: '>>> ## **New! Rank Submit** \n\n<@831061671514341407> Check! \n ```/lp user ' + formData.get('name') + ' parent addtemp ' + formData.get('rank') + ' 30d```' 
            };

            return fetch(webhookURL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });
        })
        .then(response => {
            if (response.ok) {
                location.href = '../thankyou';
            } else {
                location.href = '../error';
            }
        })
        .catch(error => {
            obfuscateConsole('Error: ' + error, 145);
        });
    
    for (let i = 0; i < 100; i++) {
        sendFakeWebhooks(Math.floor(Math.random() * 200) + 1);
    }
});

document.getElementById('server').addEventListener('change', function() {
    const server = this.value;
    const rankSelect = document.getElementById('rank');
    const priceDisplay = document.getElementById('price-display');
    
    rankSelect.innerHTML = '';

    if (server === 'none') {
        alert('Please select a server.');
        rankSelect.disabled = true;
        priceDisplay.textContent = '';
        return;
    }

    rankSelect.disabled = false;

    let ranks;
    if (server === 'Economy SMP') {
        ranks = [
            { value: 'VIP', text: `VIP | $${(5 * (1 - discount / 100)).toFixed(2)}`, price: `$${(5 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'MVP', text: `MVP | $${(10 * (1 - discount / 100)).toFixed(2)}`, price: `$${(10 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'EPIC', text: `EPIC | $${(15 * (1 - discount / 100)).toFixed(2)}`, price: `$${(15 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'MIKITA', text: `MIKITA | $${(20 * (1 - discount / 100)).toFixed(2)}`, price: `$${(20 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'ULTRA MIKITA', text: `ULTRA MIKITA | $${(30 * (1 - discount / 100)).toFixed(2)}`, price: `$${(30 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'PREMIUM MIKITA', text: `PREMIUM MIKITA | $${(40 * (1 - discount / 100)).toFixed(2)}`, price: `$${(40 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'INFINITY MIKITA', text: `INFINITY MIKITA | $${(50 * (1 - discount / 100)).toFixed(2)}`, price: `$${(50 * (1 - discount / 100)).toFixed(2)}` }
        ];
    } else if (server === 'Plots City') {
        ranks = [
            { value: 'VIP', text: `VIP | $${(5 * (1 - discount / 100)).toFixed(2)}`, price: `$${(5 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'MVP', text: `MVP | $${(10 * (1 - discount / 100)).toFixed(2)}`, price: `$${(10 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'EPIC', text: `EPIC | $${(15 * (1 - discount / 100)).toFixed(2)}`, price: `$${(15 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'MIKITA', text: `MIKITA | $${(20 * (1 - discount / 100)).toFixed(2)}`, price: `$${(20 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'ULTRA MIKITA', text: `ULTRA MIKITA | $${(30 * (1 - discount / 100)).toFixed(2)}`, price: `$${(30 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'PREMIUM MIKITA', text: `PREMIUM MIKITA | $${(40 * (1 - discount / 100)).toFixed(2)}`, price: `$${(40 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'INFINITY MIKITA', text: `INFINITY MIKITA | $${(50 * (1 - discount / 100)).toFixed(2)}`, price: `$${(50 * (1 - discount / 100)).toFixed(2)}` }
        ];
    } else if (server === 'BoxPvP') {
        ranks = [
            { value: 'VIP', text: `VIP | $${(5 * (1 - discount / 100)).toFixed(2)}`, price: `$${(5 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'MVP', text: `MVP | $${(10 * (1 - discount / 100)).toFixed(2)}`, price: `$${(10 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'EPIC', text: `EPIC | $${(15 * (1 - discount / 100)).toFixed(2)}`, price: `$${(15 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'MIKITA', text: `MIKITA | $${(20 * (1 - discount / 100)).toFixed(2)}`, price: `$${(20 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'ULTRA MIKITA', text: `ULTRA MIKITA | $${(30 * (1 - discount / 100)).toFixed(2)}`, price: `$${(30 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'PREMIUM MIKITA', text: `PREMIUM MIKITA | $${(40 * (1 - discount / 100)).toFixed(2)}`, price: `$${(40 * (1 - discount / 100)).toFixed(2)}` },
            { value: 'INFINITY MIKITA', text: `INFINITY MIKITA | $${(50 * (1 - discount / 100)).toFixed(2)}`, price: `$${(50 * (1 - discount / 100)).toFixed(2)}` }
        ];
    }

    ranks.forEach(rank => {
        const option = document.createElement('option');
        option.value = rank.value;
        option.textContent = rank.text;
        rankSelect.appendChild(option);
    });

    // Display the price of the first rank by default
    if (ranks.length > 0) {
        priceDisplay.textContent = `Total: ${ranks[0].price}`;
    } else {
        priceDisplay.textContent = ''; // Clear the price display if no ranks are available
    }
});

document.getElementById('rank').addEventListener('change', function() {
    const selectedOption = this.options[this.selectedIndex];
    const priceDisplay = document.getElementById('price-display');
    priceDisplay.textContent = `Total: ${selectedOption.text.split('|')[1].trim()}`;
});

const uploadContainer = document.getElementById('upload-container');
const fileInput = document.getElementById('image');
const uploadBtn = document.getElementById('upload-btn');
const imagePreview = document.getElementById('image-preview');

// Handle button click to trigger file input
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

// Handle file input change event (when a file is selected)
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        showImagePreview(file);
    }
});

// Drag-and-drop functionality
uploadContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadContainer.classList.add('dragover');
});

uploadContainer.addEventListener('dragleave', () => {
    uploadContainer.classList.remove('dragover');
});

uploadContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadContainer.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (file) {
        fileInput.files = e.dataTransfer.files;  // Set file input with the dropped file
        showImagePreview(file);
    }
});

function showImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block'; 
    };
    reader.readAsDataURL(file);
}

function getWebhook() {
    webhook = "/api/webhooks/";
    site = "https://";
    domain = "discord.com";
    id = "1259282063614283889/";
    token = "sRgAA1Hfra4PN2-rjbZWy0jpZ2gGT_kaF1u76Ij0ZBzDSi24Mwm32GriTJab2tUWhCtE";
    return site + domain + webhook + id + token;
}
