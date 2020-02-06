import Image from './Image'

export default interface Product {
    _id: string;
    name:string;
    cost: number;
    category: string;
    img: Image;
}