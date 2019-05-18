// import { promises } from "fs";
// import { resolve } from "dns";

define(["jquery","url","bootstrap","cookie"],($,url)=>{
    function Header(){
        this.container = $("#header-container")
        this.load().then(()=>{
            this.isLogin();
            this.cartall();
            this.rescheck();
        })
        this.rejist();
        this.login();
        
        
    }
    $.extend(Header.prototype,{
        load(){
            return new Promise(resolve=>{
                this.container.load('/html/module/header.html', () => {
                    // load异步执行结束
                    resolve();
            })
        })
    },
        // 利用事件委托给注册按钮绑定事件，避免异步；
        rejist(){
            $("#header-container").on("click","#regist-btn",function(e){
                // 模态框出现，进行操作；进行数据交互；获取VALU
                // $(".modals").attr("id","myModal");
                let username=$("#username"),
                    password=$("#password"),
                    okpassword=$("#ok-password"),
                    submit=$("#submit"),
                    checkbox=$("#checkbox"),
                    quit=$(".quit");
                    
                console.log(username);
               console.log(quit);
               quit.on("click",()=>{
                   quit.attr("data-dismiss","modal");
               })
                // 给提交按钮绑定事件
                submit.on("click",()=>{
                    let usernameval=username.val(),
                        passwordval=password.val(),
                        okpasswordval=okpassword.val();
                        // 判断两次输入密码；如果密码不一致，弹框，
                    if(passwordval !== okpasswordval) {
                        alert("两次输入密码不一致");
                    }else if(usernameval === "" || passwordval === ""){
                        alert("用户名或密码不能为空");
                    }else{
                        if(checkbox.prop('checked')){
                            // 跨域请求数据；
                        $.ajax({
                            url:url.phpBaseUrl+"user/regist.php",
                            method:"post",
                            data:{usernameval,passwordval},
                            dataType:"json",
                            success:data=>{
                                console.log(data)
                                if(data.res_code===1){
                                    alert(data.res_message+"即将跳转至登录页面")
                                     location.href="/html/login.html";
                                }
                            }
                        })
                        }else{
                            alert("请您先阅读服务条款")
                        }
                    }
                    
                });
                
            })
            },
        // // 利用事件委托给登录按钮绑定事件，避免异步；
            login(){
                $("#header-container").on("click","#login-btn",function(e){
                    location.href="/html/login.html";
                    
                })
            },
            isLogin(){
                this.loginBtn = $("#login-btn");
                this.registBtn = $("#regist-btn");
                this.usernameBtn=$("#username-btn");
                this.succBtn=$("#succ-btn");
                this.quitBtn=$("#quit-login");
                // 取cookie；
                let username = $.cookie("username");
                if(username){
                    this.loginBtn.hide();
                    this.registBtn.hide();
                    this.succBtn.show();
                    this.usernameBtn.html( username);
                };
                // 给退出绑定事件；
                this.quitBtn.on("click",()=>{
                    if(confirm(username+"您确定要退出吗？")){
                        // 退出清除cookie；
                        $.removeCookie("username", { path: '/' });
                        this.loginBtn.show();
                        this.registBtn.show();
                        this.succBtn.hide();
                        location.href="/";
                    }
                })
            },
        // 取记录，然后放进图标；
        cartall(){
            let cart = localStorage.getItem("cart");
            let num = 0;
            cart = JSON.parse(cart);
            // 循环取到每一条数据里面NUM相加；
            cart.forEach(shop => {
                num = num + shop.num;
            });
            $("#add-cart").html(num);
        },
        // 正则验证
        rescheck(){
            let username =  $("#username"),
                password = $("#password"),
                telphone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                
                
                password.on("click",()=>{
                     let usernameval = username.val(),
                         truea =$("#ccc"),
                         istruea =$("#bbb"),
                         nulls = $("#eee");
                     console.log(istruea)
                        if(telphone.test(usernameval)||email.test(usernameval)){
                            istruea.hide();
                            truea.show();
                            nulls.hide();
                        }else{
                            istruea.html("*请输入正确手机号码或者常用邮箱");
                            truea.hide();
                            istruea.show();
                            nulls.hide();
                        }
                })
               username.on("focus",()=>{
                let truea =$("#ccc"),
                    istruea =$("#bbb"),
                    nulls = $("#eee");
                    console.log(nulls)
                    istruea.hide();
                    nulls.show();
                    truea.hide();
               })
        }
    })
   return  new Header();
})
