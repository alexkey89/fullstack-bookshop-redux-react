import React, {Component} from 'react';
import {Row, Col, Well, Button, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartAction';

class BookItem extends Component{
    constructor(){
        super();
        this.state = {
            isClicked: false
        }
    }
    onReadMore(){
        this.setState({isClicked: true})
    }
    handleCart(){
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            price: this.props.price,
            quantity: 1
        }]
        if (this.props.cart.length > 0){
            //if card is not empty
            let _id = this.props._id;

            let cartIndex = this.props.cart.findIndex(function(cart){
               return cart._id === _id;
            })

            //if it returns -1 there are no items with same _id
            if (cartIndex === -1){
                this.props.addToCart(book);
            }else{
                //update qty
                this.props.updateCart(_id, 1, this.props.cart)
            }
        }else{
            //If card empty
            this.props.addToCart(book);
        }
    }
    render(){
        return(
            <Well>
                <Row>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.images} responsive />
                    </Col>
                    <Col xs={6} sm={8}>
                        <h1>{this.props.title}</h1>
                        {/*<p>{this.props.description}</p>*/}
                        <p>{this.props.description.length > 50 && this.state.isClicked === false ? 
                            this.props.description.substr(0,50) : this.props.description}
                            <button onClick={this.onReadMore.bind(this)} className="link">
                                {
                                    this.state.isClicked === false && this.props.description !== null &&
                                    this.props.description.length > 50 ? '...read more': null
                                }
                            </button>
                        </p>
                        <h3>{this.props.price} EUR</h3>
                        <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy Now</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem)