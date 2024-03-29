import { Platform } from "react-native";

const theme = {
	colors: {
		textPrimary: '#24292e',
		textSecondary: '#586069',
		textLight: '#e1e6eb',		
		primary: '#0366d6',
		secondary: '#24292e',
		bgLight: '#98989c',
		bgRed: '#e0103d',
		error: '#a81813'
	},
	fontSizes: {
		body: 14,
		subheading: 16
	},
	fonts: {
		main: Platform.select({
			android: 'Roboto',
			ios: 'Arial',
			default: 'System'
		})
	},
	fontWeights: {
		normal: '400',
		bold: '700'
	}
};

export default theme;