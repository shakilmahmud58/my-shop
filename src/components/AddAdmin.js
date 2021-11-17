import axios from "axios";
import { useRef} from "react";
import { Form, Button } from "react-bootstrap";

const AddAdmin=()=>{
    const email = useRef(null);
   const setAdmin=(e)=>{
       e.preventDefault();
       const field = e.target.form.elements;
       axios.post('https://stark-citadel-01929.herokuapp.com/addadmin',{email:email.current.value}).then(res=>{
           console.log(res.data);
           field.email.value="";
       })
   }

    return (
        <div>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                 <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" ref={email}/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={ setAdmin }>
                  Submit
              </Button>

            </Form>
        </div>
    )
}

export default AddAdmin; 