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
// 点击时商品存储本地存储
$(document).ready(function () {
    $("#Storage li").on("click", function () {
        var newjson = [{
            src: $(this).children(".hezi").children("img")[0].src,
            productMore: $(this).children(".hezi").children("h5").children("a")[0].innerHTML,
            productPrice: $(this).children(".hezi").children(".m-priceitem").children(".price").children("em")[0].innerHTML
        }]
        util.setStorage(newjson);
        console.log(newjson);
        window.open("../productDetails.html");
    })
    var util = {
        setStorage: function (json) {
            localStorage.setItem("id", JSON.stringify(json));
        }
    }
    Numrend()
    function Numrend() {
        function getStorage() {
            return JSON.parse(localStorage.getItem("list") || "[]");
        }
        var totalNum = 0;
        for (var k = 0; k < getStorage().length; k++) {
            totalNum++;
        }
        $("#gouwucheNum")[0].innerHTML=totalNum;
    }
})

// section区
$('section .box-a li').hover(function () {
    $(this).children('.hezi').children('h5').children('a').removeClass('lll')
}, function () {
    $(this).children('.hezi').children('h5').children('a').addClass('lll')
})

var flag = true //设置标识。防止出现跑马灯  
$(".louCeng li").click(function () {
    flag = false;
    var index = $(this).index() //获取当前点击元素的索引  
    $(this).addClass("active").siblings().removeClass("active")
    if (index == 9) {
        $("html,body").stop(true).animate({
            "scrollTop": 0
        }, function () {
            flag = true
        });
        $(".louCeng").css('display', 'none')
    }
    if (index == 0) {
        window.open("../shoppingCart.html");
    } else {
        var top = $(".box-a").eq(index - 1).offset().top; //获取每个banner到顶部的距离
        $("html,body").stop(true).animate({
            "scrollTop": top
        }, function () {
            flag = true
        });
    }
})
$(window).scroll(function () {
    if (flag) {
        //浏览器可视窗口的一半，也可以根据自己需求设定  
        var winH = $(window).innerHeight() / 2;
        var scrollT = $(window).scrollTop()
        var len = $(".box-a").size()
        for (var i = 0; i < len + 1; i++) {
            //注意这里banner对象加了i之后变成了js对象,所以用offsetTop  
            var bannerGap = $(".box-a")[i].offsetTop - scrollT
            if (bannerGap < winH) {
                $(".louCeng li").eq(i + 1).addClass("active").siblings().removeClass("active");
                var height = document.documentElement || document.body;
                var aWzj = document.getElementsByClassName('box-a');
                var bWzj = document.getElementsByClassName('louCeng')[0];
                if (height.scrollTop > aWzj[0].offsetTop) {
                    bWzj.style.display = 'block';
                } else {
                    bWzj.style.display = 'none';
                }

            }
        }
    }
})

// 购物车
$('.shop').on("click", function () { window.open("./shoppingCart.html");})
