export interface signUp{
    id: number;
    name:String,
    email:String,
    password:String,
}

export interface login{
    email:String,
    password:String,
}

export interface product {
  expanded: boolean;
product_discription: any;
product_category: any;
product_colour: any;
product_price: any;
product_name: any;
product_image:any;
    id: number;
    name: String;
    price: number;
    colour:String;
    category:String;
    description: String;
    image:String;
    quantity:null | number;
    productId: undefined | number;

}

export interface cart {
    expanded: boolean;
product_discription: any;
product_category: any;
product_colour: any;
product_price: any;
product_name: any;
product_image:any;
    id?: number;
    name: String;
    price: number;
    colour:String;
    category:String;
    description: String;
    image:String;
    quantity:null | number;
    userId:null | number;
    productId:null | number
}

export interface priceSummary {

    price:number;
    discount:number;
    tax:number;
    delivery:number;
    total:number
    

}

export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number|undefined

}



