import {ActivityIndicator, Modal, View} from 'react-native';
type Props = {
  visible: boolean;
};
function ActivityBlockingLoadingPanel(props: Props) {
  return (
    <Modal transparent visible={props.visible} animationType="fade">
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <ActivityIndicator color={'#ffffff'} size={40} />
      </View>
    </Modal>
  );
}

export default ActivityBlockingLoadingPanel;
