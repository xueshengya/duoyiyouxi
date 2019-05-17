require(["jquery"],$=>{
    function Footer(){
        this.container = $("#footer-container")
        console.log(this.container);
        this.load()
    }
    $.extend(Footer.prototype,{
        load(){
            this.container.load("/html/module/footer.html")
        }
    })
   return new Footer();
})