import React, {useContext} from 'react';
import {Form, Container, FormGroup, Label, Input, ButtonToggle} from 'reactstrap';
import './login.css';
import api from './apiLogin';
import {Context} from '../../Context/AuthContext';

var token = '';


const Login =() =>{
    const { autenticated, onSend } = useContext(Context);
        return(
            <div id="principal">
                <Container>
                    <div >
                        <h1 id="principal">Agro Data</h1>
                    <Form>
                        <FormGroup>
                            <Label>Login:</Label>
                            <Input type="text" id="login" name="login" placeholder="Informe o Login"></Input>
                            <Label>Senha:</Label>
                            <Input type="password" id="senha" name="senha" placeholder="Informe a senha"></Input>
                        </FormGroup>
                        <ButtonToggle type="button" color="success" onClick={onSend.bind()} >Entrar</ButtonToggle>
                    </Form>
                    </div>
                </Container>
            </div>
        );
    }

export default Login;