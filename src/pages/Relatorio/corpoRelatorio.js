import React, { Component } from 'react';
import { Container, FormGroup, Label, Input, Col, ButtonToggle, Table } from 'reactstrap';
import {Form} from 'reactstrap';
import api from './apiRelatorio';
import {Line, Bar} from 'react-chartjs-2';


let labels_media_temp = [];
let dats_media_temp = [];

let labels_media_humi = [];
let dats_media_humi = [];

let labels_media_uv = [];
let dats_media_uv = [];

let humi_periodo;
let temp_periodo;
let uv_periodo;

let condicao_por_dia = [];

class BodyRelatorio extends Component{
    constructor(props){
        super(props);
        this.state = {
            teste:'',
            data: [],
            chartTempData:{
                labels: [],
                datasets:[{
                    label: 'Media de Temperatura por dia',
                    fill: false,
                    lineTension: 0.1,
                    data:[],
                    borderColor:['rgba(75,192,192,1)'],
                    backgroundColor: 'rgba(75,192,192,0.4)',
                },
            
                ]                
            },
            chartHumiData:{
                labels: [],
                datasets:[{
                    label: 'Media de Humidade por dia',
                    fill: false,
                    lineTension: 0.1,
                    data:[],
                    borderColor:['rgba(25,67,122,1)'],
                    backgroundColor: 'rgba(75,192,192,0.4)',
                },
            
                ]                
            },
            chartUvData:{
                labels: [],
                datasets:[{
                    label: 'Media de Raios UV por dia',
                    fill: false,
                    lineTension: 0.1,
                    data:[],
                    borderColor:['rgba(25,67,122,1)'],
                    backgroundColor: 'rgba(75,192,192,0.4)',
                },
            
                ]                
            }
        }
    }
    

    forceUpdateHandler(){
        //Popula o grafico da media de temperatura por dia
        this.setState(this.state.chartTempData.labels = labels_media_temp);
        this.setState(this.state.chartTempData.datasets[0].data = dats_media_temp);
        
        //Popula o grafico da media de humidade por dia
        this.setState(this.state.chartHumiData.labels = labels_media_humi);
        this.setState(this.state.chartHumiData.datasets[0].data = dats_media_humi);

        //Popula o gradifo da media de Raios UV por dia
        this.setState(this.state.chartUvData.labels = labels_media_uv);
        this.setState(this.state.chartUvData.datasets[0].data = dats_media_uv);
    }

     onSend(){
        var data_inicial = document.getElementById('inicial');
        var data_final = document.getElementById('final');
        const response = api.get('process?data_inicio='+data_inicial.value+'&data_fim='+data_final.value+'&area=area1');
        response.then(response =>{
            this.setState({data: response.data.response});
            console.log(response.data.response);
            for(var i in response.data.response['media_temp_dia']){
                labels_media_temp.push(i);
                dats_media_temp.push(response.data.response['media_temp_dia'][i]);
            }

            for(var i in response.data.response['media_humi_dia']){
                labels_media_humi.push(i);
                dats_media_humi.push(response.data.response['media_humi_dia'][i])
            }

            for(var i in response.data.response['media_uv_dia']){
                labels_media_uv.push(i);
                dats_media_uv.push(response.data.response['media_uv_dia'][i])
            }

            for(var i in response.data.response['condicao_dia']){
                condicao_por_dia.push(<tr>
                                        <td>{i}</td>
                                        <td>{response.data.response['condicao_dia'][i]}</td>
                                     </tr>);
            }

            humi_periodo = response.data.response['media_humi_periodo'];
            temp_periodo = response.data.response['media_temp_periodo'];
            uv_periodo = response.data.response['media_uv_periodo'];
            
            console.log(condicao_por_dia);
            

            this.forceUpdateHandler();
            
        });    
    }

    render(){
        let grafico_media_temp;
        let template_media_temp;
        
        let grafico_media_humi;
        let template_media_humi;

        let grafico_media_uv;
        let template_media_uv;
        let template_periodo;
        let table_periodo;
        let table_condicao_dia;
        let template_condicao_dia;
        if(this.state.chartTempData.datasets[0].data.length !== 0){
            grafico_media_temp = <Line data={this.state.chartTempData} width={520} height={200}/>
            template_media_temp = <h3>Media de temperatura por dia</h3>
            
            grafico_media_humi = <Line data={this.state.chartHumiData} width={520} height={200}/>
            template_media_humi = <h3>Media de Humidade por dia</h3>

            grafico_media_uv = <Line data={this.state.chartUvData} width={520} height={200}/>
            template_media_uv = <h3>Media de Raios UV por dia</h3>

            template_periodo = <h3>Média dos parâmetros</h3>
            table_periodo = <Table size="sm">
                                <thead>
                                    <th>Tempretura</th>
                                    <th>Humidade</th>
                                    <th>Uv</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{temp_periodo}</td>
                                        <td>{humi_periodo}</td>
                                        <td>{uv_periodo}</td>                                        
                                    </tr>
                                </tbody>
                            </Table>
            template_condicao_dia = <h3>Condições por Dia</h3>                
            table_condicao_dia = <Table>
                                <thead>
                                    <th>Dia</th>
                                    <th>Condição</th>                                    
                                </thead>
                                <tbody>
                                    {condicao_por_dia}
                                </tbody>
                                </Table>
        }else{
           
        }
        return(
            <div>
                <Container >
                    <h1>Analytics</h1>
                    <Form>
                        <FormGroup row>
                            <Label sm={1.4}>Data Inicial:</Label>
                                <Col sm={4}>
                                    <Input type="date" id="inicial" name="inicial"></Input>
                                </Col>
                            <Label sm={1.4}>Data Final:</Label>
                                <Col sm={4}>
                                    <Input type="date" id="final" name="final"></Input>
                                </Col>
                            <Col sm={1.4}>
                                <ButtonToggle type="button" color="success" onClick={this.onSend.bind(this)}>Pesquisar</ButtonToggle>
                            </Col>    
                        </FormGroup>
                    </Form>
                </Container>
                <Container>
                    <div>
                        {template_periodo}
                        {table_periodo}
                    </div>
                    <div>
                        {template_condicao_dia}
                        {table_condicao_dia}
                    </div>
                    <div>
                        {template_media_temp}
                        {grafico_media_temp}
                    </div>
                    <div>
                        {template_media_humi}
                        {grafico_media_humi}
                    </div>
                    <div>
                        {template_media_uv}
                        {grafico_media_uv}
                    </div>
                </Container>
            </div>
        );
    }
}
export default BodyRelatorio;