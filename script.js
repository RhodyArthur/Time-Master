const clockEl = document.querySelector('#clock') 
const radioEl = document.querySelectorAll('input[name="format"]')
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
    const isFormattedTime = selectedFormat === '24'; // Check if 24-hour format is selected
    displayClock(clock, isFormattedTime);
}

// Update the clock display every second
updateClockDisplay(myClock)
setInterval(() => {
    myClock.updateTime()
     updateClockDisplay(myClock)
}, 1000);


radioEl.forEach(input => {
    input.addEventListener('change', () => {
        updateClockDisplay(myClock);
    });
});
