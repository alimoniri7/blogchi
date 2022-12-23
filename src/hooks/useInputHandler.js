import {useState} from 'react';

const useInputHandler = () => {
    const [value , setValue] = useState('')

    const inputHandler = (event) => {
        setValue(event.target.value)     
    }
    

    return [value , inputHandler]
};

export default useInputHandler;