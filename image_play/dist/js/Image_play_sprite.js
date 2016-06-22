/**
 * 逐帧动画类
 * 支持自动判断是canvas还是img（兼容IE8）
 */
var Image_play_sprite = (function () {
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
    function Image_play_sprite(img, canvasID, fps, total, columns, w, h, loop, reverse) {
        if (fps === void 0) { fps = 25; }
        if (columns === void 0) { columns = 1; }
        if (loop === void 0) { loop = false; }
        if (reverse === void 0) { reverse = false; }
        this._columns = 1;
        this._loop = false;
        this._reverse = false;
        this._fps = fps;
        this._total = total;
        this._columns = columns;
        this._w = w;
        this._h = h;
        this._loop = loop;
        this._reverse = reverse;
        this._canvas = document.getElementById(canvasID);
        this._canvas.style.backgroundImage = "url('" + img + "')";
        this._canvas.style.backgroundRepeat = "no-repeat";
        this._canvas.style.display = "block";
        this._index = (reverse) ? total - 1 : 0;
        this.play();
    }
    Image_play_sprite.prototype.play = function () {
        var _this = this;
        if (this._timer) {
            this.pause();
        }
        this._canvas.style.display = "block";
        this._timer = setInterval(function () {
            var positionX, positionY = "0";
            var step = (_this._reverse) ? -1 : 1;
            if (_this._index < _this._total && _this._index >= 0) {
                positionX = (_this._index % _this._columns) * _this._w * -1 + "px";
                positionY = Math.floor(_this._index / _this._columns) * _this._h * -1 + "px";
                _this._canvas.style.backgroundPosition = positionX + " " + positionY;
                // console.log(this._index,columns,w,step,positionX,positionY);
                _this._index += step;
            }
            else {
                if (_this._loop) {
                    _this._index = (_this._reverse) ? _this._total - 1 : 0;
                }
                else {
                    clearInterval(_this._timer);
                }
            }
        }, Math.round(1000 / this._fps));
    };
    Image_play_sprite.prototype.stop = function () {
        clearInterval(this._timer);
        this._canvas.style.display = "none";
    };
    Image_play_sprite.prototype.pause = function () {
        clearInterval(this._timer);
    };
    return Image_play_sprite;
}());
//# sourceMappingURL=Image_play_sprite.js.map