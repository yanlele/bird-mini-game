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
        if(!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    run() {
        const backgroundSprite = this.dataStore.get('background');
        backgroundSprite.draw();
    }
}