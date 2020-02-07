import React from 'react';
import './App.css';
import { ProductCard } from './components/ProductCard/ProductCard';
import Product from './models/Product';
import { ShopHeader } from './components/ShopHeader/ShopHeader';
import { Banner } from './components/Banner/Banner';
import { FilterControls } from './components/FilterControls/FilterControls';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props:any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMzNjU1NmFhYjMyMjAwNmZhZWU3ZDciLCJpYXQiOjE1ODA0MjY1ODJ9.tFCUr-a-INlbL1UlnL5i5f6r9LC_9EtAtIUTKfPqU6w';

const App: React.FC = () => {
  const [user, setUser] = React.useState({
    _id: '',
    name: '',
    points: 0,
    __v: 0,
    redeemHistory: [],
    createDate: '2020-01-30T23:23:02.925Z'
  });
  const [open, setOpen] = React.useState(false);

  const getUser = () => {
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
  }

  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {

    getUser();

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
    let payload = { productId: productId };
    let body: FormData = new FormData();
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
        if(response.ok){
          setOpen(true);
        }
        getUser()
      });
    });
  }


  const handleClose = (event:any, reason:any) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Product Redeemed successfully
          </Alert>
        </Snackbar>
      </div>
    </>
  );

}

export default App;
