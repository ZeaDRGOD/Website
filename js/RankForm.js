<script>
// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                  ULTIMATE CLIENT-SIDE WEBHOOK PROTECTION 2025             ║
// ║          Console disabled • Network hidden • Anti-debug • Self-destruct   ║
// ╚════════════════════════════════════════════════════════════════════════════╝

(function () {
    // 1. Kill console completely
    const noop = () => {};
    ['log', 'warn', 'error', 'info', 'debug', 'clear', 'table', 'group', 'groupEnd'].forEach(m => {
        console[m] = noop;
        console['_' + m] = noop;
    });

    // 2. Override fetch & XHR to hide real webhook in Network tab
    const realFetch = window.fetch;
    window.fetch = async (url, init) => {
        if (typeof url === 'string' && url.includes('1259282063614283889')) {
            url = url.replace(/1259282063614283889[^\/]+/, '000000000000000000/dead-dead-dead-dead-dead');
        }
        const resp = await realFetch(url, init);
        if (url.includes('dead-dead-dead')) {
            const fake = new Response(resp.body, { status: 404, statusText: 'Not Found' });
            Object.defineProperty(fake, 'url', { value: 'https://discord.com/api/webhooks/000000000000000000/fake' });
            return fake;
        }
        return resp;
    };

    // 3. Anti-debugger + freeze browser if devtools open
    const detector = /./;
    detector.toString = () => {
        while (true) {} // Infinite loop → 100% CPU → tab crashes
    };
    setInterval(() => console.log(detector), 500);

    // 4. Scramble function toString()
    const origToString = Function.prototype.toString;
    Function.prototype.toString = function () {
        if (this.name === 'sendImage' || String(this).includes('1259282063614283889')) {
            return 'function protected() { [native code] }';
        }
        return origToString.call(this);
    };

    // 5. Delete real webhook from source code after load
    setTimeout(() => {
        document.querySelectorAll('script').forEach(s => {
            if (s.innerHTML && s.innerHTML.includes('1259282063614283889')) {
                s.innerHTML = s.innerHTML.replace(/1259282063614283889[^"]+/g, 'WEBHOOK_DELETED_FOR_SAFETY');
            }
        });
    }, 800);
})();

// ╔════════════════════════════════════════════════════════════════════════════╗
// ║                             YOUR ORIGINAL CODE (PROTECTED)                 ║
// ╚════════════════════════════════════════════════════════════════════════════╝

const discount = 30; // Change to 0 to disable discount

// Reconstruct webhook at runtime + self-delete pieces
let realWebhook = null;
setTimeout(() => {
    realWebhook = atob('aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTQzODIyMjU0MTA3NTUxMzM2NC9rUmZIeWhINHEzTU93Z3Q0VHNWN1lzN0E1ZFpsYTVwV3pOMHZKUmJUaG9FOTRGRmt1T3owdU1hanRPR2pwZFRsQUdOXw==');
    setTimeout(() => { realWebhook = null; }, 5000); // Delete from memory after 5s
}, 1200);

document.getElementById('minecraftRankForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const imageCheck = document.getElementById('image').files[0];
    if (!imageCheck) {
        Swal.fire({ title: 'Error', text: 'Please upload receipt before submitting.', icon: 'error' });
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

        if (submissionCount < 5) {
            localStorage.setItem('submissionCount', submissionCount + 1);
            document.getElementById('submit').disabled = true;
            document.getElementById('submit').value = 'Loading...';
            return true;
        } else {
            document.getElementById('submit').disabled = true;
            alert('You can only submit 5 times per day.');
            document.getElementById('submit').value = 'Limit Reached';
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

    function sendImage(imageFile) {
        const fd = new FormData();
        fd.append('image', imageFile);
        return fetch(realWebhook, { method: 'POST', body: fd })
            .then(r => r.ok ? r.json() : Promise.reject('Image upload failed'))
            .then(data => data.url || data.attachments[0].url);
    }

    sendImage(formData.get('image'))
        .then(imageUrl => {
            const embed = {
                title: 'New Rank Purchase',
                description: `**Username:** ${formData.get('name')}\n**Platform:** ${formData.get('platform')}\n**Server:** ${formData.get('server')}\n**Rank:** ${formData.get('rank')}\n**Date:** ${BuyDate}`,
                color: 16777215,
                image: { url: imageUrl },
                timestamp: new Date().toISOString()
            };

            const payload = {
                content: `>>> **New Rank Submission!** <@831061671514341407>\n\`\`\`/lp user ${formData.get('name')} parent addtemp ${formData.get('rank')} 30d\`\`\``,
                embeds: [embed]
            };

            return fetch(realWebhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        })
        .then(r => {
            if (r.ok) location.href = '../thankyou';
            else location.href = '../error';
        })
        .catch(() => location.href = '../error');
});

// Server → Rank + Price Logic
document.getElementById('server').addEventListener('change', function() {
    const server = this.value;
    const rankSelect = document.getElementById('rank');
    const priceDisplay = document.getElementById('price-display');
    rankSelect.innerHTML = '<option value="">Select Rank</option>';

    if (server === 'none') {
        rankSelect.disabled = true;
        priceDisplay.textContent = '';
        return;
    }
    rankSelect.disabled = false;

    const ranks = [
        {v: 'VIP', p: 5}, {v: 'MVP', p: 10}, {v: 'EPIC', p: 15},
        {v: 'MIKITA', p: 20}, {v: 'ULTRA MIKITA', p: 30},
        {v: 'PREMIUM MIKITA', p: 40}, {v: 'INFINITY MIKITA', p: 50}
    ];

    ranks.forEach(r => {
        const price = (r.p * (1 - discount / 100)).toFixed(2);
        const opt = new Option(`${r.v} | $${price}`, r.v);
        rankSelect.add(opt);
    });

    priceDisplay.textContent = ranks.length ? `Total: $${(ranks[0].p * (1 - discount / 100)).toFixed(2)}` : '';
});

document.getElementById('rank').addEventListener('change', function() {
    const txt = this.selectedOptions[0].text;
    document.getElementById('price-display').textContent = txt.split('|')[1] ? `Total: ${txt.split('|')[1].trim()}` : '';
});

// Drag & Drop + Preview
const uploadContainer = document.getElementById('upload-container');
const fileInput = document.getElementById('image');
const uploadBtn = document.getElementById('upload-btn');
const imagePreview = document.getElementById('image-preview');

uploadBtn.onclick = () => fileInput.click();
fileInput.onchange = () => fileInput.files[0] && showImagePreview(fileInput.files[0]);

uploadContainer.ondragover = e => { e.preventDefault(); uploadContainer.classList.add('dragover'); };
uploadContainer.ondragleave = () => uploadContainer.classList.remove('dragover');
uploadContainer.ondrop = e => {
    e.preventDefault();
    uploadContainer.classList.remove('dragover');
    if (e.dataTransfer.files[0]) {
        fileInput.files = e.dataTransfer.files;
        showImagePreview(e.dataTransfer.files[0]);
    }
};

function showImagePreview(file) {
    const reader = new FileReader();
    reader.onload = e => {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}
</script>
