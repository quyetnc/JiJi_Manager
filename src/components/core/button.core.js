import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'green',
    };
  }
  async componentDidMount() {
    switch (this.props.type?.toLowerCase()) {
      case 'primary':
        await this.setState({color: '#007bff'});
        break;
      case 'secondary':
        await this.setState({color: '#6c757d'});
        break;
      case 'success':
        await this.setState({color: '#28a745'});
        break;
      case 'danger':
        await this.setState({color: '#dc3545'});
        break;
      case 'warning':
        await this.setState({color: '#ffc107'});
        break;
      case 'info':
        await this.setState({color: '#17a2b8'});
        break;
      case 'light':
        await this.setState({color: '#f8f9fa'});
        break;
      case 'dark':
        await this.setState({color: '#343a40'});
        break;
      case 'link':
        await this.setState({color: '#f8f9fa'});
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        style={[
          {
            width: 'auto',
            height: 45,
            borderRadius: 8,
            backgroundColor: this.state.color,
            alignItems: 'center',
            justifyContent: 'center',
            margin:5,
            paddingLeft:8,
            paddingRight:8,
          },
          this.props.style,
        ]}
        onPress={() => this.props.onClick?.()}>
        <Text style={{color: '#fff',fontSize:17}}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
