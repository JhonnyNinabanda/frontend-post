import {
    AppBar,
    Toolbar,
    Button
} from "@mui/material";

import { Link } from "react-router-dom";

function Navbar() {

    return (

        <AppBar position="static">

            <Toolbar>

                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                >
                    Dashboard
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/users"
                >
                    Usuarios
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/posts"
                >
                    Posts
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/comments"
                >
                    Comentarios
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/albums"
                >
                    Álbumes
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/photos"
                >
                    Fotos
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/todos"
                >
                    Tareas
                </Button>

            </Toolbar>

        </AppBar>

    );

}

export default Navbar;