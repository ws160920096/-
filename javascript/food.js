//为了防止作用域冲突，以及命名冲突，设置定义自调用函数
//自定义函数相当于开辟了新的作用域。由于他是开辟新的定义域，
//所以有可能一些调用里面对象，可能访问不到，因为可以在函数里面设置window属性对象等于它定义，这样就好了。见42行代码
/*测试自调用函数(function (){
console.log("1");
})()*/
(function (){
	var position="absolute";//方便以后修改，所以定义变量。
var elements=[]//存储出现在页面里面的元素，为了保持与原数组一样，所有定义数组
function food(options){
	options=options||{};//如果没有传值，就为空，否则下面的.x会报错，下面的同样道理
	this.x=options.x||0;
	this.y=options.y||0;
	this.width=options.width||20;
	this.height=options.height||20;
	this.color=options.color||"red";
}
var position="absolute";//方便以后修改，所以定义变量。
food.prototype.render=function (map){
	remove();//生成新的食物，首先删除原来的食物，此时通过food方法是不能访问到remove
	this.x=Tools.getRandom(0,map.offsetWidth/(this.width)-1)*this.width;//这里借助了tool.js里面的工具，我们随机生成是此时的食物前面有多少个随机点食物，然后乘于食物的宽度，就是当前的坐标。
	this.y=Tools.getRandom(0,map.offsetHeight/(this.height)-1)*this.height;
	var div=document.createElement('div');
	map.appendChild(div);
	elements.push(div);
	div.style.left=this.x+'px';//当前里面没有x，所有用调用他的属性，要用this.
	div.style.top=this.y+'px';
	div.style.position=position;
	div.style.width=this.width+'px';
	div.style.height=this.height+'px';
	div.style.backgroundColor=this.color;
}
function remove(){//删除数组的元素，即删除页面的元素，elements是全局变量。
	for(var i=elements.length-1;i>=0;i--)
	//为啥要从最大的开始删除，为啥不从最小的开始删除。
//比如：数组元素位置为0,1,2;那么删除0的元素，由于数组里面序号重新排列，
//所以此时，原来1号位置变成0，2号位置变成1，那么这样按照顺序要删除1号位置，也就是原来的2号位置元素，
//所以这样有一些元素删不掉，解决方法就是从后面开始删除，从后面删除，里面元素序号不变。好好理解，不理解，画一下
         elements[i].parentNode.removeChild(elements[i]);//删除div
         elements.splice(i,1);//删除数组里面元素；
}
window.food=food;//window下面的成员是公共，所以为了让外部访问，所以将food让外
})()
//测试代码
// var map=document.getElementById('map');
// var food=new food();//相当于调用window.food。
// food.render(map);//将对象显示在页面
