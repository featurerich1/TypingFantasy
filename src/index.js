// Node notes:
// package.json is if I want to make my own little javascript stuff into a module for others to use on npm
// hence scripts in there and "main": "app.js", so app.js would be entry point for others; typically should be index.js i think
// my app.js is just express hosting stuff which might be unnecesary if it werent for javascript and cors policy with scripts not on a server runing on acomputer not being allowed
// my index.js is what starts running and importing everyting as entry point for WEBPACK which kinda compiles all js code into one thing called main.js IDK where i set the entry and exit pts
// main.js is the onyl thign that is used by index.html in the end
// CANT find webpack.config.js, were we suppose 2 make it on our own?

// asap:1. walking animaton based on EITHER instance variable keeping track of past actions
// OR just count requestanimationframe frames IDK
// 2. collisions and damage on chrono
// 3. bloody pool for death animation for both crono and monsters
// 4. functions with instance variables to track last lifetime of animation like the jumping tracers? or just a settimeout

// FUTURE:
// 1. show WPM somewhere need to keep track of time elapsed DONE
// 2. gameover reset the game 
// 3. animate attack from crono-- should he just teleport everywhere and use x-attack? OR HUGE ARC with MATH that he flies through SOMEWHAT SOLVED
// 4. how does crono lose? do monsters need to attack him he needs hp or soemthing or if more than 5monsters are alive at once he loses
// 5. make it feel more alive with actual edges that crono and monsters cant spawn/cross
// 6. monsters move randomly left and right to and fro, also spawn preferentially away from existing monsters??
// 7. animate random movement, walking, and standing so it doesnt look like crono is skating
// 8. options/welcome screen/ choosing difficulty such as spawn rate
// 9. animate monster death
// 10. glitch: moving down+left double animates  SOLVED
// 11. maybe huge melee limit break swing but will take a lot of either async/instance variables tracking/animationframes counting
//https://github.com/blindman67/GIFGroover
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
//https://retrogamezone.co.uk/chronotrigger.htm
//http://www.videogamesprites.net/ChronoTrigger/Party/Crono/
import Enemy from './enemy';
import Crono from './crono';
// import Game from './game';
// import Actor from './actor';


let canvas;
let ctx;
let word;
let keys;
let fontSize;
let enemies;
let cronorightimg;
let cronoleftimg;
let cronodownimg;
let cronoupimg;
let cronothrust;
let forestbg;
let player;
let imp;
let request;
let wpm;
let time;
let then;
let now;
let firstTime = 0;
let destroyedCount = 0;
let bluepaint;



document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');   
    cronoleftimg = document.getElementById('cronoleft')
    cronorightimg = document.getElementById('cronoright')
    cronodownimg = document.getElementById('cronodown')
    cronoupimg = document.getElementById('cronoup')
    forestbg = document.getElementById('forest')
    imp = document.getElementById('imp')
    cronothrust = document.getElementById('cronothrust')
    bluepaint = document.getElementById('bluepaint')


 


    document.addEventListener("keydown", keyPush);
    word = [];

    //https://stackoverflow.com/questions/15661796/how-to-handle-multiple-keypresses-with-canvas
    keys = []; // keys that have been pressed and not released are true in here 
    document.body.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });

    document.body.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
        //console.log(keys)
    });
    //

    game()
})

function game() {
    let rate = 1 //per second
    enemies = []
    spawnEnemy(rate)

    player = new Crono(300,300, canvas, ctx, cronoleftimg, cronorightimg, cronoupimg, cronodownimg, cronothrust, keys, enemies)

    function spawnEnemy(rate){
        enemies.push(new Enemy(Math.floor(Math.random()*canvas.width+1),Math.floor(Math.random()*canvas.height+1),canvas,ctx, imp, 1, bluepaint))
        setTimeout(() => spawnEnemy(rate),1000/rate)
        
    }
    // requestAnimationFrame(()=>render(player, enemies))
    // setInterval(()=>render(player,enemies), 1000/15);
    render(player, enemies)
}

function render(player, enemies, frameCount){
    if(frameCount === undefined) frameCount = 0 
   // 1024x768 background render
    ctx.drawImage(forestbg, 0, 0, 500, 350, 0, 0, canvas.width, canvas.height - 50)
    
    // THIS IS WHERE THE ARC IS DRAWN)
    if(player.circleCenterY ){
        
        // first line of two
        ctx.beginPath();
        ctx.arc(player.circleCenterX, player.circleCenterY, player.diameter/2, player.angleStartClockwise, player.angleEndClockwise, false)
        ctx.strokeStyle = "#FFFF00";
        ctx.lineWidth = 2;
        ctx.lineCap = 'round'
        ctx.stroke();
        ctx.closePath();

        // second line of two
        ctx.beginPath();
        ctx.arc(player.circleCenterX, player.circleCenterY, player.diameter / 2+ 10, player.angleStartClockwise, player.angleEndClockwise, false)
        ctx.strokeStyle = "#FFFF00";
        ctx.lineWidth = 1;
        ctx.lineCap = 'round'
        ctx.stroke();
        ctx.closePath();

    }

    for(let i = 0; i < enemies.length; i++){
        enemies[i].animate(player.x, player.y); // move towards player
    }
    animateTypingArea();
    animateWPM();
    player.animate();

    frameCount++
    request = requestAnimationFrame(() => render(player, enemies, frameCount))
}

