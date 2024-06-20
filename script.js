// object representing current time 
// const currentTime = new Date();
// const hours = currentTime.getHours()
// const minutes = currentTime.getMinutes()
// const seconds = currentTime.getSeconds()
// console.log(currentTime, hours, minutes, seconds)

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
        }
    }
}

const myClock = clockFactory()
console.log(myClock.get12HourTime())
console.log(myClock.getFormattedTime())
