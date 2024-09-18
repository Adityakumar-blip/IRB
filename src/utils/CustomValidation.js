import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from '../helper/globalStyles';

class CustomValidation extends Component {
    fieldErrorMsg = (simpleValidator, fieldName, value, validationPattern, messages = {}) => {
        if (validationPattern && validationPattern.includes('required')) {
            const requiredMsg = `The ${fieldName.toLowerCase()} must be required.`;
            if (messages['messages']) {
                if (messages['messages']['required']) {
                    messages['messages']['required'] = requiredMsg;
                } else {
                    messages['messages'].required = requiredMsg;
                }
            } else {
                messages = {
                    messages: {
                        required: requiredMsg,
                    },
                };
            }
        }
        if (simpleValidator.current.message(fieldName, value, validationPattern, messages)) {
            return (
                <Text style={styles.validationText}>
                    {simpleValidator.current.message(fieldName, value, validationPattern, messages)}
                </Text>
            );
        }
        return null;
    };

    onBlurField = (simpleValidator, allValid, fieldName) => {
        if (!allValid) {
            simpleValidator.current.showMessageFor(fieldName);
        }
    };
}

export default new CustomValidation();
