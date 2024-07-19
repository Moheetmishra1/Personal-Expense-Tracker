import React from 'react'
import "../../CSS/Login.css"

function Login() {
  return (
    <div className='loginBox'>


<div class="container container--mini" style={{backgroundColor:"white",height:"100%",padding:"10%",borderRadius:"10px"}}>
        <img class="img-fluid mx-auto d-block mb-5" src="https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-logo.svg" alt="" />
        <form name="loginform" id="loginform" action="https://themes.getbootstrap.com/wp-login.php" method="post" style={{width:"60%",margin:"-5% auto"}}>

        <div class="form-group">
            <label for="user_login">Email</label>
            <input type="text" name="email" id="user_login" class="form-control"  />
        </div>
        <div class="form-group">
            <label for="user_pass">Password</label>
            {/* <a class="form-sublink" href="https://themes.getbootstrap.com/my-account/lost-password/">Forgot password?</a> */}
            <input type="password" name="password" id="user_pass" class="form-control"  />
        </div>

        <p class="login-remember"><label><input name="rememberme" type="checkbox" id="rememberme" value="forever" /> Remember Me</label></p>
        <div class="form-group">
          <input type="submit" name="wp-submit" id="wp-submit" class="btn btn-brand btn-block mb-4" value="Sign In" />
    </div>

    </form>
    <p class="small text-center text-gray-soft">Don't have an account yet? <a href="https://themes.getbootstrap.com/my-account/">Sign up</a></p>
</div>





    </div>
    
  )
}

export default Login