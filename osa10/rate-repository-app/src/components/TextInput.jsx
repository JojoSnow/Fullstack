import {TextInput as NativeTextInput} from 'react-native';

import theme from '../style/theme';

const TextInput = ({ style, error, ...props }) => {
	const textInputStyle = [style];

	return (
		<NativeTextInput style={textInputStyle} placeholderTextColor={theme.colors.bgLight} {...props} />
	);
} 

export default TextInput;