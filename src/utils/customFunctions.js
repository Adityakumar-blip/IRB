import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';
import SharedService from '../services/sharedService/index';

export const jsonParse = jsonString => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return jsonString;
    }
};

export const cleanObjects = obj => {
    return Object.entries(obj).reduce((a, [k, v]) => (v || v === false || v === 0 ? ((a[k] = v), a) : a), {});
};

export const generateUrl = (url, extraParam = '', urlParams = {}) => {
    const searchParams = new URLSearchParams(cleanObjects(urlParams)).toString();

    let apiEndpoint = url;
    if (extraParam) {
        apiEndpoint = `${apiEndpoint}/${extraParam}`;
    }
    const returnTaskApi = `${apiEndpoint}${searchParams ? '?' + searchParams : ''}`;
    return returnTaskApi;
};

export const getFormatedDate = (date, format = 'mm/dd/yyyy') => {
    const arrFullMonth = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const arrShortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    format = format.toLowerCase();
    date = new Date(date);
    const getYear = date.getFullYear().toString();
    const getMonth = date.getMonth() + 1;
    const getDate = date.getDate().toString();
    format = format.replace('yyyy', getYear);
    format = format.replace('yy', getYear.substring(2));
    format = format.replace('mmmm', arrFullMonth[getMonth - 1]);
    format = format.replace('mmm', arrShortMonth[getMonth - 1]);
    format = format.replace('mm', getMonth < 10 ? '0' + getMonth : getMonth);
    format = format.replace('dd', getDate.length === 1 ? '0' + getDate : getDate);
    return format;
};

var SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
export const abbreviateNumber = number => {
    if (typeof number == 'number') {
        var tier = (Math.log10(Math.abs(number)) / 3) | 0;

        // if zero, we don't need a suffix
        if (tier == 0) return number;

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = number / scale;

        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    }
};

export const generateEndpointUrl = async (url, extraParam = '', urlParams = {}) => {
    const searchParams = await new URLSearchParams(await this.clean(urlParams)).toString();
    let apiEndpoint = url;
    if (extraParam) apiEndpoint = `${apiEndpoint}/${extraParam}`;
    const returnTaskApi = `${apiEndpoint}${searchParams ? '?' + searchParams : ''}`;
    return returnTaskApi;
};

// export function toastShow(msg = '') {
//     if (msg) {
//         setTimeout(() => {
//             Toast.show(msg);
//         }, 100);
//     }
// }

export function toastShow(msg = '', duration = 'SHORT', position = 'Bottom') {
    if (msg) {
        Toast.show(typeof msg === 'string' ? msg : JSON.stringify(msg), Toast[duration], Toast[position]);
    }
}

export const setAsyncStorage = async (key = '', value = '') => {
    if (key) {
        await AsyncStorage.setItem(key, value);
    }
};

export const getAsyncStorage = async (key = '') => {
    if (!key) {
        return key;
    }
    return await AsyncStorage.getItem(key);
};

export const removeAsyncStorage = (key = '') => {
    if (!key) {
        return key;
    }
    AsyncStorage.removeItem(key);
};

export const clearAsyncStorage = async () => {
    // const isObScreenDisplayed = (await JSON.parse(await getAsyncStorage('isIntroSeen'))) || false;
    await AsyncStorage.clear();
    // await setAsyncStorage('isIntroSeen', getJsonStringify(isObScreenDisplayed));
};

export const onClickLogout = async () => {
    await clearAsyncStorage();
};

export const getJsonStringify = (data = {}) => {
    return JSON.stringify(data);
};

export const getJsonParse = (jsonString = {}) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return jsonString;
    }
};

export async function getToken() {
    const token = await getJsonParse(await getAsyncStorage('Token'));
    return token || {};
}

export const doIfUserIsUnauthorized = async () => {
    await onClickLogout();
    SharedService.isUnauthorised.next(true);
};

export function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + ' year';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + ' month';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + ' days';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + ' hr';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + ' min';
    }
    return Math.floor(seconds) + ' sec';
}

