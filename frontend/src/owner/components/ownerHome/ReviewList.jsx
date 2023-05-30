import { useEffect, useState } from "react"
import axios from 'axios'
import { useSelector } from "react-redux"



export default function ReviewList () {
    const {id} = useSelector(state => state.owner)
    const [reviews , setReviws] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/owner/get-reviews/${id}`).then(({data:{data}})=>{
            console.log(data,666);
            let datas = []
            data.map(element => {
                console.log(element.reviews,8);
                datas.push(...element.reviews)
            });
            setReviws(datas)
        })
    },[])
    reviews && console.log(reviews,777);
    return (
       <div className="">
        reviews
        {
            reviews.map((x)=>{
                return(
                    <p>{x.review}</p>
                )
            })
        }
       </div>
    )
}