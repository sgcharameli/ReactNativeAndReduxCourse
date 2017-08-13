import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {

  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC6vmnJH_4IYwnHBd7sD_dUAX6OUj3gyjY',
      authDomain: 'reactnativeauth-a9d5c.firebaseapp.com',
      databaseURL: 'https://reactnativeauth-a9d5c.firebaseio.com',
      projectId: 'reactnativeauth-a9d5c',
      storageBucket: 'reactnativeauth-a9d5c.appspot.com',
      messagingSenderId: '345566902510'
    });

    firebase.auth().onAuthStateChanged((user) => {
      console.debug(user);
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {    
    switch (this.state.loggedIn) {
      case true:
      return (
        <Button 
          onPress={() => firebase.auth().signOut()} 
          text={'Log Out'} 
        />
      );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}
