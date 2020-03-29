import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import NewQuestions from './NewQuestions';
import LeaderBoard from './LeaderBoard';
import Home from './Home';
import NavBarComponent from './NavBarComponent';
import Login from './Login';
import {Grid} from 'semantic-ui-react';
import QuestionCard from './QuestionCard';
import NotFound from './NotFound';

const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render(){
    const {authedUser} = this.props;
    return (
      <Router>
        <Fragment>
          <div className='App'>
          {authedUser === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <Login />
                </ContentGrid>
              )}
            />
          ) : (
            <Fragment>
              <NavBarComponent />
              <ContentGrid>
                      <Route exact path="/" component={Home} />
                      <Route path="/questions/bad_id" component={NotFound} />
                      <Route path="/questions/:question_id" component={QuestionCard} />
                      <Route path="/add-new" component={NewQuestions} />
                      <Route path="/leader-board" component={LeaderBoard} />
                      <Route component={NotFound} />
              </ContentGrid>
            </Fragment>
          )}
          </div>
        </Fragment>
      </Router>
    );
  }

}
function mapStateToProps ({ authedUser,users }) {
  return {
    loading: users === null,
    authedUser,
    usersList: Object.keys(users),
  }
}

export default connect(mapStateToProps)(App)
