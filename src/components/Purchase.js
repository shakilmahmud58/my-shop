import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import { Form, Button } from "react-bootstrap";


const PlaceDetails=()=>{
    const {id} = useParams();
    const {user,userEmail} = useAuth();
    const [product,setProduct] = useState([]);
    const name = useRef(user);
    const email = useRef(userEmail);
    const phone = useRef(null);
    const address = useRef(null);
    const purchase=(e)=>{
        e.preventDefault();
        axios.post('https://stark-citadel-01929.herokuapp.com/purchase',{user: user, email:userEmail, phone:phone.current.value, address:address.current.value, Product : product[0], request : 0}).then((res)=>{
            console.log('data added');
        })
    }
    const deleteItem=(id)=>{
        const confirm = window.confirm('Are You really wnat to delete it?')
        if(confirm){
            axios.post('https://gentle-plains-91142.herokuapp.com/deleteplace',{id:id}).then(res=>{
                //console.log(res.data);
                if(res.data.deletedCount>0)
                {
                    <Redirect to="/home" />
                }
            });
        }
    }
    useEffect(()=>{
        axios.get(`https://stark-citadel-01929.herokuapp.com/product/${id}`).then(res=>{
            console.log(res.data);
            setProduct(res.data);
        })
    },[])
    
    return (
         <div>
             {
                 product.map(item=>
                 <div key={item._id}>
                     <div className="my-4">{item.Name}</div>
                     <img src={item.Image} alt={item._id} width="80%" height="400px"/>
                     <div className="my-4">{item.Description}</div>
                 </div>)

             }
             <Form>
              <Form.Group className="mb-3" controlId="Input1" id="name">
                 <Form.Label>Name</Form.Label>
                  <Form.Control type="text" ref={name} name="name" defaultValue={user}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                 <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={email} name="email" defaultValue={userEmail}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                 <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="number" ref={phone} name="phone"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Adress : </Form.Label>
                  <Form.Control as="textarea" rows={3} ref={address} name="description"/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={purchase}> 
                  Purchase
              </Button>

            </Form>
         </div>
    )
}

export default PlaceDetails;