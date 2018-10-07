/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 10:15
 */

export class Director {
    constructor() {
        console.log('构造器初始化');
    }

    static getInstance() {
        if(!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
}