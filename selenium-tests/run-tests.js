import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import config from './config.js';

// Setup directories
const screenshotsDir = path.resolve('./screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Helper: Extract Reset OTP from backend JSON database
function getResetOtpFromDb(email) {
  try {
    if (!fs.existsSync(config.usersDbPath)) {
      console.warn(`[WARNING] Database file not found at: ${config.usersDbPath}`);
      return null;
    }
    const data = JSON.parse(fs.readFileSync(config.usersDbPath, 'utf8'));
    for (const key of Object.keys(data)) {
      const user = data[key];
      if (user.email === email) {
        return user.resetOtp;
      }
    }
    console.warn(`[WARNING] User with email ${email} not found in database.`);
    return null;
  } catch (err) {
    console.error(`[ERROR] Error reading database file: ${err.message}`);
    return null;
  }
}

// Generate random credentials for isolated tests
const testId = Date.now().toString().slice(-6);
const testEmail = `e2e_test_${testId}@example.com`;
const testPassword = `SecurePass_${testId}!`;
const testName = `Automated User ${testId}`;
const testPhone = `+91 ${Math.floor(6000000000 + Math.random() * 4000000000)}`;

console.log('--- TEST RUN CONSTANTS ---');
console.log(`Email: ${testEmail}`);
console.log(`Password: ${testPassword}`);
console.log(`Name: ${testName}`);
console.log(`Phone: ${testPhone}`);
console.log('--------------------------\n');

// Results container
const results = [];

// Helper: Format and write Excel Report
async function generateExcelReport(resultsList) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('E2E Test Results');

  // Setup columns
  worksheet.columns = [
    { header: 'Test Case ID', key: 'id', width: 15 },
    { header: 'Feature', key: 'feature', width: 25 },
    { header: 'Test Description', key: 'description', width: 45 },
    { header: 'Expected Outcome', key: 'expected', width: 45 },
    { header: 'Actual Outcome', key: 'actual', width: 45 },
    { header: 'Status', key: 'status', width: 12 },
    { header: 'Duration (ms)', key: 'duration', width: 15 },
    { header: 'Timestamp', key: 'timestamp', width: 22 },
    { header: 'Error Log / Notes', key: 'error', width: 50 }
  ];

  // Title Block
  worksheet.insertRow(1, []);
  worksheet.insertRow(2, ['DiaPredict AI Diabetes App - E2E Selenium Test Report']);
  worksheet.mergeCells('A2:I2');
  
  const titleRow = worksheet.getRow(2);
  titleRow.height = 40;
  titleRow.getCell(1).font = { name: 'Arial', size: 16, bold: true, color: { argb: 'FFFFFF' } };
  titleRow.getCell(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '10B981' } // DiaPredict Green
  };
  titleRow.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };

  // Empty divider row
  worksheet.insertRow(3, []);

  // Header Row (starts at row 4)
  const headerRow = worksheet.getRow(4);
  headerRow.height = 25;
  headerRow.eachCell((cell) => {
    cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '334155' } // Slate 700
    };
    cell.alignment = { vertical: 'middle', horizontal: 'left' };
    cell.border = {
      top: { style: 'thin', color: { argb: '475569' } },
      left: { style: 'thin', color: { argb: '475569' } },
      bottom: { style: 'medium', color: { argb: '1E293B' } },
      right: { style: 'thin', color: { argb: '475569' } }
    };
  });

  // Populate Row Items
  resultsList.forEach((res, index) => {
    const row = worksheet.addRow({
      id: res.id,
      feature: res.feature,
      description: res.description,
      expected: res.expected,
      actual: res.actual,
      status: res.status,
      duration: res.duration,
      timestamp: res.timestamp,
      error: res.error || 'N/A'
    });

    row.height = 22;

    row.eachCell((cell, colNumber) => {
      cell.font = { name: 'Arial', size: 9 };
      cell.alignment = { 
        vertical: 'middle', 
        horizontal: colNumber === 1 || colNumber === 6 || colNumber === 7 ? 'center' : 'left' 
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'CBD5E1' } },
        left: { style: 'thin', color: { argb: 'CBD5E1' } },
        bottom: { style: 'thin', color: { argb: 'CBD5E1' } },
        right: { style: 'thin', color: { argb: 'CBD5E1' } }
      };

      // Status highlight formatting
      if (colNumber === 6) {
        const isPass = cell.value === 'PASS';
        cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: isPass ? '16A34A' : 'DC2626' } };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: isPass ? 'DCFCE7' : 'FEE2E2' }
        };
      }
    });

    // Zebra striping
    if (index % 2 === 1) {
      row.eachCell((cell, colNumber) => {
        if (colNumber !== 6) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'F8FAFC' }
          };
        }
      });
    }
  });

  // Summary Metrics block
  const summaryStart = 6 + resultsList.length;
  worksheet.insertRow(summaryStart, []);

  const total = resultsList.length;
  const passed = resultsList.filter(r => r.status === 'PASS').length;
  const failed = resultsList.filter(r => r.status === 'FAIL').length;
  const rate = total > 0 ? `${Math.round((passed / total) * 100)}%` : '0%';

  worksheet.addRow(['E2E Test Report Statistics Summary:']);
  worksheet.addRow(['Total Executed', total]);
  worksheet.addRow(['Total Passed', passed]);
  worksheet.addRow(['Total Failed', failed]);
  worksheet.addRow(['Execution Pass Rate', rate]);

  // Style the Summary Block
  for (let i = 0; i < 5; i++) {
    const statRow = worksheet.getRow(summaryStart + 1 + i);
    statRow.getCell(1).font = { name: 'Arial', size: 10, bold: true };
    statRow.getCell(2).font = { name: 'Arial', size: 10, bold: i === 4 };
    if (i === 4) {
      statRow.getCell(2).font = { name: 'Arial', size: 10, bold: true, color: { argb: passed === total ? '16A34A' : 'DC2626' } };
    }
  }

  // Save Excel file
  const reportPath = path.resolve('./test-report.xlsx');
  const backupPath = path.resolve('./test-report-backup.xlsx');
  
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await workbook.xlsx.writeFile(reportPath);
      console.log(`\n📊 Excel analysis report generated at: ${reportPath}`);
      break;
    } catch (writeErr) {
      if (writeErr.code === 'EBUSY') {
        if (attempt < 3) {
          console.warn(`[WARNING] Attempt ${attempt}: test-report.xlsx is locked (resource busy). Retrying in 2 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          console.warn(`[WARNING] test-report.xlsx remains locked. Saving report fallback to: ${backupPath}`);
          await workbook.xlsx.writeFile(backupPath);
          console.log(`\n📊 Excel backup analysis report generated at: ${backupPath}`);
          
          try {
            fs.copyFileSync(backupPath, reportPath);
            console.log(`Successfully synced backup to test-report.xlsx.`);
          } catch (copyErr) {
            console.warn(`[INFO] Could not sync to test-report.xlsx directly due to persistent lock. Please inspect test-report-backup.xlsx.`);
          }
        }
      } else {
        throw writeErr;
      }
    }
  }
}

// Main E2E Automation Runner
async function runTestSuite() {
  console.log('🚀 Launching Selenium Driver...');
  
  const options = new chrome.Options();
  if (config.headless) {
    options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');
  } else {
    options.addArguments('--window-size=1440,900');
  }
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-extensions');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  const testCases = [];

  // TC-001: Main Signup
  testCases.push({
    id: 'TC-001',
    feature: 'User Auth - Signup',
    description: 'Sign up a new test account with random credentials and navigate to application dashboard.',
    expected: 'User successfully created, authenticated, and redirected to /dashboard.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/signup`);
      await driver.wait(until.elementLocated(By.name('name')), config.defaultTimeout);
      await driver.findElement(By.name('name')).sendKeys(testName);
      await driver.findElement(By.name('email')).sendKeys(testEmail);
      await driver.findElement(By.name('phone')).sendKeys(testPhone);
      await driver.findElement(By.name('password')).sendKeys(testPassword);
      const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
      await submitBtn.click();
      await driver.wait(until.urlContains('/dashboard'), config.defaultTimeout);
    }
  });

  // TC-002 to TC-006: Extra signups
  for (let i = 2; i <= 6; i++) {
    const extraId = `batch_${i}_${Date.now().toString().slice(-4)}`;
    const extraEmail = `e2e_extra_${extraId}@example.com`;
    const extraName = `Extra User ${i}`;
    const extraPhone = `+91 900000000${i}`;
    const extraPassword = `SecurePassExtra_${i}!`;

    testCases.push({
      id: `TC-${String(i).padStart(3, '0')}`,
      feature: 'User Auth - Signup (Batch)',
      description: `Sign up extra account ${i} with email ${extraEmail}.`,
      expected: 'User successfully created, authenticated, and redirected to /dashboard.',
      fn: async () => {
        await driver.get(`${config.frontendUrl}/signup`);
        await driver.wait(until.elementLocated(By.name('name')), config.defaultTimeout);
        await driver.findElement(By.name('name')).sendKeys(extraName);
        await driver.findElement(By.name('email')).sendKeys(extraEmail);
        await driver.findElement(By.name('phone')).sendKeys(extraPhone);
        await driver.findElement(By.name('password')).sendKeys(extraPassword);
        const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
        await submitBtn.click();
        await driver.wait(until.urlContains('/dashboard'), config.defaultTimeout);
        const logoutBtn = await driver.findElement(By.xpath("//button[contains(., 'Sign Out')]"));
        await logoutBtn.click();
        await driver.wait(until.urlContains('/login'), config.defaultTimeout);
      }
    });
  }

  // TC-007 to TC-010: Login Validation Checks
  testCases.push({
    id: 'TC-007',
    feature: 'User Auth - Login Validation (Password)',
    description: 'Try logging in with an incorrect password and assert authentication failure.',
    expected: 'Assert incorrect credentials error message.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/login`);
      await driver.wait(until.elementLocated(By.css('input[type="email"]')), config.defaultTimeout);
      await driver.findElement(By.css('input[type="email"]')).sendKeys(testEmail);
      await driver.findElement(By.css('input[type="password"]')).sendKeys('WrongPassword123!');
      const loginBtn = await driver.findElement(By.css('button[type="submit"]'));
      await loginBtn.click();
      await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'credentials') or contains(text(), 'incorrect')]")), config.defaultTimeout);
    }
  });

  testCases.push({
    id: 'TC-008',
    feature: 'User Auth - Login Validation (Email)',
    description: 'Try logging in with a non-existent email account.',
    expected: 'Assert incorrect credentials error message.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/login`);
      await driver.wait(until.elementLocated(By.css('input[type="email"]')), config.defaultTimeout);
      await driver.findElement(By.css('input[type="email"]')).sendKeys(`nonexistent_${Date.now()}@example.com`);
      await driver.findElement(By.css('input[type="password"]')).sendKeys(testPassword);
      const loginBtn = await driver.findElement(By.css('button[type="submit"]'));
      await loginBtn.click();
      await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'credentials') or contains(text(), 'incorrect')]")), config.defaultTimeout);
    }
  });

  testCases.push({
    id: 'TC-009',
    feature: 'User Auth - Login Validation (Empty Email)',
    description: 'Try logging in with empty credentials using HTML5 validation check.',
    expected: 'Assert validation or login error.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/login`);
      await driver.wait(until.elementLocated(By.css('input[type="email"]')), config.defaultTimeout);
      
      const emailInput = await driver.findElement(By.css('input[type="email"]'));
      await driver.executeScript("arguments[0].removeAttribute('required');", emailInput);
      const passInput = await driver.findElement(By.css('input[type="password"]'));
      await driver.executeScript("arguments[0].removeAttribute('required');", passInput);
      
      const loginBtn = await driver.findElement(By.css('button[type="submit"]'));
      await loginBtn.click();
      await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'provide email and password') or contains(text(), 'fields')]")), config.defaultTimeout);
    }
  });

  testCases.push({
    id: 'TC-010',
    feature: 'User Auth - Login Validation (Extra)',
    description: 'Try logging in with another wrong format credentials.',
    expected: 'Assert credentials error message.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/login`);
      await driver.wait(until.elementLocated(By.css('input[type="email"]')), config.defaultTimeout);
      await driver.findElement(By.css('input[type="email"]')).sendKeys('wrong_format_email@example.com');
      await driver.findElement(By.css('input[type="password"]')).sendKeys(testPassword);
      const loginBtn = await driver.findElement(By.css('button[type="submit"]'));
      await loginBtn.click();
      await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'credentials') or contains(text(), 'incorrect')]")), config.defaultTimeout);
    }
  });

  // TC-011: Main Login check
  testCases.push({
    id: 'TC-011',
    feature: 'User Auth - Login',
    description: 'Log back in with the main test account credentials and navigate to dashboard.',
    expected: 'Successful login and redirected to /dashboard.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/login`);
      await driver.wait(until.elementLocated(By.css('input[type="email"]')), config.defaultTimeout);
      await driver.findElement(By.css('input[type="email"]')).sendKeys(testEmail);
      await driver.findElement(By.css('input[type="password"]')).sendKeys(testPassword);
      const loginBtn = await driver.findElement(By.css('button[type="submit"]'));
      await loginBtn.click();
      await driver.wait(until.urlContains('/dashboard'), config.defaultTimeout);
    }
  });

  // TC-012 to TC-031: 20 Clinical profile saves
  testCases.push({
    id: 'TC-012',
    feature: 'Clinical Profile Completion (Batch Start)',
    description: 'Navigate to clinical profile configuration page.',
    expected: 'Clinical Profile page is successfully loaded.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/profile`);
      await driver.wait(until.elementLocated(By.css('input[placeholder="John Doe"]')), config.defaultTimeout);
    }
  });

  for (let i = 13; i <= 31; i++) {
    const profileIndex = i - 12;
    testCases.push({
      id: `TC-${String(i).padStart(3, '0')}`,
      feature: 'Clinical Profile Completion (Batch)',
      description: `Update profile parameters - Check #${profileIndex} (Age: ${25 + profileIndex}, Weight: ${60 + profileIndex}).`,
      expected: 'Clinical parameters saved successfully toast banner matches.',
      fn: async () => {
        const nameInput = await driver.findElement(By.css('input[placeholder="John Doe"]'));
        await nameInput.clear();
        await nameInput.sendKeys(`Automated User ${profileIndex}`);

        const ageInput = await driver.findElement(By.css('input[placeholder="e.g. 45"]'));
        await ageInput.clear();
        await ageInput.sendKeys(String(25 + profileIndex));

        const heightInput = await driver.findElement(By.css('input[placeholder="e.g. 175"]'));
        await heightInput.clear();
        await heightInput.sendKeys(String(160 + profileIndex));

        const weightInput = await driver.findElement(By.css('input[placeholder="e.g. 78"]'));
        await weightInput.clear();
        await weightInput.sendKeys(String(60 + profileIndex));

        const genderSelect = await driver.findElement(By.css('select'));
        await genderSelect.sendKeys(profileIndex % 2 === 0 ? 'Male' : 'Female');

        const notesText = await driver.findElement(By.css('textarea'));
        await notesText.clear();
        await notesText.sendKeys(`E2E batch profile check slot ${profileIndex}`);

        const saveBtn = await driver.findElement(By.css('button[type="submit"]'));
        await saveBtn.click();

        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Clinical profile parameters saved successfully')]")), config.defaultTimeout);
        await driver.sleep(200);
      }
    });
  }

  // TC-032 to TC-091: 60 Sugar tracking checks
  testCases.push({
    id: 'TC-032',
    feature: 'Sugar Level Tracker (Batch Start)',
    description: 'Navigate to sugar level tracker page.',
    expected: 'Sugar tracker form is loaded.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/sugar-tracking`);
      await driver.wait(until.elementLocated(By.css('select')), config.defaultTimeout);
    }
  });

  for (let i = 33; i <= 91; i++) {
    const logIndex = i - 32;
    const val = 90 + logIndex;
    const type = logIndex % 2 === 0 ? 'fasting' : 'post-meal';
    
    testCases.push({
      id: `TC-${String(i).padStart(3, '0')}`,
      feature: 'Sugar Level Tracker (Batch)',
      description: `Log sugar level #${logIndex}: ${val} mg/dL (${type}).`,
      expected: 'Sugar level logged and value present in the history table.',
      fn: async () => {
        const typeSelect = await driver.findElement(By.css('select'));
        await typeSelect.sendKeys(type);

        const valInput = await driver.findElement(By.css('input[placeholder="e.g. 105"]'));
        await valInput.clear();
        await valInput.sendKeys(String(val));

        const notesText = await driver.findElement(By.css('textarea'));
        await notesText.clear();
        await notesText.sendKeys(`Batch glucose tracking slot ${logIndex}`);

        const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
        await submitBtn.click();

        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Sugar level recorded successfully')]")), config.defaultTimeout);
        await driver.wait(until.elementLocated(By.xpath(`//td[contains(., '${val} mg/dL')]`)), config.defaultTimeout);
        await driver.sleep(200);
      }
    });
  }

  // TC-092 to TC-156: 65 Water tracking checks
  testCases.push({
    id: 'TC-092',
    feature: 'Hydration Tracker (Batch Start)',
    description: 'Navigate to hydration and water reminder page.',
    expected: 'Water tracker card is loaded.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/water-tracker`);
      await driver.wait(until.elementLocated(By.xpath("//button[contains(., '+250 mL')]")), config.defaultTimeout);
    }
  });

  for (let i = 93; i <= 156; i++) {
    const clickIndex = i - 92;
    
    testCases.push({
      id: `TC-${String(i).padStart(3, '0')}`,
      feature: 'Hydration Tracker (Batch)',
      description: `Log water intake cup #${clickIndex} (+250 mL).`,
      expected: 'Total hydration intake increments successfully.',
      fn: async () => {
        const cupBtn = await driver.findElement(By.xpath("//button[contains(., '+250 mL')]"));
        await cupBtn.click();
        await driver.sleep(150);
        await driver.wait(until.elementLocated(By.xpath("//span[contains(text(), '+250 mL')]")), config.defaultTimeout);
      }
    });
  }

  // TC-157 to TC-186: 30 Doctor appointment scheduler checks
  testCases.push({
    id: 'TC-157',
    feature: 'Doctor Visit Scheduler (Batch Start)',
    description: 'Navigate to doctor appointments booking page.',
    expected: 'Doctor appointment form is loaded.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/appointments`);
      await driver.wait(until.elementLocated(By.css('input[placeholder*="Sarah"]')), config.defaultTimeout);
    }
  });

  for (let i = 158; i <= 186; i++) {
    const apptIndex = i - 157;
    const docName = `Dr. Specialist ${apptIndex}`;
    const hospital = `Hospital Unit ${apptIndex}`;
    const dateStr = `2026-06-${String((apptIndex % 28) || 1).padStart(2, '0')}`;
    
    testCases.push({
      id: `TC-${String(i).padStart(3, '0')}`,
      feature: 'Doctor Visit Scheduler (Batch)',
      description: `Book slot #${apptIndex} with ${docName}.`,
      expected: 'Appointment booked successfully and renders in the list.',
      fn: async () => {
        const docInput = await driver.findElement(By.css('input[placeholder*="Sarah"]'));
        await docInput.clear();
        await docInput.sendKeys(docName);

        const hospInput = await driver.findElement(By.css('input[placeholder*="City General"]'));
        await hospInput.clear();
        await hospInput.sendKeys(hospital);

        const dateInput = await driver.findElement(By.css('input[type="date"]'));
        await driver.executeScript(`
          var input = arguments[0];
          var value = arguments[1];
          var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
          nativeInputValueSetter.call(input, value);
          var event = new Event('input', { bubbles: true });
          input.dispatchEvent(event);
        `, dateInput, dateStr);

        const timeInput = await driver.findElement(By.css('input[type="time"]'));
        await driver.executeScript(`
          var input = arguments[0];
          var value = arguments[1];
          var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
          nativeInputValueSetter.call(input, value);
          var event = new Event('input', { bubbles: true });
          input.dispatchEvent(event);
        `, timeInput, '14:30');

        const notes = await driver.findElement(By.css('textarea'));
        await notes.clear();
        await notes.sendKeys(`Check slots ${apptIndex}`);

        const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
        await submitBtn.click();

        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'scheduled successfully')]")), config.defaultTimeout);
        await driver.wait(until.elementLocated(By.xpath(`//*[contains(., '${docName}')]`)), config.defaultTimeout);
        await driver.sleep(200);
      }
    });
  }

  // TC-187 to TC-196: 10 AI Chatbot questions
  testCases.push({
    id: 'TC-187',
    feature: 'AI Endocrinology Chatbot (Batch Start)',
    description: 'Navigate to AI chatbot consult room.',
    expected: 'Chatbot room and greeting card is loaded.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/chatbot`);
      await driver.wait(until.elementLocated(By.css('input[placeholder*="glycemic"]')), config.defaultTimeout);
    }
  });

  for (let i = 188; i <= 196; i++) {
    const queryIndex = i - 187;
    const question = `Question ${queryIndex}: Is item ${queryIndex} glycemic rating healthy for Type 2 diabetes?`;

    testCases.push({
      id: `TC-${String(i).padStart(3, '0')}`,
      feature: 'AI Endocrinology Chatbot (Batch)',
      description: `Submit metabolic consult query #${queryIndex}.`,
      expected: 'AI bot returns health advice bubble.',
      fn: async () => {
        const chatInput = await driver.findElement(By.css('input[placeholder*="glycemic"]'));
        await chatInput.clear();
        await chatInput.sendKeys(question);

        const sendBtn = await driver.findElement(By.css('button[type="submit"]'));
        await sendBtn.click();

        await driver.wait(async () => {
          const bubbles = await driver.findElements(By.xpath("//div[contains(@className, 'rounded-tl-none') or contains(@class, 'rounded-tl-none')]"));
          return bubbles.length >= queryIndex;
        }, 15000);
        await driver.sleep(200);
      }
    });
  }

  // TC-197: Analytics Dashboard
  testCases.push({
    id: 'TC-197',
    feature: 'Analytics Dashboard',
    description: 'Open the health analytics page to check visual data charts.',
    expected: 'Renders chart graphs properly without UI crash.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/analytics`);
      await driver.wait(until.elementLocated(By.xpath("//h2[contains(text(), 'Advanced Analytics Dashboard')]")), config.defaultTimeout);
    }
  });

  // TC-198: Sign Out
  testCases.push({
    id: 'TC-198',
    feature: 'User Auth - Sign Out',
    description: 'Log out of current workspace session and verify redirection.',
    expected: 'Session cleared and client redirected back to login page.',
    fn: async () => {
      const logoutBtn = await driver.findElement(By.xpath("//button[contains(., 'Sign Out')]"));
      await logoutBtn.click();
      await driver.wait(until.urlContains('/login'), config.defaultTimeout);
    }
  });

  // TC-199 to TC-201: Password Recovery OTP Flow (Split)
  testCases.push({
    id: 'TC-199',
    feature: 'Password Recovery OTP Flow - Request',
    description: 'Trigger Forgot Password flow and enter email to request OTP.',
    expected: 'Redirects or displays verification step prompting for the 6-digit OTP code.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/forgot-password`);
      await driver.wait(until.elementLocated(By.css('input[type="email"]')), config.defaultTimeout);
      await driver.findElement(By.css('input[type="email"]')).sendKeys(testEmail);
      const reqBtn = await driver.findElement(By.css('button[type="submit"]'));
      await reqBtn.click();
      await driver.wait(until.elementLocated(By.css('input[placeholder="123456"]')), config.defaultTimeout);
    }
  });

  let otpCodeVal = '';
  testCases.push({
    id: 'TC-200',
    feature: 'Password Recovery OTP Flow - Verify & Reset',
    description: 'Extract OTP from database, enter details, and reset user password.',
    expected: 'Password reset completes successfully and redirects back to login page.',
    fn: async () => {
      await driver.sleep(2000);
      const otpCode = getResetOtpFromDb(testEmail);
      if (!otpCode) {
        throw new Error(`Failed to retrieve reset OTP from database file for ${testEmail}`);
      }
      console.log(`[E2E] Retrieved Reset OTP for batch: ${otpCode}`);
      otpCodeVal = otpCode;

      await driver.findElement(By.css('input[placeholder="123456"]')).sendKeys(otpCodeVal);
      const newPass = `${testPassword}_reset`;
      await driver.findElement(By.css('input[type="password"]')).sendKeys(newPass);

      const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
      await submitBtn.click();

      await driver.wait(until.urlContains('/login'), 10000);
    }
  });

  testCases.push({
    id: 'TC-201',
    feature: 'Password Recovery OTP Flow - Login Verify',
    description: 'Log back in using the newly reset password.',
    expected: 'Login succeeds and redirects to dashboard.',
    fn: async () => {
      const newPass = `${testPassword}_reset`;
      await driver.wait(until.elementLocated(By.css('input[type="email"]')), config.defaultTimeout);
      await driver.findElement(By.css('input[type="email"]')).sendKeys(testEmail);
      await driver.findElement(By.css('input[type="password"]')).sendKeys(newPass);
      
      const loginBtn = await driver.findElement(By.css('button[type="submit"]'));
      await loginBtn.click();

      await driver.wait(until.urlContains('/dashboard'), config.defaultTimeout);
    }
  });

  // TC-202: Secondary Dashboard View
  testCases.push({
    id: 'TC-202',
    feature: 'Analytics Dashboard Post-Reset',
    description: 'View advanced metrics dashboard post credential reset check.',
    expected: 'Dashboard parameters render successfully.',
    fn: async () => {
      await driver.get(`${config.frontendUrl}/analytics`);
      await driver.wait(until.elementLocated(By.xpath("//h2[contains(text(), 'Advanced Analytics Dashboard')]")), config.defaultTimeout);
    }
  });

  // TC-203: Final Sign Out
  testCases.push({
    id: 'TC-203',
    feature: 'User Auth - Final Sign Out',
    description: 'Complete the test run session by logging out.',
    expected: 'Redirected back to login page.',
    fn: async () => {
      const logoutBtn = await driver.findElement(By.xpath("//button[contains(., 'Sign Out')]"));
      await logoutBtn.click();
      await driver.wait(until.urlContains('/login'), config.defaultTimeout);
    }
  });

  // Execute test cases sequentially
  for (const tc of testCases) {
    const startTime = Date.now();
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    console.log(`\n▶️ Running ${tc.id}: ${tc.feature}...`);
    
    try {
      await tc.fn();
      const duration = Date.now() - startTime;
      console.log(`✅ ${tc.id} PASSED (${duration}ms)`);
      
      results.push({
        id: tc.id,
        feature: tc.feature,
        description: tc.description,
        expected: tc.expected,
        actual: tc.expected, // In success state, matches expectation
        status: 'PASS',
        duration,
        timestamp,
        error: ''
      });
    } catch (err) {
      const duration = Date.now() - startTime;
      console.error(`❌ ${tc.id} FAILED (${duration}ms)`);
      console.error(err);

      // Capture Failure Screenshot
      const screenshotFilename = `screenshot_${tc.id}_fail.png`;
      const screenshotPath = path.join(screenshotsDir, screenshotFilename);
      try {
        const screenshotData = await driver.takeScreenshot();
        fs.writeFileSync(screenshotPath, screenshotData, 'base64');
        console.log(`📸 Failure screenshot saved at: ${screenshotPath}`);
      } catch (screenErr) {
        console.error('Failed to take screenshot:', screenErr.message);
      }

      results.push({
        id: tc.id,
        feature: tc.feature,
        description: tc.description,
        expected: tc.expected,
        actual: `Failed: ${err.message}`,
        status: 'FAIL',
        duration,
        timestamp,
        error: err.stack || err.message
      });
    }
  }

  // Teardown WebDriver
  console.log('\n🛑 Tearing down driver...');
  await driver.quit();

  // Output Excel Sheet Report
  await generateExcelReport(results);
}

// Execute Runner
runTestSuite().catch(err => {
  console.error('Fatal crash during test suite run:', err);
  process.exit(1);
});
