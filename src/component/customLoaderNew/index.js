import React from "react";
import { ActivityIndicator, Modal, View, Text } from "react-native";
import styles from "../../helper/globalStyles";
import colors from "../../styles/colors";
import GlobalImages from "../../helper/globalImages";
import * as Progress from "react-native-progress";
import { globalText } from "../../helper/globalText";
import I18n from "../../i18n/index";

const CustomLoader = (props) => {
  const { isVisible, signUpProgress } = props;

  return (
    <Modal transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#rgba(0,0,0,0.5)",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 200,
            width: 300,
            opacity: 1,
            backgroundColor: "#FFF",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Progress.CircleSnail
            color="#ED674E"
            textStyle={{ color: "#ED674E" }}
            thickness={3}
            showsText
            progress={signUpProgress}
            size={100}
            allowFontScaling
          />
          <Text
            style={{
              textAlign: "center",
              paddingHorizontal: 20,
              paddingVertical: 5,
              color: "#ED674E",
            }}
          >
            {I18n.t(globalText._pross)}
          </Text>
          <Text
            style={{
              textAlign: "center",
              paddingHorizontal: 20,
              // paddingVertical: 5,
              color: "#ED674E",
            }}
          >
            {I18n.t(globalText._nowYoWilPart)}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader;
