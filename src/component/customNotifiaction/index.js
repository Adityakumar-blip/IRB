import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import FastImage from 'react-native-fast-image';
import { globalText } from '../../helper/globalText';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import colors from '../../styles/colors';
import I18n from '../../i18n/index';

const CustomNotifiaction = props => {
    const { time, onPressCheckOut, descrp, checkName, isolderTrue, onPressNotification, read, link, activeOpacity } =
        props;
    return (
        <View>
            {isolderTrue && (
                <View style={styles.cNMainHeadeView}>
                    <Text style={styles.cNMainHeadeStryle}>{I18n.t(globalText.olderNotifications)}</Text>
                </View>
            )}
            <TouchableOpacity onPress={onPressNotification} style={styles.cNMainview} activeOpacity={activeOpacity}>
                <View style={styles.width20Per}>
                    <View style={[styles.cMIFirstView, styles.marT10]}>
                        <FastImage
                            style={styles.cNAwardStyle}
                            source={
                                checkName == 'sign_up_bonus'
                                    ? GlobalImages.nBonus
                                    : checkName == 'profile_survey_completed'
                                    ? GlobalImages.nCongratulations
                                    : checkName == 'profile_survey_not_completed'
                                    ? GlobalImages.nSurvey
                                    : checkName == 'poll_reward'
                                    ? GlobalImages.nPollPoint
                                    : checkName == 'referral_bonus'
                                    ? GlobalImages.nReferralReward
                                    : checkName == 'coupon_reward'
                                    ? GlobalImages.nCouponReward
                                    : checkName == 'profile_not_updated'
                                    ? GlobalImages.nMissedYou
                                    : checkName == 'referred_user_created_account'
                                    ? GlobalImages.nCongratulations
                                    : checkName == 'referred_user_approved'
                                    ? GlobalImages.nAccountApproved
                                    : checkName == 'referred_user_rejected'
                                    ? GlobalImages.nAccountRejected
                                    : checkName == 'new_poll_available'
                                    ? GlobalImages.nSurvey
                                    : checkName == 'refer_more_user'
                                    ? GlobalImages.nOfferEnds
                                    : checkName == 'survey_reward'
                                    ? GlobalImages.nReferralReward
                                    : checkName == 'coupn_rejected'
                                    ? GlobalImages.nCouponRrejected
                                    : checkName == 'new_survey_available'
                                    ? GlobalImages.nSurvey
                                    : checkName == 'b2b_survey_incomplete'
                                    ? GlobalImages.b2bsurvey
                                    : null
                            }
                            resizeMode={'contain'}
                        />
                    </View>
                </View>
                <View style={styles.cNMiddleView}>
                    <View style={styles.width80Per}>
                        <Text style={[read == 1 ? styles.cNdescrpTextStyleRead : styles.cNdescrpTextStyle]}>
                            {descrp}
                        </Text>
                        {checkName == 'new_poll_available' && (
                            <TouchableOpacity onPress={onPressCheckOut}>
                                <Text style={styles.cNMsgTextStyle}>{I18n.t(globalText.checkItOut)}</Text>
                            </TouchableOpacity>
                        )}
                        {checkName == 'refer_more_user' && (
                            <TouchableOpacity onPress={onPressCheckOut}>
                                <Text style={styles.cNMsgTextStyle}>{I18n.t(globalText.referYourFriend)}</Text>
                            </TouchableOpacity>
                        )}
                        {checkName == 'new_survey_available' && (
                            <TouchableOpacity onPress={onPressCheckOut}>
                                <Text style={styles.cNMsgTextStyle}>{I18n.t(globalText.checkItOut)}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.width20Per}>
                        <Text style={styles.cNTimeTextStyle}>{time || ''}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default CustomNotifiaction;
