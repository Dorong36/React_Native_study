import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons';
import react, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// 날씨 API Key
const API_KEY = "491c76c96ae080f7b3aa338cb863e396"
// 근데 API_KEY를 앱에 두는 것은 보안상 절대 안됨!! 연습이니까 하는거지
// 실제 개발한다면 서버에 두고 요청을 할 것

// icons
const icons = {
  "Clear" : "day-sunny",
  "Cloud" : "cloudy"
}


export default function App() {
  const [city, setCity] = useState("Loading..");
  const [days, setDays] = useState("null");
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    // 허가정보 받아오기
    // const permission = await Location.requestForegroundPermissionsAsync();
    // console.log(permission) => 허가정보가 찍힘

    // 거기서 진짜 허가부분에 해당하는 granted로 받아오자면
    const granted = await (await Location.requestForegroundPermissionsAsync()).granted;
    // granted가 null이면 허가되지 않음을 저장
    if(!granted){
      setOk(false)
    }

    // 현재 위치 받아오기, 해당 오브젝트 내에서 경도 위도 받아오기
    let {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    // 경도 위도 바탕으로 지역정보 가져오기
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps : false})
    // city state에 저장해주기
    setCity(location[0].city)
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt={cnt}&appid=${API_KEY}`);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json);
  }
  useEffect(()=>{
    getWeather();
  }, [])

  const nums = [days, days]

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator = "false" 
        contentContainerStyle={styles.weather}
      >
        {
          days === "null" ? (
            <View style={{width : windowWidth,
                alignItems : "center",}}><ActivityIndicator color="white" size="large"></ActivityIndicator></View>
          ) : (
            <View style={styles.day}>
                <View style={{
                flexDirection : "row", 
                alignItems : "center",
                justifyContent : "space-between"
                }}>
                <Text style={styles.temp}>
                    {parseFloat(days.main.temp).toFixed(1)}
                </Text>
                <Fontisto name={icons[days.weather[0].main]} size={60} color="white" />
                {/* <Fontisto name={icons["Cloud"]} size={60} color="white" /> */}
                </View>
                <Text style={styles.description}>{days.weather[0].description}</Text>
            </View>
          )
        }
      </ScrollView>


      <StatusBar style='light' />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:"teal"
  },
  city : {
    flex : 1,
    // backgroundColor : "tomato",
    justifyContent : "center",
    alignItems : 'center'
  },
  cityName : {
    color : "white",
    fontSize : 70,
    marginTop : 40
  },
  weather : {
    // flex : 3.5,
    // backgroundColor : "orange"
  },
  day : {
    // flex : 1,
    width : windowWidth,
    marginLeft : 40,
    alignItems : "left",
    // backgroundColor : "tomato"
  },
  temp : {
    color : "white",
    fontSize : 120,
    // marginTop : 50
  },
  description : {
    color : "white",
    fontSize : 40,
  }
});
