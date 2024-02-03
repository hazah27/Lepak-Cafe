import React from 'react'
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithPoint } from '../utils/priceFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const ModalBill = ({ 
    showModal, 
    handleClose, 
    billDetail, 
    total, 
    remark, 
    add, 
    subtract, 
    changeHandler, 
    handleSubmit,
    totalPrice,
    handleDelete }) => {
    if (billDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {billDetail.product.name} {" "}
                        <strong>
                            (RM {numberWithPoint(billDetail.product.price)})
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='exampleForm.ControlInput'>
                            <Form.Label>Total Price :</Form.Label>
                            <p>
                                <strong>
                                    RM {numberWithPoint(totalPrice)}
                                </strong>
                            </p>
                        </Form.Group>

                        <Form.Group controlId='exampleForm.ControlInput'>
                            <Form.Label>Total :</Form.Label>
                            <br />
                            <Button variant='primary' size='sm' className='me-2' onClick={() => subtract()}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>                            
                            <strong>{total}</strong>
                            <Button variant='primary' size='sm' className='ms-2' onClick={() => add()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>

                        <Form.Group controlId='exampleForm.ControlTextareal' className='mt-4'>
                            <Form.Label>Remark :</Form.Label>
                            <Form.Control 
                            as="textarea" 
                            rows="3" 
                            name="remark" 
                            placeholder='eg: spicy, half potion rice'
                            value={remark}
                            onChange={(event) => changeHandler(event)} />
                        </Form.Group>
                        <Button variant='primary' type='submit' className='mt-2'>
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(billDetail.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>empty</Modal.Title>
                </Modal.Header>
                <Modal.Body>empty</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default ModalBill