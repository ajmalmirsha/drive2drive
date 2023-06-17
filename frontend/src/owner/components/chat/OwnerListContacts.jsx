


export default function OwnerListContacts ({setSender}) {
    return (
        <div className="col-md-3">
          
            <div onClick={() => setSender('6486f9fd377f02ff89449a57')} className="bg-primary my-2   h-30px text-center text-white" >
                dilp
            </div>
            <div onClick={() => setSender('6482c8629f8fe8fc9c695cfb')} className="bg-primary my-2   h-30px text-center text-white" >
                siva
            </div>
            <div onClick={() => setSender('6486f9fd37vgh7f02ff89449a57')} className="bg-primary my-2   h-30px text-center text-white" >
                ameen
            </div>
            <div className="bg-primary py-2  h-30px text-center text-white" >
                ajmal
            </div>
        </div>
    )
}