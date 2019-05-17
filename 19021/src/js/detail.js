require(['config'],()=>{
    require(['jquery','url','template','header','zoom','footer','bootstrap','fly'],($,url,template,header)=>{
        class Dtaile{
            constructor(){
                this.dtaileGet();
                this.addcart();
                this.down();
                this.up();
                console.log(fly)
            }
            dtaileGet(){
                let id = location.search.slice(4)
                $.ajax({
                    url:url.rapBaseUrl+"detail/type",
                    type:"get",
                    data:{id},
                    dataType:"json",
                    success:res=>{
                        if(res.res_code===1){
                            let {data} = res.res_body
                            data = {...data,id}
                            // 将本条数据存为全局；
                            this.data = data
                            this.render(data)
                        }
                    }
                })
            }
            render(data){
                console.log(data)
                $("#main-top").html(template("detail-template",{data}))
                this.zoom();
                this.num();
                
            }
            // 放大镜方法；
        zoom(){
            $(".zoom-img").elevateZoom({
                gallery:'fdj-wrap',
                cursor: 'pointer',
                galleryActiveClass: 'active',
                borderSize:'1',    
                borderColor:'#888'
              });
        }
        // 存COOKIE,加购物车；
        addcart(){
            $("#main-top").on("click","#addcar",(e)=>{
                this.jia(e)
                
                // 点击添加购物车，调用抛物线；
                this.fly(e)
                // 在点击加入购物车的时候，图标上的数量要重新计算
                header.cartall()
            })
        }
        jia(e){
           
               let cart = localStorage.getItem("cart");
            //    判断是否存在了 记录；
               if(cart){
                    // 已经存过购物车了；拿到缓存；
                    cart = JSON.parse(cart);
                    console.log(cart);
                    // 拿到已经存过的,判断是否存的同一种商品，如果是同一种商品，NUM就++，没有就PUSHI进去；
                    let index = -1;
                    // 判断是否存在同一种商品
                    if(cart.some((shop,i)=>{
                        // 如果存在同一种商品，那么就会满足，当前商品与之前存在商品的ID相等，
                        index = i;
                        return shop.id === this.data.id;
                    })){
                        ++cart[index].num;
                        
                    }else{
                        cart.push({...this.data,num:1});
                    }
               }else{
                //    没有商品，将数量设置为默认1；
                   cart = [{...this.data,num:1}]
               }
            //    存入缓存
            localStorage.setItem("cart",JSON.stringify(cart));
            this.num();
        }
        
        // 加减数量；
    num(){
        
        $("#number").val(1);
        // 判断是否存在当前同种商品，如果存在，就将数量显示在INPUT；
            let cart = localStorage.getItem("cart");
            cart = JSON.parse(cart);
            if(cart){
                var index = -1;
                if(cart.some((shop,i)=>{
                    index = i ;
                    return shop.id === this.data.id;
                })){
                     $("#number").val(cart[index].num);
                }
            }else{
                $("#number").val(1);
            }
   // 如果为同一种商品，那么点击加按钮，该种商品的NUM++；
    }
    down(){ 
        $("#main-top").on("click","#down",()=>{
            // 点击加号调用购物车方法；
            this.jia()
            header.cartall();
            // this.num();        
        })
    }
    up(){
        $("#main-top").on("click","#up",()=>{
                let cart = localStorage.getItem("cart");
                cart = JSON.parse(cart);
                console.log(cart);
                if(cart){
                    let index = -1;
                    if(cart.some((shop,i)=>{
                        index = i ;
                        return shop.id === this.data.id;
                    })){
                        --cart[index].num;
                        $("#number").val(cart[index].num);
                        // 判断 当当前数据的num<=0时，将其赋值为1；然后显示到input里面；
                        if(cart[index].num<=0){
                            cart[index].num=1;
                            $("#number").val(cart[index].num)
                        }
                        
                    }
                }else{
                    cart=[{...this.data,num:1}];
                }
                localStorage.setItem("cart",JSON.stringify(cart));
                // 在点击减的时候，也要重新计算NUM的值；
                header.cartall();
        })
    }
    // 抛物线
    fly(e){
         
         $(`<img src='${this.data.img[0]}' style='width:30px;height:30px;border-radius:50%'>`).fly({
            start:{
                left:e.clientX,
                top:e.clientY
            },
            end:{
                left:$("#add-cart").offset().left,
                top:$("#add-cart").offset().top
            },
            onEnd:function(){
                this.destroy(); //销毁抛物体
                header.cartall()
            }
        })
    }
        }
       return new Dtaile()
    })
})