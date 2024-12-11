import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor:"#f2f2f2",
        paddingVertical: 30
    },
    avatar:{
        marginRight:20,
        backgroundColor:'green'
    },
    displayName:{
        fontWeight: "bold",
        fontSize: 20
    },
    buttonDialog:{
        width:100,
        marginHorizontal:10,
       
    },
    buttonStyleDialog:{
        borderColor:'#00a680',
    },
    titleStyle:{
        fontWeight:'bold',
        color:'#00a680 !important'
    }
});