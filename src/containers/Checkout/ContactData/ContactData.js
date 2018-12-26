import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../aixos-orders'; 
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = event => {
        event.preventDefault(); //prevents page from Relaod
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max',
                address: {
                    street: 'Some Street 123',
                    zipCode: 'Happy-9837',
                    contry: 'Lalaland'
                },
                email: 'max_fiction@example.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then( response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {
        let form = (
            <form>
                <Input inputtype="input" type='text' name='name' placeholder='Insert Your Name'/>
                <Input inputtype="input" type='email' name='email' placeholder='Insert Your Email'/>
                <Input inputtype="input" type='text' name='postal' placeholder='Insert Your Postal Code'/>
                <Input inputtype="input" type='text' name='street' placeholder='Insert Your Street Name'/>
                <Button 
                    btnType='Success'
                    clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = < Spinner  />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data:</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;