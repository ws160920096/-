//创建自调用函数
(function(){
	var position='absolute';
	var elements=[];
function Snake(options){
	options=options||{}//一定要设置这个{}，不能设置null不然会出错。因为空对象返回是false，就会访问后面的,
	this.width=options.width||20;//蛇节的大小
	this.height=options.height||20;
	this.direction=options.direction||'right';//蛇移动的方向
	this.body=[
		{x:3,y:2,color:"red"},
		{x:2,y:2,color:'blue'},
		{x:1,y:2,color:'blue'},
	];
}
Snake.prototype.render= function(map) {
	remove();
	for(var i=0;i<this.body.length;i++){
		var object=this.body[i];
		var div=document.createElement('div');
		map.appendChild(div);
		elements.push(div);
		div.style.position=position;
		div.style.width=this.width+'px';
		div.style.height=this.height+'px';
		div.style.left=object.x*this.width+'px';

        div.style.top=object.y*this.height+'px';
        div.style.backgroundColor=object.color;
       // console.log(div.style.left);
	}
	};
	function remove(argument) {//没有用Snake.prototype.remove这样定义，所有这样是私有。
		// body...
		for(var i=elements.length-1;i>=0;i--){
			elements[i].parentNode.removeChild(elements[i]);//删除div,parentNode相当于地图，removeChild是移除子节点。
            elements.splice(i,1);
		}
	}
Snake.prototype.move = function(food,map) {//蛇移动的方法
	for(var i=this.body.length-1;i>0;i--){//这里不取蛇头,因为除了蛇头，其他的都是移到它的上一个节点的位置。
		this.body[i].x=this.body[i-1].x;
	   this.body[i].y=this.body[i-1].y;
	}
	var head=this.body[0];
		switch(this.direction){
		case 'right':head.x+=1;	break;
		case 'left':head.x-=1;break;
		case 'top':head.y-=1;break
		case 'bottom':head.y+=1;break;
};
//当舌头与食物方法重合的时候，就会，，所以要传food的参数
var headx=head.x*this.width;//蛇对象的方向，所以用this
var heady=head.y*this.height;
if(headx==food.x&&heady==food.y){
	//蛇增加一节:怎么增加，将最后一节前进之后，还要增加一节
	var last=this.body[this.body.length-1];//获取最后一节
	this.body.push({//增加一节
		x:last.x,
		y:last.y,
		color:last.color
	});
	food.render(map);//食物重新,map参数需要传过来

}
};	// body...

window.Snake=Snake;
})()
//测试
// var map=document.getElementById('map');
// var snake=new Snake();
// console.log("1")
// snake.render(map);