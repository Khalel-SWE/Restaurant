import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers() {

    this.authService.getAllAccounts().subscribe({

      next: (response) => {

        console.log("ALL USERS", response);

        this.users = response;

      },

      error: (error) => {

        console.log("ERROR", error);

      }

    });

  }

  deleteUser(id: number) {

    const confirmDelete = confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    this.authService.deleteAccount(id).subscribe({

      next: (response) => {

        console.log(response);

        this.users = this.users.filter(
          user => user.id !== id
        );

        alert("User Deleted Successfully");

      },

      error: (error) => {

        console.log(error);

        alert("Error While Deleting User");

      }

    });

  }

}