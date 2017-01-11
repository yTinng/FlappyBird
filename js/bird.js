(function(Fly) {

    //首先要有小鸟这么一个构造函数
    //把属性放入构造函数
    var Bird = function(config) {
        this.img = config.img;
        // 用来控制当前绘制的是第几帧
        this.framIndex = 0;
        this.imgH = this.img.height;
        this.imgW = this.img.width / 3;
        //加速度
        this.a = 0.0005;
        //小鸟默认位置
        this.y = config.y || 100;
        this.x = 100;
        //瞬时速度
        this.speed = 0;

        this.maxAngle = 45;
        this.maxSpeed = 0.5;
        this.curAngle = 0;


    };
    //
    //把方法放到原型
    Bird.prototype.render = function(delta) {

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        } else if (this.speed < -this.maxSpeed) {
            this.speed = -this.maxSpeed;
        };
        this.curAngle = this.speed / this.maxSpeed * this.maxAngle;


        //小鸟围绕自己旋转
        //先平移再旋转
        ctx.translate(this.x, this.y);
        ctx.rotate(toRadian(this.curAngle));

        //绘制小鸟
        //因为坐标变了 所以 需要修改小鸟绘制到画布的位置
        //小鸟自己以自己为中心旋转,坐标分别为自己的宽高一半

        ctx.drawImage(this.img, this.framIndex++ * this.imgW, 0, this.imgW, this.imgH, -1 / 2 * this.imgW, -1 / 2 * this.imgH, this.imgW, this.imgH);


        this.framIndex %= 3;
        this.calculate(delta);


    }
    Bird.prototype.calculate = function(delta) {
        //计算经过时间delta,小鸟位置
        //S = v0*t + 1/2 * a * t * t;
        //路程=初始速度*经过时间 + 1/2 *加速度 * 经过时间 * 经过的时间
        //vt = v0 + a * t
        //瞬时速度 = 初始速度 + 加速度 * 经过的时间
        //上一帧的时间
        this.y += this.speed * delta + 1 / 2 * this.a * delta * delta;
        this.speed += this.a * delta;
    };
    Bird.prototype.changeSpeed = function(cSpeed) {
        this.speed = cSpeed;
    }
    Fly.Bird = Bird;
})(window.Fly);
