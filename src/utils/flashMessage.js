import {showMessage} from 'react-native-flash-message';
import {COLORS} from '../constants';

export const showSimpleMessage = (type = 'default', props = {}) => {
  const message = {
    type,
    ...props,
    // autoHide: false,
    // hideStatusBar: true,
    // style: {height: 80},
    backgroundColor: COLORS.primary,
    icon: {icon: 'auto', position: 'left'},
    message: props.message ? props.message : null,
    description: props.description ? props.description : null,
  };

  showMessage(message);
};
