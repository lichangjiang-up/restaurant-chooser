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
    initLastModifiedAndRet: () => number,
}

export function initStorageAbs<T extends StorageAbs>(t?: T): T {
    if (t) {
        return {...t};
    }
    const obj = {} as StorageAbs;
    obj.initLastModifiedAndRet = function () {
        this.lastModified = new Date().getTime();
        return this.lastModified;
    }
    return obj as T;
}

export function descSortStorage<T extends StorageAbs>(lst: T[]): T[] {
    return lst.sort((a, b) => b.lastModified - a.lastModified)
}

