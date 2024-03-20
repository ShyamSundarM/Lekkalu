import database from '@react-native-firebase/database';
import {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Debtor from './Debtor';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import AddDebtorModal from './AddDebtorModal';
import ActivityBlockingLoadingPanel from './ActivityBlockingLoadingPanel';

function Debtors() {
  const [DebtorNames, setDebtorNames] = useState<Array<string>>([]);
  const navigation = useNavigation();
  const [AddDebtorVisible, setAddDebtorVisible] = useState(false);
  const [isDebtorNamesFetching, setIsDebtorNamesFetching] = useState(false);
  const [debtorNamesInitialFetching, setDebtorNamesInitialFetching] =
    useState(true);
  async function fetchDebtorNames() {
    setIsDebtorNamesFetching(true);
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
    setIsDebtorNamesFetching(false);
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={'plus'}
          size={28}
          iconColor="#fff"
          onPress={() => setAddDebtorVisible(true)}
        />
      ),
    });
    async function run() {
      await fetchDebtorNames();
      setDebtorNamesInitialFetching(false);
    }
    run();
  }, []);
  return (
    <View>
      <ActivityBlockingLoadingPanel visible={debtorNamesInitialFetching} />
      <FlatList
        data={DebtorNames}
        refreshing={isDebtorNamesFetching}
        onRefresh={() => fetchDebtorNames()}
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
