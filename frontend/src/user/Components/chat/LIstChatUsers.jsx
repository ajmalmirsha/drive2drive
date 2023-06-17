import { useEffect } from "react"



export default function ListChatUsers ({setSender,ownerId}) {
    useEffect(()=>{
        ownerId && setSender(ownerId)
    },[])
    return (
        <div className="col-md-3">
          { ownerId &&  <div onClick={() => setSender(ownerId)} className="bg-primary my-2 h-30px text-center text-white" >
                owner
            </div>}
            
        </div>
    )
}