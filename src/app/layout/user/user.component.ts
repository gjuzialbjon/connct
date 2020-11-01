import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap/';
import { SettingsComponent } from 'src/app/modules/profile/settings/settings.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  modalOptions: NgbModalOptions = {
    windowClass: 'dark-modal',
    centered: true
  }

  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
  }

  openEditModal(editModalContent){
    const modalRef = this.modalService.open(SettingsComponent, this.modalOptions);
    modalRef.componentInstance.name = 'World';
  }
}
