/**
 * create by yanlele
 * create time 2018-10-12 14:48
 */


class
Store {
    private static instance: Store;
    private map: any;
    constructor() {
        this.map = new Map();
    }

    static getInstance() {
        if(!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    put(key: string, value: any) {
        if (typeof value === 'function') {
            value = new value();
        }

        this.map.set(key, value);
        return this;
    }

    get(key: string) {
        return this.map.get(key);
    }

    // 销毁
    destroy() {
        for(let value of this.map.values()) {
            value = null;
        }
    }
}

export default Store;