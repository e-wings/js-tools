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
        this._canvas = document.getElementById(canvasID);
        this._canvas.style.backgroundImage = "url('" + img + "')";
        this._canvas.style.backgroundRepeat = "no-repeat";
        this._canvas.style.display = "block";
        this._index = (reverse) ? total - 1 : 0;
        this.startTimer(fps, total, columns, w, h, loop, reverse);
    }
    Image_play_sprite.prototype.startTimer = function (fps, total, columns, w, h, loop, reverse) {
        var _this = this;
        if (fps === void 0) { fps = 25; }
        if (columns === void 0) { columns = 1; }
        if (loop === void 0) { loop = false; }
        if (reverse === void 0) { reverse = false; }
        var timer = setInterval(function () {
            var positionX, positionY = "0";
            var step = (reverse) ? -1 : 1;
            if (_this._index < total && _this._index >= 0) {
                positionX = (_this._index % columns) * w * -1 + "px";
                positionY = Math.floor(_this._index / columns) * h * -1 + "px";
                _this._canvas.style.backgroundPosition = positionX + " " + positionY;
                // console.log(this._index,columns,w,step,positionX,positionY);
                _this._index += step;
            }
            else {
                if (loop) {
                    _this._index = (reverse) ? total - 1 : 0;
                }
                else {
                    clearInterval(timer);
                }
            }
        }, Math.round(1000 / fps));
    };
    return Image_play_sprite;
}());
//# sourceMappingURL=Image_play_sprite.js.map