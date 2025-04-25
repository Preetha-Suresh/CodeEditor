import { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const htmlRef = useRef();
  const cssRef = useRef();
  const jsRef = useRef();

  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);

  const [html, setHtml] = useState(CODE_SNIPPETS["html"]);
  const [css, setCss] = useState(CODE_SNIPPETS["css"]);
  const [js, setJs] = useState(CODE_SNIPPETS["javascript"]);
  const [srcDoc, setSrcDoc] = useState("");

  const isWebMode = language === "html" || language === "css";

  useEffect(() => {
    if (isWebMode) {
      const timeout = setTimeout(() => {
        setSrcDoc(`
          <html>
            <head><style>${css}</style></head>
            <body>
              ${html}
              <script>${js}</script>
            </body>
          </html>
        `);
      }, 250);

      return () => clearTimeout(timeout);
    }
  }, [html, css, js, isWebMode]);

  const onSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
    if (!isWebMode) {
      setTimeout(() => {
        if (editorRef.current) editorRef.current.setValue(CODE_SNIPPETS[lang]);
      }, 0);
    }
  };

  const onMount = (editor) => {
    if (!isWebMode) {
      editorRef.current = editor;
      editor.focus();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-md-6">
          <LanguageSelector language={language} onSelect={onSelect} />

          {!isWebMode ? (
            <Editor
              options={{ minimap: { enabled: false } }}
              height="75vh"
              theme="vs-dark"
              language={language}
              value={value}
              onMount={onMount}
              onChange={(val) => setValue(val)}
            />
          ) : (
            <>
              <h5 className="mt-3">HTML</h5>
              <Editor
                height="25vh"
                theme="vs-dark"
                language="html"
                defaultValue={html}
                onChange={(val) => setHtml(val)}
                onMount={(editor) => (htmlRef.current = editor)}
              />
              <h5 className="mt-3">CSS</h5>
              <Editor
                height="25vh"
                theme="vs-dark"
                language="css"
                defaultValue={css}
                onChange={(val) => setCss(val)}
                onMount={(editor) => (cssRef.current = editor)}
              />
              <h5 className="mt-3">JavaScript</h5>
              <Editor
                height="25vh"
                theme="vs-dark"
                language="javascript"
                defaultValue={js}
                onChange={(val) => setJs(val)}
                onMount={(editor) => (jsRef.current = editor)}
              />
            </>
          )}
        </div>

        <div className="col-md-6">
          {!isWebMode ? (
            <Output editorRef={editorRef} language={language} />
          ) : (
            <div>
              <h5 className="mb-3">Live Preview</h5>
              <iframe
                srcDoc={srcDoc}
                title="Live Output"
                sandbox="allow-scripts"
                width="100%"
                height="80vh"
                style={{ backgroundColor: "white" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
