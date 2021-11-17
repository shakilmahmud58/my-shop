import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

const Mylists = ()=>{
    const [lists,setLists]= useState([]);
    const {userEmail} = useAuth();   
    const deleteRequest=(id)=>{
        const confirm = window.confirm('Are You really wnat to delete it?')
        if(confirm){
            axios.post('https://stark-citadel-01929.herokuapp.com/deleteorders',{id:id}).then(res=>{
                //console.log(res.data);
                if(res.data.deletedCount>0)
                {
                    const newLists = lists.filter((item)=>{return item._id != id});
                    setLists(newLists);
                }
            });
        }
    }
    const getLists=()=>{
        axios.post('https://stark-citadel-01929.herokuapp.com/myorders',{email:userEmail}).then(res=>{
            console.log(res.data);
            setLists(res.data);
        })
    }
    useEffect(()=>{
       getLists();
    },[])
    return(
        <div style={{minHeight:"400px"}}>
            <div className="container">
                <div className="row">
                   <div className="col">Product Name</div>
                   <div className="col">Status</div>
                   <div className="col"></div>
                </div>
            </div>
            {
               <div className="my-5"> {lists.length?'':"No item available right now" }</div>
            }
            { 
              lists.map((item)=>
              <div key={item._id} className="container">
                  <div className="row">
                  <div className="col">{item.Product.Name} (Id:{item.Product._id})</div>
                  <div className="col">{item.request? 'shipped': 'Pending'}</div>
                  <div className="col">
                      <button className="btn btn-danger mx-2" onClick={ ()=>deleteRequest(item._id) }>Delete</button>
                  </div>
                  </div>
              </div>)

            }
        </div>
    )
}
export default Mylists;