export function getConvertDateToString(passingDate) {
    //passingDate it should be something but not empty string or you can add 2 dates passing first date in new date()
    let diffTime = Math.abs(new Date().valueOf() - new Date(passingDate).valueOf());
    let totalYearGap = new Date().getFullYear() - new Date(passingDate).getFullYear();
    let totalMonthGap = moment(new Date()).month() - moment(new Date(passingDate)).month();
    let totalWeekGap = moment(new Date()).week() - moment(new Date(passingDate)).week();
    let days = diffTime / (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    let secs = (minutes % 1) * 60;
    [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)];
    if (totalYearGap != 0) {
        return `${totalYearGap} year`;
    } else if (totalMonthGap != 0) {
        return `${totalMonthGap} month`;
    } else if (totalWeekGap != 0) {
        return `${Math.abs(totalWeekGap)} week`;
    } else if (days != 0) {
        return `${days} day`;
    } else if (hours != 0) {
        return `${hours} h`;
    } else if (minutes != 0) {
        return `${minutes} min`;
    } else if (secs != 0) {
        return `${secs} sec`;
    }
}

export function timeTakeToSignUp(passingDate) {
    //passingDate it should be something but not empty string or you can add 2 dates passing first date in new date()
    let diffTime = Math.abs(new Date().valueOf() - new Date(passingDate).valueOf());
    let totalYearGap = new Date().getFullYear() - new Date(passingDate).getFullYear();
    let totalMonthGap = moment(new Date()).month() - moment(new Date(passingDate)).month();
    let totalWeekGap = moment(new Date()).week() - moment(new Date(passingDate)).week();
    let days = diffTime / (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    // let secs = (minutes % 1) * 60;
    return minutes;
    // [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)];
    // if (totalYearGap != 0) {
    //     return `${totalYearGap} year`;
    // } else if (totalMonthGap != 0) {
    //     return `${totalMonthGap} month`;
    // } else if (totalWeekGap != 0) {
    //     return `${Math.abs(totalWeekGap)} week`;
    // } else if (days != 0) {
    //     return `${days} day`;
    // } else if (hours != 0) {
    //     return `${hours} h`;
    // } else if (minutes != 0) {
    //     return `${minutes} min`;
    // } else if (secs != 0) {
    //     return `${secs} sec`;
    // }
}

export const getNumberCheckDot = (value = 0) => {
    if (!value) return;
    if (value.toString().indexOf('.') != -1) {
        return Number(value).toFixed(1);
    } else {
        return value;
    }
};

export function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000);
}

export function subtractYears(numOfYears, date) {
    date.setFullYear(date.getFullYear() - numOfYears);
    return date;
}

export function addOneDay(date) {
    date.setDate(date.getDate() + 1);
    return date;
}

// export function getInThousand(number, decPlaces = 1) {
//     if (!number) return;
//     let checkNegative = false;
//     if (number.toString().includes('-')) {
//         checkNegative = true;
//     }
//     number = Math.abs(number);
//     decPlaces = Math.pow(10, decPlaces);
//     var abbrev = ['K', 'M', 'B', 'T'];
//     for (var i = abbrev.length - 1; i >= 0; i--) {
//         var size = Math.pow(10, (i + 1) * 3);
//         if (size <= number) {
//             number = (number * decPlaces) / size / decPlaces;
//             if (number.toString().indexOf('.') != -1) {
//                 number = number.toString().substring(0, 3);
//             }
//             if (number == 1000 && i < abbrev.length - 1) {
//                 number = 1;
//                 i++;
//             }
//             number += abbrev[i];
//             break;
//         }
//     }
//     if (number && number.toString().length > 3 && !number.toString().includes('-') && number.toString().includes('K')) {
//         let numToEdit = number.replace('K', '');
//         numToEdit = Number(numToEdit);
//         number = Number(numToEdit) + 'K';
//     }
//     return checkNegative ? `-${number}` : number;
// }

