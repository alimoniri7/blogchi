import { useState } from "react";

const useValidation = (value , regex='[^]*', message='') =>{
    const [status , setStatus] = useState({
        valid: true,
        message: ''
    })

    let checkValidation = ()=> {
        if(value){
            if (value.match(regex)) {
                setStatus({
                    valid: true,
                    message:''
                })
            }else{
                setStatus({
                    valid: false,
                    message: message? message: ''
                })
            }           
        }else {
            setStatus({
                valid: false,
                message: 'این فیلد الزامی است'
            })
        }
    }

    return [status , checkValidation]
}

export default useValidation;