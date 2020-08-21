import React, {Component} from 'react';
import {Table, Container} from 'reactstrap';
import './corpo.css';
import api from './apiHome';


class Corpo extends Component{

    state = {
        information: [],
    }

    async componentDidMount(){
        const response = await api.get('');
        this.setState({information: response.data});
    }
    render(){
        const { information } = this.state;
        return(
        <div class="sd">
            <Container>
                <h1>Parametros Atuais:</h1>
            <Table hover darnger bordered>
                <thead>
                    <th>Area</th>
                    <th>Temperatura</th>
                    <th>Humidade</th>
                    <th>Uv</th>
                    <th>Data</th>
                    <th>Condição Atual</th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {information.name}
                        </td>
                        <td>
                            {information.temp_ambiente + '°C'}
                        </td>
                        <td>
                            {information.humi_solo}
                        </td>
                        <td>
                            {information.raio_uv}
                        </td>
                        <td>
                            {information.data}
                        </td>
                        <td>
                            {information.condicao}
                        </td>
                    </tr>
                </tbody>
            </Table>
            </Container>
        </div>
        );
    }
}

export default Corpo;