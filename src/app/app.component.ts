import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
const citiesData = require("../data/4Cities.json");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  title = '4Cities';
  clock = new Date();
  intervalId: any;
  cities: any = [];
  selectedItems: any = [];
  citiesSelected: any = [];
  dropdownSettings = {
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };

  ngOnInit() {
    this.cities = citiesData;
    this.selectedItems = this.cities.slice();;
    this.citiesSelected = this.cities.slice();;
    this.updateTime();

    //interval
    this.intervalId = setInterval(() => {
      this.clock = new Date();
      this.updateTime();
      this.updateAnalogClock();
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.updateAnalogClock();
  }

  updateTime() {
    for (let i = 0; i < this.cities.length; i++) {
      let city = this.cities[i];
      this.cities[i]["time"] = this.setHour(city);
    }
  }

  setHour(city: any) {
    let time;
    let hours = new Date().getHours();
    if (city.sign == "+") {
      time = hours + city.timeZone;
    }
    if (city.sign == "-") {
      time = hours - city.timeZone;
    }

    if (time > 12)
      time = time - 12;
    if (time < 0)
      time = 12 + time;
    let hour = this.clock.setHours(time)

    return hour;
  }

  updateAnalogClock() {
    for (let i = 0; i < this.cities.length; i++) {
      let date = new Date(this.cities[i]["time"]);

      let hours = ((date.getHours() + 11) % 12 + 1);
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      let hour = hours * 30;
      let minute = minutes * 6;
      let second = seconds * 6;

      (document.getElementById('hour' + i) as HTMLElement).style.transform = `rotate(${hour}deg)`;
      (document.getElementById('minute' + i) as HTMLElement).style.transform = `rotate(${minute}deg)`;
      (document.getElementById('second' + i) as HTMLElement).style.transform = `rotate(${second}deg)`;
    }
  }

  onItemSelect(item: any) {
    debugger
    for(let i=0;i<this.cities.length;i++){
      if(item.id == this.cities[i].id){
        this.citiesSelected.push(this.cities[i])
        break;
      }
    }
  }

  onDeSelect(item:any){
    for(let i=0;i<this.citiesSelected.length;i++){
      if(item.id == this.citiesSelected[i].id){
        this.citiesSelected.splice(i,1);
        break;
      }
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
