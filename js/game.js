(function(Fly) {
    var Game = function(config) {
        this.context = config.context;
        this.imgSrc = ['birds', 'land', 'sky', 'pipe1', 'pipe2'];
        this.lastFramTime = new Date() - 0;
        this.curFramTime = new Date() - 0;
        //scoreTime
        this.scoreLastTime = new Date() - 0;
        this.scoreCurTime = new Date() - 0;
        this.delta = 0;
        this.isStart = true;
        //添加分数
        this.scoreDiv = config.score;
        this.score = 0;
        this.scoreDeal = 0;
        this.scoreText = 0;
        //btn
        this.btn = config.btn;
    };
    Game.prototype = {
        constructor: Game,
        init: function(imgList) {
            var ctx = this.context;
            var cv = ctx.canvas;
            var that = this;
            this.hero = null;
            this.roles = [];
            this.hero = new Fly.Bird({
                img: imgList['birds'],
                context: ctx
            });
            for (var i = 0; i < 2; i++) {
                var sky = new Fly.Sky({
                    img: imgList['sky'],
                    context: ctx,
                    x: imgList['sky'].width * i
                });
                this.roles.push(sky);
            }
            for (var i = 0; i < 6; i++) {
                var pipe = new Fly.Pipe({
                    imgTop: imgList['pipe2'],
                    imgBot: imgList['pipe1'],
                    context: ctx,
                    x: 300 + i * imgList['pipe1'].width * 3
                });
                this.roles.push(pipe);
            }
            //land
            for (var i = 0; i < 4; i++) {
                var land = new Fly.Land({
                    img: imgList['land'],
                    context: ctx,
                    x: imgList['land'].width * i,
                    y: cv.height - imgList['land'].height
                });
                this.roles.push(land);
            };
            this.context.canvas.addEventListener("click", function() {
                that.hero.changeSpeed(-0.2);
            });
        },
        //startBrn S
        startBtn: function() {
            var that = this;
            this.btn.onclick = function() {
                that.startGame();
                that.btn.setAttribute("class", "hide");

            };
        },
        //startBtn E
        startGame: function() {
            this.render();
        },
        gameOver: function() {
            this.isStart = false;
        },
        render: function() {
            var that = this;
            var ctx = that.context;
            var cv = ctx.canvas;
            Fly.loadImages(that.imgSrc, function(imgList) {
                that.init(imgList);
                var b = that.hero;
                var render = function() {
                    if (that.isStart) {
                        ctx.clearRect(0, 0, cv.width, cv.height);
                        ctx.beginPath();
                        ctx.save();
                        that.curFramTime = new Date() - 0;
                        that.delta = that.curFramTime - that.lastFramTime;
                        that.lastFramTime = that.curFramTime;

                        that.roles.forEach(function(role) {
                            role.render(that.delta);
                        });
                        b.render(that.delta);

                        //检测碰撞
                        if (b.y <= 0 || (b.y >= cv.height - imgList['land'].height - 10) || ctx.isPointInPath(b.x, b.y)) {
                            // that.isStart = false;
                            that.gameOver();
                        }
                        //scoreTime S
                        that.scoreCurTime = new Date() - 0;
                        that.score = that.scoreCurTime - that.scoreLastTime;
                        that.scoreDeal = Math.floor(that.score / 1000);
                        that.scoreDiv.innerHTML = "score: " + that.scoreDeal + " s";
                        //scoreTime E
                        ctx.restore();

                        window.requestAnimationFrame(render);
                    }
                }
                window.requestAnimationFrame(render);
            });
        }
    };
    Fly.Game = Game;

})(Fly);
