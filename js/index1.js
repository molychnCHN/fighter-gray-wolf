// 获取dom节点
var wrap = document.getElementById('wrap');
var input = document.getElementsByTagName('input')[0];
var divs = wrap.getElementsByTagName('div');
var btn = document.getElementsByTagName('button')[0];
var span = document.getElementsByTagName('span')[0];
var loading = document.getElementById('loading');

var gameoverbol = false;
var times = 10;
var score = 0;
var w = span.offsetWidth;
var beginbol = false;

btn.onclick = function(){
	if (beginbol) {return;}
	beginbol = true;
	timeFn();
	startFn();
	score = 0;
	input.value = "";
	gameoverbol = false;
	span.style.width = w + "px";
	btn.style.display = "none";
	// btn.style.webkitTransform = "scale(1)";
}
// 游戏倒计时
function timeFn(){
	
	var n = times;
	// w = span.offsetWidth;
	var timer = setInterval(function(){
		n -= 0.02;
		if (n<=0) {
			clearInterval(timer);
			n= 0;
			gameoverbol = true;
			beginbol = false;
			btn.style.display = "block";
		}
		timeW = n/times*w;
		span.style.width = timeW + "px";
	}, 20)
}


// 狼出洞
function moveUp(obj){
	var i = 0;
	obj.bol = true;
	obj.style.display = "block";

	// 每次清除对象的全部定时器
	clearInterval(obj.timer);
	clearTimeout(obj.timeout);
	obj.timer = setInterval(function(){
		i++;
		if (obj.imgs == "h") {
			obj.children[0].src = "img/h"+i+".png";

		}else{
			obj.children[0].src = "img/x"+i+".png";
		}
		if(i>=5){
			clearInterval(obj.timer);
			// 设置延迟时间给玩家点击
			obj.timeout = setTimeout(function(){
				moveDown(obj);
			}, 200)
		}
		
		
	}, 50)
}

//狼入洞
function moveDown(obj){
	var i = 5;
	clearInterval(obj.timer);
	clearTimeout(obj.timeout);
	obj.timer = setInterval(function(){
		i--;
		if (i<=0) {
			clearInterval(obj.timer);
			obj.style.display = "none";
			obj.bol = false;
			obj.hitbol = false;
		}
		if (obj.imgs == "h") {
			obj.children[0].src = "img/h"+i+".png";
		}else{
			obj.children[0].src = "img/x"+i+".png";
		}
		
	}, 50)
}

//开始游戏
function startFn(){
	var timer = setInterval(function(){
		if (gameoverbol) {
			clearInterval(timer);
		}else{
			//使用函数递归方法
			divFn();
			function divFn(){
				var rnd = Math.floor(Math.random()*divs.length);
				if (divs[rnd].bol != true) {
					if (Math.random()-0.5 > 0) {
						divs[rnd].children[0].src = "img/h"+0+".png";
						divs[rnd].imgs = "h";
					}else{
						divs[rnd].children[0].src = "img/x"+0+".png";
						divs[rnd].imgs = "x";
					}
					moveUp(divs[rnd]);
				}else{
					divFn();
				}
			}	
		}
		
	}, 500)
}


//打击
function hitted(obj){
	var i = 6;
	clearInterval(obj.timer);
	clearTimeout(obj.timeout);
	obj.timer = setInterval(function(){
		i++;
		if (i>=9) {
			clearInterval(obj.timer);
			moveDown(obj);
		}
		if (obj.imgs == "h") {
			obj.children[0].src = "img/h"+i+".png";
		}else{
			obj.children[0].src = "img/x"+i+".png";
		}
		
	}, 50)
}
for (var i = 0; i < divs.length; i++) {
	divs[i].addEventListener("touchstart", function(){
			if (this.hitbol == true) {return;}
			this.hitbol = true;
			hitted(this);
			if (this.imgs == "h") {
				score += 10;
			}else{

				score -= 10;
				
			}
			input.value = score;
		}, false);
}


//疯狂打狼
// for (var i = 1; i < divs.length-1; i++) {
// 	divs[i].onclick = function(){
// 		if (this.hitbol == true) {return;}
// 		this.hitbol = true;
// 		hitted(this);
// 		if (this.imgs == "h") {
// 			score += 10;
// 		}else{

// 			score -= 10;
			
// 		}
// 		input.value = score;
// 	}
// }
var indexC = 1;
loadFn();
function loadFn(){
	// var arr = ["img/game_bg.jpg"];
	 var arr = ["img/game_bg.jpg","img/progress.png","img/h0.png","img/h1.png","img/h2.png","img/h3.png","img/h4.png","img/h5.png","img/h6.png","img/h7.png","img/h8.png","img/h9.png","img/x0.png","img/x1.png","img/x2.png","img/x3.png","img/x4.png","img/x5.png","img/x6.png","img/x7.png","img/x8.png","img/x9.png",];
	// var arr = ["../img/game_bg.jpg","../img/progress.png","../img/h0.png","../img/h1.png","../img/h2.png","../img/h3.png","../img/h4.png","../img/h5.png","../img/h6.png","../img/h7.png","../img/h8.png","../img/h9.png","../img/x0.png","../img/x1.png","../img/x2.png","../img/x3.png","../img/x4.png","../img/x5.png","../img/x6.png","../img/x7.png","../img/x8.png","../img/x9.png",];
	for (var i = 0; i < arr.length; i++) {
		var img = new Image();
		img.src = arr[0];
		img.onload = function(){
			indexC ++;
			if (indexC == arr.length) {
				loading.style.display = "none";
			}
		}
	}
}
