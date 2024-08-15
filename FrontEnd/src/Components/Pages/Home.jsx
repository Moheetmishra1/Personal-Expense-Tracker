import React, { useCallback, useEffect, useState } from 'react'
import "../../CSS/Home.css"
import AddExpense from '../AddExpense';

import PeriodicExpend from '../PeriodicExpend';
import CustomeCategory from '../Home/CustomeCategory';

function Home() {
  // let [rendering,setRender] = useState(false)

  // let renderingFunction = useCallback(()=>{
  //   console.log("Calling",rendering);
  //   setRender((!rendering))
  // },[rendering])
  // console.log("rendering",rendering);

  return (
   <>
   <div  className='homeCss'>

   {/* <div className='custom-add '> */}
  {/* </div> */}
    
    
  {/* <div className='graphCategory'>   */}
  <div style={{gridRowStart:1,gridRowEnd:3}  }>   <PeriodicExpend />
          </div>
          <div className="addExpGrid">
   <AddExpense  />
   </div>

<div className="customGrid">
     <CustomeCategory  />
     </div>
  {/* </div> */}


    </div>
   </>
  )
}

export default Home