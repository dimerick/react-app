import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            success: null
        };

        this.getProjects();
    }

    getProjects = () => {
        axios.get("http://localhost:1337/sliders")
            .then((res) => {
                console.log(res.data);
                this.setState({
                    projects: res.data,
                    success: 'success'
                })
            })
    }



    render() {

        if (this.state.projects.length >= 1) {
            return (
                <div>

                    {this.state.success === 'success' &&
                        <div>
                            {this.state.projects.map((p, index) => {
                                return (
                                    <div key={p.id} className="image-project">
                                        <h2>{p.titulo}</h2>
                                        <img src={"http://localhost:1337"+p.imagen.url}></img>
                                    </div>
                                )

                            })}
                        </div>

                    }



                </div>
            )
        } else if (this.state.projects.length === 0 && this.state.success === 'success') {
            return (
                <h2>No hay proyectos disponibles para mostrar</h2>
            )
        } else{
            return (<h2>Cargando...</h2>)
        }



    }
}

export default Home;