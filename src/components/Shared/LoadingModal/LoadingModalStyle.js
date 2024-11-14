import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay:{
        height:100,
        width:200,
        backgroundColor:'#fff',
        borderColor:'#00a680',
        borderWidth:2,
        borderRadius:10,
        
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
    text:{
        color:'#00a680',
        textTransform: 'uppercase',
        marginTop:10
    }
});