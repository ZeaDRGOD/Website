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

// Delayed + encrypted webhook
let wb = null;
setTimeout(() => {
    wb = atob('aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTQzODIyMjU0MTA3NTUxMzM2NC9rUmZIeWhINHEzTU93Z3Q0VHNWN1lzN0E1ZFpsYTVwV3pOMHZKUmJUaG9FOTRGRmt1T3owdU1hanRPR2pwZFRsQUdOXw==');
}, 1400);

const discount = 30; // Change to 20 for 20% discount

// ════════════════════════════════════════════════════════════════════════════
//                               FORM SUBMISSION (SINGLE REQUEST!)
// ════════════════════════════════════════════════════════════════════════════
document.getElementById('minecraftRankForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!document.getElementById('image').files[0]) {
        Swal.fire({title:'Error',text:'Please upload receipt before submitting.',icon:'error'});
        return;
    }

    // Daily limit
    const today = new Date().toLocaleDateString();
    if (localStorage.getItem('lastDate') !== today) {
        localStorage.setItem('subs', '0');
        localStorage.setItem('lastDate', today);
    }
    if (parseInt(localStorage.getItem('subs') || '0') >= 1) {
        alert('You can only submit 1 times per day.');
        return;
    }
    localStorage.setItem('subs', parseInt(localStorage.getItem('subs')||'0') + 1);

    const submitBtn = document.getElementById('submit');
    submitBtn.disabled = true;
    submitBtn.value = 'Loading...';

    const file = document.getElementById('image').files[0];
    const username = document.getElementById('name').value;
    const platform = document.getElementById('platform').value;
    const server = document.getElementById('server').value;
    const rank = document.getElementById('rank').value;

    // Create FormData with file AND payload
    const form = new FormData();
    form.append('file', file, 'receipt.png'); // Discord needs a filename

    const embed = {
        title: 'Submission Rank',
        description: `💠 **Username:** ${username}\n🌌 **Platform:** ${platform}\n💎 **Server:** ${server}\n💍 **Rank:** ${rank}\n⌛ **Date:** ${new Date().toLocaleDateString()}`,
        color: 16777215,
        image: { url: 'attachment://receipt.png' }, // References the uploaded file
        timestamp: new Date().toISOString()
    };

    const payload = {
        content: `>>> ## **New! Rank Submit** \n\n<@831061671514341407> Check!\n\`\`\`/setrank ${username} ${rank} 31\`\`\``,
        embeds: [embed]
    };

    form.append('payload_json', JSON.stringify(payload));

    // ONE SINGLE REQUEST — image + embed together!
    fetch(wb, {
        method: 'POST',
        body: form
    })
    .then(r => {
        if (r.ok) location.href = '../thankyou';
        else location.href = '../error';
    })
    .catch(() => location.href = '../error');
});

// ════════════════════════════════════════════════════════════════════════════
//                  SERVER → RANK (YOUR EXACT STYLE - if/else if)
// ════════════════════════════════════════════════════════════════════════════
document.getElementById('server').addEventListener('change', function() {
    const server = this.value;
    const rankSelect = document.getElementById('rank');
    const priceDisplay = document.getElementById('price-display');

    rankSelect.innerHTML = '';
    priceDisplay.textContent = '';

    if (server === 'none') {
        alert('Please select a server.');
        rankSelect.disabled = true;
        return;
    }
    rankSelect.disabled = false;

    let ranks;
    if (server === 'Economy SMP (MAP A)' || server === 'Economy SMP (MAP B)') {
        ranks = [
            { value: 'VIP',            text: `VIP | $${(5  * (1 - discount/100)).toFixed(2)}`,  price: `$${(5  * (1 - discount/100)).toFixed(2)}` },
            { value: 'MVP',            text: `MVP | $${(10 * (1 - discount/100)).toFixed(2)}`,  price: `$${(10 * (1 - discount/100)).toFixed(2)}` },
            { value: 'EPIC',           text: `EPIC | $${(15 * (1 - discount/100)).toFixed(2)}`, price: `$${(15 * (1 - discount/100)).toFixed(2)}` },
            { value: 'MIKITA',         text: `MIKITA | $${(20 * (1 - discount/100)).toFixed(2)}`, price: `$${(20 * (1 - discount/100)).toFixed(2)}` },
            { value: 'ULTRA MIKITA',   text: `ULTRA MIKITA | $${(30 * (1 - discount/100)).toFixed(2)}`, price: `$${(30 * (1 - discount/100)).toFixed(2)}` },
            { value: 'PREMIUM MIKITA', text: `PREMIUM MIKITA | $${(40 * (1 - discount/100)).toFixed(2)}`, price: `$${(40 * (1 - discount/100)).toFixed(2)}` },
            { value: 'INFINITY MIKITA',text: `INFINITY MIKITA | $${(50 * (1 - discount/100)).toFixed(2)}`, price: `$${(50 * (1 - discount/100)).toFixed(2)}` }
        ];
    }
    // Add new servers here easily
    // else if (server === 'SkyBlock') { ... }

    if (ranks) {
        ranks.forEach(rank => {
            const opt = document.createElement('option');
            opt.value = rank.value;
            opt.textContent = rank.text;
            rankSelect.appendChild(opt);
        });
        priceDisplay.textContent = `Total: ${ranks[0].price}`;
    }
});

document.getElementById('rank').addEventListener('change', function() {
    const selected = this.options[this.selectedIndex];
    document.getElementById('price-display').textContent = `Total: ${selected.text.split('|')[1].trim()}`;
});

// ════════════════════════════════════════════════════════════════════════════
//                              DRAG & DROP + PREVIEW
// ════════════════════════════════════════════════════════════════════════════
const uploadContainer = document.getElementById('upload-container');
const fileInput = document.getElementById('image');
const uploadBtn = document.getElementById('upload-btn');
const imagePreview = document.getElementById('image-preview');

uploadBtn.onclick = () => fileInput.click();
fileInput.onchange = () => fileInput.files[0] && showImagePreview(fileInput.files[0]);

uploadContainer.ondragover = e => {e.preventDefault(); uploadContainer.classList.add('dragover');};
uploadContainer.ondragleave = () => uploadContainer.classList.remove('dragover');
uploadContainer.ondrop = e => {
    e.preventDefault(); uploadContainer.classList.remove('dragover');
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


