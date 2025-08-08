import { RnWheelPickerProps } from "@/types";
import React from "react";
import ScrollPicker from "react-native-wheel-scrollview-picker";

const RnWheelPicker: React.FC<RnWheelPickerProps> = ({
  dataSource,
  selectedIndex,
  renderItem,
  onValueChange,
  wrapperHeight,
  wrapperBackground,
  itemHeight,
  highlightColor,
  highlightBorderWidth,
}) => {
  return (
    <ScrollPicker
      dataSource={dataSource}
      selectedIndex={selectedIndex}
      renderItem={renderItem}
      onValueChange={onValueChange}
      wrapperHeight={wrapperHeight ?? 180}
      wrapperBackground={wrapperBackground ?? "#FFFFFF"}
      itemHeight={itemHeight ?? 60}
      highlightColor={highlightColor ?? "#d8d8d8"}
      highlightBorderWidth={highlightBorderWidth ?? 2}
    />
  );
};

export default RnWheelPicker;
