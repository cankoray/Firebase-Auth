import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import { Video } from "expo-av";
const { height, width } = Dimensions.get("window");

const AuthScreen = props => {

  return (
    <View style={styles.screen}>
      <Video
        source={require("../assets/videos/login.mp4")}
        rate={1.0}
        volume={0.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ flex: 1, position: "relative", width: width, height: height }}
      />

      <View style={styles.shade}></View>
      <View style={styles.overlay}>
        <Image
          style={{ width: 240 }}
          resizeMode={"contain"}
          source={require("../assets/images/logo-built.png")}
        />
        <Text style={styles.headerText}> Welcome </Text>
        <Text style={styles.descriptionText}>
          Firebase authentication example created by Can Koray
        </Text>
        <View>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#059DFF" }}
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          >
            <Text style={[styles.buttonText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={() => {
             props.navigation.navigate("Register");
          }}>
            <Text style={[styles.buttonText, { color: "#666" }]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

AuthScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
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
  overlay: {
    position: "absolute",
    width: width,
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  button: {
    width: width - 100,
    backgroundColor: "#FFF",
    borderRadius: 6,
    padding: 15,
    marginTop: 15
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#FFF",
    fontSize: 15,
  },
  shade: {
    position: "absolute",
    width: width,
    alignItems: "center",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .4)"
  },
  headerText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20
  },
  descriptionText: {
    textAlign: "center",
    color: "#FFF",
    marginBottom: 40,
    marginHorizontal: 30,
    fontFamily: "open-sans",
    fontSize: 15
  }
});

export default AuthScreen;
