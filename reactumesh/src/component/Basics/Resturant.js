import React, { useState } from "react";
import "./style.css";
import Menu from './menuApi';
import MenuCard from './menuCard';
import Navbar from './Navbar'

const uniqueList = [...new Set(Menu.map((curElm) => {
    return curElm.category
})), 'All']

const Resturant = () => {
    const [menuData, setmenuData] = useState(Menu)
    const [menuList, setmenuList]= useState(uniqueList)

    const filterItem = (category) => {

        if(category == 'All'){
            setmenuData(Menu)
            return;
        }

        const updatedList = Menu.filter((curElem) => {
            return curElem.category === category;
        })

        setmenuData(updatedList);
    }

    return (
    <>
        <Navbar filterItem={filterItem} menuList={menuList}/>
        <MenuCard menuData={menuData} />
    </>
    );
};

export default Resturant;