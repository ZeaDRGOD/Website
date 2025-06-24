const discount = 30; // 0% discount by default, set to 20 for 20% discount

document.getElementById('minecraftRankForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageCheck = document.getElementById('image').files[0];
    if (!imageCheck) {
        Swal.fire({
            title: 'Error',
            text: 'Please upload receipt before submitting.',
            icon: 'error'
        });
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

        if (submissionCount < 10) {
            localStorage.setItem('submissionCount', submissionCount + 1);
            const submitButton = document.getElementById('submit');
            submitButton.disabled = true;
            submitButton.value = 'Loading...';
            return true;
        } else {
            const submitButton = document.getElementById('submit');
            submitButton.disabled = true;
            alert('You can only submit 10 times in a day.');
            submitButton.value = 'Try again later!';
            return false;
        }
    }

    if (!checkSubmissionLimit()) return;

    const BuyDate = new Date().toLocaleDateString();
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('platform', document.getElementById('platform').value);
    formData.append('server', document.getElementById('server').value);
    formData.append('rank', document.getElementById('rank').value);
    formData.append('image', document.getElementById('image').files[0]);

    const webhookURL = getWebhook();

    const embedData = {
        title: 'Submission Rank',
        description: '💠 Username: ' + formData.get('name') + '\n' +
                     '🌌 Player: ' + formData.get('platform') + '\n' +
                     '💎 Server: ' + formData.get('server') + '\n' +
                     '💍 Rank: ' + formData.get('rank') + '\n' +
                     '⌛ Date: ' + BuyDate + '\n',
        color: 16777215
    };

    const payload = {
        embeds: [embedData],
        content: '>>> ## **New! Rank Submit** \n\n<@831061671514341407> Check! \n ```/lp user ' + formData.get('name') + ' parent addtemp ' + formData.get('rank') + ' 30d```'
    };

    const finalFormData = new FormData();
    finalFormData.append('payload_json', JSON.stringify(payload));
    finalFormData.append('file', formData.get('image'));

    fetch(webhookURL, {
        method: 'POST',
        body: finalFormData
    })
    .then(response => {
        if (response.ok) {
            location.href = '../thankyou';
        } else {
            console.error('Webhook Error:', response.statusText);
            location.href = '../error';
        }
    })
    .catch(error => {
        console.error('Submit Error:', error);
        location.href = '../error';
    });
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
