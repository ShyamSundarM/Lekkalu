import {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Button, Dialog, Portal, Switch, TextInput} from 'react-native-paper';
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NavParamList} from '../App';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type FieldType = {
  value: string;
  error: boolean;
};

type DateFieldType = {
  value: Date;
  error: boolean;
};
type TxnRouteProp = RouteProp<NavParamList, 'transfers'>;

function AddTransactionModal(props: Props) {
  const route = useRoute<TxnRouteProp>();
  const [TxnNameField, setTxnNameField] = useState<FieldType>({
    value: '',
    error: false,
  });
  const [TxnAmountField, setTxnAmountField] = useState<FieldType>({
    value: '',
    error: false,
  });
  const [inputDate, setInputDate] = useState<DateFieldType>({
    value: new Date(),
    error: false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [switchValue, setSwitchValue] = useState(true);
  function OnOkClicK() {
    if (TxnNameField.value === '') {
      setTxnNameField(prev => ({...prev, error: true}));
    } else if (TxnAmountField.value === '') {
      setTxnAmountField(prev => ({...prev, error: true}));
    } else {
      database()
        .ref('/Debtors')
        .child(route.params.name)
        .child('Txns')
        .push()
        .set({
          name: TxnNameField.value,
          amount: TxnAmountField.value,
          isDebt: switchValue,
          date: inputDate.value.toLocaleDateString(),
        });
      setTxnNameField(prev => ({...prev, value: '', error: false}));
      setTxnAmountField(prev => ({...prev, value: '', error: false}));
      props.setVisible(false);
    }
  }
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={() => props.setVisible(false)}>
        <Dialog.Title style={styles.titleRoot}>
          <Text style={styles.titleText}>Add Transaction</Text>
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.dialogContent}>
            <TextInput
              error={TxnNameField.error}
              label="Transaction Name"
              value={TxnNameField.value}
              onChangeText={text =>
                setTxnNameField(prev => ({...prev, value: text, error: false}))
              }
            />
            <View style={styles.amountRoot}>
              <TextInput
                style={styles.amount}
                error={TxnAmountField.error}
                label="Amount"
                keyboardType="numeric"
                value={TxnAmountField.value}
                onChangeText={text =>
                  setTxnAmountField(prev => ({
                    ...prev,
                    value: text,
                    error: false,
                  }))
                }
              />
              <View style={styles.switchRoot}>
                <Text style={styles.switchText}>Is Debt </Text>
                <Switch
                  value={switchValue}
                  onValueChange={() => setSwitchValue(prev => !prev)}
                />
              </View>
            </View>
            <TextInput
              label={'Date'}
              value={inputDate.value.toLocaleDateString()}
              right={
                <TextInput.Icon
                  icon="calendar-range"
                  onPress={() => setShowDatePicker(true)}
                />
              }
            />
            <DatePicker
              modal
              mode="date"
              open={showDatePicker}
              date={inputDate.value}
              onConfirm={date => {
                setShowDatePicker(false);
                setInputDate(prev => ({...prev, value: date}));
              }}
              onCancel={() => setShowDatePicker(false)}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={OnOkClicK}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  amount: {
    flex: 1,
  },
  amountRoot: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  switchText: {
    fontWeight: 'bold',
    verticalAlign: 'middle',
    textAlignVertical: 'center',
  },
  titleRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    backgroundColor: '#4b4b4b',
    alignSelf: 'center',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  switchRoot: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 24,
  },
});

export default AddTransactionModal;
