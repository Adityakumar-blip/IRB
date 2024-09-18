import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  StatusBar,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import CustomButton from "../../component/customButton/index";
import CustomTextInput from "../../component/customTextInput/index";
import styles from "../../helper/globalStyles";
import { globalText } from "../../helper/globalText";
import colors from "../../styles/colors";
import SimpleReactValidator from "simple-react-validator";
import CustomValidation from "../../utils/CustomValidation";
//import { SocialLinks, TYPE_MOBILE } from 'social-links';
import I18n from "../../i18n/index";
import { Singular, sngLog } from "singular-react-native";

const AddSocialProfile = (props) => {
  const {
    visible,
    onRequestClose,
    onPressCancel,
    onPressSubmit,
    name,
    onPressOutside,
  } = props;
  const simpleValidator = useRef(new SimpleReactValidator());
  const [allValid, setAllValid] = useState(true);
  const [isLinkData, setLinkData] = useState({
    type:
      name == I18n.t(globalText.facebookLink)
        ? "facebook"
        : name == I18n.t(globalText.twitterLink)
        ? "twitter"
        : name == I18n.t(globalText.linkedInLink)
        ? "linkedin"
        : name == I18n.t(globalText.skypeLink)
        ? "skype"
        : name == I18n.t(globalText.websiteLink)
        ? "website"
        // : name == I18n.t(globalText.upiLink)
        : name.includes('Upi')
        ? "upi"
        : null,
    link: "",
  });

  useEffect(()=>{
    Singular.event("dashboard");
  },[]);

  const onPresCheck = () => {
    const formValid = simpleValidator.current.allValid();

    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
      return;
    }
    onPressSubmit(isLinkData);
  };

  // facebook twitter linkedin skype website whatsapp
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      swipeDirection="down"
      onRequestClose={onRequestClose}
    >
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor={colors.TRANSPARENT}
        // opacity={0.1}
        statusBarTranslucent
      />
      <TouchableWithoutFeedback onPress={() => onPressOutside()}>
        <View style={styles.addSocialProfileMainView}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.addSocialProfileView}>
              <Text style={styles.addSocialProfileTitle}>
                {I18n.t(globalText.addYour)} {name}:
              </Text>
              <View style={styles.marT25}>
                <CustomTextInput
                  headerName={I18n.t(globalText.enterNew) + " " + name}
                  placeholder={I18n.t(globalText.enterYourLink)}
                  term={isLinkData.link}
                  onChangeText={(value) => {
                    isLinkData.link = value;
                    setLinkData({ ...isLinkData });
                  }}
                  onBlur={() =>
                    CustomValidation.onBlurField(
                      simpleValidator,
                      allValid,
                      name
                    )
                  }
                  txtInptStyle={styles.addSocailProfStyleText}
                />
                {simpleValidator.current.message(
                  name,
                  isLinkData.link,
                  name.toLowerCase() != "upi link" ? "required|url" : "required"
                ) && (
                  <Text style={styles.redColorText}>
                    {isLinkData.link && isLinkData.link.length > 0 && name.toLowerCase() == "upi link"
                      ? I18n.t(globalText.upiLink, {
                          _firstValue: name.toLowerCase(),
                          _lastValue: "link",
                        })
                      : I18n.t(globalText._theMessageMustBeRequired, {
                          _message: name.toLowerCase(),
                        })}
                  </Text>
                )}
              </View>

              <View style={styles.addSocialProfileButtonView}>
                <CustomButton
                  buttonName={I18n.t(globalText.submit)}
                  addButtonStyle={styles.addSocialProfileSubmitButton}
                  onPress={() => onPresCheck()}
                />
                <View style={styles.marL15}>
                  <CustomButton
                    buttonName={I18n.t(globalText.cancel)}
                    addButtonStyle={styles.addSocialProfileCancelButton}
                    addButtonTextStyle={styles.greenText}
                    onPress={onPressCancel}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddSocialProfile;
