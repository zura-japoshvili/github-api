# Project Setup Guide

> [!Note]  
> This project does **not** use **lazy loading** because, given its scale, it was deemed unnecessary. Additionally, **NgRx** is not used since the project's state is minimal, making NgRx an overkill solution.

## Installation & Running

Follow these steps to set up and run the project:

1. **Clone the repository**
   ```sh
   git clone https://github.com/zura-japoshvili/github-api
   cd github-api
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**  
   Ensure the `src/environments/environment.ts` file is properly configured.

4. **Run the project**
   ```sh
   ng serve
   ```
   The project will be available at `http://localhost:4200/`.

---

## Environment Configuration
> [!Warning]  
> The authorization token is **not** currently set in the environment configuration. This may result in a **limited number of API requests** due to authentication restrictions.

This project uses an environment configuration, allowing us to define different parameters for development (development). These parameters are stored in the src/environments/ directory and include the following file:

- `environment.ts` – Used for local development.

Currently, the **authorization token** is not stored in the environment files. You may need to manually update the token to ensure API requests work properly.


