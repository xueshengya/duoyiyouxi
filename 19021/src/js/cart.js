require(['config'],()=>{
    require(['jquery','template','header','footer','bootstrap'],($,template,header)=>{
        class Cart{
            constructor(){
                this.init();
                this.allchek();
                this.checks();
                this.delete();
                this.jiafa();
                this.jianfa();
                this.show();
                // console.log(this);
            }
            init(){
                // 获取已存的商品记录；
                let cart = localStorage.getItem("cart");
                cart = JSON.parse(cart);
                // 利用数据进行渲染；
                // console.log(cart)
                this.render(cart);
                
            }
            // 渲染页面
            render(cart){
                // console.log(cart);
                $("#cart-container").html(template("cart-template",{cart}));
            }
            // 获取选框；给全选框添加事件
            allchek(){
                let _this = this;
                // console.log(_this);
               let allcheck = $("#allcheck"),
                    checks = $(".checks"),
                    tallpr = $("#tallpr");
                    // console.log(checks.length);
                    // 给多选框添加事件，并判断是否被选中；
                   allcheck.on("change",()=>{
                    if(allcheck.prop("checked")){
                        checks.prop("checked",true)
                        _this.cont=checks.length;
                        console.log(_this);
                    }else{
                        if(checks.prop("checked",false)){
                            _this.cont = 0;
                            console.log(_this);
                            tallpr.html("￥"+0);
                        };
                        
                    }
                    _this.jisuan();
                    
                })
                
            }
            // 给单选框绑定事件；
            checks(){
                // 获取到所有单选框；
                // console.log(this);
               let  checks = $(".checks"),
                    allcheck = $("#allcheck"),
                    // tall = $(".tall"),
                    tallpr = $("#tallpr");
                    
                    // console.log(checks);
                    let num = 0;
                // 循环给单选框绑定事件；
                var _this = this;
                _this.cont = 0;
                   checks.each(function(index){
                   
                       $(this).on("change",function(){
                        
                           if( checks.checked = this.checked ){
                               _this.cont +=1;
                           }else{
                            _this.cont -=1;
                            console.log(_this);
                            tallpr.html("￥"+0);
                           }
                           if(_this.cont===checks.length ){
                               allcheck.prop("checked",true)
                                
                           }else{
                            allcheck.prop("checked",false)
                           }
                           _this.jisuan();
                        //    _this.delete();
                       })
                   })     
            }
            // 计算总和
            jisuan(){
                let atr = $(".center"),
                    tallpr = $("#tallpr"),
                    allMoney = 0;
                //  atr.each((index,tr) => {
                //     if()
                // });
                Array.from(atr).forEach(tr=>{
                    // console.log(tr);
                    if(tr.querySelector(".checks").checked){
                       allMoney +=Number(tr.querySelectorAll(".tallspan")[0].innerHTML);
                       tallpr.html("￥"+allMoney);
                    }
                })
            }
            // 删除数据；
            delete(){ 
                let wrap =$("#cart-container"),
                     atr = $(".center");
                     
                Array.from(atr).forEach((tr)=>{
                    // console.log(tr);
                    let delet = tr.querySelector(".ac");
                        delet.onclick=()=>{
                            if(confirm("确定要删除当前商品吗？")){
                                tr.remove();
                            // 获取当前点击删除的ID；
                            let id = tr.getAttribute("data-id");
                           // console.log(id);
                           this.deletCooike(id)
                           // 删除之后调用一下HEAER里面的计算方法；
                           header.cartall();
                           this.jisuan();
                           this.show();
                            }
                           
                        }
                })
                this.getlength();
                
                
            }
            // 点击删除清除缓存数据；
            deletCooike(id){  
                let cart = localStorage.getItem("cart");
                    cart = JSON.parse(cart);
                    // console.log(id);
                    // let index = -1;
                    // 过滤掉数据ID与点击当前盒子ID的数据；
                    cart = cart.filter((shop,i)=>{
                        // index = i ;
                        // 返回值为布尔值；
                        return shop.id !== id;
                    })
                // console.log(cart);
                // 将数据重新进行存储；
                localStorage.setItem("cart",JSON.stringify(cart))
            }
            // jiafushu
            jiafa(){
                // 取到所有的加号，循环绑定事件；
                let atr = $(".center");
                    // console.log(cart);
                // 循环ATR找到每一条里面的加号绑定事件；
                Array.from(atr).forEach(tr=>{
                    let numup = tr.querySelector(".num-down"),
                        id =tr.getAttribute("data-id"),
                        input = tr.querySelector(".num-input"),
                        price = tr.querySelector(".pricespan").innerHTML,
                        tallprice = tr.querySelector(".tallspan");
                        // console.log(price);
                        // 给每一个TR下面的加号绑定事件；
                    numup.onclick = ()=>{
                      let cart = localStorage.getItem("cart");
                          cart = JSON.parse(cart);
                        // 点击+时候判断如果点击的ID与数据ID一致，数据ID就加加；
                        let index = -1;
                        if(cart.some((shop,i)=>{
                            index = i ;
                        return shop.id == id
                        })){
                           cart[index].num++;
                           input.value = cart[index].num;
                           tallprice.innerHTML = Number(price)*input.value
                        }
                        localStorage.setItem("cart",JSON.stringify(cart));
                        header.cartall(); 
                        this.jisuan();
                    } 
                })
                
                
            }
            // 减法；
            jianfa(){
                 // 取到所有的减，循环绑定事件；
                let atr = $(".center");
                 
             // 循环ATR找到每一条里面的加号绑定事件；
             Array.from(atr).forEach(tr=>{
                 let numdown = tr.querySelector(".num-up"),
                     id =tr.getAttribute("data-id"),
                     input = tr.querySelector(".num-input"),
                     price = tr.querySelector(".pricespan").innerHTML,
                     tallprice = tr.querySelector(".tallspan");
                    //  console.log(price);
                     // 给每一个TR下面的加号绑定事件；
                 numdown.onclick = ()=>{
                   let cart = localStorage.getItem("cart");
                    cart = JSON.parse(cart);
                     // 点击+时候判断如果点击的ID与数据ID一致，数据ID就加加；
                     let index = -1;
                     if(cart.some((shop,i)=>{
                         index = i ;
                     return shop.id == id
                     })){
                        //  如果满足NUM数量就++；
                         cart[index].num--;
                        //  并且把NUM的值付给inp；
                        input.value = cart[index].num;
                        // 计算小计；
                        tallprice.innerHTML = Number(price)*input.value;
                        // 判断NUM的值要>=1；
                          if(cart[index].num<=1){
                              cart[index].num=1;
                              input.value = cart[index].num;
                              tallprice.innerHTML = Number(price)*input.value;
                          }  
                     }
                     localStorage.setItem("cart",JSON.stringify(cart));
                    header.cartall(); 
                    this.jisuan();
                 }

             })
             
            }
            getlength(){
                let div = $(".center"),
                    allcheck = $("#allcheck"),
                    checks = $(".checks");
                    
                    let _this = this;
                    
                    _this.cont = 0;
                    checks.each(function(index){
                        
                        if($(this).prop("checked")){
                            _this.cont++ ;
                            // console.log(_this);
                            // console.log($(this))
                            allcheck.prop("checked",true);
                        }
                        if(_this.cont ===checks.length){
                            allcheck.prop("checked",true);
                        }
                     
                    })
                    
            }
        show(){
            let addshop = $(".addshop"),
                cart = localStorage.getItem("cart");
                cart = JSON.parse(cart);
                console.log(cart);
                if(cart.length==0){
                    addshop.css('display','none');
                    $(".nullcar").show();
                }else{
                    addshop.show();
                    $(".nullcar").hide();
                }
        }
        }
        new Cart();
    })
})