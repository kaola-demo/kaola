$('.linemsg li').on("click", function () {
    $(this).addClass('z-act');
    $(this).siblings().removeClass('z-act');
})

$('.tabbtn').on("click", function () {
    $(this).addClass('active-wzj');
    $(this).parents().siblings().children().removeClass('active-wzj');
})

$('.b-b').on("click", function () {
    $('.price .linetit').html('流量收费');
    var a=0;
for(var key in __kaolaRechargeData.trafficPrice){
    $('.linemsg li').eq(a).addClass('aaa').children("span").eq(0).html(key);
    a++;
}
$('.price .linemsg i').html(__kaolaRechargeData.trafficPrice[$('.z-act').children("span").eq(0).html()])
})

$('.a-a').on("click", function () {
    $('.price .linetit').html('销售价格');
    var i=0;
for(var key in __kaolaRechargeData.noteList){
    $('.linemsg li').eq(i).removeClass('aaa').children("span").eq(0).html(key);
    i++;
}
$('.price .linemsg i').html(__kaolaRechargeData.noteList[$('.z-act').children("span").eq(0).html()])
})

$('.linemsg li').on("click", function () {
    if($(this).hasClass('aaa') == false){
       $('.price .linemsg i').html(__kaolaRechargeData.noteList[$(this).children("span").eq(0).html()])
        }
        if($(this).hasClass('aaa') == true){
       $('.price .linemsg i').html(__kaolaRechargeData.trafficPrice[$(this).children("span").eq(0).html()])
        }
})
