class TrafficLightsBulb extends HTMLElement {
}
customElements.define('traffic-lights-bulb', TrafficLightsBulb);

class TrafficLights extends HTMLElement {
  constructor() {
    super();
    this.timerEnabled = false;
    this.phaseChangeTime = this.getLitBulbDuration();
    this.ticker = setInterval(()=>this.tick(), 1000);
  }

  getLights(){
    return Array.from(this.querySelectorAll('traffic-lights-bulb'));
  }

  getIndexOfLitBulb(){
    const bulbs = this.getLights();
    for(let i = 0; i < bulbs.length; i++){
      if(bulbs[i].getAttribute('on')) return i;
    };
    return false;
  }

  getLitBulb(){
    return this.querySelector('traffic-lights-bulb[on]');
  }

  getLitBulbDuration(){
    const DEFAULT_DURATIONS = {
      red: 3,
      yellow: 1,
      green: 12
    }
    const currentBulb = this.getLitBulb();
    return parseInt(currentBulb.getAttribute('duration')) || DEFAULT_DURATIONS[currentBulb.getAttribute('color')];
  }

  advanceSequence(){
    const bulbs = this.getLights();
    const currentBulbIndex = this.getIndexOfLitBulb();
    const nextBulbIndex = (currentBulbIndex + 1) % bulbs.length;
    bulbs[currentBulbIndex].removeAttribute('on');
    bulbs[nextBulbIndex].setAttribute('on', true);
    this.phaseChangeTime = this.getLitBulbDuration();
    this.updateTimer();
  }

  createControls(){
    const controlsElement = document.createElement('ul');
    controlsElement.classList.add('traffic-lights__controls');

    controlsElement.innerHTML = `
      <li><button class="traffic-lights__controls__advance">Advance to next light</button></li>
      <li><button class="traffic-lights__controls__toggle-timer">Toggle timer</button></li>
    `;

    controlsElement.addEventListener('click', e=>{
      const button = e.target.closest('button');
      if(!button) return;
      if(button.classList.contains('traffic-lights__controls__advance')){
        this.advanceSequence();
      } else if(button.classList.contains('traffic-lights__controls__toggle-timer')){
        this.timerEnabled = !this.timerEnabled;
        this.updateTimer();
      }
    })

    this.after(controlsElement);
  }

  tick(){
    if(!this.timerEnabled) return;
    this.phaseChangeTime--;
    if(this.phaseChangeTime <= 0) this.advanceSequence();
    this.updateTimer();
  }

  createTimer(){
    this.timerElement = document.createElement('div');
    this.timerElement.classList.add('traffic-lights__timer');
    this.after(this.timerElement);
    this.updateTimer();
  }

  updateTimer(){
    this.timerElement.innerHTML = `
      Timer: ${this.phaseChangeTime}
      ${this.timerEnabled ? ' (running)' : ' (paused)'}
    `;
  }

  connectedCallback(){
    if(this.getAttribute('controls')) this.createControls();
    if(this.getAttribute('timer')) this.createTimer();
  }
}
customElements.define('traffic-lights', TrafficLights);
