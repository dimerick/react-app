import React from 'react';

class Project extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contador: 0
        };
    }

    sumar = (e) => {
        this.setState({
            contador: (this.state.contador + 1)
        });
    }

    restar = (e) =>{
        this.setState(
            {
                contador: (this.state.contador - 1)
            });
    }

    seleccionar = () =>{
        this.props.selectProject(this.props.project)
    }

    render() {
        return (
            <div>
                
                <h2>{this.props.project.title}</h2>
                <h3>{this.props.project.location}</h3>
                <h4>Contador: {this.state.contador}</h4>
                <button onClick={this.sumar}>Sumar</button>

                <button onClick={this.restar}>Restar</button>

                <button onClick={this.seleccionar}>Seleccionar Proyecto</button>
                <hr/>
                <br/>

                

            </div>
        );

    }
}

export default Project;