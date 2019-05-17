require(['config'],()=>{
    require(['jquery','url','header','cookie','footer'],($,url,header)=>{
        class Login{
            constructor(){
                this.username=$("#username1");
                this.password=$("#password1");
                this.btn=$("#btns");
                this.regist=$("#login-regist");
                this.reture=$("#reture");
                this.remember=$("#remember");
                // this.regist=$("#login-regist");
                // console.log(header.rejist());
                // 调用;
                
                this.bindEvent();
                this.retureTohtml();
                
            }
            bindEvent(){
                // 绑定事件；获取VALUE值并且请求数据；
                this.btn.on("click",()=>{
                    let username = this.username.val(),
                        password = this.password.val();
                        // 请求数据；
                        $.ajax({
                            url:url.phpBaseUrl+"user/login.php",
                            type:"post",
                            data:{username,password},
                            dataType:"json",
                            success:data=>{
                                if(data.res_code===1){
                                    // 如果登陆成功就存COOIIKE
                                    this.cooikes(username);
                                }else{
                                    alert(data.res_message);
                                }
                            }
                        })
                })
            }
            // 登录界面跳转至注册页面；
            retureTohtml(){
                this.reture.on("click",()=>{
                    location.href="/"
                })
            };
            // 登陆时，存COOIKE;
        cooikes(username){
        let expires = this.remember.prop('checked') ? {expires:10} : {};
        expires = Object.assign({path: "/"}, expires);
        console.log(expires);
        $.cookie('username',username,expires);
        alert('登录成功，即将跳转首页');
        location.href = "/";
        }
    }
        new Login();
    })
})