const axios = require('axios');
const fs = require('fs');

const API_BASE = 'http://localhost:5001/api';
const logFile = 'test_logs.txt';

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;
  console.log(logMessage.trim());
  fs.appendFileSync(logFile, logMessage);
}

async function testAPI() {
  log('Starting API tests...');
  
  try {
    // Test registration
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    
    log('Testing user registration...');
    const registerRes = await axios.post(`${API_BASE}/auth/register`, registerData);
    log(`Registration: ${registerRes.status} - ${registerRes.data.message}`);
    
    // Test login
    log('Testing user login...');
    const loginRes = await axios.post(`${API_BASE}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    log(`Login: ${loginRes.status} - Token received`);
    
    const { token } = loginRes.data;
    const headers = { Authorization: `Bearer ${token}` };
    
    // Test profile
    log('Testing profile endpoints...');
    const profileRes = await axios.get(`${API_BASE}/profile`, { headers });
    log(`Profile GET: ${profileRes.status}`);
    
    // Test tasks
    log('Testing task endpoints...');
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending',
      priority: 'medium'
    };
    
    const createTaskRes = await axios.post(`${API_BASE}/tasks`, taskData, { headers });
    log(`Task CREATE: ${createTaskRes.status}`);
    
    const getTasksRes = await axios.get(`${API_BASE}/tasks`, { headers });
    log(`Tasks GET: ${getTasksRes.status} - ${getTasksRes.data.length} tasks found`);
    
  } catch (error) {
    log(`Error: ${error.message}`);
    if (error.response) {
      log(`Response status: ${error.response.status}`);
      log(`Response data: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      log('No response received - server may not be running');
    }
  }
  
  log('API tests completed.');
}

testAPI();