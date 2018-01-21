import React from 'react';

class MyModal extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleFailureClick = this.handleFailureClick.bind(this);
  }

  handleClick(e){
    let gif = this.refs.gif;
    gif.style.visibility = "hidden";
  }
  handleFailureClick(e){
    let failureMessage = this.refs.failure;
    failureMessage.style.visibility = "hidden";
  }

  render(){
    if(this.props.points == 3){
      this.refs.gif.style.visibility = "visible";
    }
    if(this.props.points > 0 && this.props.points < 3 && this.props.answeredQuestions.length == 3){
      this.refs.failure.style.visibility = "visible";
    }
    return(
      <div>
      <div ref="gif" onClick={this.handleClick} className="my-modal">
        <div className="delete-gif">&times;</div>
        <img className="doggy-image" src={this.props.image}/>
      </div>
      <div ref="failure" onClick={this.handleFailureClick} className="my-modal">
        <div className="delete-gif">&times;</div>
        <h2 className="failure-message">Oh noes! You didn't get enough points. Try again next time!</h2>
      </div>
    </div>
    )
  }
}


export default MyModal;
