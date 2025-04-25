export const LANGUAGE_VERSIONS = {
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  c: "10.2.0",
  cpp: "10.2.0",
  html: "5.0.0",
  css: "3.0.0",
  javascript: "18.15.0"
};

export const CODE_SNIPPETS = {
  typescript: `type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello World !");\n}\n\ngreet({ name: "Hi !" });\n`,
  python: `def greet():\n\tprint("Hello World !")\n\ngreet()\n`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World !");\n\t}\n}\n`,
  csharp: 'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello {\n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World !");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
  c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello World!\\n");\n\treturn 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello World!" << endl;\n\treturn 0;\n}`,
  html: "<h1>Hello World!</h1>\n<p>This is a live HTML preview.</p>",
  css: "body { background-color: #f0f0f0; font-family: sans-serif; }",
  javascript: `function greet(name) {\n\tconsole.log("Hello World !");\n}\n\ngreet("Hi !");\n`
};
