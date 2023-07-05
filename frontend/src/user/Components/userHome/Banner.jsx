

import { useEffect, useState } from 'react'
import {userApi} from '../../../utils/Apis'
import { Galleria } from 'primereact/galleria';
import { useErrorHandler } from '../../ErrorHandlers/ErrorHandler'
import './banner.css'
import { Skeleton } from 'primereact/skeleton'
function Banner () {
    const [ banner, setBanners ] = useState([])
    const [ loading, setLoading ]  = useState(false)
    const [images, setImages] = useState(null);
    const { userAuthenticationHandler } = useErrorHandler()
  useEffect(()=>{
    setLoading(true)
    userApi.get('/get/all/banners').then(({data:{data}}) => {
      setLoading(false)
       console.log(data);
       const result = data.map((item) => ({
        itemImageSrc: `${process.env.REACT_APP_URL}/public/banner/${item.image}`,
        thumbnailImageSrc: `${process.env.REACT_APP_URL}/public/banner/${item.image}`,
        alt: `Description for ${item.image}`,
        title: `Title ${item._id}`,
      }));
      console.log('result', result);
      setImages(result)
    }).catch( err => {
       userAuthenticationHandler(err)
    })
  },[])
      const responsiveOptions = [
          {
              breakpoint: '991px',
              numVisible: 4
          },
          {
              breakpoint: '767px',
              numVisible: 3
          },
          {
              breakpoint: '575px',
              numVisible: 1
          }
      ];
  
      const itemTemplate = (item) => {
          return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />
      }
  
      const thumbnailTemplate = (item) => {
          return <img src={item.thumbnailImageSrc} alt={item.alt} />
      }
  
      return (
          <div className="card">
              <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }} 
                  item={itemTemplate} thumbnail={thumbnailTemplate} />
          </div>
      )

}

export default Banner