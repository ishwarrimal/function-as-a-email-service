# Gatsby and Netlify based function as a service for sending emails using meilgun.

## prerequisites

- Make sure to link your repo with Netlify
- Need to create account in mailgun
- collect the API_KEY and DOMAIN from mailgun

## Start the project

### install all the dependencies

```bash
$ yarn
```

### Running the server

```bas
$ yarn develop
```

You can check the contact API at /api/sendMail

### Additional details

This project contains a UI for testing the server.  
I have made use of netlify for managing everything.

```bash
$ netlify dev
```

Will create a server with the form component.
