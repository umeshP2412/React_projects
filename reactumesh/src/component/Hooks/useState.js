import React, { useEffect, useState } from 'react';
import './style.css';


const UseState = () => {
    const initialData = 0
    const [myNum, setmyNum] = useState(initialData)

  return (
    <>
        <div className="center_div">
            <p>{myNum}</p>
            <div className="button2" onClick={() => setmyNum(myNum + 1)}>
                INCR
            </div>
            <div className="button2" onClick={() => myNum > 0 ? setmyNum(myNum - 1):setmyNum(0)}>
                DECR
            </div>
        </div>
    </>
  )
}

export default UseState