import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: any[] = [];

  selectedUser: any = {
  id: null,
  username: '',
  email: '',
  phoneNumber: '',
  address: '',
  age: 0
};

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

  editUser(user: any) {

  this.selectedUser = {

    id: user.id,

    username: user.username,

    email: user.accountDetails?.email || '',

    phoneNumber: user.accountDetails?.phoneNumber || '',

    address: user.accountDetails?.address || '',

    age: user.accountDetails?.age || 0

  };

  console.log(this.selectedUser);

}

saveUserDetails() {

  const updatedUser = {

    id: this.selectedUser.id,

    username: this.selectedUser.username,

    accountDetails: {

      email: this.selectedUser.email,

      phoneNumber: this.selectedUser.phoneNumber,

      address: this.selectedUser.address,

      age: this.selectedUser.age

    }

  };

  this.authService.updateAccountDetails(updatedUser).subscribe({

    next: (response) => {

      console.log("UPDATED USER", response);

      alert("User Updated Successfully...");

      this.loadUsers();

    },

    error: (error) => {

      console.log(error);

      alert("Error While Updating User");

    }

  });

}

  openEditModal(user: any) {

  this.selectedUser = {

    id: user.id,

    username: user.username,

    email: user.accountDetails?.email || '',

    phoneNumber: user.accountDetails?.phoneNumber || '',

    address: user.accountDetails?.address || '',

    age: user.accountDetails?.age || 0

  };

}

updateUserDetails() {

  const requestBody = {

    id: this.selectedUser.id,

    accountDetails: {

      email: this.selectedUser.email,

      phoneNumber: this.selectedUser.phoneNumber,

      address: this.selectedUser.address,

      age: this.selectedUser.age

    }

  };

  this.authService.updateAccountDetails(requestBody).subscribe({

    next: (response) => {

      console.log(response);

      alert("User Updated Successfully");

      this.loadUsers();

    },

    error: (error) => {

      console.log(error);

      alert("Error While Updating User");

    }

  });

}

}