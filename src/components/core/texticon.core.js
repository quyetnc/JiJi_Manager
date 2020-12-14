import React,{Component} from 'react'
import { View, Image, TextInput } from 'react-native'

export default class TextIcon extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 10, borderWidth: 0.5, borderColor: 'black', paddingHorizontal: 10,marginBottom:5 }}>
                <Image source={this.props.Image} style={{ width: 35, height: 35 }} />
                <TextInput secureTextEntry={this.props.type=="password"} defaultValue={this.props.defaultValue} onChangeText={this.props.onChangeText} editable={this.props.enabled} style={this.props.style} placeholder={this.props.placeholder} />
            </View>
        )
    }
}