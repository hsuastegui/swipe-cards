import React from "react";
import { View, Animated, PanResponder } from "react-native";
import Card from "./components/Card";
import { SCREEN_WIDTH, SCREEN_OFFSET, DX } from "./constants";

const cards = [
  { id: "1", uri: require("./assets/1.jpg") },
  { id: "2", uri: require("./assets/2.jpg") },
  { id: "3", uri: require("./assets/3.jpg") },
  { id: "4", uri: require("./assets/4.jpg") },
  { id: "5", uri: require("./assets/5.jpg") },
];

class App extends React.PureComponent {
  state = {
    currentIndex: 0,
  };

  position = new Animated.ValueXY();

  handlePanResponderMove = (evt, gestureState) => {
    this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
  };

  handlePanResponderRelease = (evt, gestureState) => {
    if (gestureState.dx > DX) {
      // SWIPE RIGHT
      Animated.spring(this.position, {
        toValue: { x: SCREEN_WIDTH + SCREEN_OFFSET, y: gestureState.dy },
        useNativeDriver: true,
      }).start(() => {
        this.setState(
          (prevState) => ({ currentIndex: prevState.currentIndex + 1 }),
          () => {
            this.position.setValue({ x: 0, y: 0 });
          }
        );
      });
    } else if (gestureState.dx < -DX) {
      // SWIPE LEFT
      Animated.spring(this.position, {
        toValue: { x: -SCREEN_WIDTH - SCREEN_OFFSET, y: gestureState.dy },
        useNativeDriver: true,
      }).start(() => {
        this.setState(
          (prevState) => ({ currentIndex: prevState.currentIndex + 1 }),
          () => {
            this.position.setValue({ x: 0, y: 0 });
          }
        );
      });
    } else {
      Animated.spring(this.position, {
        toValue: { x: 0, y: 0 },
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  };

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: this.handlePanResponderMove,
    onPanResponderRelease: this.handlePanResponderRelease,
  });

  renderCards = () => {
    const { currentIndex } = this.state;
    return cards
      .map((item, i) => {
        if (i < currentIndex) {
          return null;
        }
        return (
          <Card
            active={i == currentIndex}
            item={item}
            key={item.id}
            panHandlers={this.panResponder.panHandlers}
            position={this.position}
          />
        );
      })
      .reverse();
  };

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <View style={{ flex: 1 }}>{this.renderCards()}</View>
      </View>
    );
  }
}

export default App;
