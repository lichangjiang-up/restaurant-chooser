export function checkPhone(v?: string) {
    if (!v || v.length < 1) {
        return false;
    }
    const cleanPhone = v.replaceAll('-', '');
    if (/^[\d+]\d{4,16}$/.test(cleanPhone)) {
        return false;
    }
    return 'Phone numbers format should be 5-16 digits';
}

export function checkWebsite(website?: string) {
    if (website && website.includes('.') && !['http://', 'https://'].some(prefix => website.startsWith(prefix))) {
        return 'Website format error';
    }
    return website ? false : false;
}

export function checkName(v?: string) {
    if (v && v.trim().length >= 4) {
        return false;
    }
    return 'Name should be 4-30 characters';
}

export function getRandomInt(max = 800000) {
    return Math.floor(Math.random() * max);
}

export function shuffleArr<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i >= 0; i--) {
        const j = getRandomInt(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}