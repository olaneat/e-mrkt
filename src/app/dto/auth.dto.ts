export class SignUpDTO{
    email!:string;
    password!:string;
    confirmPassword!:string;
    username!:string;

}


export class LoginDTO{
    email!:string;
    password!:string
}


export class ProfileDTO{
    phoneNUmber!:string;
    first_name!:string;
    state!:string;
    lga!:string;
    address!:string;
    lastName!:string;
    img!:string;

}

export class ChangePasswordDTO{
    id!:string;
    old_password!:string;
    new_password!:string;
    confirm_password!:string;
}


