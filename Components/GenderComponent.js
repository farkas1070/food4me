import React, { useState, } from 'react';
import { StyleSheet, View, Text, ImageBackground, KeyboardAvoidingView, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useFonts } from 'expo-font';
import CustomFont from '../fonts/myfont.otf';
import GenderAsset from "../assets/gender.png"
import QuestionAsset from "../assets/question2.png"
import AgeAsset from "../assets/age.png"
import ExcersizeAsset from "../assets/excersize.png"
import ResultAsset from "../assets/results.png"
import WeightAsset from "../assets/weight.png"
import SuccessAsset from "../assets/success.png"
import { db } from "../firebase-config";
import { collection } from "firebase/firestore"
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { auth } from "../firebase-config";
import { RadioButton } from 'react-native-paper';
import Background from '../assets/test.jpg'
const GenderComponent = ({ navigation }) => {
  const [value, setValue] = React.useState('')
  const [bmr, setBMR] = React.useState(0)
  const [amr, setAMR] = React.useState(0)
  const [bmi, setBMI] = React.useState(0)
  const [text, setText] = React.useState("");
  const [weightText, setWeightText] = React.useState("");
  const [ageText, setAgeText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [leftBorderValue, setLeftBorderValue] = React.useState(0)
  const [rightBorderValue, setRightBorderValue] = React.useState(0)
  const [checked, setChecked] = React.useState('');
  const ref = React.useRef(PagerView);
  const calculateData = () => {
    console.log(value, text, weightText, ageText, checked)
    if (value == 'Male') {
      let malevalue = 66.47
      let weightvalue = 13.75 * weightText
      let heightvalue = 5.003 * text
      let agevalue = 6.755 * ageText
      let temporarybmr = malevalue + weightvalue + heightvalue - agevalue
      let heightinmeters = text / 100
      console.log(heightinmeters)
      let squareheight = heightinmeters * heightinmeters
      setBMI(weightText / squareheight)
      setBMR(temporarybmr)
      setAMR(temporarybmr * checked)

    } else {
      femalevalue = 655.1
      weightvalue = 9.563 * weightText
      heightvalue = 1.850 * text
      agevalue = 4.676 * ageText
      let temporarybmr = malevalue + weightvalue + heightvalue - agevalue
      let heightinmeters = text / 100
      let squareheight = heightinmeters * heightinmeters
      setBMI(weightText / squareheight)
      setBMR(temporarybmr)
      setAMR(temporarybmr * checked)

    }

  }
  const UploadData = async () => {

    const userRef = doc(db, 'Users', auth.currentUser.uid);
    await updateDoc(userRef, {
      height: text,
      age: ageText,
      weight: weightText,
      gender: value,
      BMR: bmr,
      AMR: amr,
      BMI: bmi

    })
      .then(() => {
        console.log('Document updated successfully');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  }
  const goToNextPage = () => {
    const nextIndex = currentIndex + 1;
    ref.current.setPage(nextIndex )
    setCurrentIndex(nextIndex);
  };

  const goToPrevPage = () => {
    const prevIndex = currentIndex - 1;
    ref.current.setPage(prevIndex )
    setCurrentIndex(prevIndex);
  };
  const onPageSelected = (event) => {
    const { position } = event.nativeEvent;
    setCurrentIndex(position);
  };

  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.maincontainer}>
      <PagerView style={styles.viewPager} initialPage={currentIndex} ref={ref} scrollEnabled={false} onPageSelected={onPageSelected}>
        <View style={styles.page} key="1">
          <ImageBackground source={Background} resizeMode="cover" style={styles.imagebackground}>

            <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
              <View style={{ width: '100%' }}>
                <Image
                  style={styles.AssetImage}
                  source={SuccessAsset}
                  resizeMode='contain'
                />
                <Text style={styles.topText}>Success! Your Account has been created</Text>
                <Text style={{ fontFamily: 'CustomFont', fontSize: 15, color: 'black', marginLeft: 30, marginRight: 30, textAlign: 'center' }}>To continue, we need to ask a few questions first...</Text>
              </View>

              <Button icon="arrow-right-bold" buttonColor='white' mode="elevated" onPress={() => { goToNextPage(); }} style={{ marginBottom: 50 }}>
                Next
              </Button>
            </View>

          </ImageBackground>

        </View>
        <View style={styles.page} key="2">
          <ImageBackground source={Background} resizeMode="cover" style={styles.imagebackground}>

            <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
              <View style={{ width: '100%' }}>
                <Image
                  style={styles.AssetImage}
                  source={GenderAsset}
                  resizeMode='contain'
                />
                <Text style={styles.topText}>What is your Gender?</Text>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'space-between', justifyContent: 'center', padding: 15, marginTop: 50 }}>
                  <Button icon="gender-male" buttonColor='#00FFFF' mode="elevated" onPress={() => { setValue('Male'); setLeftBorderValue(3); setRightBorderValue(0) }} style={{ flex: 1, marginRight: 10, borderWidth: leftBorderValue, borderColor: 'black' }}>
                    Male
                  </Button>

                  <Button icon="gender-female" buttonColor='#FF00FF' mode="elevated" onPress={() => { setValue('Female'); setRightBorderValue(3); setLeftBorderValue(0) }} style={{ flex: 1, marginLeft: 10, borderWidth: rightBorderValue, borderColor: 'black' }}>
                    Female
                  </Button>
                </View>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                <Button icon="arrow-left-bold" buttonColor='white' mode="elevated" onPress={() => { goToPrevPage() }} style={{ marginBottom: 50 }}>
                  previous
                </Button>
                <Button icon="arrow-right-bold" buttonColor='white' disabled={value == '' ? true : false} mode="elevated" onPress={() => { goToNextPage() }} style={{ marginBottom: 50 }}>
                  Next
                </Button>
              </View>
            </View>

          </ImageBackground>

        </View>
        <View style={styles.page} key="3">
          <ImageBackground source={Background} resizeMode="cover" style={styles.imagebackground}>

            <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <Image
                  style={styles.AssetImage}
                  source={QuestionAsset}
                  resizeMode='contain'
                />
                <Text style={styles.topText}>How Tall Are you?</Text>
                <TextInput
                  label="Height"
                  value={text}
                  mode='outlined'
                  right={<TextInput.Icon icon={() => <Text>Cm</Text>} />}
                  onChangeText={text => setText(text)}
                  style={{ width: '60%', marginTop: 50 }}
                />
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                <Button icon="arrow-left-bold" buttonColor='white' mode="elevated" onPress={() => { goToPrevPage() }} style={{ marginBottom: 50 }}>
                  previous
                </Button>
                <Button icon="arrow-right-bold" buttonColor='white' disabled={text == '' ? true : false} mode="elevated" onPress={() => { goToNextPage() }} style={{ marginBottom: 50 }}>
                  Next
                </Button>
              </View>
            </View>
          </ImageBackground>

        </View>
        <View style={styles.page} key="4">
          <ImageBackground source={Background} resizeMode="cover" style={styles.imagebackground}>

            <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <Image
                  style={styles.AssetImage}
                  source={WeightAsset}
                  resizeMode='contain'
                />
                <Text style={styles.topText}>How Much do you Weight?</Text>
                <TextInput
                  label="Weight"
                  value={weightText}
                  mode='outlined'
                  right={<TextInput.Icon icon={() => <Text>Kg</Text>} />}
                  onChangeText={weightText => setWeightText(weightText)}
                  style={{ width: '60%', marginTop: 50 }}
                />
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                <Button icon="arrow-left-bold" buttonColor='white' mode="elevated" onPress={() => { goToPrevPage() }} style={{ marginBottom: 50 }}>
                  previous
                </Button>
                <Button icon="arrow-right-bold" buttonColor='white' disabled={text == '' ? true : false} mode="elevated" onPress={() => { goToNextPage() }} style={{ marginBottom: 50 }}>
                  Next
                </Button>
              </View>
            </View>
          </ImageBackground>

        </View>
        <View style={styles.page} key="5">
          <ImageBackground source={Background} resizeMode="cover" style={styles.imagebackground}>

            <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <Image
                  style={styles.AssetImage}
                  source={ExcersizeAsset}
                  resizeMode='contain'
                />
                <Text style={styles.topText}>How Much do you excersize?</Text>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 50 }}>
                  <RadioButton
                    value="1.2"
                    status={checked === '1.2' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('1.2')}
                  />
                  <Text style={{ fontFamily: 'CustomFont', fontSize: 15, color: 'black', marginLeft: 10 }}>Little To No excersize</Text>
                </View>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <RadioButton
                    value="1.375"
                    status={checked === '1.375' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('1.375')}
                  />
                  <Text style={{ fontFamily: 'CustomFont', fontSize: 15, color: 'black', marginLeft: 10 }}>light exercise/work 1-3 days per week</Text>
                </View>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <RadioButton
                    value="1.55"
                    status={checked === '1.55' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('1.55')}
                  />
                  <Text style={{ fontFamily: 'CustomFont', fontSize: 15, color: 'black', marginLeft: 10 }}>moderate exercise/work 3-5 days per week</Text>
                </View>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <RadioButton
                    value="1.725"
                    status={checked === '1.725' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('1.725')}
                  />
                  <Text style={{ fontFamily: 'CustomFont', fontSize: 15, color: 'black', marginLeft: 10 }}>hard exercise/work 6-7 days a week</Text>
                </View>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <RadioButton
                    value="1.9"
                    status={checked === '1.9' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('1.9')}
                  />
                  <Text style={{ fontFamily: 'CustomFont', fontSize: 15, color: 'black', marginLeft: 10 }}>very hard exercise/work 6-7 days a week</Text>
                </View>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                <Button icon="arrow-left-bold" buttonColor='white' mode="elevated" onPress={() => { goToPrevPage() }} style={{ marginBottom: 50 }}>
                  previous
                </Button>
                <Button icon="arrow-right-bold" buttonColor='white' disabled={checked == '' ? true : false} mode="elevated" onPress={() => { goToNextPage() }} style={{ marginBottom: 50 }}>
                  Next
                </Button>
              </View>
            </View>

          </ImageBackground>

        </View>
        <View style={styles.page} key="6">
          <ImageBackground source={Background} resizeMode="cover" style={styles.imagebackground}>

            <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <Image
                  style={styles.AssetImage}
                  source={AgeAsset}
                  resizeMode='contain'
                />
                <Text style={styles.topText}>What is Your Age?</Text>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'space-between', justifyContent: 'center', padding: 15 }}>
                  <TextInput
                    label="Age"
                    value={ageText}
                    mode='outlined'
                    right={<TextInput.Icon icon={() => <Text>Yrs</Text>} />}
                    onChangeText={ageText => setAgeText(ageText)}
                    style={{ width: '60%', marginTop: 50 }}
                  />
                </View>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                <Button icon="arrow-left-bold" buttonColor='white' mode="elevated" onPress={() => { goToPrevPage() }} style={{ marginBottom: 50 }}>
                  previous
                </Button>
                <Button icon="arrow-right-bold" buttonColor='white' disabled={ageText == '' ? true : false} mode="elevated" onPress={() => { goToNextPage(); calculateData() }} style={{ marginBottom: 50 }}>
                  Next
                </Button>
              </View>
            </View>

          </ImageBackground>

        </View>
        <View style={styles.page} key="7">
          <ImageBackground source={Background} resizeMode="cover" style={styles.imagebackground}>

            <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <Image
                  style={styles.AssetImage}
                  source={ResultAsset}
                  resizeMode='contain'
                />
                <Text style={styles.topText}>These are your results:</Text>
                <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'center', padding: 15, marginTop: 50 }}>
                  <Text style={{ fontFamily: 'CustomFont', fontSize: 15, color: 'black', marginLeft: 10 }}>
                    Your BMR or Basal Metabolic Rate is: {bmr}
                  </Text>

                  <Text style={{ fontFamily: 'CustomFont', fontSize: 15, color: 'black', marginLeft: 10 }}>
                    Your AMR or Active Metabolic Rate is: {amr}
                  </Text>
                  <Text style={{ fontFamily: 'CustomFont', fontSize: 15, color: 'black', marginLeft: 10 }}>
                    Your BMI or Body Mass Index is: {bmi}
                  </Text>
                  <Text style={{ fontFamily: 'CustomFont', fontSize: 12, color: 'black', marginLeft: 10 }}>
                    BMR and AMR estimates were calculated by uing the Harris-Benedict formula which is not 100% accurate. Research studies have indicated the formula is about 90% accurate around 60% of the time.
                  </Text>
                </View>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                <Button icon="arrow-left-bold" buttonColor='white' mode="elevated" onPress={() => { goToPrevPage() }} style={{ marginBottom: 50 }}>
                  previous
                </Button>
                <Button icon="arrow-right-bold" buttonColor='white' disabled={value == '' ? true : false} mode="elevated" onPress={() => { UploadData(); navigation.navigate('Home') }} style={{ marginBottom: 50 }}>
                  Finish
                </Button>
              </View>
            </View>

          </ImageBackground>

        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',

  },
  AssetImage: {
    width: '100%',
    height: 250,
    marginTop: 60
  },
  topText: {
    fontFamily: 'CustomFont',
    fontSize: 30,
    color: 'black',
    textAlign: 'center'

  },
  viewPager: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',

  },
  page: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Orange with 50% opacity
  },
  imagebackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }

});

export default GenderComponent;