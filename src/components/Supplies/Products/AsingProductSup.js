import  axios  from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { PBI, PFF } from "../../const/Const"

const initialValuesPS={
	FkSupplieSpy:0, 
	FkProductSpy:0, 
	price:0.0, 
	deliveryTime:"", 
	productLine:"", 
	comments:"", 
	pSampleF:"", 
	pSampleLocation:""
}

const AsingProductSup = ({idP, idSupplie}) => {
    const [products, setProducts] = useState([])
	const [product, setProduct] = useState([])
    const [dataPS, setDataPS] = useState(initialValuesPS)
	const [idProduct, setidProduct] = useState(idP);
    const getProducts = async ()=>{
		const {data} = await axios.get(PFF)
		setProducts(data)
	}
    useEffect(()=>{
		if(idProduct !==0){
		getProduct()}
	},[idProduct])


	const getProduct = async()=>{
		if( idProduct > 0){
		const {data} = await axios.get(`${PBI}${idProduct}`)
		setProduct(data[0])
		setDataPS({...dataPS, FkProductSpy:idProduct, FkSupplieSpy: idSupplie})
	}
    }

  return (
    <Form.Group>
    <Form.Group as={Row} className='mt-3'>
                <Form.Label column='true' sm={3}>Nombre de Producto:</Form.Label>
                <Col><Form.Control readOnly plaintext value={product.productName || ""}/></Col>
                <Form.Label column='true'>Descripcion del Producto:</Form.Label>
                <Col><Form.Control as='textarea' readOnly plaintext value={product.descriptionProduct || ""}/></Col>
    </Form.Group>
    <Form.Group as={Row}>
        <Form.Label column='true' sm={3}>Tecnologia: </Form.Label>
        <Col sm={3}><Form.Control  readOnly plaintext value={product.nameTechnology || ""}/></Col>
    </Form.Group>
    <Form.Group as={Row} className='mt-2'>
        <Form.Label column='true' sm={3}>Precio:</Form.Label>
                <Col sm={3}><Form.Control onChange={e=> setDataPS({...dataPS, price:e.target.value})} value={dataPS.price}/></Col>
                <Form.Label column='true'>Tiempo de Entrega:</Form.Label>
                <Col sm={3}><Form.Control onChange={e=>setDataPS({...dataPS,deliveryTime: e.target.value})} value={dataPS.deliveryTime}/></Col>
                <Form.Group as={Row} className='mt-3'>
                <Form.Label column='true' sm={3}>Linea de Producto:</Form.Label>
                <Col sm={3}>
                <Form.Control onChange={e=>setDataPS({...dataPS,productLine: e.target.value})} value={dataPS.productLine}/></Col>
                <Form.Label column='true' sm={3}>Se cuenta con Muestra : </Form.Label>
                        <Col className='my-auto'>
                            <Form.Check type='radio' inline label='Si' value={1} checked={dataPS.pSampleF === 1} onChange={e=>{setDataPS({...dataPS,pSampleF:Number(e.target.value)})}}/>
                            <Form.Check type='radio' inline label='No'value={0} checked={dataPS.pSampleF === 0} onChange={e=>{setDataPS({...dataPS,pSampleF:Number(e.target.value)})}}/>
                        </Col>
            {dataPS.pSampleF === 1 ? (<Form.Group>
                <Form.Label column='true'>Ubicacion de la muestra Fisica: </Form.Label>
                <Col><Form.Control as='textarea'   onChange={e=>setDataPS({...dataPS,pSampleLocation:e.target.value})} value={dataPS.pSampleLocation}/></Col>
            </Form.Group>):(<></>)}
            </Form.Group>
            <Form.Group>
                <Form.Label column='true'>Comentarios: </Form.Label>
                <Col><Form.Control as='textarea'   onChange={e=>setDataPS({...dataPS,comments:e.target.value})} value={dataPS.comments}/></Col>
            </Form.Group>
        </Form.Group>
        <Form.Group className='my-3'>
            <Button variant='success'>Gurdar Producto</Button>
        </Form.Group>
        <Col>
    <Button onClick={e => console.log(dataPS)}>Asignar</Button>
    </Col>
    </Form.Group>
  )  
}
export default AsingProductSup