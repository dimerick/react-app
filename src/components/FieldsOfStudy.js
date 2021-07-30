import React from 'react';
import axios from 'axios';
import GLOBAL from '../Global';

class FieldsOfStudy extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fieldsOfStudy: [],
            success: null
        };

        this.getFieldsOfStudy();
    }

    getFieldsOfStudy = () => {
        axios.get(GLOBAL.url + "fields-of-study")
            .then((res) => {
                console.log(res.data);
                this.setState({
                    fieldsOfStudy: res.data,
                    success: 'success'
                })
            })
    }



    render() {

        if (this.state.fieldsOfStudy.length >= 1) {
            return (
                <div>

                    {this.state.success === 'success' &&
                        <div>
                            {this.state.fieldsOfStudy.map((fs, index) => {
                                return (
                                    <div key={fs.id}>{fs.name}</div>
                                )

                            })}
                        </div>

                    }



                </div>
            )
        } else if (this.state.fieldsOfStudy.length === 0 && this.state.success === 'success') {
            return (
                <h2>No hay fields of study para mostrar</h2>
            )
        } else{
            return (<h2>Cargando...</h2>)
        }



    }
}

export default FieldsOfStudy;