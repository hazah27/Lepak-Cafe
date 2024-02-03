import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { numberWithPoint } from '../utils/priceFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

export default class TotalPay extends Component {
    submitTotalPay = (totalPay) => {
        const ordering = {
            total_price: totalPay,
            menu: this.props.bill
        }

        axios.post(API_URL+"order", ordering).then((res) => {
            // this.props.history.push("/success");
        })
    };
    render() {
        const totalPay = this.props.bill.reduce(function (result, item) {
            return result + item.total_price;
        }, 0);
        return (
            <>
            {/* Web */}
            <div className='fixed-bottom d-none d-md-block'>
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className='px-4'>
                        <h4>Total Price : <strong className='float-end me-2'>RM {numberWithPoint(totalPay)}</strong></h4>
                        <Button variant='primary' className='mb-2 mt-3 me-2 form-control' size='lg'
                        onClick={ () => this.submitTotalPay(totalPay)} as={Link} to="/success">
                            <FontAwesomeIcon icon={faShoppingCart} className='mx-2' /><strong>PAY</strong>
                        </Button>
                    </Col>
                </Row>

            </div>

            {/* Mobile */}
            <div className='d-sm-block d-md-none'>
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className='px-4'>
                        <h4>Total Price : <strong className='float-end me-2'>RM {numberWithPoint(totalPay)}</strong></h4>
                        <Button variant='primary' className='mb-2 mt-3 me-2 form-control' size='lg'
                        onClick={ () => this.submitTotalPay(totalPay)} as={Link} to="/success">
                            <FontAwesomeIcon icon={faShoppingCart} className='mx-2' /><strong>PAY</strong>
                        </Button>
                    </Col>
                </Row>

            </div>
            </>
        )
    }
}
