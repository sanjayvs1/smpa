# LangFlow Integration with Next.js

## **Project Overview**
This project demonstrates the integration of LangFlow APIs into a Next.js application to interact with advanced language models. LangFlow is a platform that facilitates the execution of workflows involving Groq and Mistral AI-powered language models for tasks such as text generation, summarization, and classification. By integrating LangFlow into a Next.js app, this project provides a streamlined interface to interact with these workflows.

---

## **Features**
- Integration with LangFlow APIs for workflow execution.
- User-friendly interface for initiating sessions and processing requests.
- Supports customizable inputs and outputs for workflows.
- Easily extendable to include additional LangFlow workflows.

---

## **Technologies Used**
- **Astra Daatastax DB**:Database for storing vectorized data.
- **Next.js**: Framework for building React-based web applications.
- **LangFlow API**: Backend service for managing and executing AI workflows.
- **Tailwind CSS**: Styling framework for designing UI components.
- **Node.js**: Runtime for server-side functionality.

## **Getting Started**

### **Prerequisites**
- Node.js (v14+)
- npm or Yarn

### **Installation**
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd my-nextjs-app
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```env
   NEXT_PUBLIC_LANGFLOW_API_URL=https://api.langflow.astra.datastax.com
   NEXT_PUBLIC_LANGFLOW_APP_TOKEN=<your_application_token>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Usage**
1. Access the app at `http://localhost:3000`.
2. Use the provided interface to input data and initiate workflows.
3. View and analyze the outputs generated by the LangFlow workflow.

---

## **Contributing**
Contributions are welcome! If you encounter issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

---

## **Acknowledgments**
Special thanks to the creators of LangFlow and Datastax Astra for providing robust tools for managing AI workflows.

