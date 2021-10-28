import { StyleSheet } from 'react-native'
export const HomeStyle = (color) => StyleSheet.create({
    main: {
        flex: 1
    },
    header_main: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    header_logo: {
        width: 27,
        height: 39,
        resizeMode: 'contain'
    },
    input: {
        height: 40,
        borderWidth: 0.7,
        width: '80%',
        borderRadius: 3,
        marginVertical: 8,
        borderColor: color.border,
        color: color.text
    },
    icon: {
        padding: 0
    }
})
