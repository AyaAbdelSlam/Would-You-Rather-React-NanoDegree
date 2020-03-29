import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Tab, Container } from 'semantic-ui-react';
import QuestionCard from './QuestionCard';
import PropType from 'prop-types';

class Home extends Component{
    static propTypes = {
        userQuestionData: PropType.object.isRequired
      };
    render(){
        const {userQuestionData} = this.props;
        return(
            <Container style={{ marginTop: '3em' }}>
                <Tab panes={panes({ userQuestionData })} />
            </Container>
        )
    }
}
const panes = props => {
    const { userQuestionData } = props;
    return [
      {
        menuItem: 'Unanswered',
        render: () => (
          <Tab.Pane>
            {userQuestionData.answered.map(question => (
              <QuestionCard
                key={question.id}
                question_id={question.id}
                unanswered={true}
              />
            ))}
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Answered',
        render: () => (
          <Tab.Pane>
            {userQuestionData.unanswered.map(question => (
              <QuestionCard
                key={question.id}
                question_id={question.id}
                unanswered={false}
              />
            ))}
          </Tab.Pane>
        )
      }
    ];
  };

function mapStateToProps({ authedUser, users, questions }) {
    const answeredIds = Object.keys(users[authedUser].answers);
    const answered = Object.values(questions)
      .filter(question => !answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(questions)
      .filter(question => answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
  
    return {
      userQuestionData: {
        answered,
        unanswered
      }
    };
  }
export default connect(mapStateToProps)(Home);