(function(Fly){
	var Sky=function( config ){
		this.img=config.img;
		this.context=config.context;
		this.speed=0.2;
		this.imgW=this.img.width;

		this.x=config.x ||  0;
		this.y=config.y || 0;
	};
	Sky.prototype.render=function( delta ){
		this.context.drawImage(this.img, this.x, this.y);

		this.x -= this.speed*delta;

		if(this.x <= -this.imgW){
			this.x += 2*this.imgW;
		}
	};
	Fly.Sky=Sky;
})(Fly);