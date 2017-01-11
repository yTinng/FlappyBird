(function(window) {
    //声明一个天空对象
    var Fly = {};
    //让window对象有自己的Fly属性
    //FlyObj.loadImages = function( imgSrc, callback ) {
    Fly.loadImages = function(imgSrc, callback) {
        var loadedCount = 0,
            length = imgSrc.length,
            imgList = {};

        imgSrc.forEach(function(value) {
            var img = new Image();
            img.src = 'imgs/' + value + '.png';
            imgList[value] = img;

            img.addEventListener('load', function() {
                loadedCount++;

                if (loadedCount >= length) {
                    // 说明所有的图片都加载完成

                    callback(imgList);
                }
            });
        });
    };
    window.Fly = Fly;
})(window)
