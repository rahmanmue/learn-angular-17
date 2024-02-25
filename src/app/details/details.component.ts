import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../interface/housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route : ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation : HousingLocation | undefined;
  // housingLocationId = 0;

  applyForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    email: new FormControl(''),
  })


  constructor(){
    // this.housingLocationId = Number(this.route.snapshot.params['id']);
    const housingLocationId = Number(this.route.snapshot.params['id']);

    // with dummy data
    // this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);

    // with json-server db.json
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation)=>{
      this.housingLocation = housingLocation;
    });

    
  }

  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }


}
