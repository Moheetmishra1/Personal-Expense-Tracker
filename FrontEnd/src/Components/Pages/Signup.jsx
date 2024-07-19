import React from 'react'
import "../../CSS/Signup.css"
import InputComponent from '../InputComponent'
import ButtonComponent from '../ButtonComponent'
import { NavLink } from 'react-router-dom'
// import InputComponent from '../../assets/Images/wallet.jpg'

function Signup() {


    let sendDetails = ()=>{}

// console.log("enter");

  return (
    <div className='signupBox'>

      <div className='signupd'>
        </div>
        <div className="signupContent">
            <div>

            </div>
        </div>
        <div className="signupDesign">
            <div className='signupOuterForm'>
                <h1 className='kalnia-glaze-signHeading '>Create Account</h1>
                    <form action="" onSubmit={sendDetails} className='signupForm'>

                        <div className='signName'>
                            <div>
                                <label htmlFor="fname" className='oninput'>First</label>
                                <InputComponent  type="text"  className='signInputBox' Name='fname' id='fname' placeholder='Enter first name' />
                            </div>
                            <div>
                                <label htmlFor="lname" className='oninput'>Last</label>
                                <InputComponent type="text"  className='signInputBox'  Name='lname' placeholder='Enter last name' />
                            </div>
                        </div>

                        <div className='signName'>
                                <div>
                                <label htmlFor="email" className='oninput'>Email</label>
                                <InputComponent type="email" placeholder="enter email" className='signInputBox' id='email' Name='email' />
                                {/* <input type="email"  className='signInputBox' id='email' name='email'/> */}
                                </div>

                                <div>
                                <label htmlFor="mobile" className='oninput'>Mobile</label>
                                <InputComponent  type="tel" placeholder="enter mobile" className='signInputBox' Name='mobile' id='mobile'/>
                                {/* <input type="tel"  className='signInputBox' name='mobile' i d='mobile'/> */}
                        </div>
                        </div>

                        <div className='signName'>
                                <div>
                                <label htmlFor="password" className='oninput'>Password</label>
                                <InputComponent   type="password"  className='signInputBox' name='passowrd' placeholder="password"  />
                                {/* <input type="password"  className='signInputBox' name='passowrd' /> */}
                                </div>

                                <div>
                                    
                                <label htmlFor="cpassword" className='oninput'>Confirm Password</label>
                                <InputComponent type="password" className='signInputBox' id='cpassword'placeholder="Enter Confirmpassword" />
                                {/* <input type="password" className='signInputBox' id='cpassword' /> */}
                                </div>
                        </div>

                        <div>

                        <label htmlFor="date" className='oninput'>D.o.b</label>
                        <InputComponent  type="date" className='signInputBox'  name='dob' id='date' placeholder=""/>
                        {/* <input type="date" className='signInputBox'  name='dob' id='date'  /> */}
                        </div>
                          <div className='gender'>
                                <label htmlFor="gender">Gender</label>

                          <div className="d-flex gap-2 justify-content-center py-1">
                                <span className="badge d-flex p-1 align-items-center text-bg-primary rounded-pill">
                                    <label htmlFor="male" style={{paddingRight:"5px"}}>Male</label>
                                    <input type="radio" name="gender" id='male' value="male" />
                                </span>
                                <span className="badge d-flex p-2 align-items-center text-primary-emphasis bg-primary-subtle rounded-pill">
                                    <label htmlFor="female" style={{paddingRight:"5px"}}>Female</label>
                                    <input type="radio" name="gender" id='female' value="female" />
                                </span>
                                <span className="badge d-flex p-2 align-items-center text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
                                    <label htmlFor="other" style={{paddingRight:"5px"}}>Other</label>
                                    <input type="radio" name="gender"  id="other" value="other" />
                                </span>
                                </div>
                        </div  >
                            <div style={{display:"flex",justifyContent:"center" ,gap:"10%"}}>
                                <ButtonComponent className="submit" type="submit" /> <ButtonComponent class="reset" type="reset" />
                        </div>
                    </form>

        <p class="text-gr╕ay-soft text-center small mb-2">By clicking "Sign up" you agree to our <NavLink to="https://themes.getbootstrap.com/terms">Terms of Service</NavLink>.</p>
        <p class="text-gray-soft text-center small mb-2">Already have an account? <NavLink to="/login">Sign in</NavLink></p>      

            </div>
        </div>


    </div>
  )
}

export default Signup