import React from "react";
import { View, Button } from "react-native";
import * as Google from "expo-google-app-auth";
import { db } from "../firebase";
import { useStateValue } from "../appState/StateProvider";
import { actionTypes } from "../appState/reducer";

const IOS_CLIENT_ID = "Check readme for google api";
const ANDROID_CLIENT_ID = "Check readme for google api";

function LoginScreen({ navigation }) {
  const [{}, dispatch] = useStateValue();

  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user.givenName);

        const doc = await db.collection("rooms").doc(result.user.email).get();
        if (!doc.exists) {
          db.collection("rooms")
            .doc(result.user.email)
            .set({ Array: [`Welcome ${result.user.name}`] });
          dispatch({
            type: actionTypes.SET_USER,
            user: result,
          });
        } else {
          dispatch({
            type: actionTypes.SET_USER,
            user: result,
          });
        }

        navigation.navigate("Profile"); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("LoginScreen.js.js 30 | Error with login", e);
      return { error: true };
    }
  };

  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "rgb(34,34,34)",
      }}
    >
      <Button
        title="Login with Google"
        onPress={() => {
          signInWithGoogle();
        }}
      />
    </View>
  );
}

export default LoginScreen;
