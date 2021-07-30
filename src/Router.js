import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Projects from './components/Projects';
import Error from './components/Error';
import Header from './components/Header';
import Formulario from './components/Formulario';
import FieldsOfStudy from './components/FieldsOfStudy';
import Home from './components/Home';
import Map from './components/Map';


class Router extends React.Component {

    render() {
        return (

            <BrowserRouter>
            <Header/>
                <Switch>
                    <Route exact path="/" component={Map} />
                    {/* <Route exact path="/projects" component={Projects} />

                    <Route exact path="/formulario" component={Formulario} />

                    <Route exact path="/fields-of-study" component={FieldsOfStudy} />

                    <Route exact path="/map" component={Map} />

                    <Route exact path="/pagina-1" render={() => (
                        <h1>Pagina-1</h1>
                    )} />

                    <Route exact path="/pagina-param/:id/:cod?" render={(props) => {
                    const id = props.match.params.id;
                    const cod = props.match.params.cod;
                        return (
                            <React.Fragment>
                                <h1>Pagina con parametro</h1>
                                <h4>El parametro es: {id}</h4>
                                <h4>El codigo es: {cod}</h4>
                            </React.Fragment>
                        );
                    }} /> */}

                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        );
    }

}

export default Router;