/**
 * 逐帧动画类
 * 支持自动判断是canvas还是img（兼容IE8）
 */
class Image_play_sprite{
	private _canvas:any;
	private _index:number;
	private _timer:number;
	private _fps:number;
	private _total:number;
	private _columns:number=1; 
    private _w:number;
    private _h:number;
	private _loop: boolean = false; 
    private _reverse: boolean = false;

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
        ){
		this._fps = fps;
        this._total = total;
        this._columns = columns;
        this._w = w;
        this._h = h;
		this._loop = loop;
        this._reverse = reverse;

        this._canvas = document.getElementById(canvasID);
        this._canvas.style.backgroundImage="url('"+img+"')";
        this._canvas.style.backgroundRepeat="no-repeat";
        this._canvas.style.display="block";
		this._index=(reverse)?total-1:0;
		this.play();
	}

	play(){
		if(this._timer){
			this.pause();
		}
		this._canvas.style.display="block";
		this._timer=setInterval(()=>{
			var positionX,positionY="0";
			var step=(this._reverse)?-1:1;
			if(this._index<this._total && this._index>=0){
				positionX=(this._index%this._columns)*this._w*-1+"px";
				positionY=Math.floor(this._index/this._columns)*this._h*-1+"px";
				this._canvas.style.backgroundPosition=positionX+" "+positionY;
				// console.log(this._index,columns,w,step,positionX,positionY);
				this._index+=step;
			} else {
				if(this._loop){
					this._index=(this._reverse)?this._total-1:0;
				} else {
					clearInterval(this._timer);
				}
			}
		},Math.round(1000/this._fps));
	}

	stop(){
		clearInterval(this._timer);
		this._canvas.style.display="none";
	}

	pause(){
		clearInterval(this._timer);
	}

}
