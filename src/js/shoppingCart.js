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

$(document).ready(function () {
    var show = $(".showCart")[0];
    var hide = $('.hideCart')[0];
    // 公共方法
    var util = {
        // 获取本地存储的数据的方法。
        getStorage: function () {
            return JSON.parse(localStorage.getItem("list") || "[]");
        },

        // 设置本地存储数据的方法。
        setStorage: function (json) {
            localStorage.setItem("list", JSON.stringify(json));
        },

        // 渲染购物车，根据本地存储中的数据，使本地存储中的数据展示在购物车中。
        renderCar: function (products) {
            console.log(products);
            // 如果传入的数据为空，则清除购物车中的内容。
            if (products.length < 1) {
                hide.style.display = "block";
                show.style.display = "none";
            } else {
                hide.style.display = "none";
                show.style.display = "block";
                for (var i = 0; i < products.length; i++) {
                    var $newProduct = $("#clone").clone();
                    $newProduct.get(0).style.display = "block";
                    $newProduct.get(0).setAttribute('value', i);
                    $newProduct.addClass("newProduct");
                    $newProduct.find("li").eq(0).children("input").addClass("check" + i);
                    // console.log($newProduct.find("li").eq(0).children("input").className());
                    $newProduct.find("li").eq(1).children("a").children("img")[0].src = products[i].productImgSrc;
                    $newProduct.find("li").eq(1).children("div").find("em").eq(0)[0].innerHTML = products[i].productMore;
                    $newProduct.find("li").eq(2).find("i").eq(1)[0].innerHTML = products[i].productPrice;
                    $newProduct.find("li").eq(3).find("input")[0].value = products[i].productNum;
                    var total = parseFloat(products[i].productPrice) * parseFloat(products[i].productNum);
                    $newProduct.find("li").eq(4).find("span:eq(0)")[0].innerHTML = total;

                    $(".totalbox").before($newProduct);
                }

            }
        }
    }
    // 根据本地存储渲染购物车
    util.renderCar(util.getStorage());
    // 实现购物车基本功能1:增减数量
    // zidiao();

    // function zidiao() {
    var newProduct = document.getElementsByClassName("newProduct");
    for (var j = 0; j < newProduct.length; j++) {
        $(newProduct[j]).find("ul").children("li").eq(3).children("span:eq(0)").on("click", function () {
            var newProduct = $(this).parent().parent().parent().parent().parent();
            var shu = newProduct.attr("value");
            shu = Number(shu);
            var newNum = $(this).siblings("input").val();
            newNum = Number(newNum);
            if (newNum > 1) {
                newNum--;
            }
            var newJson = util.getStorage();
            newJson[shu].productNum = newNum;
            util.setStorage(newJson);
            $(this).siblings("input")[0].value = newNum;
            var pricesArr = parseFloat($(this).parent().parent().children("li:eq(3)").children("input").val()) * parseFloat($(this).parent().parent().children("li:eq(2)").children("i:eq(1)")[0].innerHTML);
            $(this).parent().parent().children("li:eq(4)").children("span:eq(0)")[0].innerHTML=pricesArr
            money()
            Numrend()
            // zidiao()
        })
        $(newProduct[j]).find("ul").children("li").eq(3).children("span:eq(1)").on("click", function () {
            var newProduct = $(this).parent().parent().parent().parent().parent();
            var shu = newProduct.attr("value");
            shu = Number(shu);
            var newNum = $(this).siblings("input").val();
            newNum = Number(newNum);
            newNum++;
            var newJson = util.getStorage();
            newJson[shu].productNum = newNum;
            util.setStorage(newJson);
            $(this).siblings("input")[0].value = newNum;
            var pricesArr = parseFloat($(this).parent().parent().children("li:eq(3)").children("input").val()) * parseFloat($(this).parent().parent().children("li:eq(2)").children("i:eq(1)")[0].innerHTML);
            $(this).parent().parent().children("li:eq(4)").children("span:eq(0)")[0].innerHTML=pricesArr

            money()
            Numrend()
            // zidiao()
        })
        // 
        $(newProduct[j]).find("ul").children("li").eq(5).children("span:eq(0)").on("click", function () {
            var newProduct = $(this).parent().parent().parent().parent().parent();
            var shu = newProduct.attr("value");
            shu = Number(shu);
            var newJson = util.getStorage();
            newJson.splice(shu, 1);
            util.setStorage(newJson);
            newProduct.remove();
            money()
            Numrend()
            if (util.getStorage().length == 0) {
                hide.style.display = "block";
                show.style.display = "none";
            }
            // zidiao()
        })
    }
    // }
    // 
    var target = true;
    $("#allCheck").on("click", function () {
        if (target) {
            $("#allCheck").removeAttr("checked");
            var newProduct = document.getElementsByClassName("newProduct");
            for (var j = 0; j < newProduct.length; j++) {
                $(newProduct[j]).find("h5").children("input").removeAttr("checked");
                $(newProduct[j]).find("ul").children("li").eq(0).children("input").removeAttr("checked");
            }
            $("#allCheck-bottom").removeAttr("checked");
            target = false;
        } else {
            console.log(1)
            $("#allCheck").get(0).checked = "checked";
            var newProduct = document.getElementsByClassName("newProduct");
            for (var j = 0; j < newProduct.length; j++) {
                $(newProduct[j]).find("h5").children("input").get(0).checked = "checked";
                $(newProduct[j]).find("ul").children("li").eq(0).children("input").get(0).checked = "checked";
            }
            $("#allCheck-bottom").get(0).checked = "checked";
            target = true;
        }
    })


    // 价格汇总
    money()

    function money() {
        var newProduct = document.getElementsByClassName("newProduct");
        var totalNum = 0;
        var totalPrice = 0;
        for (var j = 0; j < newProduct.length; j++) {
            totalNum += parseFloat($(newProduct[j]).find("ul").children("li").eq(3).children("input").val())
            totalPrice += parseFloat($(newProduct[j]).find("ul").children("li").eq(3).children("input").val()) * parseFloat($(newProduct[j]).find("ul").children("li").eq(2).children("i:eq(1)").html());

        }
        $(".totalbox-right div:eq(0) span:eq(1) em").get(0).innerHTML = totalNum;
        $(".totalbox-right div:eq(0) span:eq(0) em").get(0).innerHTML = totalPrice;

    }
    Numrend()

    function Numrend() {
        function getStorage() {
            return JSON.parse(localStorage.getItem("list") || "[]");
        }
        var totalNum = 0;
        for (var k = 0; k < getStorage().length; k++) {
            totalNum += parseInt(getStorage()[k].productNum);
        }
        $("#gouwucheNum")[0].innerHTML = totalNum;
    }




















})