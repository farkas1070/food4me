import React from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";
import { useFonts } from "expo-font";
import CustomFont from "../../fonts/myfont.otf";
import { db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../../firebase-config";
import { styles } from "./OnBoardingStyle";
import Page1 from "./Components/Page1";
import Page2 from "./Components/Page2";
import Page3 from "./Components/Page3";
import Page4 from "./Components/Page4";
import Page5 from "./Components/Page5";
import Page6 from "./Components/Page6";
import Page7 from "./Components/Page7";
const OnBoarding = () => {
  const [value, setValue] = React.useState("");
  const [bmr, setBMR] = React.useState(0);
  const [amr, setAMR] = React.useState(0);
  const [bmi, setBMI] = React.useState(0);
  const [text, setText] = React.useState("");
  const [weightText, setWeightText] = React.useState("");
  const [ageText, setAgeText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [leftBorderValue, setLeftBorderValue] = React.useState(0);
  const [rightBorderValue, setRightBorderValue] = React.useState(0);
  const [checked, setChecked] = React.useState("");
  const ref = React.useRef(PagerView);
  const calculateData = () => {
    console.log(value, text, weightText, ageText, checked);
    if (value == "Male") {
      let malevalue = 66.47;
      let weightvalue = 13.75 * weightText;
      let heightvalue = 5.003 * text;
      let agevalue = 6.755 * ageText;
      let temporarybmr = malevalue + weightvalue + heightvalue - agevalue;
      let heightinmeters = text / 100;
      console.log(heightinmeters);
      let squareheight = heightinmeters * heightinmeters;
      setBMI(weightText / squareheight);
      setBMR(temporarybmr);
      setAMR(temporarybmr * checked);
    } else {
      femalevalue = 655.1;
      weightvalue = 9.563 * weightText;
      heightvalue = 1.85 * text;
      agevalue = 4.676 * ageText;
      let temporarybmr = malevalue + weightvalue + heightvalue - agevalue;
      let heightinmeters = text / 100;
      let squareheight = heightinmeters * heightinmeters;
      setBMI(weightText / squareheight);
      setBMR(temporarybmr);
      setAMR(temporarybmr * checked);
    }
  };
  const UploadData = async () => {
    const userRef = doc(db, "Users", auth.currentUser.uid);
    setDoc(userRef, {
      height: text,
      age: ageText,
      weight: weightText,
      gender: value,
      BMR: bmr,
      AMR: amr,
      BMI: bmi,
      uid: auth.currentUser.uid,
      excersize: parseFloat(checked),
      profilepic: "None",
      username: auth.currentUser.displayName,
    })
      .then(() => {
        console.log("Document updated successfully");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  const goToNextPage = () => {
    const nextIndex = currentIndex + 1;
    ref.current.setPage(nextIndex);
    setCurrentIndex(nextIndex);
  };

  const goToPrevPage = () => {
    const prevIndex = currentIndex - 1;
    ref.current.setPage(prevIndex);
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
      <PagerView
        style={styles.viewPager}
        initialPage={currentIndex}
        ref={ref}
        scrollEnabled={false}
        onPageSelected={onPageSelected}
      >
        <Page1 goToNextPage={goToNextPage} />
        <Page2
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          leftBorderValue={leftBorderValue}
          rightBorderValue={rightBorderValue}
          setLeftBorderValue={setLeftBorderValue}
          setRightBorderValue={setRightBorderValue}
          value={value}
          setValue={setValue}
        />
        <Page3
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          text={text}
          setText={setText}
        />
        <Page4
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          weightText={weightText}
          setWeightText={setWeightText}
          text={text}
        />
        <Page5
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          checked={checked}
          setChecked={setChecked}
        />
        <Page6
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          setAgeText={setAgeText}
          ageText={ageText}
          calculateData={calculateData}
        />

        <Page7
          goToPrevPage={goToPrevPage}
          UploadData={UploadData}
          value={value}
          amr={amr}
          bmr={bmr}
          bmi={bmi}
        />
      </PagerView>
    </View>
  );
};

export default OnBoarding;
