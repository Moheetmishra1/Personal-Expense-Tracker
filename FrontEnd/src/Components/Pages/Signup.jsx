import React from 'react'
import "../../CSS/Signup.css"

function Signup() {


    let sendDetails = ()=>{

}
  return (
    <div className='signupBox'>
        <div className="signupContent"></div>
        <div className="signupDesign">
            <div className='signupOuterForm'>
                <h1 className='kalnia-glaze-signHeading '>Create Account</h1>
                    <form action="" onSubmit={sendDetails} className='signupForm'>

                        <div className='signName'>
                            <div>
                                <label htmlFor="fname" className='oninput'>First</label>
                                <input type="text"  className='signInputBox' name='fname' id='fname' placeholder='Enter first name' />
                            </div>
                            <div>
                                <label htmlFor="lname" className='oninput'>Last</label>
                                <input type="text"  className='signInputBox'  name='lname' placeholder='Enter last name'/>
                            </div>
                        </div>

                        <div className='signName'>
                                <div>
                                <label htmlFor="email" className='oninput'>Email</label>
                                <input type="email"  className='signInputBox' id='email' name='email'/>
                                </div>

                                <div>
                                <label htmlFor="mobile" className='oninput'>Mobile</label>
                                <input type="tel"  className='signInputBox' name='mobile' id='mobile'/>
                        </div>
                        </div>

                        <div className='signName'>
                                <div>
                                <label htmlFor="password" className='oninput'>Password</label>
                                <input type="password"  className='signInputBox' name='passowrd' />
                                </div>

                                <div>
                                    
                                <label htmlFor="cpassword" className='oninput'>Confirm Password</label>
                                <input type="password" className='signInputBox' id='cpassword' />
                                </div>
                        </div>

                        <div>

                        <label htmlFor="date" className='oninput'>D.o.b</label>
                        <input type="date" className='signInputBox'  name='dob' id='date'  />
                        </div>
                          <div className='gender'>
                                <label htmlFor="gender">Gender</label>

                          <div class="d-flex gap-3 justify-content-center py-1">
                                <span class="badge d-flex p-2 align-items-center text-bg-primary rounded-pill">
                                    <label htmlFor="male">Male</label>
                                    <input type="radio" name="gender" id='male' value="male" />
                                </span>
                                <span class="badge d-flex p-2 align-items-center text-primary-emphasis bg-primary-subtle rounded-pill">
                                    <label htmlFor="female">Female</label>
                                    <input type="radio" name="gender" id='female' value="female" />
                                </span>
                                <span class="badge d-flex p-2 align-items-center text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
                                    <label htmlFor="other">Other</label>
                                    <input type="radio" name="gender"  id="other" value="other" />
                                </span>
                                </div>

                        </div>
                    </form>

                

            </div>
        </div>

    </div>
  )
}

export default Signup