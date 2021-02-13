import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { View, StyleSheet, ScrollView,Alert } from "react-native";
import Todo from "./Todo.js";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Appbar, TextInput } from "react-native-paper";
import { v4 } from "uuid";
import { db } from "./firebase";
import Login from "./Login";
import AsyncStorage from '@react-native-async-storage/async-storage';
function Main() {
  const [input, setInput] = useState();
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(v4());
  const [{ user,del },dispatch] = useStateValue();

  useEffect(()=>{
    
const getData = async () => {
  try {
    const storeData = async (value) => {
      try {
        let val = await AsyncStorage.getItem('@^storage');
        if (val == null){
          await AsyncStorage.setItem('@^storage', value)
          db.collection("rooms")
          
    .doc(value)
    .set({ Array: [] })
    dispatch({
      type: actionTypes.SET_DEL,
      del: value,
    });
        }
        else {
          dispatch({
            type: actionTypes.SET_DEL,
            del: val,
          });
       }
        
      } catch (e) {
        console.log(e)
      }
    }
     storeData(id);
    const value = await AsyncStorage.getItem('@^storage')
    if(value !== null) {
      // Works on both Android and iOS
Alert.alert(
  'Message',
  value,
  [
    {
      text: 'Ask me later',
      onPress: () => console.log('Ask me later pressed')
    },
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel'
    },
    { text: 'OK', onPress: () => console.log('OK Pressed') }
  ],
  { cancelable: false }
);
    }
  } catch(e) {
    console.log(e)
  }
}
getData();


  },[])
  useEffect(()=>{
    db.collection("rooms")
    .doc('Sanchit')
    .set({ Array: [] })
   
  
   const timer= setTimeout(()=>{
      db.collection("rooms")
      .doc(`${del ? del : 'Sanchit'}`)
      .onSnapshot((snapshot) => {
        setTodos(snapshot.data().Array);
        });
     }, 3500)

      
   return ()=>clearTimeout(timer) ;
  },[del])
 
  useEffect(() => {
    db.collection('rooms').doc(`${del ? del : 'hola'}`).get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      db.collection("rooms")
      .doc(`${user ? user.user.email : del}`)
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
          <Todo key={todo} todo={todo} id={`${del ? del : 'Sanchit'}`} />
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

              .doc(`${user ? user.user.email : del}`)
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
