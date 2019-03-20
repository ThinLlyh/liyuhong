
    let liDoms = $("#imgList").children;
    for(let i=0;i<liDoms.length;i++){
        liDoms[i].onclick = function(){
            $("#pro_bigBox").style.backgroundImage = getStyle(this,"backgroundImage");
            $("#pro_showBox").style.backgroundImage = getStyle(this,"backgroundImage");
        }
    }

    $("#pro_bigBox").onmousemove = function(event){
        let evt = event || window.event;
        //一、数据处理
        //1、改变数据（放大镜子的left和top）
        let  left1 = evt.pageX-this.offsetLeft-$("#pro_mirrorBox").offsetWidth/2;
        let  top1 = evt.pageY-this.offsetTop-$("#pro_mirrorBox").offsetHeight/2;

        //2、边界处理
        if(left1<0){
            left1=0;
        }else if(left1>this.offsetWidth-$("#pro_mirrorBox").offsetWidth){
            left1=this.offsetWidth-$("#pro_mirrorBox").offsetWidth
        }

        if(top1<0){
            top1=0;
        }else if(top1>this.offsetHeight-$("#pro_mirrorBox").offsetHeight){
            top1=this.offsetHeight-$("#pro_mirrorBox").offsetHeight
        }

        //二、外观呈现
        $("#pro_mirrorBox").style.left = left1+"px";
        $("#pro_mirrorBox").style.top = top1+"px";
        $("#pro_showBox").style.backgroundPosition =`${-1*3*left1}px ${-1*3*top1}px`;
    }


    //获取dom对象的样式属性
    //参数：
    // dom对象
    // 样式属性名

    //返回值：样式属性值
    function getStyle(domObj,attr) {
        if(domObj.currentStyle){//如果能够获取到currentStyle
            return domObj.currentStyle[attr];
        }else{
            return window.getComputedStyle(domObj)[attr];
        }
    }
function $(str){
    if(str.charAt(0)=="#"){
        return document.getElementById(str.substring(1));
    }else if(str.charAt(0)=="."){
        return document.getElementsByClassName(str.substring(1));
    }else{
        return document.getElementsByTagName(str);
    }
}

