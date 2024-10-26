// stopwatch
const second = document.querySelector('.second');
const text = document.querySelector('.text');
const start = document.querySelector('.button-start');
const stop = document.querySelector('.button-stop');
const reset = document.querySelector('.button-reset');

// Seconds Calculator
let sec, handleInterval;
const calcSec = () => {
    second.innerHTML = ++sec;
}

// Stopwatch Constructor
function Stopwatch() {
    let startTime, endTime, running = false, duration = 0;

    this.start = function(){
        try {
            if(running)
                throw 'Stopwatch has already started.';
            
            running = true;
            startTime = new Date();
            duration = 0;
            second.textContent = 0;
            text.textContent = 'Started';
            sec = 0;
            handleInterval = setInterval(calcSec, 1000);
        }
        catch(err){
            text.innerHTML = err;
        }
    };

    this.stop = function(){
        try {
            if(!running)
                throw 'Stopwatch is not started.';
    
            running = false;
            endTime = new Date();
            duration = (endTime.getTime() - startTime.getTime()) / 1000;
            second.innerHTML = duration;
            text.textContent = 'Stopped';
            clearInterval(handleInterval);
        }
        catch(err){
            text.innerHTML = err;
        }
    };

    this.reset = function(){
        startTime = null;
        endTime = null;
        duration = 0;
        running = false;
        second.textContent = 0;
        text.textContent = 'Reset';
        clearInterval(handleInterval);
    };

    Object.defineProperty(this, 'duration', {
        get: function(){ return duration; }
    });
}

const sw = new Stopwatch();

start.addEventListener('click', sw.start);
stop.addEventListener('click', sw.stop);
reset.addEventListener('click', sw.reset);


// showing current time
const timeEl = document.querySelector('.time');

const time = () => {
    let date = new Date();
    timeEl.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
time();

setInterval(time, 1);