import React, {Component} from 'react';
import {Card,Button,Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {setAuthedUser} from '../actions/authed-user';

class Login extends Component{
    signIn = (e) =>{
        e.preventDefault();
        if (this.refs.usersSelect) {
            const {dispatch} = this.props;        
            const authedID = this.refs.usersSelect.value;
            dispatch(setAuthedUser(authedID));
        }
    }

    render(){
        console.log(this.props)
        return (
            <div className="login">
                <Card>
                    <Card.Header>
                        <div className="text-center">
                            <h4>Welcome to the Would You Rather App!</h4>
                            <p>Please sign in to continue</p>
                        </div>
                    </Card.Header>
                    <Card.Body>
                    <Card.Title>
                        <div className="text-center">
                            Sign in
                        </div>
                    </Card.Title>
                    <Card.Text>
                    <Form>
                        <Form.Control as="select" ref="usersSelect">
                            <option value="">Select User</option>
                            {this.props.usersList.map((u)=>
                                ( 
                                    <option key={u} value={u}>{this.props.users[u].name}</option>
                                )
                            )}
                        </Form.Control>
                    </Form>
                    </Card.Text>
                        <Button variant="info" size="lg" block onClick={this.signIn} >
                            Sign in
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({users}){
    debugger;
    return {
        usersList: Object.keys(users),
        users
    }
}
export default connect(mapStateToProps)(Login);