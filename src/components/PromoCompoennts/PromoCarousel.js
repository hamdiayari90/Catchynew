import React, {Component} from 'react';
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, {colors} from './styles/index.style';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

export class PromoCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }
  _renderItemWithParallax({item, index}, parallaxProps) {

    return (
      
      <SliderEntry
        // events={this.props.events}
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        
      />
    );
  }

  mainExample(number, title) {
    const {slider1ActiveSlide} = this.state;

    return (
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={this.props.data}          
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={2000}
          autoplayInterval={3000}
          onSnapToItem={index => this.setState({slider1ActiveSlide: index})}
        />

    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{x: 1, y: 0}}
        endPoint={{x: 0, y: 1}}
        style={styles.gradient}
      />
    );
  }

  render() {
    const example1 = this.mainExample();

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
         
            {example1}
    
        </View>
      </SafeAreaView>
    );
  }
}
