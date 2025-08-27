import { useState } from "react";
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
import styles from "./ProblemDetail.module.scss";

const ProblemDetail = () => {
  const [code, setCode] = useState(
    `// JavaScript Demo Code - Two Sum Problem\nfunction twoSum(nums, target) {\n    const map = new Map();\n    \n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        \n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        \n        map.set(nums[i], i);\n    }\n    \n    return [];\n}\n\n// Read input from stdin\nconst input = require('fs').readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = JSON.parse(input[0]);\nconst target = parseInt(input[1]);\n\n// Execute and print result\nconst result = twoSum(nums, target);\nconsole.log(JSON.stringify(result));`
  );

  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [testResults, setTestResults] = useState([]);

  const API_BASE_URL = API_CONFIG.BASE_URL;

  // Test cases for Two Sum problem
  const testCases = [
    {
      id: 1,
      input: `[2,7,11,15]\n9`,
      expected: "[0,1]",
      description: "Basic case: nums = [2,7,11,15], target = 9",
    },
    {
      id: 2,
      input: `[3,2,4]\n6`,
      expected: "[1,2]",
      description: "Different indices: nums = [3,2,4], target = 6",
    },
    {
      id: 3,
      input: `[3,3]\n6`,
      expected: "[0,1]",
      description: "Duplicate numbers: nums = [3,3], target = 6",
    },
    {
      id: 4,
      input: `[1,2,3,4,5]\n8`,
      expected: "[2,4]",
      description: "Larger array: nums = [1,2,3,4,5], target = 8",
    },
    {
      id: 5,
      input: `[2,5,5,11]\n10`,
      expected: "[1,2]",
      description: "Multiple same numbers: nums = [2,5,5,11], target = 10",
    },
    {
      id: 6,
      input: `[1,2,3,4,5]\n9`,
      expected: "[3,4]",
      description: "Larger array: nums = [1,2,3,4,5], target = 9",
    },
  ];

  // Handle test case selection
  const handleTestCaseSelect = (index) => {
    setSelectedTestCase(index);
    setInput(testCases[index].input);
  };

  // Run all test cases
  const handleRunAllTests = async () => {
    if (!code.trim()) {
      alert("Please enter some code to submit!");
      return;
    }

    setIsSubmitting(true);
    setTestResults([]);

    try {
      const submissions = testCases.map((testCase) => ({
        source_code: code,
        language_id: API_CONFIG.LANGUAGES.JAVASCRIPT,
        stdin: testCase.input,
        expected_output: testCase.expected,
        cpu_time_limit: 2,
        memory_limit: 128000,
        wall_time_limit: 5,
      }));

      const response = await fetch(`${API_BASE_URL}/submissions/batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissions: submissions,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsPolling(true);
        // Poll for all test results
        pollForBatchResults(data.data.submissions);
      } else {
        throw new Error(data.error?.message || "Batch submission failed");
      }
    } catch (error) {
      console.error("Batch submission error:", error);
      alert(`Batch submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Poll for batch results
  const pollForBatchResults = async (submissions) => {
    const maxAttempts = API_CONFIG.POLLING.MAX_ATTEMPTS;
    let attempts = 0;

    const poll = async () => {
      try {
        const promises = submissions.map((sub) =>
          fetch(`${API_BASE_URL}/submissions/${sub.submission_id}`)
        );
        const responses = await Promise.all(promises);
        const results = await Promise.all(responses.map((res) => res.json()));

        const allCompleted = results.every((result) => {
          return (
            result.success &&
            result.data.result?.status &&
            result.data.result.status.id > 2
          );
        });

        if (allCompleted) {
          const formattedResults = results.map((result, index) => ({
            testCase: testCases[index],
            result: result.data.result,
            passed: checkTestPassed(result.data.result, testCases[index]),
          }));
          setTestResults(formattedResults);
          setIsPolling(false);
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, API_CONFIG.POLLING.INTERVAL);
        } else {
          setTestResults(
            testCases.map((testCase) => ({
              testCase,
              result: { message: "Execution timeout" },
              passed: false,
            }))
          );
          setIsPolling(false);
        }
      } catch (error) {
        console.error("Batch polling error:", error);
        setTestResults(
          testCases.map((testCase) => ({
            testCase,
            result: { message: error.message },
            passed: false,
          }))
        );
        setIsPolling(false);
      }
    };

    poll();
  };

  // Check if test passed
  const checkTestPassed = (result, testCase) => {
    if (result.status?.id !== 3) return false; // Not accepted
    if (!result.stdout) return false;

    // Clean up output and expected for comparison
    const actualOutput = result.stdout.trim();
    const expectedOutput = testCase.expected.trim();

    return actualOutput === expectedOutput;
  };

  // Submit code to API (single submission)
  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Please enter some code to submit!");
      return;
    }

    setIsSubmitting(true);
    setSubmissionResult(null);
    setSubmissionId(null);

    try {
      const response = await fetch(`${API_BASE_URL}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: API_CONFIG.LANGUAGES.JAVASCRIPT,
          stdin: input,
          cpu_time_limit: 2,
          memory_limit: 128000,
          wall_time_limit: 5,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmissionId(data.data.submission_id);
        setIsPolling(true);
        // Start polling for results
        pollForResult(data.data.submission_id);
      } else {
        throw new Error(data.error?.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Poll for submission result
  const pollForResult = async (id) => {
    const maxAttempts = API_CONFIG.POLLING.MAX_ATTEMPTS;
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/submissions/${id}`);
        const data = await response.json();

        if (data.success) {
          const result = data.data.result;

          // Check if execution is complete
          if (result.status && result.status.id > 2) {
            setSubmissionResult(data.data);
            setIsPolling(false);
            return;
          }

          // Continue polling if not complete
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(poll, API_CONFIG.POLLING.INTERVAL);
          } else {
            setSubmissionResult({
              status: "timeout",
              result: { message: "Execution timeout" },
            });
            setIsPolling(false);
          }
        } else {
          throw new Error(data.error?.message || "Failed to get result");
        }
      } catch (error) {
        console.error("Polling error:", error);
        setSubmissionResult({
          status: "error",
          result: { message: error.message },
        });
        setIsPolling(false);
      }
    };

    poll();
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
            <h3>JavaScript Code Editor</h3>
            <textarea
              className={styles.codeEditor}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your JavaScript code here..."
              spellCheck="false"
            />
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.resultSection}>
            <h3>Execution Result</h3>

            {submissionId && (
              <div className={styles.submissionInfo}>
                <p>
                  <strong>Submission ID:</strong> {submissionId}
                </p>
              </div>
            )}

            {submissionResult ? (
              <div className={styles.result}>
                <div className={styles.status}>
                  {(() => {
                    const { icon, color, text } = getStatusDisplay(
                      submissionResult.result?.status
                    );
                    return (
                      <div className={`${styles.statusBadge} ${styles[color]}`}>
                        <FontAwesomeIcon icon={icon} />
                        {text}
                      </div>
                    );
                  })()}
                </div>

                {submissionResult.result?.stdout && (
                  <div className={styles.output}>
                    <h4>Output:</h4>
                    <pre>{submissionResult.result.stdout}</pre>
                  </div>
                )}

                {submissionResult.result?.stderr && (
                  <div className={styles.error}>
                    <h4>Error:</h4>
                    <pre>{submissionResult.result.stderr}</pre>
                  </div>
                )}

                {submissionResult.result?.compile_output && (
                  <div className={styles.compileError}>
                    <h4>Compilation Error:</h4>
                    <pre>{submissionResult.result.compile_output}</pre>
                  </div>
                )}

                <div className={styles.metrics}>
                  {submissionResult.result?.time && (
                    <div className={styles.metric}>
                      <FontAwesomeIcon icon={faClock} />
                      <span>Time: {submissionResult.result.time}s</span>
                    </div>
                  )}
                  {submissionResult.result?.memory && (
                    <div className={styles.metric}>
                      <FontAwesomeIcon icon={faMemory} />
                      <span>Memory: {submissionResult.result.memory} KB</span>
                    </div>
                  )}
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

          <div className={styles.testCasesSection}>
            <h3>
              <FontAwesomeIcon icon={faFlask} />
              Test Cases
            </h3>
            <div className={styles.testCasesTabs}>
              {testCases.map((testCase, index) => (
                <button
                  key={testCase.id}
                  className={`${styles.testCaseTab} ${
                    selectedTestCase === index ? styles.active : ""
                  }`}
                  onClick={() => handleTestCaseSelect(index)}
                >
                  Case {testCase.id}
                </button>
              ))}
            </div>
            <div className={styles.testCaseContent}>
              <p className={styles.testCaseDescription}>
                {testCases[selectedTestCase].description}
              </p>
              <div className={styles.testCaseInput}>
                <h4>Input:</h4>
                <textarea
                  className={styles.testCaseTextarea}
                  value={testCases[selectedTestCase].input}
                  readOnly
                  rows="3"
                />
              </div>
              <div className={styles.testCaseExpected}>
                <h4>Expected Output:</h4>
                <textarea
                  className={styles.testCaseTextarea}
                  value={testCases[selectedTestCase].expected}
                  readOnly
                  rows="1"
                />
              </div>
            </div>
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
                          <pre>{testResult.testCase.expected}</pre>
                        </div>
                        <div className={styles.testActual}>
                          <strong>Actual</strong>
                          <pre>{testResult.result.stdout || ""}</pre>
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
