import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {NavParamList} from '../App';

type Props = {
  name: string;
};
type NavProp = NativeStackNavigationProp<NavParamList, 'transfers'>;
function Debtor(props: Props) {
  const navigation = useNavigation<NavProp>();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.innerContainer}
        android_ripple={{color: '#dcdcdc', borderless: true}}
        onPress={() => {
          navigation.navigate('transfers', {name: props.name});
        }}>
        <Text>{props.name}</Text>
      </Pressable>
    </View>
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
});

export default Debtor;
