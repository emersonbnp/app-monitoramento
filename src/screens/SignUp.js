import React, { Component } from 'react'
import {
    Alert,
    TextInput,
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native'
import Header from '../components/Header'
import params from '../params'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
class AddLactente extends Component {

    firstNameInput

    constructor(props) {
        super(props)

        this.state = {
            signedIn: false,
            checkedSignIn: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            username: '',
            userid: ''
        };
    }

    componentDidMount() {

        const { navigation } = this.props;
        if (navigation && navigation.getParam('userid', undefined)) {
            var userid = navigation.getParam('userid');
            this.setState({ userid: userid})
            console.log('userid===============>', userid)
        }

        AsyncStorage.getItem('id')
            .then((result) => {
                this.setState({ signedIn: true })
                this.setState({ id: JSON.parse(result) })
            })
    }

    render() {

        try {
            return (
                <View style={styles.wrapper}>
                    <Header></Header>
                    <View style={styles.content}>
                        <View style={styles.row}>
                            <Text style={styles.txt}>Nome: </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput ref={input => { this.firstNameInput = input }}
                                style={styles.input}
                                autoFocus={true}
                                value={this.state.firstName}
                                onChangeText={firstName => this.setState({ firstName })}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.txt}>Sobrenome: </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput ref={input => { this.lastNameInput = input }}
                                style={styles.input}
                                value={this.state.lastName}
                                onChangeText={lastName => this.setState({ lastName })}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.txt}>E-mail: </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput ref={input => { this.emailInput = input }}
                                style={styles.input}
                                value={this.state.email}
                                onChangeText={email => this.setState({ email })}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.txt}>Login: </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput ref={input => { this.usernameInput = input }}
                                style={styles.input}
                                value={this.state.username}
                                onChangeText={username => this.setState({ username })}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.txt}>Senha: </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput ref={input => { this.passwordInput = input }}
                                style={styles.input}
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonCenter}>
                        <TouchableOpacity
                            style={[styles.button, styles.back]}
                            onPress={() => this.back(this.props.navigation)}>
                            <Text style={styles.addText}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.add]}
                            onPress={() => this.add(this.props.navigation)}>
                            <Text style={styles.addText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )

        } catch (e) {
            console.log(e)
        }
    }

    async back(navigation) {
        this.clearFieilds()
        navigation.navigate('Login')
    }

    async add(navigation) {
        var url = params.url + '/auth/signup';
        let data = new FormData()
        data.append('firstName', this.state.firstName)
        data.append('lastName', this.state.lastName)
        data.append('email', this.state.email)
        data.append('password', this.state.password)
        data.append('username', this.state.username)
        data.append('userid', this.state.userid)

        axios
            .post(url, data)
            .then(() => {
                Alert.alert(
                    'Usuário cadastrado com sucesso!')
                    navigation.navigate('Login')
            })
            .catch(e => {
                Alert.alert('Campo inválido!')
                console.log(e)
            })
    }

    clearFieilds() {
        this.firstNameInput.clear()
        this.lastNameInput.clear()
        this.emailInput.clear()
        this.passwordInput.clear()
        this.usernameInput.clear()
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#EEE',
        flex: 1,
        justifyContent: 'space-between'

    },
    content: {
        marginTop: 10
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    buttonCenter: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    input: {
        marginLeft: 5, marginRight: 5,
        flex: 1,
        padding: 0,
        paddingLeft: 2,
        height: 30,
        fontSize: 16,
        alignSelf: 'stretch',
        borderBottomColor: '#48C9B0',
        color: 'black',
        borderBottomWidth: 1
    },
    add: {
        backgroundColor: '#1A5276',
        height: 70,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    back: {
        backgroundColor: '#CB4335',
        height: 70,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    addText: {
        color: '#FFF',
        padding: 2,
        fontSize: 20,
        fontWeight: 'bold'
    },
    txt: {
        color: '#000',
        padding: 5,
        fontSize: 22,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
        padding: 5,
    },
    scroll: {
        alignSelf: 'stretch'
    },
    profileText: {
        padding: 10,
        fontSize: 20,
        color: '#DDD',
        fontWeight: 'bold'
    },
    profileButton: {
        backgroundColor: '#424242',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AddLactente;