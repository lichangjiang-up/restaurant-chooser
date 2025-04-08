import {isMobilePhone, isURL} from "validator";

type CanEmptyString = string | null | undefined;


export function checkPhone(phone: CanEmptyString) {
    phone = phone?.trim();
    if (!phone) {
        return 'Phone number required';
    }
    if (!isMobilePhone(phone)) {
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

export function checkName(name: CanEmptyString, nameName: string) {
    name = name?.trim();
    if (!name) {
        return `${nameName} required`;
    }
    if (name.length < 2) {
        return `${nameName} is too short`;
    }
    if (!/^\w+$/.test(name)) {
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