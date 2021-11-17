import { Form, Button } from "react-bootstrap";


const ReviewSection = ()=>{
    return(
        <div>
            <h3 className="my-5"> Review Section</h3>
            <div className="my-5 mx-5 border rounded-md p-4">
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                 <Form.Label>Place Name</Form.Label>
                  <Form.Control type="text" name="name"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Your Experiences</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description"/>
              </Form.Group>
              <Button variant="primary" type="submit" >
                  Submit
              </Button>

            </Form>
            </div>
        </div>
    )
}

export default ReviewSection;