import * as React from 'react';
import coin from '../../assets/icons/coin.svg';
import '../Coin/Coin.css';

interface ICoinProps {
    quantity: string;
    caller: string;
}

export const Coin = (props: ICoinProps) => {

    const validateCaller = () => {
        switch (props.caller) {
            case 'productCard':
                return 'coinDivCard'
            case 'shopHeader':
                return 'coinDivHeader'
            case 'productCardInsuficientCoin':
                return 'productCardInsuficientCoin'
        }
    }

    return (
        <div className={validateCaller()}>
            <span>{props.quantity}</span>
            <div><img alt='' className='coinImgCard' src={coin}></img></div>
        </div>
    )
}