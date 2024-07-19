import React from 'react'

function InputComponent({type,placeholder,Name,value,className,id}) {
    
  return (
    <>

    
    
    <input type={type} placeholder={placeholder} name={Name} value={value} className={className} id={id} />

    </>
  )
}

export default InputComponent