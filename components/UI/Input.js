import React, { useReducer, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";

import IconF5 from "react-native-vector-icons/FontAwesome5";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: true
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
        lostFocus: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
    lostFocus: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  const inputEl = useRef(null);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!inputEl.current.isFocused()) {
          inputEl.current.focus();
        }
      }}
    >
      <View style={styles.formControl}>
        <IconF5 style={styles.icon} name={props.icon} color={"#AAA"}></IconF5>
        <View>
          <Text style={styles.label}>{props.label}</Text>
          <TextInput
            {...props}
            ref={inputEl}
            style={styles.input}
            value={inputState.value}
            onChangeText={textChangeHandler}
            onBlur={lostFocusHandler}
          />
          {!inputState.isValid && inputState.touched && inputState.lostFocus && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{props.errorText}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
    flexDirection: "row"
  },
  label: {
    fontFamily: "open-sans",
    marginVertical: 8,
    paddingTop: 2,
    color: "#666",
    fontWeight: "700"
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: "open-sans",
    color: "red",
    fontSize: 13
  },
  icon: {
    paddingRight: 10,
    fontSize: 24,
    margin: 20,
  }
});

export default Input;
