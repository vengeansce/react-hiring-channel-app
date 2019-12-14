import React from 'react';

function Button(props){
    return(
    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" type="button">{props.text}</button>
    )
}

export default Button;