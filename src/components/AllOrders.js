import axios from "axios";
import { useState, useEffect } from "react";

const AllOrders=()=>{
    const [lists,setLists] = useState([]);

    const getorders=()=>{
        axios.get('https://stark-citadel-01929.herokuapp.com/getorders').then(res=>{
            console.log(res.data);
            setLists(res.data);
        })
    }
    const acceptRequest=(id)=>{
    
        axios.post('https://stark-citadel-01929.herokuapp.com/acceptrequest',{id:id}).then(res=>{
            //console.log(res.data);
            if(res.data.modifiedCount>0)
            {
                getorders();
            }
        });
    }
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
    useEffect(()=>{
       getorders();
    },[])

    return(
       <div className="m-4">
           <div className="container">
              <div className="row">
                 <div className="col">
                      User
                 </div>
                 <div className="col">
                   Email
                 </div>
                 <div className="col">
                   Phone
                 </div>
                 <div className="col">
                  Product Name
                 </div>
                 <div className="col">
                   Status
                 </div>
                 <div className="col">
      
                 </div>
              </div>
           </div>
            {
               <div className="my-5"> {lists.length?'':"No item available right now" }</div>
            }


            { 
              lists.map((item)=>
              <div key={item._id} className="container">
                  <div className="row">
                  <div className="col">{item.user}</div>
                  <div className="col">{item.email}</div>
                  <div className="col">{item.phone}</div>
                  <div className="col">{item.Product.Name}</div>
                  <div className="col">{item.request? 'shipped': 'Pending'}</div>
                  <div className="col">
                      {item.request? '' :<button className="btn btn-success" onClick={ ()=>acceptRequest(item._id) }>Accept</button> }
                      <button className="btn btn-danger mx-2" onClick={ ()=>deleteRequest(item._id) }>Delete</button>
                  </div>
                  </div>
              </div>)

            }
       </div>
    )
}
export default AllOrders;