import React from "react";
import { Text, View, Button } from "react-native";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import { Avatar, Headline } from "react-native-paper";

function ProfileScreen({ navigation }) {
  const [{ user }, dispatch] = useStateValue();

  return (
    <View
      style={{
        flex: 0.15,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "rgb(34,34,34)",
      }}
    >
      <Avatar.Image
        size={80}
        source={{
          uri: user?.user.photoUrl,
        }}
      />
      <Headline>
        <Text style={{ color: "white" }}>{user?.user.name}</Text>
      </Headline>
      <Button
        title="Sign out"
        onPress={() => {
          navigation.navigate("Login");

          dispatch({
            type: actionTypes.SET_USER,
            user: null,
          });
        }}
      />
    </View>
  );
}

export default ProfileScreen;
