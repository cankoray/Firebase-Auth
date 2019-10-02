import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity
} from "react-native";
import { useDispatch } from "react-redux";

import Input from "../UI/Input";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    const action = props.authAction(
      formState.inputValues.email,
      formState.inputValues.password
    );

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate(props.targetScreen);
    } catch (err) {
      console.log("Error " + err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <View style={styles.authContainer}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.headerText}>Welcome</Text>
            <Text style={{ color: "#666", marginBottom: 0 }}>
              {props.description}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
              icon="envelope"
              iconColor="#AAA"
            />
          </View>

          <View style={[styles.inputContainer, styles.inputBottom]}>
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
              icon="key"
              iconColor="#AAA"
            />
          </View>

          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <TouchableOpacity
                disabled={!formState.formIsValid}
                style={[
                  styles.button,
                  formState.formIsValid ? null : styles.disabledBtn
                ]}
                onPress={authHandler}
              >
                <Text style={[styles.buttonText]}>{props.buttonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  authContainer: {
    justifyContent: "center",
  },
  headerText: {
    color: "#666",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10
  },
  inputContainer: {
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingVertical: 10,
    paddingBottom: 4
  },
  inputBottom: {
    borderTopColor: "#e2e2e2",
    borderTopWidth: 1
  },
  buttonContainer: {
    marginTop: 10
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    padding: 15,
    marginTop: 15
  },
  disabledBtn: {
    backgroundColor: "#999",
    color: "#FFF"
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#FFF",
    fontSize: 15
  }
});

export default AuthForm;
