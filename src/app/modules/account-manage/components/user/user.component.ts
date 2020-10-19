import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAccount } from '@utilities/interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  @Input() user:IAccount;
  @Input() isEdit=false;
  @Output() emit:EventEmitter<any>=new EventEmitter();

  ngOnInit(): void {
  }

  public reply(){
    this.emit.emit(this.user);
  }
}
