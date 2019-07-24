import React from 'react'

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'

const HeaderDrawer = (props) => {
    return (
        <Drawer
            anchor="top"
            open={props.open}
            onClose={props.onClose}
        >

            <List component='nav'>
                <ListItem button onClick={() => console.log('check')}>
                    Home
                </ListItem>
                <ListItem button onClick={() => console.log('check')}>
                    Clients
                </ListItem>
                <ListItem button onClick={() => console.log('check')}>
                    Shifts
                </ListItem>
                <ListItem button onClick={() => console.log('check')}>
                    Export
                </ListItem>
            </List>


        </Drawer>
    )
}

export default HeaderDrawer