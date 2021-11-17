import axios from "axios";
import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";


const AddReview = ()=>{
    const {user, userEmail} = useAuth();
    const product = useRef(null);
    const description = useRef(null);
    const addReview=(e)=>{
        e.preventDefault();
        const field = e.target.form.elements;
        axios.post('https://stark-citadel-01929.herokuapp.com/addreview',{user: user, email:userEmail, Name:product.current.value, Description:description.current.value}).then((res)=>{
            console.log(res.data);
            field.name.value='';
            field.description.value='';

        })
    }
    return(
        <div>
            <h3 className="my-5"> Review Section</h3>
            <div className="my-5 mx-5 border rounded-md p-4">
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                 <Form.Label>Products Name</Form.Label>
                  <Form.Control type="text" name="name" ref={product}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Your Experiences</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" ref={description}/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={addReview}>
                  Submit
              </Button>

            </Form>
            </div>
        </div>
    )
}

export default AddReview;