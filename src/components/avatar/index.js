import React, {useRef, useEffect} from 'react';
import {Image, Pressable, Animated, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    paddingVertical: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  avatarFrame: {
    position: 'absolute',
    zIndex: 999,
    width: 84,
    height: 84,
    borderWidth: 5,
    borderColor: '#bfd7f1',
    borderRadius: 40,
    left: 8,
    top: 20,
  },
});

const Avatar = ({source, selected, onPress}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selected) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }).start();
    }
  }, [selected]);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Animated.View
        style={[
          styles.avatarFrame,
          {
            opacity: fadeAnim,
          },
        ]}
      />
      <Image style={styles.image} source={source} />
    </Pressable>
  );
};

export default Avatar;
