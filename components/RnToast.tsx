import { RnToastProps } from "@/types";
import Toast from "react-native-toast-message";

export default function showToaster({
  type,
  heading,
  message,
  position,
}: RnToastProps) {
  Toast.show({
    type: type ?? "success",
    text1: heading,
    text2: message,
    position: position ?? "top",
  });
}
