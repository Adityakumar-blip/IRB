import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../../helper/globalStyles';
import CustomCheckBox from '../../component/customCheckBox/index';
import CustomButton from '../customButton/index';
import CustomRadioButton from '../customRadio/index';
// import I18n from "src/i18n";
import I18n from '../../i18n/index';
import {globalText} from '../../helper/globalText';
import FastImage from '../FastImage';
import GlobalImages from '../../helper/globalImages';

const CustomDynamicForm = props => {
  const {
    question,
    inSideValue,
    noNeedBorder,
    quesTextStyleExtra,
    extraStyle,
    imp,
    isCheckBox,
    emailConsent,
    questionContent,
    isChildCheckBox,
  } = props;

  useEffect(() => {}, [emailConsent]);

  const [openConsent, setConsent] = useState(false);

  const [withDrawConsent, setWithDraw] = useState(false);

  const [isYes, setYes] = useState(false);
  const [isNo, setNo] = useState(false);

  const onRequestClose = () => {
    // setConsent(false);
    setWithDraw(false);
    setCategoryEnable(false);
  };
  return (
    <View style={[styles.CustomDynamicFormMainView, extraStyle]}>
      <View
        style={
          noNeedBorder
            ? styles.CustomDFBorderViewNew
            : styles.CustomDFBorderView
        }>
        {questionContent && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: -24,
              marginBottom: 5,
            }}>
            <Text style={{fontSize: 11, width: '80%'}} numberOfLines={1}>
              {questionContent}
            </Text>
            <Text
              style={{
                textDecorationLine: 'underline',
                padding: 2,
                fontSize: 11,
              }}
              onPress={() => {
                setConsent(true);
              }}>
              {I18n.t(globalText.more)}
            </Text>
          </View>
        )}
        <View style={styles.directionRow}>
          <View>
            {isCheckBox && (
              <CustomCheckBox
                checkValue={emailConsent == 0 ? false : true}
                onPressCheckBox={() => {
                  if (emailConsent == 1) {
                    setWithDraw(true);
                  } else {
                    props.setEmailConsent(emailConsent);
                  }
                }}
                style={{margin: 10}}
              />
            )}

            {isChildCheckBox && (
              <CustomCheckBox
                checkValue={emailConsent == 0 ? false : true}
                onPressCheckBox={() => {
                  // alert(item1?.categoryConsent)
                  let data = {
                    question_id: '',
                    categoryConsent: '',
                  };
                  if (emailConsent == 1) {
                    props.setWithDrawConsent();
                  } else {
                    props.setEmailConsent();
                  }
                }}
                style={{margin: 0}}
              />
            )}
          </View>

          <View style={{marginLeft: 5}}>
            <Text style={[styles.quesTextStyle, quesTextStyleExtra]}>
              {question}
              {imp && <Text style={styles.redTxt}> *</Text>}
            </Text>
          </View>
        </View>

        {inSideValue}

        {(openConsent || withDrawConsent) && (
          <Modal
            visible={openConsent || withDrawConsent}
            animationType="slide"
            transparent={true}
            swipeDirection="down"
            onRequestClose={onRequestClose}
            backgroundColor="red">
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: withDrawConsent ? 210 : 300,
                  width: 350,
                  opacity: 1,
                  backgroundColor: '#FFF',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setConsent(false);
                    setWithDraw(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1,
                    padding: 5,
                  }}>
                  <FastImage
                    style={{
                      height: 16,
                      width: 16,
                    }}
                    source={GlobalImages.crossIcon}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 20,
                    paddingHorizontal: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginBottom: 10,
                    }}>
                    {I18n.t(globalText.Note)}
                  </Text>
                  {!withDrawConsent && (
                    <Text
                      style={{color: 'black', marginBottom: 15, padding: 10}}>
                      {questionContent}
                    </Text>
                  )}
                  {withDrawConsent && (
                    <>
                      <Text
                        style={{color: 'black', marginBottom: 0, padding: 10}}>
                        {I18n.t(globalText.are_you_sure)}
                      </Text>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 15,
                          width: '35%',
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <CustomRadioButton
                            checkValue={isYes}
                            onPressRadio={() => {
                              setYes(true);
                              setNo(false);
                            }}
                          />
                          <Text style={{marginLeft: 10}}>
                            {I18n.t(globalText.yes)}
                          </Text>
                        </View>

                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <CustomRadioButton
                            checkValue={isNo}
                            onPressRadio={() => {
                              setYes(false);
                              setNo(true);
                            }}
                          />
                          <Text style={{marginLeft: 10}}>
                            {I18n.t(globalText.no)}
                          </Text>
                        </View>
                      </View>
                    </>
                  )}
                  {withDrawConsent && (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <CustomButton
                        onPress={() => {
                          if (isYes) {
                            props.setEmailConsent(emailConsent);
                          }
                          setConsent(false);
                          setWithDraw(false);
                        }}
                        addButtonStyle={styles.prAndSettSurveySaveStyle}
                        addButtonTextStyle={styles.fontSize14}
                        buttonName={I18n.t(globalText.update)}
                      />

                      <CustomButton
                        onPress={() => {
                          setConsent(false);
                          setWithDraw(false);
                        }}
                        addButtonStyle={styles.prAndSettSurveyCloseStyle}
                        addButtonTextStyle={styles.fontSize14}
                        buttonName={I18n.t(globalText.cancel)}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};
export default CustomDynamicForm;
