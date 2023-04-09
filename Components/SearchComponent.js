import React,{useState,useContext} from 'react'
import { StyleSheet, View, } from 'react-native'
import { Appbar } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { foodContext } from "../Components/SetData.js"

const SearchComponent = ({navigation}) => {
    
    const [searchvalue, setSearchValue] = useState("")
    const [foodarray] = useContext(foodContext)

    const filterAndNavigate = () => {
        let filteredlist = foodarray.filter(item => {
            if (item.name.toLowerCase().includes(searchvalue.toLowerCase())) {
                return item;
            }
        })
        navigation.navigate("FilteredRecipeBrowser", { item: filteredlist });
    }
    return (
        <View style={{ width: '100%', height: '100%', flex: 1, backgroundColor: 'white' }}>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'white', flex: 1 }}>
                <Appbar.Header style={{ backgroundColor: 'transparent', width: "100%", borderBottomColor: 'rgba(253, 90, 67, 1)', borderBottomWidth: 0.6 }}>
                    <Appbar.BackAction color="rgba(253, 90, 67, 1)" onPress={() => { navigation.goBack() }} />

                    <TextInput
                        label="Search for Foods"
                        value={searchvalue}
                        mode='outlined'
                        right={<TextInput.Icon icon={() => <MaterialCommunityIcons name="food-apple-outline" size={24} color="black" />} />}
                        onChangeText={searchvalue => setSearchValue(searchvalue)}
                        style={{ flexGrow: 1 }}
                    />
                    <Appbar.Action color="rgba(253, 90, 67, 1)" icon="magnify" onPress={() => { filterAndNavigate() }} />

                </Appbar.Header>
                <View style={{ flexGrow: 1, alignItems: 'center' }}>

                </View>
            </View>
        </View>
    )
}

export default SearchComponent

const styles = StyleSheet.create({})