export function getInThousand(val, decPlaces = 1) {
    let endValue = '';
    let value = val;
    let isCheck = false;
    if (value.toString().indexOf('-') != -1) {
        isCheck = true;
        value = value.toString().substring(1, value.toString().length);
    }
    if (1000 <= value && value < 10000) {
        endValue = value.toString().substring(0, 1) + '.' + value.toString().substring(1, 2) + 'k';
    } else if (10000 <= value && value < 100000) {
        endValue = value.toString().substring(0, 2) + 'k';
    } else if (100000 <= value && value < 1000000) {
        return value.toString().substring(0, 3) + 'k';
    } else if (1000000 <= value && value < 10000000) {
        endValue = value.toString().substring(0, 1) + '.' + value.toString().substring(1, 2) + 'M';
    } else if (10000000 <= value && value < 100000000) {
        endValue = value.toString().substring(0, 2) + 'M';
    } else if (100000000 <= value && value < 1000000000) {
        endValue = value.toString().substring(0, 3) + 'M';
    } else if (1000000000 <= value && value < 10000000000) {
        endValue = value.toString().substring(0, 1) + '.' + value.toString().substring(1, 2) + 'B';
    } else if (10000000000 <= value && value < 100000000000) {
        endValue = value.toString().substring(0, 2) + 'B';
    } else if (100000000000 <= value && value < 1000000000000) {
        endValue = value.toString().substring(0, 3) + 'B';
    } else if (1000000000000 <= value && value < 10000000000000) {
        endValue = value.toString().substring(0, 1) + '.' + value.toString().substring(1, 2) + 'T';
    } else if (10000000000000 <= value && value < 100000000000000) {
        endValue = value.toString().substring(0, 2) + 'T';
    } else if (100000000000000 <= value) {
        endValue = value.toString().substring(0, 3) + 'T';
    } else {
        if (value.toString().indexOf('.') != -1) {
            endValue = value.toString().substring(0, 5);
        } else {
            endValue = value;
        }
    }
    if (isCheck) {
        return '-' + endValue;
    } else {
        return endValue;
    }
}

// function nFormatter(num) {
//     let formattedNumber= ''
//     let isNegative = false;
//     if (num < 0) {
//         isNegative = true;
//     }

//     if (num >= 1000000000) {
//         let newNum = num / 1000000000;
//         const calcDec = Math.pow(10, 1);
//         let newVal = Math.trunc(newNum * calcDec) / calcDec;
//         formattedNumber = newVal + 'G';
//     } else if (num >= 1000000) {
//         let newNum = num / 1000000;
//         const calcDec = Math.pow(10, 1);
//         let newVal = Math.trunc(newNum * calcDec) / calcDec;
//         formattedNumber = newVal.toFixed(0) + 'M';
//     } else if (num > 999 && num < 10000) {
//         let newNum = num / 1000;
//         const calcDec = Math.pow(10, 1);
//         let newVal = Math.trunc(newNum * calcDec) / calcDec;
//         formattedNumber = newVal.toFixed(1) + 'K';
//     } else if (num >= 10000 && num <= 1000000) {
//         let newNum = num / 1000;
//         const calcDec = Math.pow(10, 1);
//         let newVal = Math.trunc(newNum * calcDec) / calcDec;
//         formattedNumber = newVal.toFixed(0) + 'K';
//     } else {
//         formattedNumber = num;
//     }
//     if (isNegative) {
//         formattedNumber = '-' + formattedNumber;
//     }
//     return formattedNumber;
// }

export function checkPasswordVallidation(value) {
    // let result = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/.test(
    //     value,
    // );
    let result = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(value);
    return result;
}

export async function generateFCMToken() {
    const authStatus = await messaging().requestPermission({
        alert: true,
        announcement: false,
        badge: true,
        carPlay: true,
        provisional: false,
        sound: true,
    });
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        // getFcmToken(); //<---- Add this
        if (Platform.OS == 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
        const fcm = await getAsyncStorage('fcmToken');
        if (!fcm) {
            const fcm = await messaging().getToken();
            if (fcm) {
                await setAsyncStorage('fcmToken', fcm);
                // await AsyncStorage.setItem('fcmToken', );
                return fcm;
            }
        }
        return fcm;
    }
    return false;
}

export const notificationType = async type => {
    switch (type) {
        case 'demo_survey':
            return 'Dashboard';
        case 'redeem':
            return 'RedemptionRequestForm';
        case 'new_poll':
            return 'LatestPoleTrend';
        case 'new_survey':
            return 'LiveSurvey';
        default:
            return 'Dashboard';
    }
};
