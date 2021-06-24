import React from 'react';
import { Card } from 'semantic-ui-react'
// import moment from 'moment-timezone';

const Orders = ({ord}) => {
    return (
        <Card centered style={{position: "relative", width: "700px"}}>
        <Card.Content>
        <Card.Header >
                {/* Order placed on {moment.tz(`${ord.created_at}`, 'America/Chicago').format('LLL')} */}
            </Card.Header>
            
            <Card.Meta >
                 total: ${ord.total}
            </Card.Meta>
            <h5>Items:</h5>
            <Card.Description >
                {ord.items}
            </Card.Description>
        </Card.Content>
   </Card>
    )
}

export default Orders