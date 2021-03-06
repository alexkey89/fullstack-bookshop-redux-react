import React, {Component} from 'react';
import {Modal, Row, Col, Well, Button, Panel, ButtonGroup, Label} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartAction';

class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false
        }
    }

    componentDidMount(){
        this.props.getCart();
    }

    open(){
        this.setState({showModal: true})
    }
    close(){
        this.setState({showModal: false})
    }
    render(){
        if (this.props.cart[0]){
            return this.renderCart();
        }else{
            return this.renderEmpty();
        }
    }

    renderEmpty(){
        return(<div></div>)     
    }

    onIncrement(_id){
        this.props.updateCart(_id, 1, this.props.cart); 
    }

    onDecrement(_id, quantity){
        if(quantity > 1){
            this.props.updateCart(_id, -1, this.props.cart);
        }
    }
    onDelete(_id){

        //create copy of current arrays
        const currentBookToDelete = this.props.cart
        //Determine at which index in books array is the book to be deleted
        const indexToDelete = currentBookToDelete.findIndex(
            function(cart){
                return cart._id === _id
            }
        )

        let cartAfterDelete = [...currentBookToDelete.slice(0,indexToDelete),
            ...currentBookToDelete.slice(indexToDelete + 1)]

        this.props.deleteCartItem(cartAfterDelete);
    }

    renderCart(){
        const cartItemsList = this.props.cart.map((c)=>{
            return(
                <Panel key={c._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{c.title}</h6><span>   </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>{c.price} EUR</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle="success">{c.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'320px'}}>
                                <Button onClick={this.onIncrement.bind(this, c._id)} bsStyle="default" bsSize="small">+</Button>
                                <Button onClick={this.onDecrement.bind(this, c._id, c.quantity)} bsStyle="default" bsSize="small">-</Button>
                                <span>  </span>    
                                <Button onClick={this.onDelete.bind(this, c._id)} bsStyle="danger" bsSize="small">DELETE</Button>                            
                            </ButtonGroup>
                        </Col>                                                
                    </Row>
                </Panel>
            )
        }, this)
        return(
            <Panel header="Cart" bsStyle="primary">
                {cartItemsList}
                <Row>
                    <Col xs={12}>
                        <h6>Total Amount: {this.props.totalAmount} EUR </h6>
                        <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
                            PROCCEED TO CHECKOUT
                        </Button>
                    </Col>
                </Row>
                    <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                        <Modal.Header closeButton>
                        <Modal.Title>Thank you</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>Your order has been saved</h6>
                            <p>You will receive an email confirmation</p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Col xs={6}>
                            <h6>Total: {this.props.totalAmount} EUR </h6>
                        </Col>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
            </Panel>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        updateCart: updateCart,
        getCart: getCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)