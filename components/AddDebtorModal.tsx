import {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Button, Dialog, Portal, TextInput} from 'react-native-paper';
import database from '@react-native-firebase/database';

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddDebtorModal(props: Props) {
  const [DebtorNameField, setDebtorNameField] = useState<{
    name: string;
    error: boolean;
  }>({name: '', error: false});
  function OnOkClicK() {
    if (DebtorNameField.name === '') {
      setDebtorNameField(prev => ({...prev, error: true}));
    } else {
      database()
        .ref('/Debtors')
        .child(DebtorNameField.name)
        .set({name: DebtorNameField.name});
      setDebtorNameField(prev => ({...prev, name: '', error: false}));
      props.setVisible(false);
    }
  }
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={() => props.setVisible(false)}>
        <Dialog.Title>Add Debtor</Dialog.Title>
        <Dialog.Content>
          <TextInput
            error={DebtorNameField.error}
            label="Debtor Name"
            value={DebtorNameField.name}
            onChangeText={text =>
              setDebtorNameField(prev => ({...prev, name: text}))
            }
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={OnOkClicK}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {},
  modalContent: {
    width: '80%',
    height: '80%',
    backgroundColor: '#4b4b4b',
    alignSelf: 'center',
  },
});

export default AddDebtorModal;
