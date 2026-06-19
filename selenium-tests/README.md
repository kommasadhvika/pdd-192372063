# DiaPredict AI Diabetes App - E2E Selenium Test Suite

This directory contains automated End-to-End (E2E) testing scripts for the complete DiaPredict web application using Selenium WebDriver. It executes standard flows (signup, profile customization, sugar tracking, hydration checks, AI chatbot consultations, doctor appointments booking, settings dashboard checks, and forgot password reset OTP cycles), capturing screenshots on failures, and compiling detailed Excel spreadsheets worksheets summarizing execution runs.

## Prerequisites

1. **Google Chrome**: Ensure that Google Chrome is installed on your local machine.
2. **Node.js**: Verify you have Node.js version `>= 20.0.0`.

## Installation

Run npm installation within this directory:

```bash
npm install
```

## Running the E2E Tests

### 1. Start the Backend and Frontend Servers

The test script runs by executing actions directly in the browser. Both your backend server and frontend server must be running locally:

- **Start Backend Server:**
  ```bash
  cd ../backend
  npm run dev
  ```
  *(Default server runs at: `http://localhost:5000`)*

- **Start Frontend Server:**
  ```bash
  cd ../frontend
  npm run dev
  ```
  *(Default web application runs at: `http://localhost:5173`)*

### 2. Configure Settings (Optional)

You can customize execution parameters by setting environment variables in a local `.env` file inside this directory or configuring `config.js` directly:

- `FRONTEND_URL` (default: `http://localhost:5173`)
- `BACKEND_DB_USERS_PATH` (default: `../backend/.local_db/Users.json`)
- `HEADLESS_MODE` (default: `false` - set to `true` to execute tests invisibly without showing Chrome browser windows)
- `TIMEOUT` (default: `10000` milliseconds wait timeout for elements loading)

### 3. Run E2E Test Suite

Once the frontend and backend servers are running, run the following command in the `selenium-tests` folder:

```bash
npm test
```

## Outputs

- **Excel Test Report**: Generates `test-report.xlsx` inside this directory at the end of the test. Open this sheet in Excel or spreadsheet viewers to inspect details, colors, status results (PASS/FAIL), run times, and failure messages.
- **Failure Screenshots**: If any test case fails, a screenshot will automatically be captured and saved inside the `screenshots/` directory (e.g. `screenshots/screenshot_TC-005_fail.png`) to help troubleshoot.
