// ContactsPage.jsx
import React, {Fragment, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addContact, fetchContacts} from '../../redux';
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import ContactList from '../ContactList/ContactList';

function ContactsPage({filteredContacts, handleFilterChange}) {
  const [isOpenDialog, setOpenDialog] = useState(false);
  const filter = useSelector(state => state.phonebook.filter);

  const dispatch = useDispatch();

  React.useEffect(() => {
    (() => {
      dispatch(fetchContacts());
    })();
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      name: formElements.name.value,
      number: formElements.number.value,
    };
    dispatch(addContact(data));
    setOpenDialog(false);
  };

  return (
    <Fragment>
      <Container maxWidth="md">
        <Stack spacing={2} sx={{marginTop: 2}}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography level="h3">Contacts</Typography>
            <Button
              variant="soft"
              size="sm"
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              Add contact
            </Button>
          </Stack>
          <Stack>
            <FormControl
              id="search"
              size="sm"
            >
              <Input
                placeholder="Search..."
                name="search"
                value={filter}
                variant="soft"
                onChange={handleFilterChange}
              />
              <FormHelperText>
              </FormHelperText>
            </FormControl>
          </Stack>
        </Stack>
        <ContactList contacts={filteredContacts} />
        {/* Добавьте форму для добавления новых контактов здесь */}
      </Container>
      <Modal
        open={isOpenDialog}
        onClose={() => setOpenDialog(false)}
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.surface',
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Create new contact
          </Typography>
          <form
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
              <FormControl required>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" />
              </FormControl>
              <FormControl required>
                <FormLabel>Number</FormLabel>
                <Input type="text" name="number" />
              </FormControl>
              <Button type="submit" fullWidth variant="soft">
                Create
              </Button>
            </Stack>
          </form>
        </Sheet>
      </Modal>
    </Fragment>
  );
}

export default ContactsPage;
