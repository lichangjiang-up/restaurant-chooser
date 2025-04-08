import {isMobilePhone, isURL} from "validator";

type CanEmptyString = string | null | undefined;


export function checkPhone(v: CanEmptyString) {
    v = v?.trim();
    if (!v) {
        return 'Phone number required';
    }
    if (!isMobilePhone(v)) {
        return 'Phone number invalid';
    }
    return false;
}


export function checkWebsite(website: CanEmptyString) {
    website = website?.trim();
    if (!website) {
        return 'Website required';
    }
    if (!isURL(website, {protocols: ['http', 'https']})) {
        return 'Website format error'
    }
    return false;
}


export function checkAddress(address: CanEmptyString) {
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

export function checkName(v: CanEmptyString, nameName: string) {
    v = v?.trim();
    if (!v) {
        return `${nameName} required`;
    }
    if (v.length < 2) {
        return `${nameName} is too short`;
    }
    if (!/^\w+$/.test(v)) {
        return `${nameName} contains invalid characters`;
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