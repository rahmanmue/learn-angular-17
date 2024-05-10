import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../interface/housinglocation';
import { HousingService } from '../housing.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title : string = "Home"
  housingLocationList : HousingLocation [] = []
  filteredLocationList : HousingLocation [] = [];

  constructor(private housingService : HousingService){
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[])=>{
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = this.housingLocationList;
    });
    
  }

  filterResults(text : string){
    if(!text){
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter((housingLocation)=>{
      return housingLocation?.city.toLowerCase().includes(text.toLowerCase());
    })
  }
}
