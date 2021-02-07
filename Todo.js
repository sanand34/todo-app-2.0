import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Checkbox, Button } from "react-native-paper";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
const Todo = ({ todo,id }) => {
  const [{ user }] = useStateValue();
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={() => {
          setChecked(!checked);
        }}
        color="lightgreen"
      />
      <View style={styles.todo}>
        <Text style={checked ? styles.textinvalid : styles.textvalid}>
          {todo}
        </Text>
      </View>

      <Button
        icon="delete"
        color="crimson"
        onPress={() => {
          db.collection("rooms")

            .doc(`${user ? user.user.email : id}`)
            .update({
              Array: firebase.firestore.FieldValue.arrayRemove(todo),
            });
        }}
      >
        Delete
      </Button>
    </View>
  );
};
export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "rgb(100,73,234)",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  textvalid: {
    fontSize: 30,
    padding: 30,
    color: "white",
  },
  textinvalid: {
    fontSize: 30,
    padding: 30,
    textDecorationLine: "line-through",
    color: "grey",
  },
  todo: {
    width: 240,
  },
});

