import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RnContainerProps } from "@/types";
import { wp } from "@/utils";
import React from "react";
import { StyleSheet, View } from "react-native";

const Container: React.FC<RnContainerProps> = ({
  topBar,
  children,
  customStyle,
  props,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? "dark" : "light";

  const styles = StyleSheet.create({
    mainContainer: {
      flexGrow: 1,
      backgroundColor: Colors[theme].background,
    },
    innerContainer: {
      flexGrow: 1,
      paddingHorizontal: wp(4),
    },
  });

  return (
    <View style={styles.mainContainer} {...props}>
      {topBar && topBar}
      <View style={[styles.innerContainer, customStyle]}>{children}</View>
    </View>
  );
};

export default Container;
