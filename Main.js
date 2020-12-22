import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { View, StyleSheet, ScrollView } from "react-native";
import Todo from "./Todo.js";
import { useStateValue } from "./StateProvider";
import { Appbar, TextInput, Button } from "react-native-paper";
import { db } from "./firebase";
import Login from "./Login";

function Main() {
  const [input, setInput] = useState();
  const [todos, setTodos] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    db.collection("rooms")
      .doc(`${user ? user.user.email : "Sanchit"}`)
      .onSnapshot((snapshot) => {
        setTodos(snapshot.data().Array);
      });

    db.collection("rooms")

      .doc("Sanchit")
      .update({
        Array: ["Get Started with Todo", "By Sanchit"],
      });
  }, [user]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Todo App" subtitle={"Sanchit Anand"} />
      </Appbar.Header>

      <ScrollView style={styles.body}>
        <Login />
        {todos.map((todo) => (
          <Todo key={todo} todo={todo} />
        ))}
      </ScrollView>
      <View>
        <TextInput
          label="Add Todo"
          value={input}
          onChangeText={(text) => {
            setInput(text);
          }}
          autoFocus={true}
          onSubmitEditing={() => {
            db.collection("rooms")

              .doc(`${user ? user.user.email : "Sanchit"}`)
              .update({
                Array: firebase.firestore.FieldValue.arrayUnion(input),
              });

            setInput("");
          }}
        />
      </View>
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  body: {
    backgroundColor: "rgb(34,34,34)",
    paddingTop: 10,
    height: 10,
  },
  header: {
    padding: 40,
  },
});
