// import React, {Component} from 'react'
// import {
//     Alert,
//     View,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     TextInput
// } from 'react-native'
// import {AsyncStorage} from 'react-native'
// import Header from '../components/Header'
// import params from '../params'
// import axios from 'axios'

// class Perfil extends Component { 

//     state = {
//         usuario: '',
//         senha: ''
//     }

//     constructor(props){
//         super(props)
//     }

//     render() {
//         return (
//             <View style={styles.wrapper}>
//                 <Header></Header>
//                 <View style={styles.content}>
//                     <Text style={styles.title}>Perfil</Text>
//                     <Text style={styles.subtitle}>Entre com seu nome de usuário e senha ou cadastre-se!</Text>
                    
//                     <View style={styles.row}>
//                         <Text>Usuário: </Text>
//                         <TextInput
//                             style={{height: 20,width: 100, borderColor: 'gray', color: 'black', borderWidth: 1}}
//                             autoFocus={true}
//                             value={this.state.usuario}
//                             onChangeText={usuario => this.setState({ usuario })}
//                         />
//                     </View>
//                         <View style={styles.row}>
//                         <Text>Senha: </Text>
//                         <TextInput
//                             style={{height: 20,width: 100, borderColor: 'gray', color: 'black', borderWidth: 1}}
//                             value={this.state.senha}
//                             onChangeText={senha => this.setState({ senha })}
//                         />
//                     </View>
//                     <TouchableOpacity
//                         style={[styles.button, styles.bgHard]}
//                         onPress={() => this.perfil(this.state.usuario, this.state.senha)}>
//                         <Text style={styles.buttonLabel}>Entrar</Text>
//                     </TouchableOpacity>
//                 </View>
//                 </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     wrapper: {
//         backgroundColor: '#EEE',
//         flex: 1
//     },
//     content: {
//         marginTop: 10,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     row: {
//         flexDirection: 'row'
//     },
//     title: {
//         fontSize: 30,
//         fontWeight: 'bold',
//     },
//     subtitle: {
//         fontSize: 12,
//         fontWeight: 'bold',
//     },
//     button: {
//         marginTop: 10,
//         padding: 5,
//     },
//     buttonLabel: {
//         fontSize: 20,
//         color: '#EEE',
//         fontWeight: 'bold',
//     },
//     bgHard: {
//         backgroundColor: '#F26337'
//     }
// })

// export default Login;