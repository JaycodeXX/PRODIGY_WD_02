const resetBtn = document.getElementsByClassName("reset")[0];
    const clearBtn = document.getElementsByClassName("clear")[0];
    const playBtn = document.getElementsByClassName("play")[0];
    const lapBtn = document.getElementsByClassName("lap")[0];
    const minute = document.getElementsByClassName("minute")[0]; 
    const second = document.getElementsByClassName("seconds")[0]; 
    const centiSecond = document.getElementsByClassName("milisecs")[0];
    const laps = document.getElementsByClassName("laps")[0];
    const bg = document.getElementsByClassName("out-circle")[0];




    let p = false;
    let s = false;
    let secondCounter = 0;
    let minCounter = 0;
    let centiCounter = 0;
    let lapList = 0;
    let min;
    let intervalId;
    let centiSec;

    const toggleBtn = () => {
        lapBtn.classList.remove("hidden");
        resetBtn.classList.remove("hidden");
    }

    const play = () => {
        if (!p && !s) {
            playBtn.innerHTML = '<i class="fa-solid fa-power-off"></i>';
            bg.classList.add("animation-bg");
            min = setInterval(() => {
                minute.innerHTML = `${++minCounter} :`;
            }, 60*1000);
            intervalId = setInterval(() => {
                if(secondCounter === 60){
                    secondCounter = 0;
                }
                second.innerHTML = `&nbsp;${++secondCounter} :`;
            }, 1000);
            centiSec = setInterval(() => {
                if(centiCounter === 100){
                    centiCounter = 0;
                }
                centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
            }, 10);
            p = true;
            s = true;
        } else {
            playBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
            clearInterval(min);
            clearInterval(intervalId);
            clearInterval(centiSec);
            p = false;
            s = false;
            bg.classList.remove("animation-bg");
        }
        toggleBtn();
    }

    const reset = () => {
        clearInterval(min);
        clearInterval(intervalId);
        clearInterval(centiSec);
        p = false;
        s = false;
        secondCounter = 0;
        minCounter = 0;
        centiCounter = 0;
        second.innerHTML = '&nbsp;0 :';
        centiSecond.innerHTML = '&nbsp;0';
        minute.innerHTML = '0 :';
        lapBtn.classList.add("hidden");
        resetBtn.classList.add("hidden");
    }

    const lap = () => {
        const li = document.createElement("li");
        const number = document.createElement("span");
        const timestamp =document.createElement("span");

        li.setAttribute("class", "lap-list");
        number.setAttribute("class", "number");
        timestamp.setAttribute("class", "timestamp");


        number.innerText = `No:${++lapList}`;
        timestamp.innerHTML = `${minCounter} : ${secondCounter} : ${centiCounter}`;

        li.append(number, timestamp);
        laps.append(li);

        clearBtn.classList.remove("hidden");
    }
    





    const clearAll = () => {
        laps.innerHTML = '';
        laps.append(clearBtn);
        clearBtn.classList.add("hidden");
        lapList = 0;
    }
    playBtn.addEventListener("click", play);
    resetBtn.addEventListener("click", reset);
    lapBtn.addEventListener("click", lap);
    clearBtn.addEventListener("click", clearAll);