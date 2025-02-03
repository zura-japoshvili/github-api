# Project Setup Guide

## Environment Configuration

This project uses an `environment` configuration, allowing us to define different parameters for development (`development`) and production (`production`) environments.  
These parameters are stored in the `src/environments/` directory and include the following files:

- `environment.ts` – Used for local development.

Currently, the **authorization token** is not stored in the environment files. You may need to manually update the token to ensure API requests work properly.

---

## Note  
This project does **not** use **lazy loading** because, considering its scale, it was deemed unnecessary. Additionally, **NgRx** is not used since the project's state is minimal, and using NgRx would be overkill.

## Warning  
The authorization token is **not** currently set in the environment configuration. This may result in a **limited number of API requests** due to authentication restrictions.
