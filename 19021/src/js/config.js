require.config({
  baseUrl:"/",
  paths : {
    "header"   : "js/module/header",
    "footer"   : "js/module/footer",
    "url"      : "js/module/url",
    "bootstrap":"libs/bootstrap/js/bootstrap",
    "template" :"libs/art-template/template-web",
    "cookie"   :"libs/jquery-plugins/jquery.cookie",
    "zoom"     :"libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
    "fly"      :"libs/jquery-plugins/jquery.fly.min",
    "swiper"   :"libs/swiper/swiper-js/swiper",
    "jquery"   :"libs/jquery/jquery-3.2.1"
  },
  shim:{
    "bootstrap":{deps:['jquery']}
  },
  shim:{
    "cookie":{deps:['jquery']}
  },
  shim:{
    "zoom":{deps:['jquery']}
  },
  shim:{
    "fly":{deps:['jquery']}
  },
})