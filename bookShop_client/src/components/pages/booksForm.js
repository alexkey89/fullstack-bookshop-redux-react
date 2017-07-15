import React, {Component} from 'react';
import {Row, Col, Well, FormGroup, Button, Panel, FormControl, ControlLabel, InputGroup, DropdownButton, Image, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import axios from 'axios';

import {postBooks, deleteBooks, fetchBooks, resetButton} from '../../actions/booksActions';

class BooksForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            images: [{}],
            img: ''
        }
    }
    componentDidMount(){
        this.props.fetchBooks();
        
        axios.get('/api/images').then((res)=>{
            return this.setState({images: res.data})
        }).catch((err)=>{
            return this.setState({images: "error loading images", img: ""})
        })

    }

    handleSubmit(e){
        e.preventDefault();
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.image).value,
            price: findDOMNode(this.refs.price).value
        }]
        this.props.postBooks(book)
    }

    onDelete(){
        let bookId = findDOMNode(this.refs.delete).value;
        this.props.deleteBooks(bookId)
    }

    handleSelect(img){
        this.setState({
            img: '/images/' + img.name 
        })
    }

    resetForm(){
        this.props.resetButton();
        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.image).value = '';
        findDOMNode(this.refs.price).value = '';
        this.setState({img: ''})
    }

    render(){

        const imgList = this.state.images.map((imgArr, i)=>{
            return (
                <MenuItem key={i} eventKey={imgArr.name} onClick={this.handleSelect.bind(this, imgArr, name)}>{imgArr.name}</MenuItem>
            )
        }, this)

        const booksList = this.props.books.map((b)=>{
            return (
                <option value={b._id}>{b.title}</option>
            )
        })
        return(
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                             <InputGroup>
                                <FormControl type="text" ref="image" value={this.state.img} />
                                <DropdownButton
                                componentClass={InputGroup.Button}
                                id="input-dropdown-addon"
                                title="Select an image" bsStyle="primary">
                                {imgList}
                                </DropdownButton>
                            </InputGroup>
                           <Image src={this.state.img} responsive/>
                        </Panel>
                    </Col>
                <Col xs={12} sm={6}>
                     <Panel>
                    <FormGroup controlId="title" validationState={this.props.validation}>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Enter title"
                            ref="title"
                         />
                         <FormControl.Feedback />
                    </FormGroup>
                   <FormGroup controlId="description" validationState={this.props.validation}>
                        <ControlLabel>Description</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Enter description"
                            ref="description"
                         />
                         <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup controlId="price" validationState={this.props.validation}>
                        <ControlLabel>Price</ControlLabel>
                        <FormControl 
                            type="text"
                            placeholder="Enter price"
                            ref="price"
                         />
                         <FormControl.Feedback />
                    </FormGroup>
                    <Button 
                        onClick={!this.props.msg ? this.handleSubmit.bind(this):this.resetForm.bind(this)}
                        bsStyle={!this.props.style ? 'primary': this.props.style}>
                        {!this.props.msg ? ('Save book') : this.props.msg}
                    </Button>
                </Panel>
                <Panel style={{marginTop: '25px'}}>
                    <FormGroup controlId="formControlsSelect" validationState={this.props.validation}>
                        <ControlLabel>Select a book to delete</ControlLabel>
                        <FormControl ref="delete" componentClass="select" placeholder="select">
                            <option value="select">select</option>
                           {booksList}
                        </FormControl>
                        </FormGroup>
                    <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete book</Button>
                </Panel>
            </Col>
        </Row>
    </Well>
            
        )
    }
}

function mapStateToProps(state){
    return{
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style,
        validation: state.books.validation
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
        {postBooks, deleteBooks, fetchBooks, resetButton}, 
    dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);