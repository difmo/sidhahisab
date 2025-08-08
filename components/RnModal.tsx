import { RnModalProps } from "@/types";
import React from "react";
import ReactNativeModal from "react-native-modal";

const RnModal: React.FC<RnModalProps> = ({
  show,
  backButton,
  backDrop,
  children,
}) => {
  return (
    <ReactNativeModal
      isVisible={show}
      onBackButtonPress={backButton}
      onBackdropPress={backDrop}
    >
      {children}
    </ReactNativeModal>
  );
};

export default RnModal;
