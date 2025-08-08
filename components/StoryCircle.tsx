import { Colors } from '@/constants/Colors';
import { FontSize } from '@/constants/FontSize';
import { hp } from '@/utils';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  image: string;
  username: string;
  isOwn: boolean;
  onPress?: () => void;
};

const StoryCircle: React.FC<Props> = ({ image, username, isOwn, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container,{marginLeft:isOwn?0:hp(1.5)}]} onPress={onPress}>
      <View style={[styles.imageWrapper, isOwn && styles.ownStoryBorder]}>
        <Image source={{ uri: image }} style={styles.image} />
        {isOwn && (
          <View style={styles.plusIcon}>
            <AntDesign name="pluscircle" size={20} color={Colors.light.greenText} />
          </View>
        )}
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {username}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 100,
    height: 84,
  },
  imageWrapper: {
    padding: hp(0.2),            // padding around the image
    borderRadius: hp(5),         // make it fully round
    borderWidth: hp(0.25),       // responsive border width
    borderColor: Colors.light.greenText,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ownStoryBorder: {
    borderColor: '#ccc',
  },
  image: {
    width: 100,                // size of image inside
    height: 84,
    borderRadius: hp(4),
  },
  plusIcon: {
    position: 'absolute',
    bottom: -hp(0.5),            // badge position bottom
    right: -hp(0.5),             // badge position right
  },
  username: {
    marginTop: hp(0.8),
    fontSize:FontSize.regular,
    textAlign: 'center',
    color: Colors.light.redText,
  },
});


export default StoryCircle;
