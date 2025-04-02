import {StateStorage} from "zustand/middleware";
import {MMKV} from "react-native-mmkv";

export const G_MMKV = new MMKV();

export const STATE_STORAGE: StateStorage = {
    getItem: (name) => {
        return new Promise<string | null>((resolve, reject) => {
            try {
                const res = G_MMKV.getString(name)
                if (res) {
                    resolve(res);
                } else {
                    reject(res);
                }
            } catch (err) {
                reject(err);
            }
        });
    },
    setItem: (name, value) => {
        G_MMKV.set(name, value);
    },
    removeItem: (name: string) => {
        G_MMKV.delete(name);
    }

}

export type StorageAbs = {
    key: string,
    lastModified: number,
}

export function initLastModifiedAndRet(v: StorageAbs, prefix: string) {
    const lastModified = new Date().getTime();
    const key = v.key || `${prefix}-${lastModified}`;
    return {key, lastModified}
}

export function descSortStorage<T extends StorageAbs>(lst: T[]): T[] {
    return lst.sort((a, b) => b.lastModified - a.lastModified)
}

