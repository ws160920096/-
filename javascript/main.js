//整个程序的入口，为了防止Index里面放html和css代码
(function () {
	var map=document.getElementById('map');
var game=new Game(map);
game.start();
	// body...
})();
