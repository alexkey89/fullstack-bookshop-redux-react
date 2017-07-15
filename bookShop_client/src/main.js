import React, {Component} from 'react';
import Menu from './components/menu';
import Footer from './components/footer';

import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';
import {getCart} from '../src/actions/cartAction';

class Main extends Component{
    componentDidMount(){
        this.props.getCart()
    }
    render(){
        return(
            <div>
                <Menu cartItemsNumber={this.props.totalQty} />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

function mapStateTopProps(state){
    return{
        totalQty: state.cart.totalQty
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCart: getCart
    }, dispatch)
}

export default connect(mapStateTopProps, mapDispatchToProps)(Main)