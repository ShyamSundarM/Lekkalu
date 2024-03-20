import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  FlatList,
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  DataTable,
  IconButton,
  RadioButton,
  SegmentedButtons,
} from 'react-native-paper';
import AddTransactionModal, {TxnRouteProp} from './AddTransactionModal';
import Transfer from './Transfer';
import database from '@react-native-firebase/database';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import RadioButtonIOS from 'react-native-paper/lib/typescript/components/RadioButton/RadioButtonIOS';

export type TxnData = {
  key: string;
  name: string;
  amount: number;
  date: string;
  isDebt: boolean;
};

function Transfers() {
  const [AddTxnModalVisible, setTxnModalVisible] = useState(false);
  const [txnData, setTxnData] = useState<Array<TxnData>>();
  const route = useRoute<TxnRouteProp>();
  const navigation = useNavigation();
  const enum SortDirections {
    Ascending = 'ascending',
    Descending = 'descending',
  }
  const enum SortOption {
    Amount = 'Amount',
    Date = 'Date',
  }
  const [sortByValue, setSortByValue] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  useEffect(() => {
    let data: Array<TxnData> = [];
    if (sortByValue === SortOption.Amount) {
      if (sortDirection === SortDirections.Ascending) {
        data = txnData.sort((a: TxnData, b: TxnData) => a.amount - b.amount);
      }
      if (sortDirection === SortDirections.Descending) {
        data = txnData.sort((a: TxnData, b: TxnData) => b.amount - a.amount);
      }
    }
    if (sortByValue === SortOption.Date) {
      if (sortDirection === SortDirections.Ascending) {
        data = txnData.sort(
          (a: TxnData, b: TxnData) =>
            new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
      }
      if (sortDirection === SortDirections.Descending) {
        data = txnData.sort(
          (a: TxnData, b: TxnData) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      }
    }
    if (data.length > 0) {
      console.log(data[0].date);
      console.log(Date.parse(data[0].date));
      setTxnData(prev => [...data]);
    }
  }, [sortByValue, sortDirection]);
  useEffect(() => {
    database()
      .ref('/Debtors')
      .child(route.params.name)
      .child('Txns')
      .on('value', snapShot => {
        let txnData_: TxnData[] = [];
        snapShot.forEach(childSnap => {
          txnData_.push({
            key: childSnap.key,
            name: childSnap.child('name').val(),
            amount: +childSnap.child('amount').val(),
            date: childSnap.child('date').val(),
            isDebt: childSnap.child('isDebt').val(),
          });
          return undefined;
        });
        setTxnData(txnData_);
      });
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton
            icon={'plus'}
            iconColor="#fff"
            size={28}
            onPress={() => setTxnModalVisible(true)}
          />
          {txnData && txnData.length > 0 && (
            <Text
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: '#4a9d9d',
                fontWeight: '600',
              }}>
              {txnData.reduce((acc, {amount}, index, arr) => {
                if (arr[index].isDebt) return acc + amount;
                else return acc - amount;
              }, 0)}
            </Text>
          )}
        </View>
      ),
    });
  }, [txnData]);

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <View style={{padding: 14, gap: 10}}>
            <View style={styles.sortItem}>
              <Text>Sort by : </Text>
              <SegmentedButtons
                style={{width: '65%'}}
                value={sortByValue}
                onValueChange={setSortByValue}
                buttons={[
                  {value: SortOption.Amount, label: 'Amount'},
                  {value: SortOption.Date, label: 'Date'},
                ]}
              />
            </View>
            <View style={styles.sortItem}>
              <Text>Direction : </Text>
              <SegmentedButtons
                style={{width: '65%'}}
                value={sortDirection}
                onValueChange={setSortDirection}
                buttons={[
                  {value: SortDirections.Ascending, label: 'Ascending'},
                  {value: SortDirections.Descending, label: 'Descending'},
                ]}
              />
            </View>
          </View>
        }
        style={{marginTop: 10}}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: '#dcdcdc',
              width: '80%',
              height: 1,
              alignSelf: 'center',
              marginVertical: 4,
            }}></View>
        )}
        data={txnData}
        renderItem={Item => <Transfer item={Item.item} />}
        keyExtractor={item => item.name}
      />
      <AddTransactionModal
        visible={AddTxnModalVisible}
        setVisible={setTxnModalVisible}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  dataTable: {
    backgroundColor: '#000',
  },
  sortItem: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
});
export default Transfers;
