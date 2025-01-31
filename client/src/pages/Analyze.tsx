import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Show } from "./Show";

export const Analyze = () => {
  const [srcCode, setSrcCode] = useState<string>("");
  const [lang, setLang] = useState<string>("cpp");
  const [loading, setLoading] = useState<boolean>(false);
  interface AnalysisResult {
    score: number;
    timeComplexity: string;
    spaceComplexity: string;
    clarityReadability: string;
    maintainability: string;
    correctness: string;
  }

  const [result, setResult] = useState<AnalysisResult | null>(null);

  const getres = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!srcCode) return;
    setLoading(true);
    setResult(null);

    try {
      const codeinfo = {
        code: srcCode,
        lang: lang,
      };
      const res = await axios.post<{ result: string }>(
        "http://localhost:3000/analyze",
        codeinfo
      );
      const parsedResult = JSON.parse(res.data.result);
      setResult(parsedResult);
      // console.log(parsedResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!loading && (
        <div className="flex bg-white flex-col items-center justify-center w-[400px] h-[500px] p-4 overflow-auto">
          {!result && (
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              {!loading && (
                <>
                  <h1 className="text-2xl font-bold mb-4">Analyze Code</h1>
                  <form onSubmit={getres} className="space-y-4">
                    <div>
                      <label
                        htmlFor="dataInput"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enter Code
                      </label>
                      <textarea
                        id="dataInput"
                        value={srcCode}
                        onChange={(e) => setSrcCode(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter code to analyze"
                        rows={10}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="langSelect"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Select Language
                      </label>
                      <select
                        id="langSelect"
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                        <option value="ruby">Ruby</option>
                        <option value="go">Go</option>
                        <option value="php">PHP</option>
                      </select>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Analyze
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}

          {result && (
            <Show
              score={result.score}
              timeComplexity={result.timeComplexity}
              spaceComplexity={result.spaceComplexity}
              clarityReadability={result.clarityReadability}
              maintainability={result.maintainability}
              correctness={result.correctness}
            />
          )}
        </div>
      )}
      {loading && (
        <div className="flex justify-center flex-col items-center mt-4 w-[400px] h-[500px] overflow-hidden bg-white">
          <ClipLoader color={"#4A90E2"} loading={loading} size={50} />
        </div>
      )}
    </>
  );
};
