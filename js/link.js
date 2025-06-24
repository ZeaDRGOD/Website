function decodeWebhook(data, key) {
    return data.split('-').map((char, i) =>
        String.fromCharCode(parseInt(char) ^ key.charCodeAt(i % key.length))
    ).join('');
}

function getWebhook() {
    const key = '🐱'; // secret key (can be any emoji or string)
    const payload = '53-10-21-20-11-11-110-88-79-15-30-61-114-92-105-2-66-70-43-102-56-26-94-28-64-2-24-31-115-114-61-82-67-5-116-57-74-105-92-94-109-53-73-5-41-47-37-60-51-9-88-9-64-7-60-39-52-48-72-74-74-72-4-35-82-71-12-51-10-51-23-27';
    return decodeWebhook(payload, key);
}

function getWebhookRegister() {
    const key = '🦊';
    const payload = '57-9-31-22-4-12-111-91-78-30-31-55-106-74-108-19-78-74-33-100-51-9-93-21-78-17-23-42-122-124-51-91-84-1-123-59-70-110-83-85-101-52-77-10-40-46-38-63-48-0-87-14-69-6-63-36-55-47-73-71-77-71-7-32-81-68-11-48-15-54-20-30';
    return decodeWebhook(payload, key);
}

function getReportWebhook() {
    const key = '🦄';
    const payload = '59-11-22-17-7-6-108-86-81-29-24-54-111-75-107-16-75-77-34-103-50-12-90-22-75-16-20-43-121-123-48-88-87-0-120-56-71-111-80-82-102-51-76-11-43-45-35-62-49-1-86-13-70-5-62-37-54-46-70-72-76-70-6-33-80-69-10-49-14-55-21-29';
    return decodeWebhook(payload, key);
}
