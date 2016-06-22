/**
 * 逐帧动画类
 * 支持自动判断是canvas还是img（兼容IE8）
 */
class Image_play_sprite{
	private _canvas:any;
	private _index:number;
	private _timer:number;

	/**
	 * @param {string}			img 图片
	 * @param {string}			canvasID canvas的ID
     * @param {number=25}		fps  帧频
     * @param {number}			total 逐帧总数
     * @param {number}			columns sprite图的列数
     * @param {number}			w 单张图的宽度
     * @param {number}			h 单张图的高度
	 * @param {boolean}			loop 循环
	 * @param {boolean}			reverse 方向
	 */
	constructor(img: string, 
                canvasID: string,
                fps: number = 25, 
                total: number, 
                columns:number=1, 
                w:number,
                h:number, 
		        loop: boolean = false, 
                reverse: boolean = false
        ) {

        this._canvas = document.getElementById(canvasID);
        this._canvas.style.backgroundImage="url('"+img+"')";
        this._canvas.style.backgroundRepeat="no-repeat";
        this._canvas.style.display="block";
		this._index=(reverse)?total-1:0;
		this.startTimer(fps,total,columns,w,h,loop,reverse);
	}

	startTimer(fps: number = 25, 
                total: number, 
                columns:number=1, 
                w:number,
                h:number, 
		        loop: boolean = false, 
                reverse: boolean = false
		){
		this._timer=setInterval(()=>{
			var positionX,positionY="0";
			var step=(reverse)?-1:1;
			if(this._index<total && this._index>=0){
				positionX=(this._index%columns)*w*-1+"px";
				positionY=Math.floor(this._index/columns)*h*-1+"px";
				this._canvas.style.backgroundPosition=positionX+" "+positionY;
				// console.log(this._index,columns,w,step,positionX,positionY);
				this._index+=step;
			} else {
				if(loop){
					this._index=(reverse)?total-1:0;
				} else {
					clearInterval(this._timer);
				}
			}
		},Math.round(1000/fps));
	}

	stop(){
		clearInterval(this._timer);
		this._canvas.style.display="none";
	}

	pause(){
		clearInterval(this._timer);
	}

}
