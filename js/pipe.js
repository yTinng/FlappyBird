(function(Fly) {
    var Pipe = function(config) {
        this.imgTop = config.imgTop;
        this.imgBot = config.imgBot;
        this.speed = 0.2;
        this.imgW = this.imgTop.width;
        this.imgH = this.imgTop.height;
        this.context = config.context;
        this.x = config.x;
        this.space = 150;
        this.topY = 0;
        this.botY = 0;
        this.initHeight();
    };
    Pipe.prototype.render = function(delta) {
        this.initPath();
        this.context.drawImage(this.imgTop, this.x, this.topY);
        this.context.drawImage(this.imgBot, this.x, this.botY);
        this.x -= this.speed * delta;
        if (this.x < -this.imgW) {
            this.x += this.imgW * 3 * 6;
            this.initHeight();

        }
    };
    Pipe.prototype.initHeight = function() {
        var h = Math.random() * 200 + 50;
        this.topY = h - this.imgH;
        this.botY = h + this.space;
    };
    Pipe.prototype.initPath = function() {
        this.context.rect(this.x, this.topY, this.imgW, this.imgH);
        this.context.rect(this.x, this.botY, this.imgW, this.imgH);
        // this.context.stroke();
    }
    Fly.Pipe = Pipe;
})(Fly);
