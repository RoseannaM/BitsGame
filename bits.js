document.addEventListener('DOMContentLoaded', (event) => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    let gameover = false;
    let score = 0;

    class Bits {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.img = new Image();
            this.img.src = 'Cutepuppy.png';
            this.name = 'Bits';
            this.velocity = 0;
        }

        draw() {
            context.drawImage(this.img, this.x, this.y);
        }

        hop() {
            console.log('up');
            //this.img = 'Cutepuppy.png';
            if (this.y === 250) {
                this.velocity = -15;
            }
        }

        fall() {
            console.log('fall');
            this.velocity += 1;
            this.y += this.velocity;
            this.y = Math.min(this.y, 250);
        }
    }
    class Bar {
        constructor(x, y, h) {
            this.x = x;
            this.y = y;
            this.velocity = 5;
            this.h = h;
            this.color = 'rgb(0, 0, 0)';
        }

        draw() {
            context.beginPath();
            context.moveTo(this.x, this.h);
            context.lineTo(this.x, 297);
            context.strokeStyle = this.color;
            context.lineWidth = 35;
            context.stroke();
        }
        
        scroll() {
            this.x -= this.velocity;
            if (this.x < 70 && this.x > 35 && bits.y > 200) {
                gameover = true;
            }
        }
    }

    let bits = new Bits(30, 250);
    const bars = [];

    function getHeight(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 32) {
            bits.hop();
        }
    });

    function makeBar() {
        let height = getHeight(220, 270)
        let bar = new Bar(500, 30, height);
        bars.push(bar);
    }

    function scene(){
        
        context.beginPath();
        context.moveTo(0, canvas.height - 3);
        context.lineTo(canvas.width, canvas.height - 3);
        context.strokeStyle = '#000000';
        context.lineWidth = 5;
        context.stroke();

        //x axis
        context.beginPath();
        context.moveTo(3, 1);
        context.lineTo(3, 300);
        context.strokeStyle = '#000000';
        context.lineWidth = 5;
        context.stroke();

        context.font = '25px courier';
        context.fillText(` Score: ${score}`, 350, 50);

        if(gameover){
            context.beginPath();
            context.rect(140, 100, 210, 80);
            context.stroke();
            context.font = '35px courier';
            context.fillText('GAME OVER', 150, 150);
        }
    }

    setInterval(makeBar, 1000);

    window.main = function () {
        if (gameover === true) {
            return;
        }
        
        context.clearRect(0, 0, canvas.width, canvas.height);
       
        bits.fall();

        for (bar of bars) {
            bar.scroll();
            bar.draw();
        }
        scene()
        if (bars.length > 0 && bars[0].x < 0) {
            bars.shift();
            score += 1;
        }


        bits.draw();
        window.requestAnimationFrame(main);
    };

    main();
});
