import React, { useEffect, useState } from 'react';
import './style.css';

const getLocalData = () => {
    const list = localStorage.getItem("myToDoList")
    if(list){
        return JSON.parse(list);
    }
    else{
        return []
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("")
    const [item, setItem] = useState(getLocalData())
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add Items function
    const addItems = () => {
        if(!inputData){
            alert('Please fill Item box!')
        }
        else if(inputData && toggleButton){
        setItem(item.map((curElem) => {
                if(curElem.id === isEditItem){
                    return { ...curElem, name: inputData }
                }
                return curElem
            }));

            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItem([...item, myNewInputData])
            setInputData("");
        }
    }

    //edit item
    const editItem = (index) => {
        const item_todo_edited = item.find((curElem) => {
            return curElem.id === index;
        })
        setInputData(item_todo_edited.name);
        setToggleButton(true);
        setIsEditItem(index);
    }

    // delete item 
    const deleteItem = (elemID) => {
        const updatedItem = item.filter((curElem) => {
            return curElem.id !== elemID
        })
        setItem([...updatedItem])
    }

    //remove All items 
    const removeAll = () => {
        setItem([])
    }

    //adding useEffect
    useEffect(() => {
        localStorage.setItem("myToDoList", JSON.stringify(item))
    }, [item])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todo logo" />
                        <figcaption>Add Your List Here </figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='??? Add Item' className='form-control' value={inputData} onChange={(event) => setInputData(event.target.value)} />
                        {toggleButton ?  (
                            <i className="far fa-edit add-btn" onClick={addItems}></i> )
                             : ( 
                             <i className="fa fa-plus add-btn" onClick={addItems}></i>
                            )
                            }
                    </div>

                    {/* show Item list */}
                    <div className="showItems">
                            {
                                item.map((curElem, index) => {
                                    return (
                                        <div className="eachItem" key={curElem.id}>
                                            <h3>{curElem.name}</h3>
                                            <div className="todo-btn">
                                                <i className="far fa-edit add-btn" onClick={() => {editItem(curElem.id)}}></i>
                                                <i className="far fa-trash-alt add-btn" onClick={() => {deleteItem(curElem.id)}}></i>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                       
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}> <span>Check List</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo