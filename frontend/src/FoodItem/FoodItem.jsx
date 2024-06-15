import React, { useContext, useState } from 'react'
import "./FoodItem.css"
import { assets } from '../assets/frontend_assets/assets'
import { StoreContext } from '../context/StoreContext';

function FoodItem({id,name,price,desc,image}) {

    const {cartItems,addToCart,removeToCart,url}=useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img src={url+"/images/"+image} className="food-item-image"alt="" />
            {
                !cartItems[id]?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>:
                <div className='food-item-counter'>
                    <img className='' onClick={()=>removeToCart(id)} src={assets.remove_icon_red} alt=""/>
                    <p>{cartItems[id]}</p>
                    <img className='' onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">
                {desc}
            </p>
            <p className="food-item-price">
                ${price}
            </p>
        </div>
    </div>
  )
}

export default FoodItem