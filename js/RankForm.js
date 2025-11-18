const PROTECT_API = "http://mfox.mikitamc.ink:25560/submit/rank";
const DISCOUNT = 0;
const DAILY_LIMIT = 1;

/* ----------------- helpers ----------------- */
function base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}
function base64Decode(str) {
    return decodeURIComponent(escape(atob(str)));
}
function obfuscateConsole(message) {
    try {
        const encoded = base64Encode(message);
        console.log("[log] %s", encoded);
    } catch (e) {
        console.log(message);
    }
}

/* ----------------- submission limit (localStorage) ----------------- */
function canSubmitToday() {
    const today = new Date().toLocaleDateString();
    const lastDate = localStorage.getItem('protect_last_date');
    if (!lastDate || lastDate !== today) {
        localStorage.setItem('protect_last_date', today);
        localStorage.setItem('protect_count', '0');
    }
    const count = parseInt(localStorage.getItem('protect_count') || '0', 10);
    return count < DAILY_LIMIT;
}
function incrementSubmitCount() {
    const count = parseInt(localStorage.getItem('protect_count') || '0', 10);
    localStorage.setItem('protect_count', String(count + 1));
}

/* ----------------- DOM elements ----------------- */
const form = document.getElementById('minecraftRankForm');
const submitBtn = document.getElementById('submit');
const fileInput = document.getElementById('image');
const uploadBtn = document.getElementById('upload-btn');
const uploadContainer = document.getElementById('upload-container');
const imagePreview = document.getElementById('image-preview');
const serverSelect = document.getElementById('server');
const rankSelect = document.getElementById('rank');
const priceDisplay = document.getElementById('price-display');

/* safety: ensure elements exist */
if (!form) {
    console.error("protect-client.js: minecraftRankForm not found");
}
if (!fileInput) {
    console.error("protect-client.js: image input not found");
}

/* ----------------- price/rank data generator ----------------- */
function formatPrice(num) {
    return `$${num.toFixed(2)}`;
}
function discountedPrice(base) {
    return base * (1 - (DISCOUNT / 100));
}

function populateRanksFor(serverName) {
    rankSelect.innerHTML = '';
    const basePrices = [
        ["VIP", 5],
        ["MVP", 10],
        ["EPIC", 15],
        ["MIKITA", 20],
        ["ULTRA MIKITA", 30],
        ["PREMIUM MIKITA", 40],
        ["INFINITY MIKITA", 50]
    ];

    // You can change server-specific lists here if needed
    const ranks = basePrices.map(([name, price]) => {
        const p = discountedPrice(price);
        return { value: name, text: `${name} | ${formatPrice(p)}`, price: formatPrice(p) };
    });

    ranks.forEach(r => {
        const option = document.createElement('option');
        option.value = r.value;
        option.textContent = r.text;
        rankSelect.appendChild(option);
    });

    if (ranks.length > 0) {
        priceDisplay.textContent = `Total: ${ranks[0].price}`;
    } else {
        priceDisplay.textContent = '';
    }
}

/* init first server if already selected */
if (serverSelect && rankSelect && priceDisplay) {
    if (serverSelect.value && serverSelect.value !== 'none') {
        populateRanksFor(serverSelect.value);
    } else {
        rankSelect.disabled = true;
        priceDisplay.textContent = '';
    }
}

/* ----------------- UI interactions ----------------- */
if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => fileInput.click());
}

if (fileInput) {
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) showImagePreview(file);
    });
}

if (uploadContainer) {
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
            fileInput.files = e.dataTransfer.files;
            showImagePreview(file);
        }
    });
}

function showImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        if (!imagePreview) return;
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

/* update price when rank changes */
if (rankSelect) {
    rankSelect.addEventListener('change', function() {
        const selected = this.options[this.selectedIndex];
        if (!selected) return;
        const parts = selected.textContent.split('|');
        if (parts.length > 1) {
            priceDisplay.textContent = `Total: ${parts[1].trim()}`;
        }
    });
}

