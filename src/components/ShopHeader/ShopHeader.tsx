import * as React from 'react';
import aeroLabIcon from '../../assets/aerolab-logo.svg'
import { Coin } from '../Coin/Coin';
import '../ShopHeader/ShopHeader.css'

interface IShopHeacerProps {
    name: string;
    coins: number;
}

export const ShopHeader = (props: IShopHeacerProps) => {
    return (
        <div className='mainDiv'>
            <img alt='' className='aeroIcon' src={aeroLabIcon}></img>
            <span className='name'>{props.name} </span>
            <Coin quantity={props.coins.toString()} caller={'shopHeader'}></Coin>
        </div>
    )
}