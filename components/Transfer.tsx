import {View, Text, StyleSheet, Pressable} from 'react-native';
import {TxnData} from './Transfers';
import {} from 'react-native-paper';

type Props = {
  item: TxnData;
};

function Transfer(props: Props) {
  return (
    <View style={styles.root}>
      <Pressable
        android_ripple={{color: '#6f6f6f', borderless: true}}
        onPress={() => {}}>
        <View style={styles.innerCtr}>
          <View style={styles.left}>
            <Text style={styles.reason}>{props.item.name}</Text>
            <Text style={styles.date}>{props.item.date}</Text>
          </View>
          <View
            style={[
              styles.right,
              props.item.isDebt
                ? {backgroundColor: '#9fd09f'}
                : {backgroundColor: '#d1a59a'},
            ]}>
            <Text style={styles.amount}>₹{props.item.amount}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    display: 'flex',
    backgroundColor: '#d9cece',
    overflow: 'hidden',
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
  },
  innerCtr: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  left: {width: '80%', alignItems: 'baseline'},
  right: {
    padding: 10,
    borderRadius: 10,
  },
  date: {
    fontWeight: '500',
    borderRadius: 6,
    borderWidth: 1,
    padding: 4,
    color: '#004459',
    marginTop: 4,
  },
  amount: {fontWeight: '600'},
  reason: {fontSize: 15},
});
export default Transfer;
