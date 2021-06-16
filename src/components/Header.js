import React from 'react';
import {NavLink} from 'react-router-dom';

class Header extends React.Component {
render(){
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/projects" activeClassName="active">Projects </NavLink>
                    
                    </li>
                    <li><NavLink to="/formulario" activeClassName="active">Formulario</NavLink></li>
                    <li><NavLink to="/pagina-param/2" activeClassName="active">Pagina Param</NavLink></li>
            </ul>
        </nav>
    );
}
}

export default Header;