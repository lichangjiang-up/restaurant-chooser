import {isMobilePhone, isURL} from "validator";

export function checkPhone(v?: string) {
    v = v?.trim();
    if (!v) {
        return 'Phone number required';
    }
    if (!isMobilePhone(v)) {
        return 'Phone number invalid';
    }
    return false;
}


export function checkWebsite(website?: string) {
    website = website?.trim();
    if (!website) {
        return 'Website required';
    }
    if (!isURL(website, {protocols: ['http', 'https']})) {
        return 'Website format error'
    }
    return false;
}


export function checkAddress(address?: string) {
    address = address?.trim();
    if (!address) {
        return 'Address required';
    }
    if (address.length < 5) {
        return 'Address is too short';
    }
    if (!/^(?=.*\d)(?=.*\D).+$/.test(address)) {
        return 'Address should include street number and name';
    }
    return false;
}

export function checkName(v?: string) {
    v = v?.trim();
    if (!v) {
        return 'Name required';
    }
    if (v.length < 2) {
        return 'Name is too short';
    }
    if (!/^\w+$/.test(v)) {
        return 'Name contains invalid characters';
    }
    return false;
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