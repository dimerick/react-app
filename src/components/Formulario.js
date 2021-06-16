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

        console.log(this.nombreRef.current.value);
        console.log(this.apellidoRef.current.value);
        console.log(this.descriptionRef.current.value);
        
    }
    render() {
        return (
            <form onSubmit={this.recibirFormulario}>
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