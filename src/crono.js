class Crono{
    constructor(x, y, canvas, ctx, cronoleftimg, cronorightimg, cronoupimg, cronodownimg, cronothrust, keys){
        this.canvas = canvas
        this.ctx = ctx
        this.x = x
        this.y = y
        this.alive = true ;
        this.animate = this.animate.bind(this)
        this.animateDeath = this.animateDeath.bind(this)
        this.moveRight = this.moveRight.bind(this)
        this.cronoleftimg = cronoleftimg
        this.cronorightimg= cronorightimg
        this.cronoupimg = cronoupimg
        this.cronodownimg = cronodownimg
        this.lastaction = this.cronodownimg
        this.cronothrust = cronothrust
        this.keys = keys
      

    }

    animateAttack(x,y){
        let leftsY
        let leftsX
        // x bigger the more right, y bigger the lower, arclength, 1
        // this.y is where crono is y is where enemy is at the start
        this.circleCenterY = (this.y + y )/ 2
        this.circleCenterX = (this.x + x )/ 2
        this.diameter = Math.pow(Math.pow((this.x-x),2) + Math.pow((this.y-y),2), 0.5)
        // which unit is on the LEFT?
        if (this.x < x){
            leftsY = this.y
            leftsX = this.x
        } else {
            leftsY = y
            leftsX = x
        }
        this.angleStartClockwise = -Math.atan( (leftsY - this.circleCenterY) / (this.circleCenterX - leftsX)) + Math.PI
        this.angleEndClockwise = Math.PI + this.angleStartClockwise

        this.x = x
        this.y = y
        this.ctx.drawImage(this.cronothrust, 0, 0, 500, 500, this.x, this.y + 50, 500, 500)
        this.lastaction = this.cronothrust
       
    }
    
    animate(){
            if (this.keys[39]=== true){
               this.moveRight()
               this.lastaction = this.cronorightimg
            }
            if (this.keys[37] === true) {
                this.moveLeft()
                this.lastaction = this.cronoleftimg
            }
            // down and up will overpower left and right as a lastaction
            if (this.keys[40] === true) {
                this.moveDown()
                this.lastaction = this.cronodownimg
            }
            if (this.keys[38] === true) {
                this.moveUp()
                this.lastaction = this.cronoupimg
            } 
            if ( (this.keys[37] === false || this.keys[37] === undefined)
            && (this.keys[38] === false || this.keys[38] === undefined)
            && (this.keys[39] === false || this.keys[39] === undefined)
            && (this.keys[40] === false || this.keys[40] === undefined)){
                this.ctx.drawImage(this.lastaction, 0, 0, 500, 500, this.x, this.y, 500, 500)
            } 
        }
    

       
    moveDown(){
        if (this.y < this.canvas.height - 30 && (this.keys[37] || this.keys[39])=== false) {
            this.y += 4
        } else if (this.y < this.canvas.height - 30 && (this.keys[37] || this.keys[39]) === true){
            this.y += 2.8
        }
        this.ctx.drawImage(this.cronodownimg, 0, 0, 500, 500, this.x, this.y, 500, 500)

    }

    moveUp(){
        if (this.y > 0 - 30 && (this.keys[37] || this.keys[39]) === false) {
            this.y -= 4
        } else if (this.y > 0 - 30 && (this.keys[37] || this.keys[39]) === true) {
            this.y -= 2.8
        }
        this.ctx.drawImage(this.cronoupimg, 0, 0, 500, 500, this.x, this.y, 500, 500)

    }
    
    moveLeft(){
        if (this.x > 0 - 30 && (this.keys[40] || this.keys[38]) === false) {
            this.x -= 4
            this.ctx.drawImage(this.cronoleftimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
        } else if (this.x > 0 - 30 && (this.keys[40] || this.keys[38]) === true){
            this.x -= 2.8
        }

    }

    moveRight(){
        if (this.x < this.canvas.width - 30 && (this.keys[40] || this.keys[38] )=== false){
            this.x += 4
            this.ctx.drawImage(this.cronorightimg, 0, 0, 500, 500, this.x, this.y, 500, 500)
        } else if(this.x > 0 - 30 && (this.keys[40] || this.keys[38]) === true) {
            this.x += 2.8
        }

    }

    animateDeath() {
  

    }



}


export default Crono