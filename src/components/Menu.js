import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { numberWithPoint } from '../utils/priceFormat';

export const Menu = ({ tmenu, keyInBill }) => {
    return (
        <Col md={4} xs={6} className='mb-4'>
            <Card className='shadow' onClick={() => keyInBill(tmenu)}>
                <Card.Img variant="top" src={"gallery/" + tmenu.category.name + "/" + tmenu.photo} className='h-75 w-100 object-fit-cover object-position-center'/>
                <Card.Body>
                    <Card.Title>{tmenu.name} <strong>({tmenu.code})</strong></Card.Title>
                    <Card.Text>
                        RM {numberWithPoint(tmenu.price)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Menu