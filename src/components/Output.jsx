import { useState} from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language, htmlCode, cssCode, jsCode }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [iframeSrcDoc, setIframeSrcDoc] = useState("");

  const runCode = async () => {
    if (["html", "css", "javascript", "web"].includes(language)) {
      const srcDoc = `
        <html>
          <head>
            <style>${cssCode || ""}</style>
          </head>
          <body>
            ${htmlCode || ""}
            <script>${jsCode || ""}</script>
          </body>
        </html>
      `;
      setIframeSrcDoc(srcDoc);
      setOutput(null);
      return;
    }

    const sourceCode = editorRef?.current?.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
      setIframeSrcDoc(""); 
    } catch (error) {
      console.error("Error executing code:", error);
      alert("An error occurred: " + (error.message || "Unable to run code"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100 px-3">
      <h5 className="mb-2">Output</h5>
      <button
        className="btn btn-outline-success mb-3"
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>

      {iframeSrcDoc ? (
        <iframe
          srcDoc={iframeSrcDoc}
          title="Live Preview"
          sandbox="allow-scripts allow-same-origin"
          width="100%"
          height="75vh"
          style={{ background: "white" }}
        ></iframe>
      ) : (
        <div
          className={`p-3 border rounded overflow-auto`}
          style={{
            height: "75vh",
            borderColor: isError ? "#dc3545" : "#333",
            color: isError ? "#dc3545" : "inherit",
          }}
        >
          {output
            ? output.map((line, i) => <div key={i}>{line}</div>)
            : 'Click "Run Code" to see the output here'}
        </div>
      )}
    </div>
  );
};

export default Output;
