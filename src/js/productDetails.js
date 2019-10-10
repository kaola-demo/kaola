// 头部黑色导航栏
$('header a').mouseenter(function () {
    $(this).css("color", "#fff");
}).mouseleave(function () {
    $(this).css("color", "#999");
});
$('.header-con ul div a').mouseenter(function () {
    $('.muLuText').css("display", "block");
}).mouseleave(function () {
    $('.muLuText').css("display", "none");
});
$("header .box").mouseenter(function () {
    $(this).children('.link').css({
        'color': 'red',
        'background': '#fff'
    }).next().css("display", "block");
    $(this).children('.link').children('i').removeClass('fa-chevron-down').addClass('fa-chevron-up')
});
$("header .box").mouseleave(function () {
    $(this).children('.link').css({
        'color': '#999',
        "background": "#000"
    }).children('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    $(this).children(".submenu").css("display", "none")
});
$("header .submenu a").mouseenter(function () {
    $(this).css("color", "red");
}).mouseleave(function () {
    $(this).css("color", "#000");
});

// logo存放区
var MAX = 10;
var inp = document.getElementById('topSearchInput');
var ul = document.getElementById('xiaLa-wzj');
inp.oninput = inp.onpropertychange = function () {
    //在搜索框输入文本
    var word = this.value; //输入框中的文本
    //创建一个script标签用户请求数据
    var script = document.createElement('script');
    script.src = "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1445,21092,18560,29518,28519,29099,29568,28833,29220,26350,29589&wd=" + word + "&req=2&pbs=%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91&csor=5&pwd=baid&cb=show&_=1563970627537";

    //创建一个函数,以备调用
    window.show = function (data) {
        console.log(data)
        //获取结果数组
        var list = data.g; //要先打印data查看结构
        //定义ul里面的字符串
        var str = "";
        for (var i = 0; i < (list.length > MAX ? MAX : list.length); i++) {
            str += "<li>" + list[i].q + "</li>";
        };
        ul.innerHTML = str;
    }
    //把生成的script标签放入body中
    document.body.appendChild(script);
    if (word == '') {
        ul.style.display = 'none';
    } else {
        ul.style.display = 'block';
    };
}
// 商品路径分类js
$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var links = this.el.find('.link');
        var linkUp = this.el.find('.box');
        links.on('mouseenter', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown);
        linkUp.on('mouseleave', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown)
    }
    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        var $this = $(this),
            $next = $this.next();
        $next.slideToggle();
        $this.parent().toggleClass('open');
        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    }
    var accordion = new Accordion($('#accordion-one'), false);
    var accordion = new Accordion($('#accordion-two'), false);
    var accordion = new Accordion($('#accordion-three'), false);
});



// <!-- 放大镜区域 -->
function scroll() {
    return {
        "left": document.documentElement.scrollLeft || document.body.scrollLeft,
        "top": document.documentElement.scrollTop || document.body.scrollTop
    }
}

// 获取DOM节点
var smallBox = document.getElementById("smallBox");
var mask = document.getElementById("mask");
var bigBox = document.getElementById("bigBox");
var bigImg = document.getElementById("bigImg");
var container = document.getElementById("container");
// 需求1：
// 鼠标移入小图片区域，模态框显示，放大区域显示。
smallBox.onmouseenter = function () {
    mask.style.display = "block";
    bigBox.style.display = "block";
}

// 需求2：
// 鼠标移出小图片区域，模态框消失，放大区域消失。
smallBox.onmouseleave = function () {
    mask.style.display = "none";
    bigBox.style.display = "none";
}

// 需求3：
// 鼠标在小图片区域移动时，模态框跟随鼠标移动。
smallBox.onmousemove = function (e) {
    // 获取事件对象
    var evt = e || window.event;
    // 计算模态框在小图片区域中的坐标
    //鼠标的坐标 = 鼠标距离页面顶部的距离 - box距离页面顶部的距离
    //mask的坐标 = 鼠标的坐标 - mask的一半
    var PageX = evt.clientX + scroll().left;
    var PageY = evt.clientY + scroll().top;
    var x = PageX - container.offsetLeft - mask.offsetWidth / 2;
    var y = PageY - smallBox.offsetTop - 250 - mask.offsetHeight / 2;
    // 模态框移动的边界检测
    var maxX = smallBox.clientWidth - mask.offsetWidth;
    var maxY = smallBox.clientHeight - mask.offsetHeight;
    if (x < 0) {
        x = 0;
    }
    if (x > maxX) {
        x = maxX;
    }
    if (y < 0) {
        y = 0;
    }
    if (y > maxY) {
        y = maxY;
    }
    // 给模态框的定位left和top进行定位，相对于有定位的父级元素盒子。
    mask.style.left = x + "px";
    mask.style.top = y + "px";


    // 需求4：
    // 模态框移动时，大图片随之在放大区域中移动相同比例。
    //显示比例:mask移动的距离(x)/小图区的宽度 = 大图移动的距离/大图的宽度
    //显示比例:mask移动的距离(x)/小图区的宽度*大图的宽度 = 大图移动的距离
    var bigImgLeft = x / smallBox.clientWidth * bigImg.clientWidth;
    var bigImgTop = y / smallBox.clientHeight * bigImg.clientHeight;
    bigImg.style.marginLeft = -bigImgLeft + "px";
    bigImg.style.marginTop = -bigImgTop + "px";
}

