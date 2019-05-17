require(["config"],()=>{
    require(["url","jquery","template","swiper","header","footer",],(url,$,template,Swiper)=>{
        class List{
            constructor(){
                this.getListType();
                this.banner();
            }
            getListType(){
                // 跟后台获取数据，渲染页面；
                $.ajax({
                    url:url.rapBaseUrl+"index/type",
                    method:"get",
                    dataType:"json",
                    success:data=>{
                        if(data.res_code===1){
                            this.listRender(data.res_body.list)
                        }
                    }
                })
            }
            listRender(list){
                let html =template("list-template",{list})
                $("#list-container").html(html);
            }
            banner(){
                var mySwiper = new Swiper ('.swiper-container', {
                    effect : 'fade', // 水平切换切换选项
                    loop: true, // 循环模式选项
                    autoplay:true,
                    // effect : 'coverflow',
                    // slidesPerView: 3,
                    // centeredSlides: true,
                    // coverflowEffect: {
                    // rotate: 30,
                    // stretch: 10,
                    //  depth: 60,
                    // modifier: 2,
                    // slideShadows : true
                    
                    
                    // 如果需要分页器
                    pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                    dynamicMainBullets: 2
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }
                    
                    // // 如果需要滚动条
                    // scrollbar: {
                    //   el: '.swiper-scrollbar',
                    // },
                  })  
                  mySwiper.el.onmouseover=function(){
                    mySwiper.navigation.$nextEl.removeClass('hide');
                    mySwiper.navigation.$prevEl.removeClass('hide');
                  }
                  mySwiper.el.onmouseout=function(){
                    mySwiper.navigation.$nextEl.addClass('hide');
                    mySwiper.navigation.$prevEl.addClass('hide');
                  }
            }
        }
        new List();
    })
})