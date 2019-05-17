require(["config"],()=>{
    require(["url","template","jquery","swiper","header","footer"],(url,template,$,Swiper)=>{
        class Index{
            constructor(){
                this.getIndexType();
                this.banner();
                console.log(url.rapBaseUrl)
            }
            getIndexType(){
                // 发送ajax请求数据，利用回调函数得到数据，然后进行渲染；
                $.ajax({
                    url:url.rapBaseUrl+"index/type",
                    method:"get",
                    datatype:"json",
                    success:data=>{
                        if(data.res_code === 1){
                            // 将回调得到的函数，传到渲染函数；
                            this.renderIndex(data.res_body.list)
                        }
                    }
                })
            }
            // 渲染页面的主要BODY部分；
            renderIndex(list){
               
             let html = template("list-template",{list})
            
             $("#list-container").html(html)
            }
            // 轮播图；
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
        new Index();
    })
})