var btnl = document.getElementById("btnl");
var btnr = document.getElementById("btnr");
var BoxUl = document.getElementById("BoxUl");
var smallImg = document.getElementById("smallImg");
var bigImg = document.getElementById("bigImg");
var ul = BoxUl.firstChild;
console.log(ul)
btnl.onclick = function () {
    constantMove(ul, "left", 0)
}
btnr.onclick = function () {
    constantMove(ul, "left", -80)
}
var liArr = document.getElementsByClassName("cur");
for (var i = 0; i < liArr.length; i++) {
    liArr[i].onmouseenter = function (e) {
        var evt = e || window.event;

        // console.log(this.className)
        this.className += " border";
        smallImg.src = this.firstChild.src;
        bigImg.src = this.firstChild.src;
    }
    liArr[i].onmouseleave = function () {
        this.className = "cur";
    }
}
// 获取非行内样式
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}
//封装一个匀速运动的函数

function constantMove(obj, attr, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        if (attr == "opacity") {
            var current = parseInt(getStyle(obj, attr) * 100);
        } else {
            var current = parseInt(getStyle(obj, attr));
        }
        var speed = target > current ? 5 : -5;
        if (Math.abs(target - current) <= Math.abs(speed)) {
            if (attr == "opacity") {
                obj.style["opacity"] = target / 100;
            } else {
                obj.style[attr] = target + "px";
            }
            clearInterval(obj.timer);
        } else {
            current = current + speed;
            if (attr == "opacity") {
                obj.style["opacity"] = current / 100;
            } else {
                obj.style[attr] = current + "px";
            }
        }
    }, 20)
}

var priceUl = document.getElementById("price-ul");
var spanBtn = document.getElementById("spanBtn");
var tar = true;
spanBtn.onclick = function () {
    if (tar) {
        this.innerHTML = "收起";
        priceUl.style.height = "69px";
        tar = false;
    } else {
        this.innerHTML = "展开";
        priceUl.style.height = "32px";
        tar = true;
    }
}

