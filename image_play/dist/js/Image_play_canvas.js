"use strict";
/**
 * 逐帧动画类
 * 支持自动判断是canvas还是img（兼容IE8）
 */
var ImagePlay = (function () {
    /**
     * @param {Array<string>} 	list 需要逐帧播放的图片数组
     * @param {string}			folder 图片所在的文件夹
     * @param {string}			canvasID canvas的ID
     * @param {number=25}		fps  帧频
     * @param {boolean}			loop 循环
     * @param {boolean}			reverse 方向
     * @param {boolean}			clear 是否清除canvas内容
     * @param {number}			startX X方向渲染的比例
     * @param {number}			startY Y方向渲染的比例
     * @param {number}			endX X方向渲染的比例
     * @param {number}			endY Y方向渲染的比例
     */
    function ImagePlay(list, folder, canvasID, fps, loop, reverse, clear, startX, startY, endX, endY) {
        var _this = this;
        if (fps === void 0) { fps = 25; }
        if (loop === void 0) { loop = false; }
        if (reverse === void 0) { reverse = false; }
        if (clear === void 0) { clear = true; }
        if (startX === void 0) { startX = 0; }
        if (startY === void 0) { startY = 0; }
        if (endX === void 0) { endX = 100; }
        if (endY === void 0) { endY = 100; }
        this._imgIndex = 0;
        this._folder = folder;
        this._fps = fps;
        this._loop = loop;
        this._reverse = reverse;
        this._clear = clear;
        this._startX = startX;
        this._startY = startY;
        this._endX = endX;
        this._endY = endY;
        this._canvas = document.getElementById(canvasID);
        if (this._canvas.nodeName == "IMG" || this._canvas.nodeName == "img") {
            this._useCanvas = false;
        }
        else if (this._canvas.nodeName == "CANVAS" || this._canvas.nodeName == "canvas") {
            this._useCanvas = true;
        }
        else {
            alert("请使用canvas或者img");
            return;
        }
        if (this._useCanvas) {
            this._ctx = this._canvas.getContext('2d');
        }
        //当reverse为true时，交换list中图片的顺序，实现反向播放
        this._list = Array();
        if (this._reverse) {
            var i;
            for (i = list.length; i > 0; i--) {
                this._list.push(list[i - 1]);
            }
        }
        else {
            this._list = list;
        }
        this._img = new Image;
        this._img.onload = function () {
            _this.imageReady();
        };
        this._canvasTimer = setInterval(function () {
            //刚开始时和每次循环的第一张图，设置为true
            if (_this._imgIndex == 0) {
                _this._loaded = true;
            }
            if (_this._loaded) {
                _this.updateSrc();
                if (_this._useCanvas) {
                    _this._loaded = false;
                }
            }
        }, 1000 / this._fps);
    }
    ImagePlay.prototype.imageReady = function () {
        this._loaded = true;
        if (!this._useCanvas) {
            console.log(this._list[this._imgIndex - 1]);
            this._canvas.setAttribute("src", this._img.src);
            return;
        }
        //第一张画完整的，后面只画指定部分
        if (this._dynamicCrop == null) {
            this._dynamicCrop = false;
            this._crop = this._list[this._imgIndex - 1].split("__");
            //console.log("crop=",this._crop);
            if (this._crop.length == 3) {
                this._pos = this._crop[1].split("_");
                //console.log(this._pos);
                if (this._pos.length == 4) {
                    this._dynamicCrop = true;
                }
            }
        }
        if (this._dynamicCrop) {
            this._crop = this._list[this._imgIndex - 1].split("__");
            if (this._crop.length == 3) {
                this._pos = this._crop[1].split("_");
            }
            //计算绘制区域, 按像素
            this._imageStartX = parseInt(this._pos[0]);
            this._imageStartY = parseInt(this._pos[1]);
            this._imageEndX = parseInt(this._pos[2]);
            this._imageEndY = parseInt(this._pos[3]);
            this._canvasStartX = Math.round(this._ctx.canvas.width * this._imageStartX / this._img.width);
            this._canvasStartY = Math.round(this._ctx.canvas.height * this._imageStartY / this._img.height);
            this._canvasEndX = Math.round(this._ctx.canvas.width * this._imageEndX / this._img.width);
            this._canvasEndY = Math.round(this._ctx.canvas.height * this._imageEndY / this._img.height);
        }
        else {
            //计算绘制区域，按比例
            this._imageStartX = Math.round(this._img.width * this._startX / 100);
            this._imageStartY = Math.round(this._img.height * this._startY / 100);
            this._imageEndX = Math.round(this._img.width * this._endX / 100);
            this._imageEndY = Math.round(this._img.height * this._endY / 100);
            this._canvasStartX = Math.round(this._ctx.canvas.width * this._startX / 100);
            this._canvasStartY = Math.round(this._ctx.canvas.height * this._startY / 100);
            this._canvasEndX = Math.round(this._ctx.canvas.width * this._endX / 100);
            this._canvasEndY = Math.round(this._ctx.canvas.height * this._endY / 100);
        }
        // console.log(this._startX + " " + this._endX + " " + this._startY + " " + this._endY);
        // console.log(this._img.src + ": " + this._imageStartX + " " + this._imageEndX + " " + this._imageStartY + " " + this._imageEndY + " "+
        // this._canvasStartX + " " + this._canvasEndX + " " + this._canvasStartY + " " + this._canvasEndY);
        if (this._imgIndex == 1 || this._imgIndex == this._list.length) {
            //console.log(this._img.src);
            this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
            this._ctx.drawImage(this._img, 0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
        }
        else {
            this._ctx.clearRect(this._canvasStartX, this._canvasStartY, this._canvasEndX, this._canvasEndY);
            //****** mobile上不支持绘制起点不为0的情况，所以只好从0开始绘制，但可以只clear指定区域，所以只部分影响效率，不影响效果
            this._ctx.drawImage(this._img, 0, 0, this._imageEndX, this._imageEndY, 0, 0, this._canvasEndX, this._canvasEndY);
        }
        //当Canvas播放第一张和最后一张时发出事件。
        if (this._imgIndex == 1) {
            $("body").trigger("canvasStart");
            $("body").trigger(this._list[0]);
        }
        else if (this._imgIndex == this._list.length) {
            $("body").trigger("canvasStop");
            $("body").trigger(this._list[this._list.length - 1]);
        }
    };
    ImagePlay.prototype.updateSrc = function () {
        if (this._imgIndex >= this._list.length) {
            // loop为true时，开始循环
            if (this._loop) {
                this._imgIndex = 0;
                return;
            }
            else {
                clearInterval(this._canvasTimer);
                if (this._clear) {
                    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
                }
            }
        }
        else {
            this._img.src = this._folder + this._list[this._imgIndex];
        }
        this._imgIndex++;
    };
    ImagePlay.prototype.hide = function () {
        this._list = [];
    };
    return ImagePlay;
}());
exports.ImagePlay = ImagePlay;
//# sourceMappingURL=Image_play_canvas.js.map