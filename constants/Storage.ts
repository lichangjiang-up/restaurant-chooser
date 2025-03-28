import AsyncStorage, {useAsyncStorage} from "@react-native-async-storage/async-storage";
import {AsyncStorageHook} from "@react-native-async-storage/async-storage/lib/typescript/types";

export enum StorageTyp {
    RESTAURANT = 'r',
    PEOPLE = 'p',
}

export async function deleteItem(hook: AsyncStorageHook, key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
    const keys = await getStorageKeys(hook);
    keys.delete(key);
    return await saveListByTyp(hook, keys);
}

async function saveListByTyp(hook: AsyncStorageHook, keys: Set<string>) {
    return hook.setItem(JSON.stringify(Array.from(keys.keys())))
}

export async function storageListByTyp(hook: AsyncStorageHook, key: string, v: Restaurant | Person) {
    await AsyncStorage.setItem(key, JSON.stringify(v))
    const keys = await getStorageKeys(hook);
    if (keys.has(key)) {
        return;
    }
    keys.add(key);
    return await saveListByTyp(hook, keys);
}

async function getStorageKeys(hook: AsyncStorageHook): Promise<Set<string>> {
    return new Set(JSON.parse((await hook.getItem()) || '[]'));
}

export async function getListByTyp<T>(hook: AsyncStorageHook): Promise<T[]> {
    // await AsyncStorage.clear();
    const keys = JSON.parse(await hook.getItem() || '[]');
    const items = await AsyncStorage.multiGet(keys);
    return items.map(([_, v]) => JSON.parse(v || '{}'));
}

export class Person {

}

export class Restaurant {
    key!: string;
    name!: string
    cuisine!: string;
    price!: string;
    rating!: string;
    phone!: string;
    address?: string;
    webSite?: string;
    delivery!: string;
}