import React from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import * as authActions from "../store/actions/auth";
import AuthForm from "../components/UI/AuthForm";

const RegisterScreen = props => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <View style={styles.authContainer}>
        <ScrollView>
          <AuthForm
            authAction={authActions.signup}
            navigation={props.navigation}
            buttonText="Register"
            description="Type your e-mail and password to sign up"
            targetScreen="Success"
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

RegisterScreen.navigationOptions = {
  headerTitle: "Authenticate"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  authContainer: {
    padding: 30,
    justifyContent: "center"
  }
});

export default RegisterScreen;
