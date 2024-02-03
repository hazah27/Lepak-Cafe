import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee,faCheese } from "@fortawesome/free-solid-svg-icons";

const Icon = ({name}) => {
    if(name === "Food") return <FontAwesomeIcon icon={faUtensils} className="mx-2" />
    if(name === "Drink") return <FontAwesomeIcon icon={faCoffee} className="mx-1" />
    if(name === "Kuih") return <FontAwesomeIcon icon={faCheese} className="mx-2" />

    return <FontAwesomeIcon icon={faUtensils} className="mx-2" />
}

export default class ListCategories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "categories")
            .then(res => {
                // console.log("Response: ", res);
                const categories = res.data;
                this.setState({ categories });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        // console.log("Categories: ", this.state.categories);
        const { categories } = this.state
        const {changeCategory, chooseCategory} = this.props
        // console.log(changeCategory);
        return (
            <Col md={2} className="mt-3">
                <h4><strong>Register Category</strong></h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item key={category.id} onClick={() => changeCategory(category.name)}
                        className={chooseCategory === category.name && "cat-aktif"}
                        style={{cursor:'pointer'}}>
                            <h5>
                                <Icon name={category.name} /> {category.name}
                            </h5>
                        </ListGroup.Item>
                    ))}
                    
                </ListGroup>
            </Col>
        )
    }
}