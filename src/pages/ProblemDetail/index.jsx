import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faClock,
  faMemory,
  faFlask,
  faList,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import { API_CONFIG } from "../../configs/api";
import { useGetProblemQuery } from "../../api/problemApi";
import styles from "./ProblemDetail.module.scss";
import { useGetAllLanguagesQuery } from "../../api/languagesApi";
import { useSubmitCodeMutation } from "../../api/submissionApi";

// TODO: Lấy id từ router (ví dụ: useParams nếu dùng react-router)
const problemId = 1; // Hardcode tạm, cần thay bằng lấy từ URL

const ProblemDetail = () => {
  // Lấy dữ liệu problem từ API
  const { data: problem, isSuccess: isSuccessProblem } =
    useGetProblemQuery(problemId);
  // Lấy danh sách ngôn ngữ từ API
  const { data: languages, isSuccess: isSuccessLanguages } =
    useGetAllLanguagesQuery();

  const [code, setCode] = useState("");
  const [submitCode] = useSubmitCodeMutation();
  // State for selected language
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);

  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [testResults, setTestResults] = useState([]);

  const API_BASE_URL = API_CONFIG.BASE_URL;

  // Set default selected language when languages are loaded
  React.useEffect(() => {
    if (
      isSuccessLanguages &&
      Array.isArray(languages) &&
      languages.length > 0
    ) {
      setSelectedLanguageId(languages[0].id);
    }
  }, [isSuccessLanguages, languages]);

  // Test cases lấy từ backend nếu có, fallback []
  const testCases = problem && problem.testCases ? problem.testCases : [];

  // Handle test case selection
  const handleTestCaseSelect = (index) => {
    setSelectedTestCase(index);
    setInput(testCases[index]?.input || "");
  };

  // Run all test cases
  const handleRunAllTests = async () => {
    if (!code.trim()) {
      alert("Please enter some code to submit!");
      return;
    }
    if (!selectedLanguageId) {
      alert("Please select a language!");
      return;
    }

    setIsSubmitting(true);
    setIsPolling(true);
    setTestResults([]);

    try {
      // Submit code for each test case sequentially
      const results = [];
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        // Submit code with input and expected_output
        // Parse input: extract all numbers and join with space
        let parsedInput = testCase.input;
        if (typeof parsedInput === "string") {
          // Lấy tất cả số (cả số âm, số thực)
          const nums = parsedInput.match(/-?\d+(?:\.\d+)?/g);
          parsedInput = nums ? nums.join(" ") : parsedInput;
        }
        const data = await submitCode({
          source_code: code,
          language_id: selectedLanguageId,
          stdin: parsedInput,
          expected_output: testCase.expected || testCase.expected_output || "",
        }).unwrap();
        // Poll for result
        let attempts = 0;
        let resultData = null;
        while (attempts < API_CONFIG.POLLING.MAX_ATTEMPTS) {
          const res = await fetch(
            `${API_BASE_URL}/submissions/${data.submission_id}`
          );
          const pollData = await res.json();
          if (
            pollData.success &&
            pollData.data.result &&
            pollData.data.result.status &&
            pollData.data.result.status.id > 2
          ) {
            resultData = pollData.data.result;
            break;
          }
          attempts++;
          await new Promise((r) => setTimeout(r, API_CONFIG.POLLING.INTERVAL));
        }
        // Check result
        let passed = false;
        if (
          resultData &&
          resultData.status &&
          resultData.status.id === 3 &&
          resultData.stdout
        ) {
          passed =
            resultData.stdout.trim() ===
            (testCase.expected || testCase.expected_output || "").trim();
        }
        results.push({
          testCase,
          result: resultData || { message: "Execution timeout" },
          passed,
        });
      }
      setTestResults(results);
      setIsPolling(false);
    } catch (error) {
      console.error("Batch submission error:", error);
      alert(`Batch submission failed: ${error.message}`);
      setIsPolling(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit code to API (single submission)
  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Please enter some code to submit!");
      return;
    }
    if (!selectedLanguageId) {
      alert("Please select a language!");
      return;
    }

    setIsSubmitting(true);
    setIsPolling(true);
    setSubmissionResult(null);
    setSubmissionId(null);
    setTestResults([]);

    try {
      // Submit code for the selected test case only
      const testCase = testCases[selectedTestCase];
      // Parse input: extract all numbers and join with space
      let parsedInput = testCase.input;
      if (typeof parsedInput === "string") {
        const nums = parsedInput.match(/-?\d+(?:\.\d+)?/g);
        parsedInput = nums ? nums.join(" ") : parsedInput;
      }
      const data = await submitCode({
        source_code: code,
        language_id: selectedLanguageId,
        stdin: parsedInput,
        expected_output: testCase.expected || testCase.expected_output || "",
      }).unwrap();

      let attempts = 0;
      let resultData = null;
      while (attempts < API_CONFIG.POLLING.MAX_ATTEMPTS) {
        const res = await fetch(
          `${API_BASE_URL}/submissions/${data.submission_id}`
        );
        const pollData = await res.json();
        if (
          pollData.success &&
          pollData.data.result &&
          pollData.data.result.status &&
          pollData.data.result.status.id > 2
        ) {
          resultData = pollData.data.result;
          break;
        }
        attempts++;
        await new Promise((r) => setTimeout(r, API_CONFIG.POLLING.INTERVAL));
      }
      // Check result
      let passed = false;
      if (
        resultData &&
        resultData.status &&
        resultData.status.id === 3 &&
        resultData.stdout
      ) {
        passed =
          resultData.stdout.trim() ===
          (testCase.expected || testCase.expected_output || "").trim();
      }
      setTestResults([
        {
          testCase,
          result: resultData || { message: "Execution timeout" },
          passed,
        },
      ]);
      setIsPolling(false);
    } catch (error) {
      console.error("Submission error:", error);
      setIsPolling(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get status icon and color
  const getStatusDisplay = (status) => {
    if (!status) return { icon: faClock, color: "gray", text: "Processing..." };

    const statusId = status.id;
    const statusDesc = status.description;

    switch (statusId) {
      case 3: // Accepted
        return {
          icon: faCheckCircle,
          color: "green",
          text: statusDesc,
        };
      case 4: // Wrong Answer
        return { icon: faTimesCircle, color: "red", text: statusDesc };
      case 5: // Time Limit Exceeded
      case 6: // Compilation Error
      case 7: // Runtime Error (SIGSEGV)
      case 8: // Runtime Error (SIGXFSZ)
      case 9: // Runtime Error (SIGFPE)
      case 10: // Runtime Error (SIGABRT)
      case 11: // Runtime Error (NZEC)
      case 12: // Runtime Error (Other)
      case 13: // Internal Error
      case 14: // Exec Format Error
        return {
          icon: faExclamationTriangle,
          color: "orange",
          text: statusDesc,
        };
      default:
        return {
          icon: faClock,
          color: "gray",
          text: statusDesc || "Processing...",
        };
    }
  };

  return (
    <div className={styles.demo}>
      <Header />
      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <div className={styles.editorSection}>
            <h3>Problem</h3>
            {/* Hiển thị trạng thái lấy problem */}
            {isSuccessProblem && problem && (
              <div style={{ marginBottom: 12 }}>
                <div>
                  <strong>{problem.title}</strong>
                </div>
              </div>
            )}
            <textarea
              className={styles.codeEditor}
              value={isSuccessProblem && problem.description}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your JavaScript code here..."
              spellCheck="false"
            />
          </div>
          <div className={styles.resultSection}>
            <h3>Execution Result</h3>

            {submissionId && (
              <div className={styles.submissionInfo}>
                <p>
                  <strong>Submission ID:</strong> {submissionId}
                </p>
              </div>
            )}

            {submissionResult || testResults.length > 0 ? (
              <div className={styles.result}>
                {(() => {
                  // Ưu tiên submissionResult, nếu không có thì lấy testResults[0]
                  const resultObj = submissionResult
                    ? submissionResult.result
                    : testResults[0]?.result;
                  const { icon, color, text } = getStatusDisplay(
                    resultObj?.status
                  );
                  return (
                    <div className={`${styles.statusBadge} ${styles[color]}`}>
                      <FontAwesomeIcon icon={icon} />
                      {text}
                    </div>
                  );
                })()}

                {(() => {
                  const resultObj = submissionResult
                    ? submissionResult.result
                    : testResults[0]?.result;
                  return resultObj && resultObj.stdout ? (
                    <div className={styles.output}>
                      <h4>Output:</h4>
                      <pre>{resultObj.stdout}</pre>
                    </div>
                  ) : null;
                })()}

                {(() => {
                  const resultObj = submissionResult
                    ? submissionResult.result
                    : testResults[0]?.result;
                  return resultObj && resultObj.stderr ? (
                    <div className={styles.error}>
                      <h4>Error:</h4>
                      <pre>{resultObj.stderr}</pre>
                    </div>
                  ) : null;
                })()}

                {(() => {
                  const resultObj = submissionResult
                    ? submissionResult.result
                    : testResults[0]?.result;
                  return resultObj && resultObj.compile_output ? (
                    <div className={styles.compileError}>
                      <h4>Compilation Error:</h4>
                      <pre>{resultObj.compile_output}</pre>
                    </div>
                  ) : null;
                })()}

                <div className={styles.metrics}>
                  {(() => {
                    const resultObj = submissionResult
                      ? submissionResult.result
                      : testResults[0]?.result;
                    return resultObj && resultObj.time ? (
                      <div className={styles.metric}>
                        <FontAwesomeIcon icon={faClock} />
                        <span>Time: {resultObj.time}s</span>
                      </div>
                    ) : null;
                  })()}
                  {(() => {
                    const resultObj = submissionResult
                      ? submissionResult.result
                      : testResults[0]?.result;
                    return resultObj && resultObj.memory ? (
                      <div className={styles.metric}>
                        <FontAwesomeIcon icon={faMemory} />
                        <span>Memory: {resultObj.memory} KB</span>
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            ) : (
              <div className={styles.placeholder}>
                <p>
                  Click &quot;Run Selected&quot; to test one case or &quot;Run
                  All Tests&quot; to test all cases
                </p>
              </div>
            )}
          </div>

          <div className={styles.inputSection}>
            <h3>Standard Input (stdin)</h3>
            <textarea
              className={styles.inputArea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input for your program (optional)..."
              rows="4"
            />
          </div>
        </div>

        <div className={styles.rightPanel}>
          {/* Monaco Editor bổ sung */}
          <select
            className={styles.languageSelect}
            value={selectedLanguageId || ""}
            onChange={(e) => setSelectedLanguageId(e.target.value)}
          >
            {isSuccessLanguages && Array.isArray(languages) ? (
              languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
          <div className={styles.monacoEditorBox}>
            <MonacoEditor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                fontSize: 16,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
                lineNumbers: "on",
                tabSize: 2,
                fontFamily: "Fira Mono, monospace",
                smoothScrolling: true,
                scrollbar: {
                  vertical: "auto",
                  horizontal: "auto",
                },
              }}
            />
          </div>

          <div className={styles.testCasesSection}>
            <h3>
              <FontAwesomeIcon icon={faFlask} />
              Test Cases
            </h3>
            <div className={styles.testCasesTabs}>
              {testCases.map((testCase, index) => (
                <button
                  key={index}
                  className={`${styles.testCaseTab} ${
                    selectedTestCase === index ? styles.active : ""
                  }`}
                  onClick={() => handleTestCaseSelect(index)}
                >
                  Case {index + 1}
                </button>
              ))}
            </div>
            {testCases[selectedTestCase] && (
              <div className={styles.testCaseContent}>
                <div className={styles.testCaseInput}>
                  <h4>Input:</h4>
                  <textarea
                    className={styles.testCaseTextarea}
                    value={testCases[selectedTestCase].input || ""}
                    readOnly
                  />
                </div>
                <div className={styles.testCaseExpected}>
                  <h4>Expected Output:</h4>
                  <textarea
                    className={styles.testCaseTextarea}
                    value={testCases[selectedTestCase].expected_output || ""}
                    readOnly
                  />
                </div>
                {testCases[selectedTestCase].explanation && (
                  <p className={styles.testCaseDescription}>
                    Explanation: {testCases[selectedTestCase].explanation}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className={styles.submitSection}>
            <div className={styles.submitButtons}>
              <button
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={isSubmitting || isPolling}
              >
                {isSubmitting || isPolling ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    {isSubmitting ? "Submitting..." : "Executing..."}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPlay} />
                    Run Selected
                  </>
                )}
              </button>
              <button
                className={`${styles.submitBtn} ${styles.testAllBtn}`}
                onClick={handleRunAllTests}
                disabled={isSubmitting || isPolling}
              >
                {isSubmitting || isPolling ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Testing...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faClipboardList} />
                    Run All Tests
                  </>
                )}
              </button>
            </div>
          </div>

          {testResults.length > 0 && (
            <div className={styles.testResultsSection}>
              <h3>
                <FontAwesomeIcon icon={faList} />
                Test Results
              </h3>
              <div className={styles.testResultsSummary}>
                <span className={styles.passed}>
                  {testResults.filter((r) => r.passed).length} Passed
                </span>
                <span className={styles.failed}>
                  {testResults.filter((r) => !r.passed).length} Failed
                </span>
                <span className={styles.total}>
                  Total: {testResults.length}
                </span>
              </div>
              <div className={styles.testResultsList}>
                {testResults.map((testResult, index) => (
                  <div
                    key={index}
                    className={`${styles.testResultItem} ${
                      testResult.passed ? styles.passed : styles.failed
                    }`}
                  >
                    <div className={styles.testResultHeader}>
                      <FontAwesomeIcon
                        icon={testResult.passed ? faCheckCircle : faTimesCircle}
                        className={styles.testResultIcon}
                      />
                      <span className={styles.testResultTitle}>
                        Test Case {testResult.testCase.id}
                      </span>
                      <span className={styles.testResultStatus}>
                        {testResult.passed ? "Passed" : "Failed"}
                      </span>
                    </div>
                    <div className={styles.testResultDetails}>
                      <div className={styles.testResultDescription}>
                        {testResult.testCase.description}
                      </div>
                      <div className={styles.testResultIO}>
                        <div className={styles.testInput}>
                          <strong>Input</strong>
                          <pre>{testResult.testCase.input}</pre>
                        </div>
                        <div className={styles.testExpected}>
                          <strong>Expected</strong>
                          <pre>
                            {testResult.testCase.expected ||
                              testResult.testCase.expected_output ||
                              ""}
                          </pre>
                        </div>
                        <div className={styles.testActual}>
                          <strong>Actual</strong>
                          <pre>
                            {testResult.result && testResult.result.stdout
                              ? testResult.result.stdout
                              : ""}
                          </pre>
                        </div>
                        {testResult.result.stderr && (
                          <div className={styles.testError}>
                            <strong>Error</strong>
                            <pre>{testResult.result.stderr}</pre>
                          </div>
                        )}
                      </div>
                      <div className={styles.testMetrics}>
                        {testResult.result.time && (
                          <span>Time: {testResult.result.time}s</span>
                        )}
                        {testResult.result.memory && (
                          <span>Memory: {testResult.result.memory} KB</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
