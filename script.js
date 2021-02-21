let countdown = document.getElementById('countdown');
let yearToShow = document.getElementById('year');
let header = document.getElementById('header');
let reload = document.getElementById('reload');
let stopTimer = document.getElementById('stopTimer');
let wallpaperbtn= document.getElementById('wallpaper');
let wallpaperTimer;
let startStopWallpaperFlag= false;
let stopflag = true;
let body = document.querySelector('body');

stopTimer.innerText = `Stop Timer`;

function getTime() {
    let currTime = new Date();
    if (currTime.getDate() === 1 && currTime.getMonth() === 0) { // 1st jan of each year 
        let yr = currTime.getFullYear();
        yearToShow.innerText = `${yr}`;
        countdown.style.display = "none";
        header.innerText = "happy new year";
    } else {
        let currTime = new Date();
        let nextYr = new Date().getFullYear() + 1;
        let nextYrDate = new Date(`01-01-${nextYr}`);
        let timeGap = nextYrDate - currTime;
        let getDays = timeGap / (1000 * 60 * 60 * 24);
        let getHours = (getDays - Math.floor(getDays)) * 24;
        getDays = Math.floor(getDays);
        let getMin = ((getHours - Math.floor(getHours))) * 60;
        getHours = Math.floor(getHours);
        let getSec = (Math.floor((getMin - Math.floor(getMin)) * 60));
        getMin = Math.floor(getMin);

        countdown.innerText = `${formatDays(getDays)}D ${formatDate(getHours)}H ${formatDate(getMin)}M ${formatDate(getSec)}S`;
        yearToShow.innerText = `${nextYr}`;
        countdown.style.display = "block";
        header.innerText = "new year countdown";
    }
};

startStopWallpaper();

wallpaperbtn.addEventListener("click",function(){
              startStopWallpaperFlag=!startStopWallpaperFlag;
              startStopWallpaper();
});

function formatDate(time) {
    return time < 10 ? `0${time}` : time;
}

function formatDays(days) {
    return days < 10 ? `00${days}` : (days < 100 ? `0${days}` : days);
}

let timer;
timer = setInterval(() => {
    getTime();
}, 1000);

//for page refresh
reload.addEventListener("click", function () {
    window.location.reload();
})

//start/stop timer
stopTimer.addEventListener("click", function () {
    if (stopflag) {
        clearInterval(timer);
        stopTimer.innerText = `Start Timer`;
        stopflag = !stopflag;
    } else {
        timer = setInterval(() => {
            getTime();
        }, 1000);
        stopTimer.innerText = `Stop Timer`;
        stopflag = !stopflag;
    }

});

function startStopWallpaper(){
    if(startStopWallpaperFlag){
       clearInterval(wallpaperTimer);
    }
    else {
        wallpaperTimer = setInterval(() => {
            backgroundFunc();
        }, 1000);
    }
};

function backgroundFunc() {
    body.style.background = `linear-gradient(${degreeGenerator()}deg,rgba(${rgbGenerator()},${rgbGenerator()},${rgbGenerator()}, 0.5), rgb(${rgbGenerator()},${rgbGenerator()}, ${rgbGenerator()}, 0.7))`;
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundSize = 'cover';
}

function rgbGenerator() {
    return Math.floor(Math.random() * 256);
}

function degreeGenerator() {
    return Math.floor(Math.random() * 361);
}