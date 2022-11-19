import React, {useEffect, useReducer } from 'react';
import './style.css';

const reducer = (state, action) => {
    if(action.type === "INCR"){
        state = state + 1
    }
    if(state > 0 && action.type === "DECR"){
        state = state - 1
    }
    return state

}

const UseReducer = () => {
    const initialData = 0
    // const [myNum, setmyNum] = useState(initialData)
    const [state, dispatch] = useReducer(reducer, initialData)

    useEffect(() => {
        document.title = `Chats(${state})`
    })

  return (
    <>
        <div className="center_div">
            <p>{state}</p>
            <div className="button2" onMouseOver={() => dispatch({type: "INCR"})}>
                INCR
            </div>
            <div className="button2" onMouseOver={() => dispatch({type: "DECR"})}>
                DECR
            </div>
        </div>
    </>
  )
}

export default UseReducer