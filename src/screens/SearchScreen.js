import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/slices/searchSlice";

export default function SearchScreen({ navigation }) {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setTerm(value);
  };

  const handleSearch = () => {
    if (term) {
      dispatch(setSearchTerm(term));
      navigation.navigate("Results");
      setTerm("");
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Icon5 name="biohazard" size={70} color="palevioletred" />
        <Text style={styles.title}>Biohazard Image Search</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
            value={term}
          />
          <Pressable style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={30} color="palevioletred" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 200,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  title: {
    color: "palevioletred",
    marginTop: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 15,
  },
  main: {
    flex: 1,
    width: "100%",
  },
  searchBox: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  input: {
    position: "relative",
    color: "#aaa",
    borderWidth: 3,
    width: "90%",
    height: 50,
    fontSize: 20,
    borderColor: "palevioletred",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  searchButton: {
    position: "absolute",
    right: "10%",
    bottom: "25%",
  },
  image: {
    width: 150,
    height: 150,
  },
});
