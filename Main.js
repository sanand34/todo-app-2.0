import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Todo from "./Todo.js";
import { useStateValue } from "./appState/StateProvider";
import { actionTypes } from "./appState/reducer";
import { Appbar, TextInput } from "react-native-paper";
import { v4 } from "uuid";
import { db } from "./firebase";
import Login from "./Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Main() {
  const [input, setInput] = useState();
  const [todos, setTodos] = useState([]);

  //creating id
  const [id, setId] = useState(v4());

  //redux type implementation using createContext
  const [{ user, devID }, dispatch] = useStateValue();

  useEffect(() => {
    //getData function for implementing asynchronous storage in app
    const getData = async () => {
      try {
        const storeData = async (value) => {
          try {
            //get data from storage about the device which is the firebase ID
            const data = await AsyncStorage.getItem("@^storage");

            /*If there is no data in storage about the device 
            then

            set field ID in the storage
            store ID in devID variable

            else

            get ID and store it in devID variable */
            if (data == null) {
              await AsyncStorage.setItem("@^storage", value);
              db.collection("rooms")

                .doc(value)
                .set({ Array: [] });
              dispatch({
                type: actionTypes.SET_devID,
                devID: value,
              });
            } else {
              dispatch({
                type: actionTypes.SET_devID,
                devID: data,
              });
            }
          } catch (e) {
            console.log(e);
          }
        };

        storeData(id);

        /*if data in storage pop up an alert showing the same */
        const value = await AsyncStorage.getItem("@^storage");
        if (value !== null) {
          // Works on both Android and iOS
          Alert.alert(
            "Message",
            value,
            [
              {
                text: "Ask me later",
                onPress: () => console.log("Ask me later pressed"),
              },
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    //once the devID variable gets the ID get the data from the ID
    const timer = setTimeout(() => {
      db.collection("rooms")
        .doc(`${devID ? devID : "Sanchit"}`)
        .onSnapshot((snapshot) => {
          setTodos(snapshot.data().Array);
        });
    }, 3500);
    //timer is set to avoid calling the field before being created
    return () => clearTimeout(timer);
  }, [devID]);

  useEffect(() => {
    //for getting todos from logged in google accounts
    db.collection("rooms")
      .doc(`${devID ? devID : "null"}`)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          db.collection("rooms")
            .doc(`${user ? user.user.email : devID}`)
            .onSnapshot((snapshot) => {
              setTodos(snapshot.data().Array);
            });
        }
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
          <Todo key={todo} todo={todo} id={`${devID ? devID : "Sanchit"}`} />
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

              .doc(`${user ? user.user.email : devID}`)
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
