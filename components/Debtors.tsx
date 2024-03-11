import database from '@react-native-firebase/database';
import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Debtor from './Debtor';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import AddDebtorModal from './AddDebtorModal';

function Debtors() {
  const [DebtorNames, setDebtorNames] = useState<Array<string>>([]);
  const navigation = useNavigation();
  const [AddDebtorVisible, setAddDebtorVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={'plus'}
          size={28}
          onPress={() => setAddDebtorVisible(true)}
        />
      ),
    });
    database()
      .ref('/Debtors')
      .on('value', snapShot => {
        let names: string[] = [];
        snapShot.forEach(childSnap => {
          names.push(childSnap.key);
          return undefined;
        });
        setDebtorNames(names);
      });
  }, []);
  return (
    <View>
      <FlatList
        data={DebtorNames}
        keyExtractor={item => item}
        renderItem={item => <Debtor name={item.item} />}
      />
      <AddDebtorModal
        visible={AddDebtorVisible}
        setVisible={setAddDebtorVisible}
      />
    </View>
  );
}

export default Debtors;
