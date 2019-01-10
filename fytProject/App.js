import React from 'react';
import WorkoutPanel from './components/WorkoutPanel';
import DrawerNav from './components/Navigation/DrawerNav';
import { StyleSheet, Text, View } from 'react-native';
import WorkoutContainer from './components/containers/WorkoutContainer';
import { Provider } from 'react-redux';
import store from './store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    console.ignoredYellowBox = ['Remote debugger'];
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    else{
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <DrawerNav/>
          </View>
        </Provider>
      );
    }
  }
}