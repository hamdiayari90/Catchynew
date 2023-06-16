import {StyleSheet, Platform} from 'react-native';
import { Color, Font } from '../../constants/colors/color';
import { HEIGHT, WIDTH } from '../../utils/Dimension';
export const CELL_SIZE = 40;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#c8d6e5';
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  // =======================

  root: {
    minHeight: 800,
    padding: 20,
  },
  title: {
    paddingTop: '20%',
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 20,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
  
    color: '#000',
    textAlign: 'center',
    fontWeight:'bold'
  },
  nextButton: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 300,
    marginBottom: 30,
    width: '70%',
    alignSelf: 'center',
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: Color.tertiary,
    fontWeight: 'bold',
    fontFamily: Font.primary,
  },
  codeError: {
    marginTop: 20,
  },
  resendCode: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'5%'
  },

  customButton: {
    borderRadius: 8,
    width: WIDTH / 2,
    backgroundColor: '#0984e3',
    alignSelf: 'center',
    height: HEIGHT / 14,
    justifyContent: 'center',
    marginTop:'10%'
  },
});

export default styles;