/* update ranks when server changes */
if (serverSelect) {
    serverSelect.addEventListener('change', function() {
        const server = this.value;
        if (!server || server === 'none') {
            alert('Please select a server.');
            rankSelect.disabled = true;
            priceDisplay.textContent = '';
            return;
        }
        rankSelect.disabled = false;
        populateRanksFor(server);
    });
}

/* ----------------- submit handler ----------------- */
if (form) {
    form.addEventListener('submit', async function (evt) {
        evt.preventDefault();

        // basic validation
        const name = document.getElementById('name')?.value?.trim();
        const platform = document.getElementById('platform')?.value?.trim();
        const server = document.getElementById('server')?.value;
        const rank = document.getElementById('rank')?.value;
        const imageFile = fileInput?.files[0] || null;

        if (!imageFile) {
            if (window.Swal) {
                Swal.fire({ title: 'Error', text: 'Please upload receipt before submitting.', icon: 'error' });
            } else {
                alert('Please upload receipt before submitting.');
            }
            return;
        }

        if (!name || !platform || !server || !rank) {
            if (window.Swal) {
                Swal.fire({ title: 'Error', text: 'Please fill all required fields.', icon: 'error' });
            } else {
                alert('Please fill all required fields.');
            }
            return;
        }

        // check local daily limit
        if (!canSubmitToday()) {
            submitBtn.disabled = true;
            if (window.Swal) {
                Swal.fire({ title: 'Limit reached', text: `You can only submit ${DAILY_LIMIT} times per day.`, icon: 'warning' });
            } else {
                alert(`You can only submit ${DAILY_LIMIT} times per day.`);
            }
            return;
        }

        // disable UI
        submitBtn.disabled = true;
        const oldVal = submitBtn.value || submitBtn.innerText;
        if (submitBtn.tagName === 'INPUT') submitBtn.value = 'Loading...';
        else submitBtn.innerText = 'Loading...';

        // prepare form data for protected API
        const fd = new FormData();
        fd.append('name', name);
        fd.append('platform', platform);
        fd.append('server', server);
        fd.append('rank', rank);
        fd.append('image', imageFile);

        // Make the request to your protection server
        try {
            const res = await fetch(PROTECT_API, {
                method: 'POST',
                body: fd,
            });

            if (!res.ok) {
                // try to parse JSON error
                let msg = `Server returned ${res.status}`;
                try {
                    const j = await res.json();
                    if (j && j.detail) msg = j.detail || JSON.stringify(j);
                } catch (_) {}
                obfuscateConsole(`Submit error: ${msg}`);
                if (window.Swal) {
                    Swal.fire({ title: 'Error', text: 'Submission failed: ' + msg, icon: 'error' });
                } else {
                    alert('Submission failed: ' + msg);
                }
                // re-enable
                submitBtn.disabled = false;
                if (submitBtn.tagName === 'INPUT') submitBtn.value = oldVal;
                else submitBtn.innerText = oldVal;
                return;
            }

            // success
            incrementSubmitCount();
            obfuscateConsole(`Submission OK for ${name} / ${rank}`);

            if (window.Swal) {
                Swal.fire({ title: 'Success', text: 'Submission sent successfully!', icon: 'success' })
                .then(() => window.location.href = '../thankyou');
            } else {
                window.location.href = '../thankyou';
            }

        } catch (err) {
            obfuscateConsole(`Network error: ${String(err)}`);
            if (window.Swal) {
                Swal.fire({ title: 'Network error', text: 'Could not reach server. Try again later.', icon: 'error' });
            } else {
                alert('Could not reach server. Try again later.');
            }
            submitBtn.disabled = false;
            if (submitBtn.tagName === 'INPUT') submitBtn.value = oldVal;
            else submitBtn.innerText = oldVal;
        }
    });
}



