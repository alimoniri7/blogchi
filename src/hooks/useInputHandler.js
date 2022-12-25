import {useState} from 'react';

const useInputHandler = (defaultValue='') => {
    const [value , setValue] = useState(defaultValue)

    const inputHandler = (event) => {
        setValue(event.target.value)     
    }
    

    return [value , inputHandler]
};

export default useInputHandler;