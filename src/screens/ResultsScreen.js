import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";

import { useSelector } from "react-redux";

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

const PIXBAY_API_KEY = "23677419-7b458adbb419bfcc889de581b";

export default function ResultsScreen({ navigation }) {
  const term = useSelector((state) => state.search.term);

  const [screenWidth, setScreenWidth] = useState(Dimensions.get("screen").width);
  const [numColumns, setNumColumnse] = useState(isPortrait() ? 3 : 5);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [moreImagesAvaliable, setMoreImagesAvaliable] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (term) getImages();
  }, [page]);

  useEffect(() => {
    navigation.setOptions({ title: term });
    const sub = Dimensions.addEventListener("change", () => {
      setNumColumnse(isPortrait() ? 3 : 5);
      setScreenWidth(Dimensions.get("screen").width);
    });
    return () => sub.remove();
  }, []);

  const getImages = () => {
    setIsLoading(true);
    axios
      .get(`https://pixabay.com/api/?key=${PIXBAY_API_KEY}&q=${term}&page=${page}`)
      .then((res) => {
        setImages([...images, ...res.data.hits]);
        if (res.data.hits.length === 0 || res.data.hits.length < 20) setMoreImagesAvaliable(false);
        if (page === 1 && res.data.hits.length === 0) setNoResults(true);
        setIsLoading(false);
      });
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={[styles.imageContainer, { height: screenWidth / numColumns }]}
        onPress={() => {
          navigation.navigate("Details", { item });
        }}
      >
        <Image style={styles.image} source={{ uri: item.previewURL }} />
      </Pressable>
    );
  };

  const loadMoreItem = () => {
    if (moreImagesAvaliable) setPage(page + 1);
  };

  const renderLoader = () => {
    return isLoading ? (
      <View
        style={{
          height: Dimensions.get("screen").height,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : noResults ? (
      <Text style={styles.footer}>No search results</Text>
    ) : (
      <Text style={styles.footer}>That's all folks</Text>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={images}
        renderItem={renderItem}
        key={numColumns}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={1}
        columnWrapperStyle={{ borderColor: "red" }}
        numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#333",
  },
  footer: {
    fontSize: 16,
    color: "palevioletred",
    marginTop: 10,
    marginLeft: 10,
  },
  imageContainer: {
    margin: 1,
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
