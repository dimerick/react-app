import React from 'react';
import { NavLink } from 'react-router-dom';

class Formulario extends React.Component {

    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    descriptionRef = React.createRef();

    state = {
        user: {}
    }

    recibirFormulario = (e) => {
        e.preventDefault();

        const user = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidoRef.current.value,
            description: this.descriptionRef.current.value
        }

        console.log(user);
        this.setState(
            {
                user: user
            }
        );

    }
    render() {
        return (
            <form onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                {
                    this.state.user.nombre && 
                    <div>
                        <h4>Nombre: {this.state.user.nombre}</h4>
                        <h4>Apellido: {this.state.user.apellido}</h4>
                        
                        <p id="p-description">Descripción: {this.state.user.description}</p>
                        
                        
                    </div>
                }

              

                
                <div><input type="text" name="nombre" placeholder="Ingrese su nombre" ref={this.nombreRef} /></div>
                <div><input type="text" name="apellido" placeholder="Ingrese su apellido" ref={this.apellidoRef} /></div>
                <div>
                    <textarea name="description" placeholder="Ingrese su descripción" ref={this.descriptionRef}></textarea> </div>
                <div>
                    <input type="submit" value="Enviar" />
                </div>

            </form>
        );
    }
}

export default Formulario;