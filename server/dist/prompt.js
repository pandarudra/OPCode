"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompt_data = void 0;
const prompt_data = (code, lang) => {
    return `## Code Quality Analysis Request
  
  **Programming Language:** ${lang}
  
  **Code:**
  \`\`\`${code}\`\`\`
  
  **Desired Output:** A detailed code quality analysis in JSON format covering the following fields:
  
  {
    "score": "A qualitative assessment and a score out of 10.",
    "timeComplexity": "Big O notation .",
    "spaceComplexity": "Big O notation .",
    "clarityReadability": "Assessment and suggestions for improvement.",
    "maintainability": "Assessment and suggestions for improvement.",
    "correctness": "Identification of potential bugs and test cases (if applicable). If no bugs are found, explicitly state this."
  }
  `;
};
exports.prompt_data = prompt_data;
