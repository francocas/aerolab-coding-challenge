import React from 'react';
import './App.css';
import { ProductCard } from './components/ProductCard/ProductCard';
import Product from './models/Product';
import { ShopHeader } from './components/ShopHeader/ShopHeader';
import { Banner } from './components/Banner/Banner';
import { FilterControls } from './components/FilterControls/FilterControls';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMzNjU1NmFhYjMyMjAwNmZhZWU3ZDciLCJpYXQiOjE1ODA0MjY1ODJ9.tFCUr-a-INlbL1UlnL5i5f6r9LC_9EtAtIUTKfPqU6w';

const App: React.FC = () => {
  const [user, setUser] = React.useState({
    _id: '',
    name: '',
    points: 0,
    __v: 0,
    redeemHistory: [],
    createDate: '2020-01-30T23:23:02.925Z'
  })
  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    fetch('https://private-anon-41dc3689ae-aerolabchallenge.apiary-proxy.com/user/me', {
      headers: {
        type: 'application/json',
        accept: 'application/json',
        authorization: token,
      }
    }).then((response) => {
      response.json().then((data: any) => {
        setUser(data);
      })
    });

    fetch('https://coding-challenge-api.aerolab.co/products', {
      headers: {
        type: 'application/json',
        accept: 'application/json',
        authorization: token,
      }
    }).then((response) => {
      response.json().then((data: any) => {
        setProducts(data);
      })
    });

  }, [])

  const redeemProduct = (productId: any) => {
    let payload = {productId:productId};
    let body:FormData = new FormData();
    body.append('json', JSON.stringify(payload));
    fetch('https://coding-challenge-api.aerolab.co/redeem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        authorization: token
      },
      body: JSON.stringify(payload)
    }).then((response) => {
      response.json().then((data: any) => {
        console.log(data);
        fetch('https://private-anon-41dc3689ae-aerolabchallenge.apiary-proxy.com/user/me', {
          headers: {
            type: 'application/json',
            accept: 'application/json',
            authorization: token,
          }
        }).then((response) => {
          response.json().then((data: any) => {
            setUser(data);
          })
        });
      })
    });
  }

  const sort = (criteria: string) => {
    let orderedArray = []
    switch (criteria) {
      case 'mostRecent':

        break;
      case 'highestPrice':
        orderedArray = products.sort((product1, product2) => product2.cost - product1.cost).map((value) => value)
        setProducts(orderedArray)
        break;
      case 'lowestPrice':
        orderedArray = products.sort((product1, product2) => product1.cost - product2.cost).map((value) => value)
        setProducts(orderedArray)
        break;
    }
  }
  const renderCards = () => {
    const cards = products.map((product, index) => {
      return <><ProductCard redeemNow={redeemProduct} userCoins={user.points} product={product} key={index}></ProductCard></>
    })
    return cards;
  }

  return (
    <>
      <ShopHeader coins={user.points} name={user.name}></ShopHeader>
      <Banner></Banner>
      <FilterControls orderOnClick={sort} productCuantity={products.length.toString()}></FilterControls>
      <div className='cardsContainer'>{renderCards()}</div>
    </>
  );

}

export default App;
