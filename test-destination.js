const https = require('https');

const options = {
  hostname: 'gantt-approuter.cfapps.eu10-004.hana.ondemand.com',
  port: 443,
  path: '/sap/opu/odata/sap/API_MAINTENANCEORDER;v=2/$metadata?sap-language=ES',
  method: 'GET',
  headers: {
    'Accept': 'application/xml'
  }
};

console.log('🔍 Testing OData endpoint...');

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Success!');
      console.log('Metadata length:', data.length);
      console.log('First 500 chars:', data.substring(0, 500));
    } else {
      console.log('❌ Error response:');
      console.log(data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error);
});

req.end();
