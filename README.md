# DialogueAI

DialogueAI is an interactive platform leveraging AssemblyAI's speech-to-text API and LeMUR summarization model. The platform aims to simplify the process for users, making it easy to experiment with and utilize these powerful APIs.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/emak7izi0d1otrw80uv5.png)


## Table of Contents
- [DialogueAI](#dialogueai)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
    - [Need for the Solution](#need-for-the-solution)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Usage](#usage)
  - [Contributing](#contributing)

## About
DialogueAI simplifies the use of AssemblyAI's APIs by offering an interactive playground where users can configure settings, run tests, and generate code snippets. This helps users quickly get started and efficiently use the API for their projects.

### Need for the Solution
When I first encountered AssemblyAI's API, I found the documentation a bit overwhelming and confusing, especially for newcomers. This platform was born out of the need to bridge the gap between complex documentation and easy-to-use implementations. By providing a user-friendly interface and instant feedback, DialogueAI helps users understand and leverage the API's capabilities more effectively.

## Features
- **Interactive Playground**: Users can explore and experiment with various API functionalities through an intuitive interface. Input boxes, selection options, model selection, and summary types are all easily adjustable.

![Interactive Speech-to-Text Configurations](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qdy3i857awn7gcagyd66.png)

![Generted code and summary](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9xrqfn5u7mzg5s8wre01.png)

- **Instant Results**: With a single click, users can execute API calls and see the results immediately. This feature helps bridge the gap between learning and actual implementation.

- **Code Generation**: For those who prefer to handle API calls manually, the platform generates the necessary code snippets, which can be directly run on their systems. This feature significantly reduces the time and effort required to understand and use the API.

- **Smart Summary Page**: Similar to the main playground, this page offers various configuration options and examples to help users generate summaries of transcripts quickly. Users can also get the generated code to use by themselves.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zom6koz439t2yeyymp3p.png)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b41b3qm3srzvokf5d8h9.png)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s71aqh9fddn9eory9zn4.png)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k1smmt2kluqj1giglqee.png)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f2o3u1j1vuli16ygw7yb.png)

By providing these features, the platform ensures that users can quickly and efficiently learn how to use AssemblyAI's APIs, reducing the frustration and time typically spent navigating complex documentation. This makes it an invaluable tool for developers and anyone looking to incorporate speech-to-text and summarization capabilities into their projects.

## Tech Stack

**Frontend:**
- React
- TypeScript
- Tailwind CSS
- Vite
- Framer Motion

**Backend:**
- Node.js
- AssemblyAI API (Speech-to-Text, LeMUR)

## Installation

To get started with DialogueAI, follow these steps:

### Clone the Repository
```bash
git clone https://github.com/triggeredcode/DialogueAI.git
cd DialogueAI
```

### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage
1. Ensure the backend server is running.
2. Start the frontend development server.
3. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your changes are well-documented and pass any existing tests.
