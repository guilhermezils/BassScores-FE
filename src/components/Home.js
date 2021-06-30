import { React, useState } from 'react';

import { loginSuccess } from '../actions/user';
import { Button, Form, Segment, Modal, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import "./styling.css";
import {compose} from "redux";
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';

const Home = ({user, history, loginSuccess}) => {

    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState("gui");
    const [password, setPassword] = useState("123 ");
    const [error, setError] = useState([])

    // function validateForm() {
    //     return username.length > 3 && password.length > 2;
    //   }

    const handleSubmit = (e) => {
        e.preventDefault()
          const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
          }
          
          fetch('http://localhost:3000/users/login', reqObj)
          .then(resp => resp.json())
          .then(data => {
              console.log(data)
            if (data.error) {
            setError(data.error)
            } else {
              localStorage.setItem('app_token', data.token)
              loginSuccess(data.user)
              console.log(data.user)
              alert(`welcome ${data.user.username}!`, {
                duration: 2000
              })
              history.push('/shop')
              
          }
        })
      }

    return(
        <>
        <div>
             <h1>Bass Scores Editions</h1>
        </div>
        <div > 
            <h1 >WELCOME</h1>
            {user.id ?
            <Button as={Link} to='/shop' >Begin Order</Button>
            :
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button >Begin Order</Button>
                }>
            <Modal.Header  >
               Log-in to your account
             </Modal.Header>
             <Modal.Content>
            <Form  onSubmit={handleSubmit}>
              <Segment stacked>
                  <Form.Input fluid
                     label="username"
                       type="text" 
                      placeholder="username" 
                       onChange={(e) => setUsername(e.target.value)}
                       value={username} 
                  />
                  <Form.Input fluid
                      label="password"
                    
                      type="password" 
                       onChange={(e) => setPassword(e.target.value)} 
                       value={password} 
                       placeholder="password" 
                 />
                      <Button >
                         <Button.Content > <i ></i> </Button.Content>
                         <Button.Content >login</Button.Content>
                     </Button>         
                   </Segment>
                 </Form>
                <Message> New to us? <a href='/signup'>Sign Up</a>
                </Message>
            </Modal.Content>
            </Modal>
            }
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }

const mapDispatchToProps = {
    loginSuccess
  }

  export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
  )(Home)