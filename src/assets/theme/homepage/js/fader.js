var imgArr2 = new Array();
var preLoad2 = new Array();
var imgRun2 = 1;


function slideShow() {	
	if(tmpSize2==0 ){
		return (false);
	}
	setTimeout('runSlideShow();',1000);
	setTimeout('runSlideShow1();',4000);
	setTimeout('runSlideShow3();',7000);
}
function runSlideShow() {
	opacity('faderImg2', 100, 0, 1000,'loadNext');
// 	opacity('SecondBLink', 100, 0, 1000,'loadNext');
	setTimeout('runSlideShow()', 4000);
}

function loadNext() {
	imgRun2 = (imgRun2+1) > (preLoad2.length -1) ? 0 : imgRun2 + 1;
	document.getElementById('faderImg2').src = preLoad2[imgRun2].src;
	document.getElementById('faderImgLink2').href = imgArrLink2[imgRun2];
	if(imgCaption2[imgRun2] == '&nbsp;'){
		document.getElementById('faderImg2').height = '112';
	}else{
		document.getElementById('faderImg2').height = '75';
	}
	// alert(preLoad2[imgRun2].height);
	document.getElementById('SecondBLink').innerHTML = imgCaption2[imgRun2];
	document.getElementById('SecondBLink').href = imgArrLink2[imgRun2];
	opacity('faderImg2', 0, 100, 1000,'');	
	opacity('SecondBLink', 0, 100, 1000,'');	
}

function opacity(id, opacStart, opacEnd, millisec, gotoFunction) {
    var speed2 = Math.round(millisec / 100); 
    var timer2 = 0; 
	var sendFunction = '';
	
    if(opacStart > opacEnd) { 
        for(var i = opacStart; i >= opacEnd; i--) {	
			if(i == opacEnd && gotoFunction){
				sendFunction = gotoFunction;
			}
            setTimeout("changeOpac(" + i + ",'" + id + "','" + sendFunction + "')",(timer2 * speed2)); 
            timer2++; 
        } 
    }else if(opacStart < opacEnd) { 
        for(var i = opacStart; i <= opacEnd; i++) {
			if(i == opacEnd && gotoFunction){
				sendFunction = gotoFunction;
			}
            setTimeout("changeOpac(" + i + ",'" + id + "','" + sendFunction + "')",(timer2 * speed2)); 
            timer2++; 
        } 
    }
} 
function changeOpac(opacity, id, gotoFunction) { 
    var object = document.getElementById(id).style; 
    object.opacity = (opacity / 100); 
    object.MozOpacity = (opacity / 100); 
    object.KhtmlOpacity = (opacity / 100); 
    object.filter = "alpha(opacity=" + opacity + ")";
	if(gotoFunction) { eval(gotoFunction + '()'); }
}

/*******first slideshow********************/

var imgArr1 = new Array();
var preLoad1 = new Array();
var imgRun1 = 1;

