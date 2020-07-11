import React from "react";
import PropTypes from "prop-types";
import { Animated, Image, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import styles from "../styles";

function Card({ active, item, panHandlers, position }) {
  const likeScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 1, 2],
    extrapolate: "clamp",
  });
  const dislikeScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [2, 1, 1],
    extrapolate: "clamp",
  });
  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });
  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });
  if (active) {
    //ACTIVE CARD
    return (
      <Animated.View
        {...panHandlers}
        key={item.id}
        style={[
          {
            transform: [...position.getTranslateTransform()],
          },
          {
            height: SCREEN_HEIGHT - 120,
            width: SCREEN_WIDTH,
            padding: 10,
            position: "absolute",
          },
        ]}
      >
        <Image style={styles.image} source={item.uri} />
        <View style={styles.feedback}>
          <Animated.View
            style={{
              padding: 10,
              transform: [{ scale: dislikeScale }],
            }}
          >
            <FontAwesome name="thumbs-down" size={32} color="red" />
          </Animated.View>
          <Animated.View
            style={{
              padding: 10,
              transform: [{ scale: likeScale }],
            }}
          >
            <FontAwesome name="thumbs-up" size={32} color="green" />
          </Animated.View>
        </View>
      </Animated.View>
    );
  } else {
    // OTHER CARDS
    return (
      <Animated.View
        key={item.id}
        style={[
          {
            opacity: nextCardOpacity,
            transform: [{ scale: nextCardScale }],
            height: SCREEN_HEIGHT - 120,
            width: SCREEN_WIDTH,
            padding: 10,
            position: "absolute",
          },
        ]}
      >
        <Image style={styles.image} source={item.uri} />
        <View style={styles.feedback}>
          <Animated.View style={{ padding: 10 }}>
            <FontAwesome name="thumbs-down" size={32} color="red" />
          </Animated.View>
          <Animated.View style={{ padding: 10 }}>
            <FontAwesome name="thumbs-up" size={32} color="green" />
          </Animated.View>
        </View>
      </Animated.View>
    );
  }
}

Card.propTypes = {};

export default Card;
