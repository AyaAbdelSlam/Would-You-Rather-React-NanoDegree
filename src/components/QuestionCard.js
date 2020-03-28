import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import Question from './Question';
import QuestionResult from './QuestionResult';
import QuestionPreview from './QuestionPreview';
import { colors } from '../utils/helpers';


const contentTypes = {
  PREVIEW: 'PREVIEW',
  QUESTION: 'QUESTION',
  RESULT: 'RESULT'
};

const QuestionContent = props => {
  const { contentType, question, unanswered } = props;

  switch (contentType) {
    case contentTypes.PREVIEW:
      return <QuestionPreview question={question} unanswered={unanswered} />;
    case contentTypes.QUESTION:
      return <Question question={question} />;
    case contentTypes.RESULT:
      return <QuestionResult question={question} />;
    default:
      return;
  }
};

export class UserCard extends Component {
  static propTypes = {
    question: PropTypes.object,
    author: PropTypes.object,
    contentType: PropTypes.string,
    unanswered: PropTypes.bool,
    question_id: PropTypes.string
  };
  render() {
    const {
      author,
      question,
      contentType,
      badPath,
      unanswered = null
    } = this.props;

    if (badPath === true) {
      return <Redirect to="/questions/bad_id" />;
    }

    const tabColor = unanswered === true ? colors.green : colors.blue;
    const borderTop =
      unanswered === null
        ? `1px solid ${colors.grey}`
        : `2px solid ${tabColor.hex}`;

    return (
      <Segment.Group>
        <Header
          as="h5"
          textAlign="left"
          block
          attached="top"
          style={{ borderTop: borderTop }}
        >
          {author.name} asks:
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={author.avatarURL} />
            </Grid.Column>
            <Grid.Column width={11}>
              <QuestionContent
                contentType={contentType}
                question={question}
                unanswered={unanswered}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps(
  { users, questions, authedUser },
  { match, question_id }
) {
  let question,
    author,
    contentType,
    badPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    contentType = contentTypes.PREVIEW;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authedUser];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      contentType = contentTypes.QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        contentType = contentTypes.RESULT;
      }
    }
  }

  return {
    badPath,
    question,
    author,
    contentType
  };
}

export default connect(mapStateToProps)(UserCard);
