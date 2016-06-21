/**
 * 逐帧动画类
 * 支持自动判断是canvas还是img（兼容IE8）
 */
class Image_play_sprite{
	private _canvas:any;
	private _index:number;

	/**
	 * @param {string}			img 图片
	 * @param {string}			canvasID canvas的ID
     * @param {number=25}		fps  帧频
     * @param {number}			total 逐帧总数
     * @param {number}			columns sprite图的列数
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
		this._index=0;
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
		var timer=setInterval(()=>{
			var positionX,positionY="0";
			if(this._index<total){
				positionX=(this._index%columns)*w*-1+"px";
				positionY=Math.floor(this._index/columns)*h*-1+"px";
				this._canvas.style.backgroundPosition=positionX+" "+positionY;
				this._index++;
			} else {
				clearInterval(timer);
			}
		},Math.round(1000/fps));
	}

}
