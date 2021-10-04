import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  // console.log(item);

  // opacity will be used as the value for opacity. Initial Value: 0
  const opacity = useRef(new Animated.Value(0)).current;

  const fade = () => {
    // Will change opacity value to 1 in 500 ms
    Animated.timing(opacity, {
      toValue: showDetails ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.body}>
      {loading ? (
        <View style={{ height: "100%", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : null}
      <Pressable
        style={styles.imageContainer}
        onPress={() => {
          fade();
          setShowDetails(!showDetails);
        }}
      >
        <Image
          style={styles.image}
          imageSource={{
            uri: "https://cdn.pixabay.com/photo/2020/09/14/08/01/yoga-5570299_150.jpg",
          }}
          source={{ uri: item.largeImageURL }}
          onLoadEnd={() => setLoading(false)}
        />
      </Pressable>

      <Animated.View style={[styles.details, { opacity }]}>
        <Text style={styles.tags}>{item.tags}</Text>
        <Text style={styles.uploader}>{item.user}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },
  details: {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    padding: 10,
    position: "absolute",
    bottom: 0,
  },
  tags: {
    color: "#aaa",
    fontWeight: "bold",
  },
  uploader: {
    color: "palevioletred",
    textShadowColor: "white",
    textShadowRadius: 3,
  },
});
