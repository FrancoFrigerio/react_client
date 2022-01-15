import React from 'react'

const FacturaComponent = ({factura,setFactura}) => {
    return (
        <div className='contForm'>
           <div className='pt-5 col-10 m-auto'>
                <div className='pt-2 border bg-white rounded'>
                    <h3 className='text-center'>Detalles de la Factura</h3>
                    <div className='p-1 rounded border border-muted mx-3'>
                        <div className='text-end pb-3 d-flex flex-row justify-content-end my-3'>
                            <h5 className='mx-3'>Fecha: </h5>
                            <span>
                                <h5 className='mx-3'>{factura.created_At}</h5>
                            </span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h5 className='mx-3 font-monospace'>Nombre y apellido: </h5>
                                <span>
                                    <h6 className='mx-3 fst-italic text-muted'>{factura.client.name} {factura.client.surname}</h6>
                                </span>                        
                            </div>
                            <div>
                                <h5 className='mx-3 font-monospace'>Email: </h5>
                                <span>
                                    <h6 className='mx-3 fst-italic text-muted'>{factura.client.email}</h6>
                                </span>                        
                            </div>
                            <div>
                                <h5 className='mx-3 font-monospace'>Direccion: </h5>
                                <span>
                                    <h6 className='mx-3 fst-italic text-muted'>{factura.client.dress}</h6>
                                </span>                        
                            </div>
                        </div>
                        <div className='mt-4'>
                               <div className='border-top'>
                                <h5 className='m-3 font-monospace'>Descripcion: </h5>
                                <span>
                                    <h6 className='mx-3 fst-italic text-muted'>{factura.description}</h6>
                                </span>                        
                               </div>
                        </div>
                    </div>
                    <div className='mt-4 mx-2 border-top'>
                              <table className='table'>
                                  <thead>
                                      <tr className='bg-secondary'>
                                          <th scope='col'>Id Producto</th>
                                          <th scope='col'>Nombre Producto</th>
                                          <th scope='col'>Cantidad</th>
                                          <th scope='col'>Precio</th>
                                          <th scope='col'>Sub-total</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                    {
                                        factura.itemsProducts.map((e)=>
                                        <tr key={e.id}>
                                            <td>{e.product.id}</td>
                                            <td>{e.product.name}</td>
                                            <td>{e.count}</td>
                                            <td className='fw-bolder'>$ {e.product.price}</td>
                                            <td className='fw-bolder'>$ {Math.round(e.product.price * e.count * 100/100)}</td>
                                        </tr>)
                                    }
                                  </tbody>
                              </table>
                            <div className='d-flex justify-content-end mx-5 fs-4 fw-bolder py-3'>
                                <span>Total : </span> <span> $ {factura.total}</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end m-3'>
                            <button className='btn btn-outline-danger col-2 mx-2 fw-bolder' onClick={()=>setFactura(null)}>Cerrar</button>
                        </div>
                </div>
           </div>
        </div>
    )
}

export default FacturaComponent
