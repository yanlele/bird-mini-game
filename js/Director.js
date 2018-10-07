/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:15
 */
import {DataStore} from "./base/DataStore.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    run() {
        this.dataStore.get('background').draw();
        this.dataStore.get('land').draw();
        let timer = requestAnimationFrame(() => this.run());        // 循环执行
        this.dataStore.put('timer', timer);
        // cancelAnimationFrame(this.dataStore.get('timer'));          // 这个函数可以终止动画循环
    }
}