import RnText from "@/components/RnText";
import { Colors } from "@/constants/Colors";
import { FontSize } from "@/constants/FontSize";
import { hp, wp } from "@/utils";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type MessageItemProps = {
  name: string;
  message: string;
  time: string;
  image: string;
  isOnline: boolean;
  unread?: boolean;
  onPress?: () => void;
};

export const MessageItem: React.FC<MessageItemProps> = ({
  name,
  message,
  time,
  image,
  isOnline,
  unread,
  onPress,
}) => (
  <TouchableOpacity style={styles.messageItem} onPress={onPress}>
    <View style={styles.messageImageContainer}>
      <Image source={{ uri: image }} style={styles.messageImage} />
      {isOnline && <View style={styles.onlineIndicator} />}
    </View>

    <View style={styles.messageContent}>
      <RnText style={styles.messageName}>{name}</RnText>
      <RnText
        style={[
          styles.messageText,
          unread && { fontWeight: "800" },
        ]}
        numberOfLines={1}
      >
        {message}
      </RnText>
    </View>

    <View style={styles.messageEnd}>
         {unread && <View style={styles.unreadDot} />}
      <RnText style={styles.messageTime}>{time}</RnText>
     
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  messageImageContainer: {
    position: "relative",
    marginRight: wp(3),
  },
  messageImage: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    backgroundColor: Colors.light.primary,
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  messageContent: {
    flex: 1,
  },
  messageName: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.light.blackText,
    marginBottom: hp(0.5),
  },
  messageText: {
    fontSize: FontSize.regular,
    color: Colors.light.tabIconDefault,
  },
  messageEnd: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: wp(8),
    gap: wp(1),
    // flexDirection: "row",
  },
  messageTime: {
    fontSize: 12,
    fontWeight:'800',
    color: Colors.light.tabIconDefault,
  },
  unreadDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: Colors.light.primary,
    marginLeft: wp(1),
    alignSelf: "center",
  },
});