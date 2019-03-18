var IsHtml = false;
//全局变量
var AppName = "/";
if (document.URL.toLocaleLowerCase().indexOf("localhost") > 0) {
    AppName = "/web/";
}

//判断Email
function isEmail(s) {
    var patrn = /^([A-Za-z0-9])(\w)+@(\w)+(\.)(com|com\.cn|net|cn|net\.cn|org|biz|info|gov|gov\.cn|edu|edu\.cn)/;
    if (!patrn.exec(s)) {
        return false;
    }
    return true;
}

function checkTelFormat(str) {
    var reg = /^(((\()?\d{2,4}(\))?[-(\s)*]){0,2})?(\d{7,8})$/;
    if (reg.test(str))// 电话号码格式正确
        return true;
    else //号码格式错误
        return false;
}

function checkPhoneFormat(str) {
    var reg = /^(13[0-9]{9})|(15[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;
    if (reg.test(str))// 电话号码格式正确
        return true;
    else //号码格式错误
        return false;
}


/*验证银行卡事情*/
function checkBankCode(content) {
    var regex = /^[A-Za-z0-9]+$/;
    if (regex.test(content)) {
        return true;
    }
    return false;
}

var gecAjax = function (action, Param, Fun) {
    $.ajax({
        type: 'POST',
        url: AppName + 'Ajax/ajax.aspx?action=' + action,
        data: Param,
        dataType: "html",
        async: true,     // 默认为异步请求
        success: function (t) {
            if (Fun) {
                Fun(t);
            }
        }, error: function () {

        }
    });
}

var gecAjaxHtml = function (hname, Param, Fun) {
    $.ajax({
        type: 'POST',
        url: AppName + 'Ajax/' + hname,
        data: Param,
        dataType: "html",
        async: true,     // 默认为异步请求
        success: function (t) {
            if (Fun) {
                Fun(t);
            }
        }, error: function () {

        }
    });
}

var getUrl = function (hname) {
    var url = "";
    if (IsHtml) {
        url += hname + ".html";
    } else {
        url += hname + ".aspx";
    }
    return url;
}

var getUrl = function (hname, parm) {
    var url = "";
    if (IsHtml) {
        url += hname + ".html";
    } else {
        url += hname + ".aspx?" + parm;
    }
    return url;
}

var getUrlParm = function (parm, s) {
    var url = s;
    if (IsHtml) {
        url += param;
    } else {
        url += parm
    }
    return url;
}

var AddCart = function (proid, num, btn, url, fun) {
    $("#" + btn).attr("disabled", "disabled");
    var data = {};
    data.action = "AddCart";
    data.ProId = proid;
    data.Quantity = num;
    if (url.indexOf('getOrderInfo')!=-1) {
        data.source = "1";
    }
    if (isIntNum(data.Quantity)) {
        alert('不是正确的数量.');
        return false;
    }
    $.ajax({
        type: 'POST',
        url: AppName + 'Ajax/ajax.aspx',
        data: data,
        dataType: "html",
        async: true,     // 默认为异步请求
        success: function (t) {
            if (t) {
                if (t == "1") {
                    if (url) {
                        location.href = url;
                    }
                    if (fun) {
                        fun();
                    }
                } else {
                    alert('加入购物车失败.');
                }
            }
            $("#" + btn).removeAttr("disabled");//将按钮可用
        }, error: function () {
            $("#" + btn).removeAttr("disabled");//将按钮可用
        }
    });
}

var UpdateCart = function (proid, num, btn, url, fun) {
    $("#" + btn).attr("disabled", "disabled");
    var data = {};
    data.action = "UpdateCart";
    data.ProId = proid;
    data.Quantity = num;
    if (isIntNum(data.Quantity)) {
        alert('不是正确的数量.');
        return false;
    }
    $.ajax({
        type: 'POST',
        url: AppName + 'Ajax/ajax.aspx',
        data: data,
        dataType: "html",
        async: true,     // 默认为异步请求
        success: function (t) {
            if (t) {
                if (t == "1") {
                    if (url) {
                        location.href = url;
                    }
                    if (fun) {
                        fun();
                    }
                } else {
                    alert('更新购物车失败.');
                }
            }
            $("#" + btn).removeAttr("disabled");//将按钮可用
        }, error: function () {
            $("#" + btn).removeAttr("disabled");//将按钮可用
        }
    });
}

var ClearCart = function (proid, btn, fun) {
    $("#" + btn).attr("disabled", "disabled");
    var data = {};
    data.action = "ClearCart";
    data.ProId = proid;
    $.ajax({
        type: 'POST',
        url: AppName + 'Ajax/ajax.aspx',
        data: data,
        dataType: "html",
        async: true,     // 默认为异步请求
        success: function (t) {
            if (t) {
                if (t == "1") {
                    if (fun) {
                        fun();
                    }
                } else {
                    alert('移除购物车失败.');
                }
            }
            $("#" + btn).removeAttr("disabled");//将按钮可用
        }, error: function () {
            $("#" + btn).removeAttr("disabled");//将按钮可用
        }
    });
}

function isIntNum(nubmer) {
    return isNaN(nubmer);
}

function Myapi() {  //构造函数

    this.JSON = {

        index: 0,

        lagout: function (thisObj, speed, bh) {  //轮播图初始化

            this.speed = speed;

            var Parent = thisObj,

                imgUL = Parent.children('ul:first'),
                pointerUL = Parent.children('ul:last'),
                cutBut = Parent.children('a'),

                imgLI = imgUL.children('li'),
                img = imgLI.find('img'),

                W = img.width(),
                H = img.height();

            Parent.height(H + Math.abs(bh)).width(W);
            var dW = (Parent.width() - W) / 2,

                length = imgLI.size();

            imgUL.width(W * length).css('left', dW);

            //函数调用
            this.appendP(Parent, pointerUL, length);

            this.move(imgUL, pointerUL, W, dW, length);

            this.cut(imgUL, cutBut, W, dW, pointerUL, length);

            this.changes(imgUL, pointerUL, W, length, dW);


            //鼠标滑过暂停与启动
            Parent.hover($.proxy(function () {

                clearInterval(this.moveTimer);
                cutBut.animate({
                    opacity: 0.8
                })

            }, this), $.proxy(function () {

                this.move(imgUL, pointerUL, W, dW, length);
                cutBut.animate({
                    opacity: 0
                })

            }, this));

        },

        appendP: function (P, objU, l) {   //动态增添控制点

            for (var i = 0; i < l; i++) {
                var newi = $('<li></li>');
                if (i == 0) {
                    newi.addClass('now');
                };
                objU.append(newi);
            };
            objU.width(objU.find('li:first').outerWidth(true) * l);
            objU.css('left', (P.width() - objU.width()) / 2);

        },

        move: function (imgObj, pUL, w, d, l) {    //自动播放

            this.moveTimer = setInterval($.proxy(function () {

                this.animate(imgObj, w, d);

                this.indexChange(pUL, l, 1);

            }, this), this.speed)

        },
        indexChange: function (obj, l, i) {   //改变计数点
            if (this.index >= l - 1 && i > 0) {
                this.index = 0;
            } else if (this.index <= 0 && i < 0) {
                this.index = l - 1;
            } else {
                this.index += i;
            }
            obj.find('li').eq(this.index).addClass('now').siblings().removeClass('now');
        },
        animate: function (obj, w, d, In) {   //自动播放动画函数
            obj.animate({
                left: -w + d,
            }, $.proxy(function () {
                obj.css('left', d);
                if (w > 0) {
                    if (In) {
                        obj.append(obj.children('li:lt(' + In + ')'));
                        console.log(obj.children('li:lt(' + In + ')'));
                    } else {
                        obj.append(obj.find('li:first'));
                    }
                }
            }, this))
        },

        cut: function (imgObj, C, w, d, pUL, l) {   //左右切换函数
            C.css('top', (imgObj.height() - C.height()) / 2);
            var THIS = this;
            C.on('click', function () {
                if ($(this).hasClass('next')) {
                    THIS.animate(imgObj, w, d);
                    THIS.indexChange(pUL, l, 1);
                } else {
                    imgObj.css('left', -w + d);
                    imgObj.prepend(imgObj.find('li:last'));
                    THIS.animate(imgObj, 0, d);
                    THIS.indexChange(pUL, l, -1);
                }
            });
        },

        changes: function (imgObj, obj, w, l, d) {   //控制点切换
            var THIS = this;
            obj.find('li').on('click', function () {
                var nw = 0;
                var In = 0;
                $(this).addClass('now').siblings().removeClass('now');
                if ($(this).index() < THIS.index) {
                    In = (l - THIS.index + $(this).index());
                    nw = In * w;
                } else {
                    In = ($(this).index() - THIS.index);
                    nw = In * w;
                }
                THIS.index = $(this).index()
                THIS.animate(imgObj, nw, d, In);

            })
        }
    };
};
(function ($) {
    $.fn.dayuwscroll = function (param) {
        var o = $.extend({
            parent_ele: '#t1',
            list_btn: '#tabT04',
            pre_btn: '#left',
            next_btn: '#right',
            path: 'left',
            auto: true,
            time: 5000,
            num: 1,
            gd_num: 1,
            waite_time: 1000
        }, param);

        var target_ele = $(this).selector;
        var $left = $(o.pre_btn);
        var $right = $(o.next_btn);
        var $con = $(target_ele).find('li');
        var curr = 0;
        var len = $con.length;
        var count_page = Math.ceil(len / o.gd_num);
        var out_width = $con.outerWidth(true);
        var out_height = $con.outerHeight(true);
        var clear_time = null;
        var wait_time = null;
        var first_click = true;
        var wrapbox_w = out_width * o.num;
        var scrollbox_w = wrapbox_w * count_page;
        //$con.clone().appendTo(target_ele);


        function init() {
            $(o.parent_ele).css({ 'width': wrapbox_w + 'px', 'height': out_height + 'px', 'overflow': 'hidden' });
            $(target_ele).css({ 'width': scrollbox_w + 'px', 'height': out_height + 'px' });
            if (o.auto) {
                auto_play();
            }
            scroll_mousehover();
        }

        function auto_play() {
            switch (o.path) {
                case 'left':
                    clear_time = window.setInterval(function () { left__click(); }, o.time);
                    break;
                case 'right':
                    clear_time = window.setInterval(function () { right_click(); }, o.time);
                    break;
                default:
                    clear_time = window.setInterval(function () { left__click(); }, o.time);
                    break;
            }
        }

        function list_btn_style(i) {
            $(o.list_btn + ' li').removeClass('cur');
            $(o.list_btn + ' li').eq(i).addClass('cur');
        }

        function goto_curr(page) {
            if (page > count_page) {
                curr = 0;
                $(o.parent_ele).scrollLeft(0);
                $(o.parent_ele).animate({ scrollLeft: wrapbox_w }, 500);
            } else {
                var sp = (page + 1) * wrapbox_w;
                if ($(o.parent_ele).is(':animated')) {
                    $(o.parent_ele).stop();
                    $(o.parent_ele).animate({ scrollLeft: sp }, 500);
                } else {
                    $(o.parent_ele).animate({ scrollLeft: sp }, 500);
                }

                curr = page + 1;
            }
        }

        $(o.list_btn + ' li').click(function () {
            var curLiIndex = $(this).index();
            list_btn_style(curLiIndex);
            curr = curLiIndex - 1;

            goto_curr(curr);
        })

        function left__click() {

            window.clearInterval(clear_time);
            window.clearTimeout(wait_time);

            curr++;

            if (curr >= count_page) {
                curr = 0;
            }

            var curLiIndex = curr;
            list_btn_style(curLiIndex);

            if (first_click) {
                curr = curLiIndex - 1;
                first_click = false;
            } else {
                curr = curLiIndex - 1;
            }

            goto_curr(curr);

            if (o.auto) {
                wait_time = setTimeout(function () { auto_play() }, o.waite_time);
            }
        }

        $left.bind('click', left__click)

        function right_click() {
            window.clearInterval(clear_time);
            window.clearTimeout(wait_time);

            curr--;
            if (curr < 0) {
                curr = count_page - 1;
            } else if (curr == (count_page - 1)) {
                curr = 0;
            }
            var curLiIndex = curr;
            list_btn_style(curLiIndex);

            curr = curLiIndex - 1;


            goto_curr(curr);

            if (o.auto) {
                wait_time = setTimeout(function () { auto_play() }, o.waite_time);
            }
        }

        function scroll_mousehover() {
            $con.mouseover(function () {
                window.clearInterval(clear_time);
                window.clearTimeout(wait_time);
            });
            $con.mouseout(function () {
                if (o.auto) {
                    wait_time = setTimeout(function () { auto_play() }, o.waite_time);
                }
            })
        }

        $right.bind('click', right_click);

        return init();
    }
})(jQuery)