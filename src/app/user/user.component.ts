
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UserComponent {
 
  constructor(private userService: UserService, private messageService: MessageService) { }

  user: User = new User();
   flag:boolean=false;
orderId:Number=0;
  submitted: boolean = false;
  @Input()
  userDialog: boolean = true;

  @Output()
  userDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();



  hideDialog() {
    this.userDialog = false;
    this.userDialogChange.emit(this.userDialog);
    this.submitted = false;
  }



  addUser(){
    this.submitted = true;
    this.flag=true;
    this.user.tickets=JSON.parse(sessionStorage.getItem("cart")??"v")
    this.userService.addUser(this.user).subscribe(a => {
    this.orderId=a;
      this.userService.setReloadUser();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
    });

    this.hideDialog()
  }




}
