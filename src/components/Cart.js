import React, { Component } from "react";
import { Badge, Col, ListGroup, Row, Card } from "react-bootstrap";
import { numberWithPoint } from "../utils/priceFormat";
import TotalPay from "./TotalPay";
import ModalBill from "./ModalBill";
import axios from "axios";
import swal from "sweetalert";
import { API_URL } from "../utils/constants";

export default class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            billDetail: false,
            total: 0,
            remark: '',
            totalPrice: 0
        }
    }

    handleShow = (menuBill) => {
        this.setState({
            showModal: true,
            billDetail: menuBill,
            total: menuBill.total,
            remark: menuBill.remark,
            totalPrice: menuBill.total_price
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    add = () => {
        this.setState({
            total: this.state.total + 1,
            totalPrice: this.state.billDetail.product.price * (this.state.total + 1)
        })
    }

    subtract = () => {
        if (this.state.total !== 1) {
            this.setState({
                total: this.state.total - 1,
                totalPrice: this.state.billDetail.product.price * (this.state.total - 1)
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            remark: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.handleClose();

        // console.log("Hai", this.state.remark);

        const data = {
            total: this.state.total,
            total_price: this.state.totalPrice,
            product: this.state.billDetail.product,
            remark: this.state.remark
        }

        axios
            .put(API_URL + "bill/" + this.state.billDetail.id, data)
            .then((res) => {
                this.props.getListBill();
                swal({
                    title: "Update order!",
                    text: "Success update the order " + data.product.name,
                    icon: "success",
                    buttons: false,
                    timer: 1500
                })

            })
            .catch(error => {
                console.log(error);
            })
    }

    handleDelete = (id) => {

        this.handleClose();

        // console.log("Hai", this.state.remark);

        axios
            .delete(API_URL + "bill/" + id)
            .then((res) => {
                this.props.getListBill();
                swal({
                    title: "Delete order!",
                    text: "Success delete the order " + this.state.billDetail.product.name,
                    icon: "error",
                    buttons: false,
                    timer: 1500
                })

            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { bill } = this.props
        return (
            <Col md={3} className="mt-3">
                <h4>
                    <strong>Cart</strong>
                </h4>
                <hr />
                {bill.length !== 0 && (
                    <Card className="overflow-auto cart">
                        <ListGroup variant="flush">
                            {bill.map((menuBill) => (
                                <ListGroup.Item key={menuBill.id} onClick={() => this.handleShow(menuBill)}>
                                    <Row>
                                        <Col xs={2}>
                                            <h4><Badge pill bg="success">
                                                {menuBill.total}
                                            </Badge>
                                            </h4>
                                        </Col>
                                        <Col>
                                            <h5>{menuBill.product.name}</h5>
                                            <p>RM {numberWithPoint(menuBill.product.price)}</p>
                                        </Col>
                                        <Col>
                                            <strong className="float-end">RM {numberWithPoint(menuBill.total_price)}</strong>
                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            ))}

                            <ModalBill
                                handleClose={this.handleClose}
                                {...this.state}
                                add={this.add}
                                subtract={this.subtract}
                                changeHandler={this.changeHandler}
                                handleSubmit={this.handleSubmit}
                                handleDelete={this.handleDelete}
                            />

                        </ListGroup>
                    </Card>

                )}
                <TotalPay bill={bill} {...this.props} />
            </Col>
        );
    }
}