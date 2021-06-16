import React from 'react';
import Project from './Project'

class Projects extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [
                { title: 'Proyecto Golgota', location: 'Universidad de Antioquia' },
                { title: 'Proyecto Fenix', location: 'Universidad Nacional' },
                { title: 'Proyecto Century', location: 'Universidad de Envigado' },
            ],
            projectSelected: {}
        };

        
    }


    selectProject = (project) => {
        console.log(project);
        this.setState(
            {
                projectSelected: project
            });
    }

    render() {
        return (
            <div>
                {this.state.projectSelected.title ? (
                    <h4>Proyecto Seleccionado: {this.state.projectSelected.title}</h4>
                ):(
                    <h4>No se ha seleccionado ningun proyecto</h4>
                )
                
                } 
                
                {
                    this.state.projects.map((project, index) => {
                        return (

                            <Project selectProject={this.selectProject} key={index} project={project} />

                        )
                    })
                }
            </div>

        );

    }
}

export default Projects;