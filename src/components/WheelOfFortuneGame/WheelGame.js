import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {Modal as MOD, Card} from 'react-native-paper';

import LottieView from 'lottie-react-native';
import W1 from '../../components/W1';
import W2 from '../../components/W2';
import W3 from '../../components/W3';

import WheelOfFortune from '../../components/react-native-wheel-of-fortune';
import {WIDTH} from '../../utils/Dimension';
import { Color, FontFamily, FontSize, Padding, Border } from "../../assets/wheel/GlobalStyles";

const participants = ['', '', '', '', '', ''];

const iconRewards = [
  {uri: 'https://www.catchy.tn/media/wheel/1.png'},
  {uri: 'https://www.catchy.tn/media/wheel/lose.png'},
  {uri: 'https://www.catchy.tn/media/wheel/3.png'},
  {uri: 'https://www.catchy.tn/media/wheel/loser.png'},
  {uri: 'https://www.catchy.tn/media/wheel/5.png'},
  {uri: 'https://www.catchy.tn/media/wheel/lost.png'},
];

export class WheelGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
      modalVisible: false,
      nbPlayerPotentiel: 0,
      winAngle: [
        [2145, 2175],
        [2025, 2055],
        [1910, 1945],
      ],
      loseAngle: [
        [2090, 2110],
        [1960, 2000],
        [2210, 2240],
      ],
      userInfo: {},
      winnerPosition: [],
      gifts: {},
      counter: 0,
      angle: 0,
      isWinner: false,
      userGift: {},
      currentIndex: null,
    };
    this.child = null;
  }
  componentDidMount() {
    this.getConfig();
  }

  async getConfig() {
    let config = await this.fetchWheelConfig();
    // console.log('config:', config)
    // console.log(
    //   "=========================================================================="
    // );
    // console.log(
    //   "=========================================================================="
    // );
    this.setState({
      winnerPosition: config.config[0]['winnerPosition'],
      gifts: JSON.parse(config.config[0]['gifts']),
      counter: config.config[0]['counter'],
    });
    // console.log(
    //   "=========================================================================="
    // );

    // console.log(
    //   "=========================================================================="
    // );

    if (this.state.winnerPosition.indexOf(this.state.counter) == -1) {
      // console.log('this.state.counter ==========================> lose', this.state.counter)
      // console.log('this.state.winnerPosition ==========================> lose', this.state.winnerPosition)

      let randomLosePosition = this.getRandomPosition(
        0,
        this.state.loseAngle.length,
      );

      let RandomLoseAngle = this.getRandomPosition(
        this.state.loseAngle[randomLosePosition][0],
        this.state.loseAngle[randomLosePosition][1],
      );
      this.setState({
        angle: RandomLoseAngle,
      });
    } else {
      // console.log(
      //   "========================= he is winnnnner ========================="
      // );
      // console.log('this.state.counter ==========================> winner ', this.state.counter)
      // console.log('this.state.winnerPosition ==========================> winner ', this.state.winnerPosition)

      let index;
      let count = 0;
      const maxIterations = 5;

      do {
        index = this.getRandomPosition(0, this.state.winAngle.length);
        count++;
      } while (this.state.gifts[index].nb == 0 && count < maxIterations);

      if (count >= maxIterations) {
        // console.log("No element found with nb > 0 after 10 iterations");
        let randomLosePosition = this.getRandomPosition(
          0,
          this.state.loseAngle.length,
        );

        let RandomLoseAngle = this.getRandomPosition(
          this.state.loseAngle[randomLosePosition][0],
          this.state.loseAngle[randomLosePosition][1],
        );
        // console.log("RandomLoseAngle:", RandomLoseAngle);

        // console.log("RandomLoseAngle when he is winnner :", RandomLoseAngle);

        this.setState({
          angle: RandomLoseAngle,
        });
      } else {
        //  console.log("index when win ===> ", index);
        let RandomWinAngle = this.getRandomPosition(
          this.state.winAngle[index][0],
          this.state.winAngle[index][1],
        );

        this.setState({
          angle: RandomWinAngle,
          userGift: this.state.gifts[index],
          currentIndex: index,
        });
      }

      this.setState({
        isWinner: true,
      });
    }
  }

  getRandomPosition = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  updateGiftList = async () => {
    let data = this.state.gifts;
    if (data[this.state.currentIndex].nb) {
      // console.log('data[this.state.currentIndex].nb:==========================', data[this.state.currentIndex].nb)
      data[this.state.currentIndex].nb = data[this.state.currentIndex].nb - 1;
      this.setState({
        gifts: data,
      });
      let gifts = {
        gifts: this.state.gifts,
      };
      // console.log("gifts:", gifts);

      try {
        const requestOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(gifts),
        };
        let result = await fetch(
          `http://145.239.166.14:8088/wheel/config/gifts/${this.props.eventId}`,
          requestOptions,
        );
        // console.log(
        //   '############################## user winnner ####################################"',
        //   this.state.gifts
        // );
        return result.json();
      } catch (e) {}
    }
  };

  fetchWheelConfig = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      let result = await fetch(
        `http://145.239.166.14:8088/wheel/config/${this.props.eventId}`,
        requestOptions,
      );
      return result.json();
    } catch (e) {}
  };

  // ==========================================================================================================
  // ========================================== UPDATER COUNTER ===============================================
  // ==========================================================================================================

  updateCounter = async () => {
    try {
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      let result = await fetch(
        `http://145.239.166.14:8088/wheel/config/counter/${this.props.eventId}`,
        requestOptions,
      );
      return result.json();
    } catch (e) {}
  };

  async incrementCounterWhenPressSpin() {
    let update = await this.updateCounter();
  }
  //  show and hide modal here
  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  // press button to start game
  buttonPress = async () => {
    this.setState({
      started: true,
    });
    this.child._onPress();
    let postResponse = await this.postUSerInfoByEventName();
  };

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** REgister User After Spin  ************* ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  async postUSerInfoByEventName() {
    const {firstname, email, lastname, mobilePhone} = this.props.userInfo;

    let data = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      phone: mobilePhone,
      score: '0',
      eventId: this.props.eventId,
    };

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
      };
      let loyaltyPoints = await fetch(
        `http://145.239.166.14:8088/wheel/result`,
        requestOptions,
      );
      let response = loyaltyPoints.json();
      return response;
    } catch (e) {}
  }
  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** fetchUSerInforamtion  ****************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  async fetchUSerInforamtion(token) {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      let loyaltyPoints = await fetch(
        `http://94.237.82.88:8082/user/${token}`,
        requestOptions,
      );
      let response = loyaltyPoints.json();
      return response;
    } catch (e) {}
  }
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  updateGifts = async () => {
    let result = await this.updateGiftList();
    // console.log("updateGiftList:", result);
  };

  updateUserScoreWhenWin = async () => {
    const {mobilePhone} = this.props.userInfo;
    // console.log("user Gifts ==================> ", this.state.userGift);
    //  console.log("current index  ==================> ", this.state.currentIndex);

    let score = {
      imgUrl: iconRewards[2 * this.state.currentIndex],
      name: this.state.userGift.name,
      currentIndex: this.state.currentIndex,
    };

    //console.log('score===== to update :', score)

    try {
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({score: score}),
      };
      let result = await fetch(
        `http://145.239.166.14:8088/wheel/result/${this.props.eventId}/${mobilePhone}`,
        requestOptions,
      );
      return result.json();
    } catch (e) {}
  };

  updateScore = async () => {
    let updateuser = await this.updateUserScoreWhenWin();
  };

  render() {
    const wheelOptions = {
      rewards: participants,
      knobSize: 30,
      borderWidth: 1,
      innerRadius: 50,
      
      duration: 6000,
      knobSource: require('../../assets/wheel/knob1.png'),
      sizeIconReward: 80,
      iconRewards: iconRewards,
      onRef: ref => (this.child = ref),
    };
    const {modalVisible, isWinner} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.centeredView}>
          
        <ImageBackground
    source={require('../../assets/wheel/roue.png')}
    style={{
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
    }}>
            {!modalVisible ? (
              <>
                <View style={styles.modalView}>
                  <View style={{}}>
                    <View style={{marginTop: '10%'}}>
                      <WheelOfFortune
                        closeModal={this.props.closeModal}
                        options={wheelOptions}
                        getWinner={(value, index) => {
                          this.setState({
                            winnerValue: value,
                            winnerIndex: index,
                          });
                          this.incrementCounterWhenPressSpin();
                          if (this.state.isWinner) {
                            this.updateGifts();
                            this.updateScore();
                          }

                          setTimeout(() => {
                            this.setModalVisible(true);
                          }, 1500);
                        }}
                        angle={this.state.angle ? this.state.angle : 2100}
                      />
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => this.buttonPress()}
                  style={{
                   
                    borderColor: '#e1b12c',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: FontFamily.poppinsSemiBold,
                      fontSize: 20,
                      fontWeight: "800",
                      top: 'auto',
                    }}>
                    Tourne
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View>
                <Card
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  {!isWinner ? (
                    <W3 />

                  ) : (
                    <W1 giftName={this.state.userGift.name} />

                  )}
                </Card>
              </View>
            )}
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#dfe6e9',
  },
  startButtonView: {
    position: 'absolute',
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 50,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainButton: {
    padding: 10,
  },
  winnerText: {
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // marginTop: 22,
  },
  modalView: {
    flex: 0.5,
    alignSelf: 'center',
    width: '90%',
    top: -30,
    margin: 2,
    // backgroundColor: '#f1f2f6',
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
});
