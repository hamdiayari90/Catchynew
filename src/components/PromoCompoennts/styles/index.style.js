import { StyleSheet } from 'react-native';
import { HEIGHT } from '../../../utils/Dimension';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    safeArea: {
        // borderWidth:0.5,
        // height:HEIGHT/3.2,
        flex:0.5,
        // backgroundColor:'#E5E5E5'

    },
    container: {
        flex: 1,
        // backgroundColor:colors.background2
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
   
    exampleContainer: {
        paddingVertical: 0
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 5,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        // paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});
