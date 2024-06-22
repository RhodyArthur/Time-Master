const clockEl = document.querySelector('#clock') 
const radioEl = document.querySelectorAll('input[name="format"]')
const alarmEl  = document.querySelector('#alarm-input')
const alarmBtn = document.querySelector('.set-alarm-btn')
const stopBtn = document.querySelector('.stop-alarm')
const snoozeBtn = document.querySelector('.snooze')
const alarmAudio = document.querySelector('#alarm-audio')

let snoozeTimeout

// create clock instances and access their properties
const clockFactory = () => {
    const currentTime = new Date();
    return {
        hours: currentTime.getHours(),
        minutes: currentTime.getMinutes(),
        seconds: currentTime.getSeconds(),

        getFormattedTime () {
            return `${ this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`
        }
        ,
        get12HourTime() {
            let hours = this.hours % 12
            hours = hours ? hours : 12
            const ampm = this.hours >= 12 ? 'PM' : 'AM'
            return `${hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')} ${ampm}`
        },

        // dynamically update clock
        updateTime() {
            const currentTime = new Date()
            this.hours = currentTime.getHours()
            this.minutes = currentTime.getMinutes()
            this.seconds = currentTime.getSeconds()
        }

    }
}


const myClock = clockFactory()

// display clock function
function displayClock(clock, isFormattedTime) {
    let timeString
    if(isFormattedTime){
        timeString = clock.getFormattedTime()
    }
    else {
       timeString = clock.get12HourTime()
    }
    clockEl.textContent = timeString 
}


// Update the clock display based on selected radio button
function updateClockDisplay(clock) {
    const selectedFormat = document.querySelector('input[name="format"]:checked').value;
    const isFormattedTime = selectedFormat === '24';
    displayClock(clock, isFormattedTime);
}

// Update the clock display every second
updateClockDisplay(myClock)
setInterval(() => {
    myClock.updateTime()
     updateClockDisplay(myClock)
     checkAlarm()
}, 1000);


radioEl.forEach(input => {
    input.addEventListener('change', () => {
        updateClockDisplay(myClock);
    });
});


// set alarm
alarmBtn.addEventListener('click', function(){
    const currentTime = new Date()
    const alarmValue = alarmEl.value
    let alarmHours = parseInt(alarmValue.substring(0, 2))
    let alarmMinute = parseInt(alarmValue.substring(3,5))

      // check for empty string
      if (!alarmValue){
        alert('Select a time')
        return
    }

    if (alarmHours <= currentTime.getHours() && alarmMinute <= currentTime.getMinutes()){
        alert('Cannot set time in the past')
        return
    }
    setInterval(checkAlarm, 1000)
})

function checkAlarm(){
    const currentTime = new Date()
    const alarmValue = alarmEl.value
    let alarmHours = parseInt(alarmValue.substring(0, 2))
    let alarmMinute = parseInt(alarmValue.substring(3,5))

    if (alarmHours === currentTime.getHours() && alarmMinute === currentTime.getMinutes() && currentTime.getSeconds() === 0){
        alarmAudio.play()
        stopBtn.classList.remove('hidden')
        snoozeBtn.classList.remove('hidden')
        alarmValue.value = ''
    }
}

// Stop alarm
stopBtn.addEventListener('click', function() {
    alarmAudio.pause();
    alarmAudio.currentTime = 0
    stopBtn.classList.add('hidden')
    snoozeBtn.classList.add('hidden')

    clearTimeout(snoozeTimeout)
});

// snooze alarm
snoozeBtn.addEventListener('click', function(){
    alarmAudio.pause()
    alarmAudio.currentTime = 0
    stopBtn.classList.add('hidden')
    snoozeBtn.classList.add('hidden')

    clearTimeout(snoozeTimeout)

   snoozeTimeout = setInterval(()=>{
        alarmAudio.play()
        stopBtn.classList.remove('hidden')
        snoozeBtn.classList.remove('hidden')
    },60000)
})

//hide stop button if alarm is done playing
alarmAudio.addEventListener('ended', ()=>{
    stopBtn.classList.add('hidden')
})
