export class USW<T extends {}> {
    v!: T
    marked: boolean = false;

    renew(): USW<T> {
        return new USW(this.v);
    }

    renewObj(kv: any): USW<T> {
        return new USW(Object.assign(this.v, kv))
    }

    renewMarked(v?: boolean): USW<T> {
        const usw = new USW(this.v);
        usw.marked = !!v;
        return usw;
    }

    constructor(v: T) {
        this.v = v;
    }
}
