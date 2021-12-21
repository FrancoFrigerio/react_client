import React, { useState } from 'react'

const ProductModal = (props) => {
   const [photo, setPhoto] = useState(props.viewProduct.urlPhoto1)
    
    return (
        <div className='contForm pt-5'>
            <div className='w-50 m-auto shadow p-3 mt-5 rounded productModal'>
                <div className='d-flex justify-content-end'>
                    <button onClick={()=>props.setViewProduct(null)} type='button' className='btn btn-outline-danger'>
                        <i className='bx bx-x-circle fs-4'></i>
                    </button>
                </div>
                <div>
                  <h4 className='text-uppercase'>{props.viewProduct.name}</h4>
                  <h6>$ {props.viewProduct.price}</h6>
                  <img src={photo} alt='product' className='img-fluid'></img>
                </div>
                <div className='d-flex justify-content-center'>
                    <button onClick={()=>setPhoto(props.viewProduct.urlPhoto1)} type='button' className='mx-3 btn btn-outline-info'><i className='bx bxs-left-arrow-circle fs-2'></i></button>
                    <button onClick={()=>setPhoto(props.viewProduct.urlPhoto2)} type='button' className='mx-3 btn btn-outline-info'><i className='bx bxs-right-arrow-circle fs-2'></i></button>
                </div>
            </div>
        </div>
    )
}

export default ProductModal