var data = getData();
var address_picker;
$(document).ready(function () {
    address_picker = new addressPicker({
        id: "test",
        level: 5,
        data: data,
        btnConfig: [{
            text: '按钮1',
            click: function () {
                address_picker.clearSelectedData();
                $("#test").text("选择地址");
            }
        }, {
            text: '清除数据',
            click: function () {
                address_picker.clearSelectedData();
                $("#test").text("选择地址");
            }
        }]
    });
    address_picker.on("click", function () {
        $("#test").text(address_picker.getTotalValueAsText());
    });
});
// 浮动窗口
var fudong = document.getElementById("fudong");
document.body.onscroll = function () {
    var Top = document.documentElement.scrollTop;
    var _height = Top + 50;
    fudong.style.top = _height + "px";

}
// 改变数量
$(document).ready(function () {
    $(".numCutAdd input").val(1);
    $(".numCutAdd").on("click", "a:eq(0)", function () {
        var num = $(".numCutAdd input").val();
        if (num > 1) {
            num--;
        }
        $(".numCutAdd input").val(num);
    })
    $(".numCutAdd").on("click", "a:eq(1)", function () {
        var num = $(".numCutAdd input").val();
        num++;
        $(".numCutAdd input").val(num);
    });


    // 点击购物车
    $(document).ready(function () {
        Numrend()
        function Numrend() {
            function getStorage() {
                return JSON.parse(localStorage.getItem("list") || "[]");
            }
            var totalNum = 0;
            for (var k = 0; k < getStorage().length; k++) {
                totalNum++;
            }
            $("#fudong li:eq(1) a em")[0].innerHTML = totalNum;
            $("#gouwucheNum")[0].innerHTML=totalNum;
        }
        // 获取购物车按钮
        $(".buyBtns a:eq(1)").on("click", function () {
            // 获取图片路径
            var imgSrc = $("#imgList .conbox ul li:eq(0) img")[0].src;
            // 获取商品详情
            var productMore = $(".product-title")[0].innerHTML;
            //获取商品数量
            var productNum = $(".numCutAdd input").val();
            // 获取价格
            var price = $(".price-group .price-top span:eq(1) em")[0].innerHTML;
            var jsonArr = {
                productImgSrc: imgSrc,
                productMore: productMore,
                productPrice: price,
                productNum: productNum
            }
            console.log(jsonArr);
            var newjson = getStorage();
            console.log(newjson);
            if (newjson.length == 0) {
                newjson.push(jsonArr);
            } else {
                for (var n = 0; n < newjson.length; n++) {
                    if (newjson[n].productImgSrc == jsonArr.productImgSrc) {
                        newjson[n].productNum = parseInt(newjson[n].productNum) + parseInt(jsonArr.productNum);
                    } 
                }
                newjson.push(jsonArr);
            }

            setStorage(newjson);

            function setStorage(json) {
                localStorage.setItem("list", JSON.stringify(json));
            }

            function getStorage() {
                return JSON.parse(localStorage.getItem("list") || "[]");
            }
            var Top = document.documentElement.scrollTop;
            var _height = Top + 50;
            // 需求3：
            // 点击addToCart按钮时，页面中创建一个div圆点。
            var addToCart = $(".buyBtns a:eq(1)")[0];
            var shopCart = $("#fudong")[0];
            var shopNum = $("#fudong li:eq(1) a em")[0];
            var product = document.createElement("div");
            product.className = "active";
            product.style.left = addToCart.offsetLeft + addToCart.offsetWidth / 2 + 'px';
            product.style.top = addToCart.offsetTop + "px";
            $(".buyBtns")[0].appendChild(product);
            console.log(product.style.left)
            console.log(product.style.top)
            // 需求4：
            // 产生的小圆点div沿着抛物线运动.
            // 根据已知三个点，求抛物线方程。即y=a*x*x+b*x+c;
            // 已知三点的坐标

            var startPoint = {
                x: addToCart.offsetLeft + addToCart.offsetWidth / 2,
                y: addToCart.offsetTop
            }
            var endPoint = {
                x: shopCart.offsetLeft + shopCart.offsetWidth / 2,
                y: shopCart.offsetTop
            }
            console.log(endPoint)
            var topPoint = {
                x: endPoint.x - 80,
                y: endPoint.y - 50
            }
            // 三点求a,b,c系数。
            var a = ((startPoint.y - endPoint.y) * (startPoint.x - topPoint.x) - (startPoint.y - topPoint.y) * (startPoint.x - endPoint.x)) / ((startPoint.x * startPoint.x - endPoint.x * endPoint.x) * (startPoint.x - topPoint.x) - (startPoint.x * startPoint.x - topPoint.x * topPoint.x) * (startPoint.x - endPoint.x));

            var b = ((endPoint.y - startPoint.y) - a * (endPoint.x * endPoint.x - startPoint.x * startPoint.x)) / (endPoint.x - startPoint.x);

            var c = startPoint.y - a * startPoint.x * startPoint.x - b * startPoint.x;
            // 封装一个product沿抛物线运动的定时器函数.
            var speed = 5;
            var productsNum = shopNum.innerHTML;
            clearInterval(timer);
            var timer = setInterval(function () {
                var X = product.offsetLeft + speed;
                product.style.left = X + "px";
                product.style.top = a * X * X + b * X + c + "px";
                if (product.offsetLeft >= endPoint.x) {
                    clearInterval(timer);
                    // 设置一个计数器，每一次product标签运动到终点时，计数器加一。
                    Numrend();
                    product.remove();
                }
            }, 20)
        })


    })
})







$(document).ready(function () {
    // 公共方法
    var zidong = {
        // 获取本地存储的数据的方法。
        getStorage: function () {
            return JSON.parse(localStorage.getItem("id") || "[]");
        },

        // 渲染购物车，根据本地存储中的数据，使本地存储中的数据展示在购物车中。
        renderCar: function (products) {
            console.log(products);
            // 如果传入的数据为空，则清除购物车中的内容。
            $("#smallImg")[0].src = products[0].src;
            $("#bigImg")[0].src = products[0].src;
            $("#BoxUl ul li:eq(0) img")[0].src = products[0].src;
            $(".product-title")[0].innerHTML = products[0].productMore;
            $(".price-top span:eq(1) em")[0].innerHTML = products[0].productPrice;
        }
    }
    // 根据本地存储渲染购物车
    zidong.renderCar(zidong.getStorage());
})

$('#fudong .tiaoZhuan').on("click", function () {$("html,body").stop(true).animate({
    "scrollTop": 0})})