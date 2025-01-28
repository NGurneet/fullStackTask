# Fullstack Assessment with Amplify

This project is a full-stack application utilizing AWS Amplify for backend services and hosting.

---

## Prerequisites
Before you start, make sure you have the following tools installed:

- **Node.js** (v16 or higher) and npm
- **Git**
- **AWS CLI** ([Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html))
- **Amplify CLI** ([Install Guide](https://docs.amplify.aws/cli/start/install/))
  
---

## Steps to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/NGurneet/fullstack-assesment-amplify.git
cd fullstack-assesment-amplify
```

### 2. Install Dependencies
Install the required dependencies for the frontend and backend:

```bash
cd amplify/backend
npm install
cd ../frontend
npm install
```

### 3. Configure Amplify
Run the following command to link the app to your Amplify account and set up your environment:
```bash
amplify init
```
Follow the prompts and configure:
- Your project name
- Environment
- AWS profile

### 4. Deploy Backend
Run this command to deploy backend resources to AWS:
```bash
amplify push
```

### 5. Start the Frontend
Once the backend is deployed, start the frontend:
```bash
cd frontend
npm start
```

Your application should now be running locally. Open your browser and visit `http://localhost:3000`.

---

## Features
- **Frontend**: Built with React.js.
- **Backend**: Managed using AWS Amplify.
- **Authentication**: User authentication with AWS Cognito.
- **Data Management**: Uses DynamoDB (or other Amplify-supported storage) for database needs.

---

## Clean Up
To remove all deployed resources, use:
```bash
amplify delete
```

---

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

### Enjoy coding!
