(function(Fly) {
    var Land = function(config) {
        this.img = config.img;
        this.context = config.context;
        this.speed = 0.2;
        this.x = config.x || 0;
        this.y = config.y || 0;

    };
    Land.prototype.render = function(delta) {
        this.context.drawImage(this.img, this.x, this.y);
        this.x -= this.speed * delta;
        if (this.x <= -this.img.width) {
            this.x += 4 * this.img.width;
        };
    };
    Fly.Land = Land;
})(Fly);
