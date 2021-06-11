import './sass/main.scss';

class CountdownTimer {
    constructor({selector, targetDate}) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.intervalId = null;
        this.isActive = false;
        this.refs = {
            days: document.querySelector(`${this.selector} [data-value="days"]`),
            hours: document.querySelector(`${this.selector} [data-value="hours"]`),
            mins: document.querySelector(`${this.selector} [data-value="mins"]`),
            secs: document.querySelector(`${this.selector} [data-value="secs"]`),
            calendar: document.querySelector('.calendar'),
        }     
    }

    start() {
        if(this.isActive) {
            return;
        }

        if(!this.getValueCalendar()) {
            return alert('Сначала укажите дату');
        }

        this.isActive = true;
        const targetDate = new Date(this.getValueCalendar()).getTime() 

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = targetDate - currentTime;
            this.updateClockface(deltaTime);
        }, 1000); 
    }

    stop () {
        clearInterval(this.intervalId);
        this.isActive = false;
        this.updateClockface(0);
    }

    updateClockface(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        this.refs.days.textContent = days;
        this.refs.hours.textContent = hours;
        this.refs.mins.textContent = mins;
        this.refs.secs.textContent = secs;  
      };

    pad(value) {
        return String(value).padStart(2, '0');
    }

    getValueCalendar() {
        return this.refs.calendar.value;
    }

}

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2019'),
  });

  const startBtn = document.querySelector('[data-action="start"]');
  startBtn.addEventListener('click', timer.start.bind(timer));

  const stopBtn = document.querySelector('[data-action="stop"]');
  stopBtn.addEventListener('click', timer.stop.bind(timer));