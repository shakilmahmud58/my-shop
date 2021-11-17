import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AllLists = ()=>{
    const [products,setProducts]= useState([]);
    const {admin} = useAuth();
    
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
    const getLists=()=>{
        axios.get('https://stark-citadel-01929.herokuapp.com/getproducts').then(res=>{
            console.log(res.data);
            setProducts(res.data);
        })
    }
    useEffect(()=>{
       getLists();
    },[])
    return(
        <div style={{minHeight:"400px"}}>
             <h2> All Products</h2>

              {products.map(product=>
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
    )
}
export default AllLists;