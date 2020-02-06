import * as React from 'react';
import Product from '../../models/Product';
import buyBlue from '../../assets/icons/buy-blue.svg';
import './ProductCard.css'
import { Coin } from '../Coin/Coin';

interface IProductCardProps {
    product: Product;
    userCoins: number;
    redeemNow:(productId:string) => void;
}

export const ProductCard = (props: IProductCardProps) => {
    const [showRedeem, setShowRedeem] = React.useState<boolean>(true)

    const toggleShowRedeem = () => {
        if (props.userCoins > props.product.cost) {
            setShowRedeem(!showRedeem)
        }
    }

    return (
        <><div className='container' onMouseEnter={(toggleShowRedeem)} onMouseLeave={(toggleShowRedeem)} >
            <div className='imagesDiv'>
                {(props.userCoins > props.product.cost) ? <img alt='' src={buyBlue} className='buyButton'></img> :
                    <Coin quantity={'You need ' + (props.product.cost - props.userCoins).toString()} caller='productCardInsuficientCoin'></Coin>
                }
                <img alt='' src={props.product.img.url} className='imageStyle'></img>
            </div>
            <span className='category'>{props.product.category} </span>
            <span className='productName'>{props.product.name}</span>

            {!showRedeem ? <div hidden={showRedeem} className={'dimmed'} >
                <Coin quantity={props.product.cost.toString()} caller='productCard'></Coin>
                <button onClick={()=>props.redeemNow(props.product._id)} className='redeemButton' hidden={showRedeem}>Redeem Now</button>
            </div> : <></>}


        </div>
        </>
    );
}