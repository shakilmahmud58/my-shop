import axios from "axios";
import { useEffect, useState } from "react";

const Reviews=()=>{

    const [reviews, setReviews]= useState([]);
    useEffect(()=>{
        axios.get('https://stark-citadel-01929.herokuapp.com/getreviews').then(res=>{
            setReviews(res.data);
        })
    },[])
    return(
        <div>
            <h2 className="mx-5">Review Section</h2>
           { reviews.map((review)=>
           <div key={review._id} className="border rounded-md my-3 mx-2">
            <h6>{review.user}</h6>
            <h6>{review.email}</h6>
            <div>{review.Description}</div>
            <h6>--on {review.Name}</h6>
           </div>)}
        </div>
    )
}
export default Reviews; 