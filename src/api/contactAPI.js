import {baseURL} from './constants';

export const contactAPI = () => {
  const accessToken = localStorage.getItem('access_token');

  return {
    fetchContacts: async params => {
      return fetch(
        `${baseURL}/contacts`,
        {
          headers: {
            Authorization: accessToken,
            // Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZhZTU5Zjk4MWJlYjAwMTRkOTJmYmUiLCJpYXQiOjE2OTQxNjQzODN9.Yr1NFiFPsrX03Jq3XOrKGdSWHhnDNqSh10ci63jZo0c',
          },
        },
      );
    },
    addContact: async newContact => {
      return fetch(`${baseURL}/contacts`, {
        method: 'POST',
        body: JSON.stringify(newContact),
        headers: {
          Authorization: accessToken,
          // Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZhZTU5Zjk4MWJlYjAwMTRkOTJmYmUiLCJpYXQiOjE2OTQxNjQzODN9.Yr1NFiFPsrX03Jq3XOrKGdSWHhnDNqSh10ci63jZo0c',
        },
      });
    },
    deleteContact: async contactId => {
      return fetch(`${baseURL}/contacts/${contactId}`, {method: 'DELETE'});
    },
  };
};


