import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import base64 from 'base-64';

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  /**
   * Logs in to the application.
   * 
   * Note that we have to follow the authorization rules; a header
   * with a base64-encoded username and password.
   * 
   * Upon response, we analyze whether or not we are successful.
   * If successful, we use a callback from App to log us in and
   * store the username and token in App.
   */
  handleLogin() {
    fetch('https://mysqlcs639.cs.wisc.edu/login', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + base64.encode(this.state.username + ":" + this.state.password)
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          this.props.login(this.state.username, res.token);
        } else {
          alert("Incorrect username or password! Please try again.");
        }
      });
  }

  /**
   * Use React Navigation to switch to the Sign Up page.
   */
  handleSignup() {
    this.props.navigation.navigate('SignUp');
  }

  /**
   * Displays and collects the login information.
   * 
   * The styling could definitely be cleaned up; should be consistent!
   */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>FitnessTracker</Text>
        <Text>Welcome! Please login or signup to continue.</Text>
        <View style={styles.space} />
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Username"
          placeholderTextColor="#D3D3D3"
          onChangeText={(username) => this.setState({ username: username })}
          value={this.state.username}
          autoCapitalize="none" />
        <TextInput style={styles.input}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#D3D3D3"
          onChangeText={(password) => this.setState({ password: password })}
          value={this.state.password}
          autoCapitalize="none" />
        <View style={styles.space} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Button color="#E69597" style={styles.buttonInline} title="Login" onPress={this.handleLogin} />
          <View style={styles.spaceHorizontal} />
          <Button color="#E69597" style={styles.buttonInline} title="Signup" onPress={this.handleSignup} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigText: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 5
  },
  space: {
    width: 20,
    height: 20,
  },
  spaceHorizontal: {
    display: "flex",
    width: 20
  },
  buttonInline: {
    display: "flex"
  },
  input: {
    width: 200,
    padding: 10,
    margin: 5,
    height: 40,
    borderColor: '#E69597',
    borderWidth: 1
  }
});

export default LoginView;
