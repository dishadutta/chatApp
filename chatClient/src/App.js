import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
//import auth from './store/reducers/authReducer';
import * as ChatActions from './store/actions/chatAction';
import Auth from './components/pages/Auth';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/swag.css";

class App extends React.Component {
  componentDidMount(){
    this.props.setupSocket();
  }

  render() {
    return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route
           path="/Login"
           component={Auth} />

           <Route
           path="/Signup"
           component={Auth} />
          
          <Route
           path="/"
           render={props => {
             if(!this.props.token){
               return (
                 <Redirect to='/Login' />
               )
             }else{
              return (
                <h1>Root</h1>
             )
             }
           }} />
        </Switch>
      </BrowserRouter>
    </div>
   )
 }
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.chat
})

const mapDispatchToProps = dispatch => ({
  setupSocket: () => {
    dispatch(ChatActions.setupSocket());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
