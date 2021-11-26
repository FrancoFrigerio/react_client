import React from 'react'

const DetalleFiltrado = (props) => {
    return (
        <div>
            <div className="shadow p-3 mx-3" id='contMovimientos'>
                <div className="pb-2">
                    <h3 className="text-start">Listado de movimientos</h3>
                </div>
                <div className="d-flex">
                    <div className="d-flex mt-3 col-6">
                            <div className="d-flex flex-start">
                                <div className="mx-1">
                                    <h6>Desde</h6>
                                        <input type="date" className="form-control" name='desde'onChange={props.inputChange}></input>
                                </div>
                                <div className="mx-1">
                                <h6>Hasta</h6>
                                    <input type="date" className="form-control" name='hasta' onChange={props.inputChange}></input>
                                </div>
                            </div>   
                    </div>
                <div className="d-flex mt-3 col-6">
                        <div className="d-flex justify-content-araound col-6 flex-row">
                                <div>
                                    <h6>Orden</h6>
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Ordernar Por
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <div className=" btn" onClick={()=>props.setSort('created_At')}>
                                                <div className="d-flex badge rounded-pill">
                                                    <span className={props.sort==='created_At'?('fs-5 mx-1 text-info'):('fs-6 mx-1 text-secondary')}type="radio">Fecha</span>
                                                    <span className={props.sort==='created_At'?('fs-5 mx-1 text-info'):('fs-6 mx-1 text-secondary')}><i className='bx bx-check-circle fs-4'></i></span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className=" btn" onClick={()=>props.setSort('cliente.name')}>
                                                <div className="d-flex badge rounded-pill">
                                                    <span className={props.sort==='cliente.name'?('fs-5 mx-1 text-info'):('fs-6 mx-1 text-secondary')}type="radio">Nombre</span>
                                                    <span className={props.sort==='cliente.name'?('fs-5 mx-1 text-info'):('fs-6 mx-1 text-secondary')}><i className='bx bx-check-circle fs-4'></i></span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="btn" onClick={()=>props.setSort('cliente.surname')}>
                                                <div className="d-flex badge rounded-pill">
                                                    <span className={props.sort==='cliente.surname'?('fs-5 mx-1 text-info'):('fs-6 mx-1 text-secondary')}type="radio">Apellido</span>
                                                    <span className={props.sort==='cliente.surname'?('fs-5 mx-1 text-info'):('fs-6 mx-1 text-secondary')}><i className='bx bx-check-circle fs-4'></i></span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                        </div>
                        <div className="col-6">
                            <h6>Direccion</h6>
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tipo
                                </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <div className="btn" onClick={()=>props.setOrder('asc')}>
                                                <div className="d-flex badge rounded-pill">
                                                    <span className={props.order==='asc'?('fs-5 mx-1 text-info'):('fs-6 mx-1 text-secondary')}type="radio">Ascendente</span>
                                                    <span className={props.order==='asc'?('fs-5 mx-1 text-info'):('fs-6 mx-1 text-secondary')}><i className='bx bx-check-circle fs-4'></i></span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="btn" onClick={()=>props.setOrder('desc')}>
                                                <div className="d-flex badge rounded-pill">
                                                    <span className={props.order==='desc'?('fs-5 mx-1 text-info'):('fs-6 mx-1 text-secondary')}type="radio">Descendente</span>
                                                    <span className={props.order==='desc'?('fs-5 mx-1 text-info'):('fs-6 mx-1 text-secondary')}><i className='bx bx-check-circle fs-4'></i></span>
                                                </div>
                                            </div>
                                        </li>
                                       
                                    </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleFiltrado
