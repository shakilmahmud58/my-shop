import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Products =()=>{
    const {admin} = useAuth();
    const [products, setProducts] = useState([]);
    const deleteItem=(id)=>{
        const confirm = window.confirm('Are You really wnat to delete it?')
        if(confirm){
            axios.post('https://stark-citadel-01929.herokuapp.com/deleteproduct',{id:id}).then(res=>{
                //console.log(res.data);
                if(res.data.deletedCount>0)
                {
                    const newLists = products.filter((item)=>{return item._id != id});
                    setProducts(newLists);
                }
            });
        }
    }
    useEffect(()=>{
        axios.get('https://stark-citadel-01929.herokuapp.com/getproducts')
            // .then(res=>res.json())
            .then((data)=>{
                setProducts(data.data);
            })
    },[])
    return (
       <div>
           <h3 className="text-center m-3">Currently Available Products</h3>
           <div className="d-flex flex-wrap justify-content-center">
              {products.slice(0,6).map(product=>
                  <div key={product._id} className="border rounded shadow-lg p-2 m-4">
                      { <img src={product.Image} alt={product._id} width="350px" height="250px"/> }
                      <div className="my-2">Name : {product.Name}</div>
                      <div className="my-2">Price : {product.price}</div>
                      <div className="my-2">{ product.Description}</div>
                      {admin? 
                      <button className="btn btn-danger mx-2" onClick={ ()=>deleteItem(product._id) }>Delete</button>
                      :
                      <Link to={`/product/${product._id}`}><button className="btn btn-warning">Purchase</button></Link>
                      }
                  </div>
              )}
           </div>
       </div>
   )
}
export default Products;