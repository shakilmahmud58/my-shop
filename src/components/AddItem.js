import axios from 'axios';
import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
const AddItem = () =>{
    const place = useRef(null);
    const imageUrl = useRef(null);
    const price = useRef(null);
    const description = useRef(null);
    const addItem=(e)=>{
        e.preventDefault();
        const field = e.target.form.elements;
        axios.post('https://stark-citadel-01929.herokuapp.com/addproducts',{Name:place.current.value, Image:imageUrl.current.value,price:price.current.value, Description:description.current.value}).then((res)=>{
            console.log(res.data);
            field.name.value='';
            field.image.value='';
            field.price.value='';
            field.description.value='';

        })
    }
    return(
        <div className="mx-5 my-5">
           <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                 <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" ref={place} name="name"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                 <Form.Label>Image URL</Form.Label>
                  <Form.Control type="text" ref={imageUrl} name="image"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" ref={ price } name="price"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" ref={description} name="description"/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={addItem}>
                  Submit
              </Button>

            </Form>
        </div>
    )
}
export default AddItem;