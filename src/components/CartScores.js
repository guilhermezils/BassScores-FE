import React from 'react';
import { Card, Button } from 'semantic-ui-react'
import { removeItemSuccess } from '../actions/order_items'
import { connect } from 'react-redux';
import { fetchOrderSuccess } from '../actions/order_items';

import "./styling.css";

const CartScores = ({score, order_items, removeItemSuccess, fetchOrderSuccess}) => {
// find the item id
let idArr = order_items.filter(obj => obj.score_id === score.id)
let id = idArr[0].id




    const removeItem = () => {
        const reqObj = {
            method: 'DELETE', 
          }
          
          fetch (`http://localhost:3000/order_items/${id}`, reqObj)
          .then(resp => resp.json())
          .then(data => {
              console.log(data)
            removeItemSuccess(id)
            alert("Item has been removed from your cart", {
              duration: 2000
            })
        })
    }

    return (
        <Card style={{width: "600px", border:"1px"}} centered>
            <Card.Content>
                <Card.Header style={{fontSize: "20px", color: "black"}}>
                    {score.name}
                </Card.Header>
                <Card.Meta style={{paddingTop:"5px", fontSize: "15px"}}>
                     {score.cost}
                     <Button 
                     onClick={removeItem} 
                     size="tiny" style={{float:"right", width:"5px", paddingTop:"6px", paddingLeft:"9px"}}><i aria-hidden="true" className="x icon"></i></Button>
                 </Card.Meta>
            </Card.Content>
       </Card>
    )
}

const mapStateToProps = (state) => {
    return {
    order_items: state.order_items
    }
}

const mapDispatchToProps = {
    removeItemSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScores)