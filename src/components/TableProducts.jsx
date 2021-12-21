import React from 'react'

const TableProducts = (props) => {
    return (
        <div>
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
                    props.listProducts.map((e,index)=>
                    <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{props.itemsFactura.length}</td>
                        <td className='fw-bolder'>$ {e.price}</td>
                        <td className='fw-bolder'>$ {e.price * 2}</td>
                    </tr>)
                }
                </tbody>
                </table>
                <div>
                    {
                        props.itemsFactura.map((e,index)=>
                            <div key={e.id}>
                                <p>{props.itemsFactura[index].productCount}</p>
                            </div>    
                        )
                    }
                </div>
        </div>
    )
}

export default TableProducts
