// Navigation.jsx
import React, {Fragment} from 'react';
import {Box, Button, List, ListItem, Typography} from '@mui/joy';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';

function Navigation() {
  const {isAuth} = useSelector(state => state.user);

  return (
    <Box
      component="nav"
      sx={{
        flexGrow: 1,
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;',
      }}
    >
      <List orientation="horizontal">
        {!isAuth && (
          <Fragment>
            <ListItem>
              <Typography variant="h2">
                Phonebook
              </Typography>
            </ListItem>
          </Fragment>
        )}
        {isAuth && (
         <Fragment>
           <ListItem>
             <NavLink
               to="/contacts"
               replace
               className="nav-link"
             >
               Contacts
             </NavLink>
           </ListItem>
           <ListItem>
             <Button
               variant="plain"
               size="sm"
             >
               Logout
             </Button>
           </ListItem>
         </Fragment>
        )}
      </List>
    </Box>
  );
}

export default Navigation;

