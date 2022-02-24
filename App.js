import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {
  ViroARScene,
  ViroConstants,
  ViroARSceneNavigator,
  ViroARImageMarker,
  ViroARTrackingTargets,
  ViroImage,
  ViroAmbientLight,
  Viro3DObject,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('start', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText('!');
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
  ViroARTrackingTargets.createTargets({
    'snake': {
      source: require('./res/snake.png'),
      orientation: 'Up',
      physicalWidth: 0.25,
      type: 'image',
    },
    'singe': {
      source: require('./res/singe.png'),
      orientation: 'Up',
      physicalWidth: 0.25,
      type: 'image',
    },
    'elephant': {
      source: require('./res/elephant.png'),
      orientation: 'Up',
      physicalWidth: 0.25,
      type: 'image',
    },
  });

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroARImageMarker target={'elephant'}>
        <ViroAmbientLight color="#ffffff" />
        <Viro3DObject
          source={require('./res/elephant.obj')}
          highAccuracyEvents={true}
          position={[1, 2, 0]}
          scale={[2, 2, 2]}
          rotation={[45, 0, 0]}
          type="OBJ"
          transformBehaviors={['billboard']}
        />
      </ViroARImageMarker>
      <ViroARImageMarker target={'singe'}>
        <ViroAmbientLight color="#ffffff" />
        <Viro3DObject
          source={require('./res/monkey-edit.obj')}
          resources={[require('./res/monkey-edit.mtl')]}
          highAccuracyEvents={true}
          position={[1, 2, 0]}
          scale={[2, 2, 2]}
          rotation={[45, 0, 0]}
          type="OBJ"
          transformBehaviors={['billboard']}
        />
      </ViroARImageMarker>
      <ViroARImageMarker target={'snake'}>
        <ViroAmbientLight color="#ffffff" />
        <Viro3DObject
          source={require('./res/snake.obj')}
          resources={[require('./res/snake.mtl')]}
          highAccuracyEvents={true}
          position={[1, 2, 0]}
          scale={[2, 2, 2]}
          rotation={[45, 0, 0]}
          type="OBJ"
          transformBehaviors={['billboard']}
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
};

const ArSceneL = () => {

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');

  function senddata() {
    console.log(name + mail);
    var http = new XMLHttpRequest();
    http.open(
      'GET',
      'http://192.168.1.29:3000/insert?nom=' + name + '&mail=' + mail,
    );
    http.send();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Céréalis</Text>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
        style={styles.f1}
      />
      <Text style={styles.label}>Name :</Text>
      <TextInput
        style={styles.text_input}
        placeholder="Name"
        onChangeText={newName => setName(newName)}
        defaultValue={name}
      />
      <Text style={styles.label}>Mail :</Text>
      <TextInput
        style={styles.text_input}
        placeholder="Mail"
        onChangeText={newMail => setMail(newMail)}
        defaultValue={mail}
      />
      <Button
        onPress={senddata}
        title="Register"
        color="#e28743"
        style={styles.button}
      />
    </View>
  );
};

export default () => {
  return (
    <>
      <ArSceneL />
    </>
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 40,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  button: {
    position: 'absolute',
    bottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: '#e28743',
    padding: 10,
  },
  text_input: {
    fontSize: 25,
    padding: 5,
    color: 'black',
    height: 30,
  },
  label: {
    fontSize: 25,
    padding: 5,
    color: '#e28743',
  },
});
