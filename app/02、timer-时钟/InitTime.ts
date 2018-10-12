/**
 * create by yanlele
 * create time 2018-10-12 13:08
 */


class InitTime {
    protected time: HTMLElement = document.getElementById('time');
    protected front: HTMLCanvasElement = document.createElement('canvas');
    protected frontCtx: CanvasRenderingContext2D = this.front.getContext('2d');
    protected back: HTMLCanvasElement = document.createElement('canvas');
    protected backCtx: CanvasRenderingContext2D = this.back.getContext('2d');
    protected ratio: number = window.devicePixelRatio || 1;                         // 设备像素比
    protected color: string = '#666';

    protected textWid: number;
    protected fontSize: number;
    protected numWidth: number;
    protected numHeight: number;
    protected lineWidth: number;

    protected halfTextWid: number;
    protected halfFrontSize: number;
    protected halfNumHeight: number;
    protected halfNumWidth: number;
    protected y: number;

    protected ready: boolean = false;
    protected cache: any = {};
    protected ch: Array<string> = ['年', '月', '日', '时', '分', '秒'];
    protected timeMap: any = {
        0: '1110111', // |-|_ |_|
        1: '0010001',
        2: '0111110',
        3: '0111011',
        4: '1011001',
        5: '1101011',
        6: '1101111',
        7: '0110001',
        8: '1111111',
        9: '1111011',
    };

    public keys: Array<string> = Object.keys(this.timeMap);

    constructor(textWid = 36, frontSize = 28, numWidth = 20, numHeight = 30, lineWidth = 4) {
        this.time.appendChild(this.back);
        this.time.appendChild(this.front);

        // **element.offsetWidth**|	返回元素的宽度，包括边框和填充，但不是边距
        this.front.width = this.back.width = this.time.offsetWidth * this.ratio;
        this.front.height = this.back.height = this.time.offsetHeight * this.ratio;
        this.frontCtx.strokeStyle = this.color;

        // 线条末端 round
        this.frontCtx.lineCap = 'round';
        // 线条连接处 round
        this.frontCtx.lineJoin = 'round';

        this.textWid *= textWid;
        this.fontSize *= frontSize;
        this.numWidth *= numWidth;
        this.numHeight *= numHeight;
        this.lineWidth *= lineWidth;

        this.halfTextWid = textWid / 2;
        this.halfFrontSize = frontSize / 2;
        this.halfNumWidth = numWidth / 2;
        this.halfNumHeight = numHeight / 2;
        this.y = this.back.height / 2;

        this.backCtx.textAlign = 'center';
        this.backCtx.textBaseline = 'middle';
        this.backCtx.font = this.fontSize + 'px sans-serif, "黑体"';
    }
}

export default InitTime;