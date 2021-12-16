import React, { useState } from 'react'

const Producto = ({product}) => {
    
    const [photo, setPhoto] = useState({
        url:'url1',
        img:product.urlPhoto1
    })

    const changePhoto=()=>{
       if(photo.url === 'url1'){
           setPhoto({
               ...photo,
               url:'url2',
               img:product.urlPhoto2
           })
        }else{
            setPhoto({
                ...photo,
                url:'url1',
                img:product.urlPhoto1
            })
       }
    }


    return (
        <div>
            <h4>{product.name}</h4>
            <h6 className='text-muted'>{product.price}</h6>
            <h6 className='text-secondary'>{product.created_At}</h6>
            <img src={photo.img} className='img-fluid'></img>
            <div className='text-center'>
                <button onClick={()=>changePhoto()} className='btn btn-outline-warning imgBtn fs-3'>
                    {
                        photo.url==='url1'?(
                            <i className='bx bxs-right-arrow-circle'></i>
                        ):(
                            <i className='bx bxs-left-arrow-circle'></i>
                        )
                    }
                </button>
            </div>
        </div>
    )
}

export default Producto
