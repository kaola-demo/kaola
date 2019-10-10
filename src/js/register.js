$(function () {

    $('#btns').click(function () {
        var username = $('#username').val(); //获取手机号
        var password = $('#password').val(); //获取密码
        var code = $('#code').val(); //获取验证码

        var userl = username.replace(/\s+/g, ''); //去掉手机号空格
        var reg = /^(1|\+861)[3-9][0-9]{9}$/g; //判断手机格式
        var pa = password.replace(/\s+/g, ''); //去掉密码空格
        var pas = /^[\da-zA-z]{6,16}$/; //判断密码格式6-12位 、d表示数字
        var info = true;
        //判断账号不能为空
        if ($.trim(username) == '') {
            $(' .m-nerror').css('overflow', 'visible')
            $('.ferrorhead').html('请输入手机号');

            $('#username').keyup(function () {
                $('.ferrorhead').html('')
            })
            info = false;
        } else if (!reg.test(userl)) { //判断账号格式为1开头 11位数
            //如果不是这个格式则显示
            $('.ferrorhead').html('请输入正确的手机号');
            //然后按下
            $('#username').keyup(function () {
                $('.ferrorhead').html('')
            })
            info = false;


        }
        //确认密码不能为空
        if ($.trim(password) == '') {
            $('.ferrorhead').html('请输入密码');
            $('#password').keyup(function () {
                $('.ferrorhead').html('')
            })
            info = false;

        } else if (!pas.test(pa)) {
            //判断密码格式  如果不是这个格式则显示
            $('.ferrorhead').html('密码需由6-16个字符组成 区分大小写');
            $('#password').keyup(function () {
                $('.ferrorhead').html('')
            })
            info = false;
        }
        //获取验证码
        //验证成功
        if (info) {
            // $.ajax({
            //     type: 'get',
            //     url: 'http://localhost/kaola.com/dist/php/register.php',
            //     data: 'act=add&username=' + username + '&password=' + password,
            //     cache: false,
            //     dataType: 'json',
            //     success: function (str) {
            //         console.log(str);
            //         console.log(str.err)
            //         if (str.err == 0) {
            //             alert(str.msg);
            //             window.location.href = 'http://localhost/kaola.com/dist/login.html';
            //         }
            //     }
            // })

            // 实现跨域请求数据
            var newDom=document.createElement("script");
            newDom.setAttribute("type","text/javascript");
            var str="http://localhost/kaola.com/dist/php/register.php?act=add&username=" + username + '&password=' + password+"&callback=fn"
            newDom.setAttribute("src",str);
            $("body").append($(newDom));
        }
    })
})
