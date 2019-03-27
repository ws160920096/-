//游戏对象
(function () {
	var that;//记录游戏对象
	// body...
	function Game(map) {
		this.food=new food();
		this.snake=new Snake();
        this.map=map;
        that=this;
		// body...
	}
	Game.prototype.start = function() {//把食物和蛇渲染到map上面。
         this.food.render(this.map);
         this.snake.render(this.map);
         // this.snake.move();
         //     this.snake.render(this.map);
         // this.snake.move();
         //     this.snake.render(this.map);
		// 游戏的逻辑
		//1、让蛇移动起来
           runSnake();
           //4、当蛇遇到边界，游戏结束
         bindkey();
		//2、通过键盘控制方向
		//3、当蛇遇到食物该怎么变,蛇吃到食物的时候，会。。所以要在移动方法中执行
		

	};
function runSnake() {
	var timerId=setInterval(function () {//计时器，150秒蛇走一次
      //this.snake
      //这里不用this,因为this指向的是window.不是当时的游戏对象，而且window重新申请的，所以我们设定that为游戏对象。好好理解
      that.snake.move(that.food,that.map);
      that.snake.render(that.map);

      //遇到边界停下来。
      var headx=that.snake.body[0].x;//定义蛇头
       var heady=that.snake.body[0].y;
       var maxx=that.map.offsetWidth/that.snake.width;
       var maxy=that.map.offsetHeight/that.snake.height;
       if(headx>=maxx||headx<0){
       	alert("Game Over");//alert会阻止alert的渲染，所以弹出game over的时候，你认为蛇头没有出去，实际上已经出去了。
       	clearInterval(timerId);
       }
       if(heady>=maxy||heady<0){
       	alert("Game Over");
       	clearInterval(timerId);
       }
		// body...
	},150)
	// body...
}
function bindkey() {
	//document.onkeydown=function () {}这是一种事件注册的方法
	document.addEventListener('keydown',function (e) {
		// body...
		//console.log(e.keyCode);//通过该方法获取键盘上面“上下左右“对应的值
		//左37上38下40右39
		switch(e.keyCode){
			case 37:that.snake.direction='left';break;
			case 38:that.snake.direction='top';break;
			case 39:that.snake.direction='right';break;
			case 40:that.snake.direction='bottom';break;
		}

		
	},false)
	// body...

}
	window.Game=Game;
})()
