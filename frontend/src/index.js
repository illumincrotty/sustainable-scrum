import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';


function Title(){
  return (
    <div> Welcome to Denison Sustainability Dashboard! </div>
  );
}

class Words extends React.Component {
  render() {
    return(
      <div>{[1,2,3]} </div>
    );
  }
}

function Footer() {
  return (
    <div> For more information visit www.denison.edu/sustainability </div>
  );
}

class Page extends React.Component{
  render(){
    return(
      <div>
      <Title/>
      <Words data={[1,2,3]}/>
      <Footer/>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
