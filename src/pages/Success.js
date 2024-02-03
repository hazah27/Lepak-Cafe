import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/constants'

export default class Success extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "bill")
      .then((res) => {
        const bill = res.data;
        bill.map(function(item) {
          return axios
            .delete(API_URL+"bill/"+item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    return (
      <div className='mt-4 text-center'>
        <Image src="gallery/success.png" width="500" />
        <h2>Order Successful</h2>
        <p>Thank you for ordering!</p>
        <Button variant='primary' as={Link} to="/">
          Back to home
        </Button>
      </div>
    )
  }
}
