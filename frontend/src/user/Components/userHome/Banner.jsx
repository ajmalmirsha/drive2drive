

import { useEffect, useState } from 'react'
import {userApi} from '../../../utils/Apis'
import { Galleria } from 'primereact/galleria';
import { useErrorHandler } from '../../ErrorHandlers/ErrorHandler'
import './banner.css'
import { Skeleton } from 'primereact/skeleton'
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../common/spinners/Spinner';
function Banner ({vehicles}) {
    const [ loading, setLoading ]  = useState(false)
    const { userAuthenticationHandler } = useErrorHandler()
  useEffect(()=>{
    console.log('vehicles',vehicles);
    setLoading(true)
    userApi.get('/get/all/banners').then(({data:{data}}) => {
      setLoading(false)
      
    }).catch( err => {
       userAuthenticationHandler(err)
    })
  },[])

  const navigate = useNavigate()
  
  const responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  const productTemplate = (product) => {
      return (
          <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
              <div className="mb-3" onClick={() => { navigate(`/veiw-detail/${product._id}`) }} >
                  <img src={`${process.env.REACT_APP_URL}/public/images/${product.image[0]}`} alt={product.product_name} className="w-6 shadow-2" />
              </div>
              <div>
                  <h4 className="mb-1">{product.product_name}</h4>
                  <h6 className="mt-0 mb-3">₹{product.price}</h6>
                  <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                      <Button icon="pi pi-star-fill" className="p-button-success" onClick={() =>{ navigate(`/checkout/${product._id}`) }} >Book now</Button>
                  </div>
              </div>
          </div>
      );
  };
  
  return (
    <div className="card">
      {loading ? <Spinner/> :
        <Carousel value={vehicles} numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
      }
    </div>
)
}

export default Banner