import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Alert,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {NavParamList} from '../App';
import {Swipeable} from 'react-native-gesture-handler';
import {Button, Dialog, Portal} from 'react-native-paper';
import {useState} from 'react';
import database from '@react-native-firebase/database';

type Props = {
  name: string;
};
type NavProp = NativeStackNavigationProp<NavParamList, 'transfers'>;

function Debtor(props: Props) {
  const navigation = useNavigation<NavProp>();
  function rightActions() {
    return (
      <View
        style={{display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>
        <Button
          textColor="red"
          onPress={() =>
            Alert.alert('Alert', 'Sure to delete ?', [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Ok',
                onPress: () => {
                  database().ref('/Debtors').child(props.name).remove();
                },
              },
            ])
          }>
          Delete
        </Button>
      </View>
    );
  }
  return (
    <Swipeable useNativeAnimations renderRightActions={rightActions}>
      <View style={styles.container}>
        <Pressable
          style={styles.innerContainer}
          android_ripple={{color: '#dcdcdc', borderless: true}}
          onPress={() => {
            navigation.navigate('transfers', {name: props.name});
          }}>
          <Text style={styles.name}>{props.name}</Text>
        </Pressable>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#4b4b4b',
    width: '95%',
    alignSelf: 'center',
  },
  name: {
    color: '#ffffff',
  },
});

export default Debtor;
