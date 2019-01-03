import * as React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { Button, Card, Text, View, Form, Item, Input } from 'native-base';

export default class FormTrain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      statistic: '',
      counter: 0,
      typeholder: this.props.type,
      nameholder: this.props.name,
      inputholder: [],
      offsetX: new Animated.Value(0)
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleClick(event) {
    console.log(this.props.name);
    let tempholder = this.state.inputholder.slice();
    tempholder[this.state.counter] = this.state.statistic;
    if (this.state.counter < this.state.nameholder.length - 1) {
      this.setState({
        inputholder: tempholder,
        counter: this.state.counter + 1,
        statistic: ''
      });

      Animated.sequence([
        Animated.timing(this.state.offsetX, { toValue: -500, duration: 500 }),
        Animated.timing(this.state.offsetX, { toValue: 500, duration: 0 }),
        Animated.timing(this.state.offsetX, { toValue: 0, duration: 500 })
      ]).start();
    } else {
      this.setState({
        inputholder: tempholder,
        counter: this.state.counter + 1,
        statistic: ''
      });
      console.log('Go to next screen');
    }
  }

  handleBackClick(event) {
    if (this.state.counter > 0) {
      this.setState({
        counter: this.state.counter - 1
      });
      Animated.sequence([
        Animated.timing(this.state.offsetX, { toValue: 500, duration: 500 }),
        Animated.timing(this.state.offsetX, { toValue: -500, duration: 0 }),
        Animated.timing(this.state.offsetX, { toValue: 0, duration: 500 })
      ]).start();
    }
  }

  render() {
    let percent = (this.state.counter / this.state.nameholder.length) * 100;
    percent = percent.toString() + '%';
    return (
      <Animated.View
        style={{ transform: [{ translateX: this.state.offsetX }] }}
      >
        <Card>
          <View style={{ flexDirection: 'row' }}>
            <Button
              text="Back"
              style={styles.buttonView}
              onPress={this.handleBackClick}
              title="Back"
              name="Back"
            >
              <Text style={styles.textViewtwo}>Back</Text>
            </Button>
            <Text style={styles.textView}>
              {' '}
              {this.state.nameholder[this.state.counter]}
            </Text>

            <Button
              text="Submit"
              style={styles.buttonView}
              onPress={this.handleClick}
              title="Submit"
              name="Submit"
            >
              <Text style={styles.textViewtwo}>Submit</Text>
            </Button>
          </View>

          <View
            style={{
              width: percent,
              backgroundColor: '#3cc11f',
              height: '2%',
              marginTop: '1%',
              marginBottom: '1%'
            }}
          />

          <Text style={{ fontSize: 30 }}>
            Please Input {this.state.nameholder[this.state.counter]}
          </Text>

          <View style={{ backgroundColor: '#ffffff' }}>
            <Form>
              <Item regular>
                <Input
                  style={styles.textInputView}
                  onChangeText={statistic => this.setState({ statistic })}
                  value={this.state.statistic}
                  placeholder="Type here"
                />
              </Item>
            </Form>
          </View>
        </Card>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f98b7a'
  },

  textView: {
    width: '50%',
    height: 50,
    backgroundColor: '#FA5845',
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF'
  },

  inputView: {
    width: '100%',
    height: '10%',
    backgroundColor: '#FA5845',
    color: '#FFFFFF',
    alignItems: 'center'
  },

  textInputView: {
    margin: 10,
    height: 40,
    fontSize: 30,
    backgroundColor: '#e5e5e5',
    color: '#FFFFFF'
  },

  buttonView: {
    width: '25%',
    height: 50,
    textAlign: 'center',
    backgroundColor: '#FA5845',
    alignItems: 'center',
    color: '#FFFFFF'
  },

  textViewtwo: {
    fontSize: 15,
    color: '#FFFFFF'
  }
});