import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  isDirty: boolean = false;
  event : any = { };

  constructor(private router: Router, private eventService : EventService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  saveEvent(formValues : any) : void {
    this.eventService.saveEvent(formValues).subscribe(
      () => this.succesfulSave()
    );
  }

  private succesfulSave() {
    this.isDirty = false;
    this.router.navigate(['/events']);
  }


}
