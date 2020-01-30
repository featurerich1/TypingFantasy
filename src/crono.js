class Crono{
    constructor(x, y, canvas, ctx, cronoimg, keys){
        this.canvas = canvas
        this.ctx = ctx
        this.x = x
        this.y = y
        this.alive = true ;
        this.animate = this.animate.bind(this)
        this.animateDeath = this.animateDeath.bind(this)
        this.moveRight = this.moveRight.bind(this)
        this.cronoimg = cronoimg
        this.keys = keys
        // this.cronoImg.src = 'src/cronobattleleft.gif'; 
       
        // this.cronoImg.src = 'src/cronobattleleft.gif'; // Set source path
    }

    animate(){
           if (this.keys[39]=== true){
               this.moveRight()
           }

            this.ctx.drawImage(this.cronoimg, 0, 0, 500, 500, this.x, this.y, 500, 500)


            }    //     // let canvas = document.getElementById('canvas');
    //     // let ctx = canvas.getContext('2d');
            
    //     this.cronoImg.addEventListener('onload', function () {
    //         this.ctx.drawImage(this.cronoImg, 0, 0, 62, 62, 300, 300, 62, 62)
    //     }, false);
    //     this.cronoImg.src = 'src/cronobattleleft.gif'; // Set source path
    //     //    this.ctx.drawImage(this.cronoImg, 0, 0, 62, 62, 300, 300, 62, 62)
       
    moveDown(){}
    moveUp(){}
    moveLeft(){}

    moveRight(){
        if (this.x < this.canvas.width -30 ){
            this.x += 10
        } else {
        }
    }

    animateDeath() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');

    }



}


export default Crono