function slideShow1() {
	if(tmpSize1==0 ){
		return (false);
	}
	setTimeout('runSlideShow1()', 2000);
}
function runSlideShow1() {
	opacity1('faderImg1', 100, 0, 1000,'loadNext1');
// 	opacity('FirstBLink', 100, 0, 1000,'loadNext1');
	setTimeout('runSlideShow1()', 4000);
}
function loadNext1() {
	imgRun1 = (imgRun1+1) > (preLoad1.length -1) ? 0 : imgRun1 + 1;
	document.getElementById('faderImg1').src = preLoad1[imgRun1].src;
	document.getElementById('faderImgLink1').href = imgArrLink1[imgRun1];
	if(imgCaption1[imgRun1] == '&nbsp;'){
		document.getElementById('faderImg1').height = '112';
	}else{
		document.getElementById('faderImg1').height = '75';
	}
	document.getElementById('FirstBLink').innerHTML = imgCaption1[imgRun1];	
	document.getElementById('FirstBLink').href = imgArrLink1[imgRun1];
	opacity1('faderImg1', 0, 100, 1000,'');		
	opacity1('FirstBLink', 0, 100, 1000,'');	
}
function opacity1(id, opacStart, opacEnd, millisec, gotoFunction) {
    var speed1 = Math.round(millisec / 100); 
    var timer1 = 0; 
	var sendFunction = '';
    if(opacStart > opacEnd) { 
        for(var j = opacStart; j >= opacEnd; j--) {	
			if(j == opacEnd && gotoFunction){
				sendFunction = gotoFunction;
			}
            setTimeout("changeOpac1(" + j + ",'" + id + "','" + sendFunction + "')",(timer1 * speed1)); 
            timer1++; 
        } 
    }else if(opacStart < opacEnd) { 
        for(var j = opacStart; j <= opacEnd; j++) {
			if(j == opacEnd && gotoFunction){
				sendFunction = gotoFunction;
				
			}
            setTimeout("changeOpac1(" + j + ",'" + id + "','" + sendFunction + "')",(timer1 * speed1)); 
            timer1++; 
        } 
    }
} 
function changeOpac1(opacity, id, gotoFunction) { 
    var object = document.getElementById(id).style; 
    object.opacity = (opacity / 100); 
    object.MozOpacity = (opacity / 100); 
    object.KhtmlOpacity = (opacity / 100); 
    object.filter = "alpha(opacity=" + opacity + ")";
	if(gotoFunction) { eval(gotoFunction + '()'); }
}

/* third slide show */
var imgArr3 = new Array();
var preLoad3 = new Array();
var imgRun3 = 1;

function slideShow3() {
	if(tmpSize3==0 ){
		return (false);
	}
	setTimeout('runSlideShow3()', 2000);
}
function runSlideShow3() {
	opacity3('faderImg3', 100, 0, 1000,'loadNext3');
// 	opacity('FirstBLink', 100, 0, 1000,'loadNext1');
	setTimeout('runSlideShow3()', 4000);
}
function loadNext3() {
	imgRun3 = (imgRun3+1) > (preLoad3.length -1) ? 0 : imgRun3 + 1;
	document.getElementById('faderImg3').src = preLoad3[imgRun3].src;
	document.getElementById('faderImgLink3').href = imgArrLink3[imgRun3];
	if(imgCaption3[imgRun3] == '&nbsp;'){
		document.getElementById('faderImg3').height = '112';
	}else{
		document.getElementById('faderImg3').height = '75';
	}
	document.getElementById('ThirdBLink').innerHTML = imgCaption3[imgRun3];	
	document.getElementById('ThirdBLink').href = imgArrLink3[imgRun3];
	opacity3('faderImg3', 0, 100, 1000,'');		
	opacity3('ThirdBLink', 0, 100, 1000,'');	
}
function opacity3(id, opacStart, opacEnd, millisec, gotoFunction) {
    var speed3 = Math.round(millisec / 100); 
    var timer3 = 0; 
	var sendFunction = '';
    if(opacStart > opacEnd) { 
        for(var j = opacStart; j >= opacEnd; j--) {	
			if(j == opacEnd && gotoFunction){
				sendFunction = gotoFunction;
			}
            setTimeout("changeOpac3(" + j + ",'" + id + "','" + sendFunction + "')",(timer3 * speed3)); 
            timer3++; 
        } 
    }else if(opacStart < opacEnd) { 
        for(var j = opacStart; j <= opacEnd; j++) {
			if(j == opacEnd && gotoFunction){
				sendFunction = gotoFunction;
				
			}
            setTimeout("changeOpac3(" + j + ",'" + id + "','" + sendFunction + "')",(timer3 * speed3)); 
            timer3++; 
        } 
    }
} 
function changeOpac3(opacity, id, gotoFunction) { 
    var object = document.getElementById(id).style; 
    object.opacity = (opacity / 100); 
    object.MozOpacity = (opacity / 100); 
    object.KhtmlOpacity = (opacity / 100); 
    object.filter = "alpha(opacity=" + opacity + ")";
	if(gotoFunction) { eval(gotoFunction + '()'); }
}