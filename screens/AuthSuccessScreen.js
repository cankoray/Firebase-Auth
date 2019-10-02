import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import LottieView from "lottie-react-native";

const AuthSuccessScreen = props => {
    const dispatch = useDispatch();
    return (
      <LinearGradient colors={["#fff", "#dedede"]} style={styles.gradient}>
        <View style={styles.screen}>
          <Text style={styles.headerText}>Authentication is successful!</Text>
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={styles.checkContainer}
            loop={false}
            autoPlay={true}
            source={require("../assets/lottie/Check Mark Success Data.json")}
          />

          <TouchableOpacity
            style={styles.button}
            title="Logout"
            color={"#fff"}
            onPress={() => {
              dispatch(authActions.logout());
            }}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
};

AuthSuccessScreen.navigationOptions = navData => {
    return {
      headerTitle: "Auth Success",
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Info"
            iconName={
              Platform.OS === "android"
                ? "md-information-circle-outline"
                : "ios-information-circle-outline"
            }
            onPress={() => {
                Alert.alert("Example", "Header info button example!", [
                  { text: "Okay" }
                ]);
            }}
          />
        </HeaderButtons>
      )
    };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  headerText: {
    color: "#666",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    padding: 15,
    marginTop: 15,
    alignItems: "center"
  },
  buttonText: {
    fontWeight: "700",
    color: "#FFF",
    fontSize: 15
  },
  checkContainer: {
    width: 200,
    height: 200,
    alignSelf: "center"
  }
});

export default AuthSuccessScreen;
