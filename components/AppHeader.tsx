import { Colors } from "@/constants/Colors";
import { FontSize } from "@/constants/FontSize";
import { hp, wp } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProfileHeader = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>sidhahisab</Text>
      <TouchableOpacity style={styles.notificationContainer}>
        <MaterialIcons
          name="notifications-none"
          size={24}
          color={Colors.dark.greenText}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#a64cf2',
    marginBottom: 6,
  },
  titleContainer: {
    marginTop: hp(3),
    flexDirection: 'row',
    paddingVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: 'bold',
    color: Colors.light.greenText,
    fontSize: FontSize.extraLarge,
  },
  notificationContainer: {
    position: 'relative',
    padding: wp(2),
    borderRadius: wp(6),
    borderColor: Colors.light.greenText,
    borderWidth: 1,
  },
  notificationDot: {
    position: 'absolute',
    top: wp(1),
    right: wp(1),
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: Colors.light.redText,
  },
  storiesContainer: {
    marginBottom: hp(2),
  },
  storiesList: {
    paddingLeft: wp(2),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(118,202,187,0.2)',
    borderRadius: wp(5),
    marginVertical: hp(1),
    padding: wp(1.5),
  },
  tab: {
    flex: 1,
    paddingVertical: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(4),
  },
  activeTab: {
    backgroundColor: Colors.light.background,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tabText: {
    textAlign: 'center',
    color: Colors.light.greenText,
    fontWeight: '700',
    // fontSize: FontSize.small,
  },
  activeTabText: {
    color: Colors.light.redText,
    fontWeight: 'bold',
    // dont
  },
  questionsContainer: {
    alignItems: 'center',
    paddingTop: hp(2),
  },


  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: Colors.light.primary,
    padding: 18,
    borderRadius: 50,
    elevation: 5,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  cardWrapper: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardContainer: {
    padding: 16,
    borderRadius: 12,
    flex: 1,
  },
  cardIconWrapper: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },

});
