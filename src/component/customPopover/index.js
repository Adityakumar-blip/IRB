import React from 'react';
import Popover, { PopoverMode } from 'react-native-popover-view';

const CustomPopover = ({ isVisible, popoverStyle, onRequestClose, displayArea, placement, from, mode, children }) => {
    return (
        <Popover
            isVisible={isVisible}
            popoverStyle={popoverStyle}
            mode={mode_type(mode || '')}
            onRequestClose={onRequestClose}
            displayArea={displayArea}
            placement={placement}
            from={from}
        >
            {children}
        </Popover>
    );
};

const mode_type = (type = '') => {
    switch (type) {
        case 'TOOLTIP':
            return PopoverMode.TOOLTIP;
        case 'JS_MODAL':
            return PopoverMode.JS_MODAL;
        case 'RN_MODAL':
            return PopoverMode.RN_MODAL;
        default:
            return PopoverMode.TOOLTIP;
    }
};

export default CustomPopover;
