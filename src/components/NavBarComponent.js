import React,{Component} from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authed-user';

class NavBarComponent extends Component{

    handleLogOut = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;       
        dispatch(setAuthedUser(null));
    }

    render(){
        return(
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand >Would You Rather</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink to='/' className='nav-link'>
                        Home
                    </NavLink>
                    <NavLink to='/add-new' className='nav-link'>
                        New Questions
                    </NavLink>
                    <NavLink to='/leader-board' className='nav-link'>
                        Leader Board
                    </NavLink>
                </Nav>
                {this.props.loggedInUser == null
                ? null
                : <Nav>
                    <Nav.Link >Hello, {this.props.loggedInUser}
                    </Nav.Link>
                    <Nav.Link onClick={this.handleLogOut}>
                        Logout
                    </Nav.Link>
                 </Nav>
                }
                
            </Navbar>
        )
    }
}

function mapStateToProps({authedUser, users}){
    return{
        authedUser,
        loggedInUser:users[authedUser]?.name
    }
}
export default connect(mapStateToProps)(NavBarComponent);