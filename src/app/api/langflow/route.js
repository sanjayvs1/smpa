import { NextResponse } from "next/server";

class LangflowClient {
  constructor(baseURL, applicationToken) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} - ${JSON.stringify(
            responseMessage
          )}`
        );
      }
      return responseMessage;
    } catch (error) {
      console.error("Request Error:", error.message);
      throw error;
    }
  }

  async initiateSession(
    flowId,
    langflowId,
    inputValue,
    inputType = "chat",
    outputType = "chat",
    stream = false,
    tweaks = {}
  ) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, {
      input_value: inputValue,
      input_type: inputType,
      output_type: outputType,
      tweaks: tweaks,
    });
  }

  async runFlow(
    flowIdOrName,
    langflowId,
    inputValue,
    inputType = "chat",
    outputType = "chat",
    tweaks = {},
    stream = false
  ) {
    const initResponse = await this.initiateSession(
      flowIdOrName,
      langflowId,
      inputValue,
      inputType,
      outputType,
      stream,
      tweaks
    );

    return initResponse;
  }
}

// The default tweaks configuration
const DEFAULT_TWEAKS = {
  "ChatInput-aYKo9": {},
  "ParseData-7YqvC": {},
  "Prompt-L2iRS": {},
  "SplitText-xU5Xo": {},
  "ChatOutput-ZqZBV": {},
  "AstraDB-Eu3Xi": {},
  "AstraDB-RsMaT": {},
  "File-RTqxt": {},
  "MistalAIEmbeddings-mwfTY": {},
  "MistalAIEmbeddings-y13Qw": {},
  "GroqModel-vrlMb": {},
};

export async function POST(request) {
  try {
    // Get the prompt from the request body
    const { prompt } = await request.json();

    // Validate the prompt
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Initialize the Langflow client
    // Note: These should be in your .env file
    const flowIdOrName = process.env.LANGFLOW_FLOW_ID || "smpa";
    const langflowId =
      process.env.LANGFLOW_ID || "ed7e34db-712b-4380-86f3-182db3e1eae6";
    const applicationToken = process.env.LANGFLOW_APPLICATION_TOKEN;

    if (!applicationToken) {
      return NextResponse.json(
        { error: "Application token not configured" },
        { status: 500 }
      );
    }

    const client = new LangflowClient(
      "https://api.langflow.astra.datastax.com",
      applicationToken
    );

    // Run the flow
    const response = await client.runFlow(
      flowIdOrName,
      langflowId,
      prompt,
      "chat",
      "chat",
      DEFAULT_TWEAKS,
      false
    );

    // Extract the output message
    if (
      response &&
      response.outputs &&
      response.outputs[0] &&
      response.outputs[0].outputs &&
      response.outputs[0].outputs[0] &&
      response.outputs[0].outputs[0].outputs &&
      response.outputs[0].outputs[0].outputs.message
    ) {
      const output = response.outputs[0].outputs[0].outputs.message;

      return NextResponse.json({
        message: output.message.text,
      });
    }

    throw new Error("Invalid response structure");
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: error.message },
      { status: 500 }
    );
  }
}
