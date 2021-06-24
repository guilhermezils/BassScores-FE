import { React, useState } from 'react';
import { Grid, Header, Button, Form, Segment } from "semantic-ui-react";
import { createUserSuccess } from "../actions/user";
import { connect } from "react-redux";

import "./styling.css";

const NewUser = ({history, createUserSuccess}) => {

    const [username, setUsername] = useState([])
    const [password, setPassword] = useState ([])
    const [error, setError] = useState([])
  

    const handleSubmit = (e) => {
        e.preventDefault()
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        }

    fetch('http://localhost:3000/users', reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
        if (data.error) {
            setError(data.error)
          } else {
            createUserSuccess(data)
            alert(`hello ${data.username}!`, {
              duration: 2000
            })
            history.push('/shop')
          }
        })
    }

        return(
          <Grid >
          <Grid.Column >
            <Header >
                Create account
                 </Header>
                 <Form  onSubmit={handleSubmit}>
                  <Segment stacked>
                  { error && <h4>{error} </h4> }
                     <Form.Input
                          label="username"
                          placeholder="username"
                          name="username"
                          onChange={(e) => setUsername(e.target.value)}
                            value={username}
                           />
                       <Form.Input
                        label="password"
                        placeholder="password"
                         name="password"
                         type="password"
                         onChange={(e) => setPassword(e.target.value)}
                         value={password}
                        />
                  <div style={{textAlign: "center"}}>
                     <Button >
                         <Button.Content >Continue</Button.Content>
                       
                     </Button>   
                  </div>
                  </Segment>
               </Form>
           </Grid.Column>
        </Grid>
        )
 }

 const mapDispatchToProps = {
   createUserSuccess,
  };
  
  export default connect(null, mapDispatchToProps)(NewUser);