import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {IconButton} from 'react-native-paper';
import AddTransactionModal from './AddTransactionModal';

function Transfers() {
  const [AddTxnModalVisible, setTxnModalVisible] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={'plus'}
          size={28}
          onPress={() => setTxnModalVisible(true)}
        />
      ),
    });
  }, []);
  return (
    <View>
      <AddTransactionModal
        visible={AddTxnModalVisible}
        setVisible={setTxnModalVisible}
      />
    </View>
  );
}

export default Transfers;
