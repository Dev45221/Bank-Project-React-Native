import { StyleSheet } from 'react-native'
import { colors } from '../config/theme'

export const Styling = StyleSheet.create({
    heading: {
        color: colors.light.tint,
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'georgia',
        letterSpacing: 1,
        textAlign: 'center',
        margin: 10,
        marginBottom: 30
    },
    txt: {
        color: colors.light.tint,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'georgia',
        padding: 3,
        letterSpacing: 0.5,
    },
    txtLogo: {
        color: colors.light.tint,
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: 'georgia',
        padding: 3,
        letterSpacing: 0.5,
    },
    container: {
        width: '100%',
    },
    tabHeader: {
        backgroundColor: '#03346E',
    },
    tabTxtHeader: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    tabTitle: {
        marginHorizontal: 30,
        paddingRight: 10,
    },
    tabCell: {
        backgroundColor: 'white',
        padding: 10,
        paddingHorizontal: 10
    },
    tabTxtCell: {
        fontSize: 16.5,
        padding: 10,
        color: colors.light.tint
    }
})