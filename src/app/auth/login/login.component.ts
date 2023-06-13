import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  username : string = '';
  password : string = '';
  role : string = '';
  user : User = new User();
  roles : string[];

  constructor(private authService : AuthService, private route : Router){
    this.roles=[
      'admin',
      'user'
    ]
  }
  ngOnInit(): void {
    this.username = '';
    this.password = '';
    
  }
  login(){
    this.user.Username = this.username;
    this.user.Password = this.password;
    this.user.role = this.role;
    this.authService.login(this.user).subscribe(res => {
      if(res == null){
        alert("Username or password is wrong");
        this.ngOnInit();
      } else {
        console.log("login successful");
        localStorage.setItem("token", res.token);

        if(this.role == "user"){
          this.route.navigate(['/user']);
        }
      }
    }, err => {
      alert("login failed");
      this.ngOnInit();
    })
  }}