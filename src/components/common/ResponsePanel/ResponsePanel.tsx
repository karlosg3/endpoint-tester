import { useEffect, useState } from "react";
import "./ResponsePanel.css";
import { toast } from "sonner";

interface RequestResponse {
  status: number;
  statusText: string;
  responseTime: number;
  data: unknown;
  isError: boolean;
  errorMessage?: string;
  headers: Record<string, string | string[]>;
}

interface ResponsePanelProps {
  response: RequestResponse | null;
  isLoading: boolean;
  getStatusCategory: (status: number) => string;
}

export default function ResponsePanel({
  response,
  isLoading,
  getStatusCategory,
}: ResponsePanelProps) {
  const [prettyPrint, setPrettyPrint] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [responseTab, setResponseTab] = useState<"body" | "headers">("body");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrettyPrint(true);
    setResponseTab("body");
  }, [response]);

  async function handleCopyResponse(): Promise<void> {
    if (!response?.data) {
      toast.error("No response data to copy!");
      return;
    }
    const text =
      typeof response.data === "string"
        ? response.data
        : JSON.stringify(response.data, null, 2);

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Response copied to clipboard!");
  }

  return (
    <div className="response-panel">
      {!response && !isLoading && (
        <div className="response-empty">
          Send a request to see the response.
        </div>
      )}

      {isLoading && <div className="response-empty">Sending request...</div>}

      {response && !isLoading && (
        <>
          <div className="response-meta">
            <span
              className={`status-badge ${getStatusCategory(response.status)}`}
            >
              {response.status === 0
                ? "Network Error"
                : `${response.status} ${response.statusText}`}
            </span>
            <span className="response-time">{Math.round(response.responseTime)} ms</span>
            {!response.isError && (
              <>
                {typeof response.data !== "string" && (
              <button
                className="pretty-toggle"
                onClick={() => setPrettyPrint((prev) => !prev)}
              >
                {prettyPrint ? "Raw" : "Pretty"}
              </button>
            )}
            <button
              className="pretty-toggle"
              onClick={handleCopyResponse}
              style={{
                marginLeft: typeof response.data === "string" ? "auto" : "0",
              }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
              </>
            )}
          </div>

          {response.isError ? (
            <div className="response-body">
              <span className="response-error">{response.errorMessage}</span>
            </div>
          ) : responseTab === 'body' ? (
            <div className="response-body">
              {typeof response.data === "string"
                ? response.data
                : prettyPrint
                  ? JSON.stringify(response.data, null, 2)
                  : JSON.stringify(response.data)}
            </div>
          ) : (
            <div className="response-body">
              {Object.entries(response.headers).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {String(value)}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
