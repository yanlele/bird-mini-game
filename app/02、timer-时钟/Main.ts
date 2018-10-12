/**
 * create by yanlele
 * create time 2018-10-12 13:05
 */

import Store from './Store.js'

class Main {
    private store: Store;
    private defaultTimeObj: Object = {
        year: 29993,
        month: 12,
        day: 30,
        hour: 23,
        minute: 59,
        second: 55,
    };

    constructor() {
        this.store = Store.getInstance();
    }

    run(timeObj = this.defaultTimeObj) {

    }
}

export default Main;

