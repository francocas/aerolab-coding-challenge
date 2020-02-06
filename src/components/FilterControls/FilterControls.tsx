import * as React from 'react';
import './FilterControls.css';

interface IFilterControlsProps{
    productCuantity:string;
    orderOnClick:(criteria:string) => void;
}

export const FilterControls = (props:IFilterControlsProps) =>{
    const [selected, setSelected] = React.useState<string>('')

    const isSelected = (button:string) =>{
        if(selected === button){
            return 'selectedButton';
        } else {
            return 'button'
        }
    }

    return (<div className='mainDivFilters'>
        <span className='countOfItems'>{props.productCuantity} Products</span>
        <div className='vr'></div>
        <span className='sortBy'>Sort By: </span>
        <button className={isSelected('mostRecent')} onClick={()=>{setSelected('mostRecent')}}>Most Recent</button>
        <button className={isSelected('lowestPrice')} onClick={()=>{setSelected('lowestPrice'); props.orderOnClick('lowestPrice')}}>Lowest Price</button>
        <button className={isSelected('highestPrice')} onClick={()=>{setSelected('highestPrice'); props.orderOnClick('highestPrice')}}>Highest Price</button>
        
    </div>)
}