function gameover(){
    cancelAnimationFrame(request)
}

function animateWPM(){
    if(then===undefined) {
        then = Date.now()
    }

    now = Date.now()
    time = parseInt((now - then )/ 1000)
    wpm = parseInt(destroyedCount / (time / 60))
    ctx.fillStyle = "blue";
    ctx.font = `bold ${fontSize}px ChronoType`;
    ctx.fillText('Time: ' + time + '   WPM: ' + wpm , canvas.width - 600, (canvas.height));

    // var context = canvas.getContext("2d");
    // canvas.x = 150;
    // canvas.y = 150;

    //THIS IS THE HEART ANIMATION FOR HP

    let context = ctx
    context.beginPath()
    context.strokeStyle = "#000000";
    context.strokeWeight = 3;
    context.shadowOffsetX = 4.0;
    context.shadowOffsetY = 4.0;
    context.lineWidth = 10.0;
    context.fillStyle = "#FF0000";
    var d = 30
    var k = 100;

    context.moveTo(k, k + d / 4);
    context.quadraticCurveTo(k, k, k + d / 4, k);
    context.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
    context.quadraticCurveTo(k + d / 2, k, k + d * 3 / 4, k);
    context.quadraticCurveTo(k + d, k, k + d, k + d / 4);
    context.quadraticCurveTo(k + d, k + d / 2, k + d * 3 / 4, k + d * 3 / 4);
    context.lineTo(k + d / 2, k + d);
    context.lineTo(k + d / 4, k + d * 3 / 4);
    context.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
    context.stroke();
    context.fill();
    context.closePath();


  // end heart animation


}
function animateTypingArea() {
    fontSize = 50;

    //handles deleting old characters 
    ctx.clearRect(0, canvas.height - fontSize, canvas.width, fontSize)
    //end deleting

    //handles recoloring deleted user text area (maybe clearRect is redundant)
    ctx.fillStyle = "grey";
    ctx.fillRect(0, canvas.height - fontSize, canvas.width, fontSize)
    //end recoloring

    //user input word
    ctx.fillStyle = "blue";
    ctx.font = `bold ${fontSize}px ChronoType`;
    ctx.fillText(word.join(''), 0, (canvas.height));
    //end user input word
    // console.log(canvas.width/fontSize) = 25.6 atm but it can fit approx 44 charss-- all in arial 50s on a 1280 width

}

function handleSubmit(enteredWord){
    for(let i = 0; i < enemies.length; i++){
        if(enemies[i].word === enteredWord && enemies[i].alive === true){
            player.animateAttack(enemies[i].x, enemies[i].y-50, cronothrust)
            enemies[i].alive = false;
            // enemies[i].animateDeath();
            destroyedCount++
        }else{
            console.log('failedenter')
        }
    }
}

function keyPush(e) {
    //couldve used fromCharCode()
    switch (e.keyCode) {
        case 65:
            word.push('a')
            break;
        case 66:
            word.push('b')
            break;
        case 67:
            word.push('c')
            break;
        case 68:
            word.push('d')
            break;
        case 69:
            word.push('e')
            break;
        case 70:
            word.push('f')
            break;
        case 71:
            word.push('g')
            break;
        case 72:
            word.push('h')
            break;
        case 73:
            word.push('i')
            break;
        case 74:
            word.push('j')
            break;
        case 75:
            word.push('k')
            break;
        case 76:
            word.push('l')
            break;
        case 77:
            word.push('m')
            break;
        case 78:
            word.push('n')
            break;
        case 79:
            word.push('o')
            break;
        case 80:
            word.push('p')
            break;
        case 81:
            word.push('q')
            break;
        case 82:
            word.push('r')
            break;
        case 83:
            word.push('s')
            break;
        case 84:
            word.push('t')
            break;
        case 85:
            word.push('u')
            break;
        case 86:
            word.push('v')
            break;
        case 87:
            word.push('w')
            break;
        case 88:
            word.push('x')
            break;
        case 89:
            word.push('y')
            break;
        case 90:
            word.push('z')
            break;
        case 32:
            // console.log('SPACE BAR pressed PAUSE');
            break;
        case 8:
            // console.log('Delete Keymac/backspace pc Pressed');
            word.pop();
            break;
        case 13:
            handleSubmit(word.join(''))
            word = [];
            break;

    }
}


