import { Dimensions } from "react-native";

export function getWidth(){
    return Dimensions.get('screen').width;
}


export function getHeight(){
    return Dimensions.get('screen').height;
}