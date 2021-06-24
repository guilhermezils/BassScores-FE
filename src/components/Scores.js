import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react'
import { addItemSuccess } from '../actions/order_items';
import { connect } from 'react-redux';

import "./styling.css";
import Cart from './Cart';

const Scores = ({user, score, addItemSuccess}) => {

    const loginAlert = () => {
        alert("You must Login", {
            duration: 2000
          })
    }

    const addToCart = () => {
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                score_id: score.id
            })
        }
        fetch('http://localhost:3000/order_items/', reqObj)
        .then(resp => resp.json())
        .then(order_items => {
            console.log(order_items)
            addItemSuccess(order_items)
            alert(`${score.name} has been added to your cart`, {
                duration: 2000
              })
              return <Cart order_items={order_items}/>
          })
    }

    return (
        <>
        <Card style={{height:"10%"}}>
            <Image src={score.image} wrapped ui={false} />
            <Card.Content style={{height:"150px"}}>
                <Card.Header>{score.name}</Card.Header>
                <Card.Meta style={{color:"black", fontWeight:"bold"}}>
                    <span className='date'>${score.cost}</span>
                </Card.Meta>
                <Card.Description>{score.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                {user.id ?
                <Button onClick={() => addToCart()}>add to cart</Button>
                : 
                <Button onClick={loginAlert}>add to cart</Button>
                  }
            </Card.Content>
        </Card>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        order_items: state.order_items,
        user: state.user
    }
}

const mapDispatchToProps = {
    addItemSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(Scores)