import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  step = 1;
  message= 'Hang tight...'


  user = {
    name:'',
    surname :'',
    email :'',
    password:'',
    account :''
  }


  // registerForm1 = new FormGroup({
  //   email: new FormContro1(),
  //   name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
  //   surname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
  //   password: new FormControl(),
  //   account: new FormControl(),
  //   confirmPassword: new FormControl()
  // })

  

  // constructor(private authService : AuthService, private router: Route) { }

  ngOnInit(): void {
  }

  nextStep(form:FormGroup)
  {
    this.user.name = form.value.name;
    this.user.surname = form.value.surname;
    this.user.email = form.value.email;
    this.step = 2;
      
  }


  // onRegister(form:FormGroup)
  // {
  //   // this.spinner.show()
  //   if(form.valid)
  //   {
  //     if(form.value.confirmPassword == form.value.password)
  //     {
        
  //         this.authService.register(form.value).subscribe((response:any)=>{
  //           //this.toast.success({detail:"Welcome",summary:"Logged in",position:"tr",duration:3000});
            
  //           this.authService.login(form.value).subscribe((data: any)=>{
  //             this.authService.saveToken(data.token);
        
  //             const {email,name,username,surname,account,user_id,image} = this.jwt.getData(data.token);
  //             sessionStorage.setItem('account', account);
  //             sessionStorage.setItem('email',email);
  //             sessionStorage.setItem('username',username);
  //             sessionStorage.setItem('surname',surname);
  //             sessionStorage.setItem('name',name);
  //             sessionStorage.setItem('user_id',user_id);
  //             sessionStorage.setItem('image_link',image);
      
      
  //             setTimeout(() => { 
  //               this.message = 'Logging you in...'
  //             },2000);
          
  //             setTimeout(() => { 
  //               this.message = 'Welcome to DevLav.com'
  //             }, 3000);
          
  //             setTimeout(() => { 
      
  //               if(account == "Client") //route to relevent page
  //               {
                  
  //                 // this.router.navigateByUrl('/client');
  //               // }else if(this.jwt.getData(data.token).account =="Developer") //route to relevent page
  //               {
                  
  //                 // this.router.navigateByUrl('/developer');
  //               }
  //               // this.spinner.hide();
  //             }, 5000); 
  //           })
            
  //         // },(error:HttpErrorResponse)=>{
  //           // this.toast.error({detail:"Sorry!",summary:error.error.message,position:"tr",duration:3000});
  //           // console.log(error)
  //         // })

          




  //      // )
  //     }else{
  //       // this.spinner.hide();
  //     //  this.toast.warning({detail:"Warning",summary:"Passwords do not match",position:"tr",duration:3000});
  //     }
  //   }

  // }
  

}
