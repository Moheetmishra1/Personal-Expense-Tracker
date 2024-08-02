import React, { useCallback, useEffect, useState } from 'react'
import "../../CSS/Home.css"
import AddExpense from '../AddExpense';

import PeriodicExpend from '../PeriodicExpend';
import CustomeCategory from '../Home/CustomeCategory';

function Home() {
  let [rendering,setRender] = useState(false)

  let renderingFunction = useCallback(()=>{
    console.log("Calling",rendering);
    setRender((!rendering))
  },[rendering])
  console.log("rendering",rendering);

  return (
   <>
   <div  className='homeCss'>

   <div className='custom-add '>
   <AddExpense  />
  </div>
    
    
  <div className='graphCategory'>  
          <PeriodicExpend />
     <CustomeCategory  />
  </div>


    </div>
   </>
  )
}

export default Home