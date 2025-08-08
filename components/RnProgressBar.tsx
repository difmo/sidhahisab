import { Borders } from "@/constants/Borders";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { RnProgressBarProps } from "@/types";
import { hp, wp } from "@/utils/Dimensions";
import React from "react";
import { StyleSheet } from "react-native";
import { Bar } from "react-native-progress";

const RnProgressBar: React.FC<RnProgressBarProps> = ({
  progress,
  height,
  width,
  style,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? "dark" : "light";

  const styles = StyleSheet.create({
    progressBar: {
      alignSelf: "center",
      marginTop: hp(2),
    },
  });

  return (
    <Bar
      progress={progress}
      color={Colors[theme].primary}
      unfilledColor={Colors[theme].track}
      borderColor={Colors[theme].track}
      borderRadius={Borders.radius1}
      height={height ?? hp(1)}
      width={width ?? wp(80)}
      style={[styles.progressBar, style]}
    />
  );
};

export default RnProgressBar;
