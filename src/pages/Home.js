import React, { Component } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Cart, ListCategories, Menu } from "../components";
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menu: [],
      choosenCategory: 'Makanan',
      bill: []
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.name=" + this.state.choosenCategory)
      .then((res) => {
        // console.log("Response: ", res);
        const menu = res.data;
        this.setState({ menu });
      })
      .catch(error => {
        console.log(error);
      });

      this.getListBill();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.bill !== prevState.bill) {
  //     axios
  //     .get(API_URL + "bill")
  //     .then((res) => {
  //       console.log("cek"); // cek api sentiasa running
  //       const bill = res.data;
  //       this.setState({ bill });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   }
  // }

  getListBill = () => {
    axios
      .get(API_URL + "bill")
      .then((res) => {
        const bill = res.data;
        this.setState({ bill });
      })
      .catch(error => {
        console.log(error);
      })
  }

  changeCategory = (value) => {
    this.setState({
      choosenCategory: value,
      menu: []
    })

    axios
      .get(API_URL + "products?category.name=" + value)
      .then((res) => {
        // console.log("Response: ", res);
        const menu = res.data;
        this.setState({ menu });
      })
      .catch(error => {
        console.log(error);
      })
  }

  keyInBill = (value) => {
    axios
      .get(API_URL + "bill?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const billTemp = {
            total: 1,
            total_price: value.price,
            product: value
          }

          axios
            .post(API_URL + "bill", billTemp)
            .then((res) => {
              this.getListBill();
              swal({
                title: "Success add to cart",
                text: "Success add to cart" + billTemp.product.name,
                icon: "success",
                buttons: false,
                timer: 1500
              })

            })
            .catch(error => {
              console.log(error);
            })
        } else {
          const billTemp = {
            total: res.data[0].total+1,
            total_price: res.data[0].total_price + value.price,
            product: value
          }

          axios
            .put(API_URL + "bill/" + res.data[0].id, billTemp)
            .then((res) => {
              swal({
                title: "Success add to cart",
                text: "Success add to cart" + billTemp.product.name,
                icon: "success",
                buttons: false,
                timer: 1500
              })

            })
            .catch(error => {
              console.log(error);
            })


        }
      })
      .catch(error => {
        console.log(error);
      })


  }

  render() {
    // console.log(this.state.menu)
    const { menu, choosenCategory, bill } = this.state
    return (
      
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories changeCategory={this.changeCategory} choosenCategory={choosenCategory} />
              <Col className='mt-3'>
                <h4><strong>Register Product</strong></h4>
                <hr />
                <Row className="overflow-auto menu">
                  {menu && menu.map((tmenu) => (
                    <Menu
                      key={tmenu.id}
                      tmenu={tmenu}
                      keyInBill={this.keyInBill}
                    />
                  ))}
                </Row>

              </Col>
              <Cart bill={bill} {...this.props} getListBill={this.getListBill}/>
            </Row>
          </Container>
        </div>
      
    )
  }
}