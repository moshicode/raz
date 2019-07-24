import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'

import HeaderDrawer from './HeaderDrawer'

class Header extends Component {
    state = {
        drawerOpen: false
    }

    toggleDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        })
    }

    render() {
        return (
            <AppBar
                position='static'
                style={{
                    boxShadow: 'none'
                }}
            >
                <Toolbar>
                    <h1 style={{
                        flexGrow: 1
                    }}>Raz.</h1>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Menu"
                        onClick={() => this.toggleDrawer()}
                    >
                        <MenuIcon />
                    </IconButton>

                    <HeaderDrawer
                        open={this.state.drawerOpen}
                        onClose={this.toggleDrawer}
                    />
                </Toolbar>
            </AppBar >
        );
    }
}

export default Header;