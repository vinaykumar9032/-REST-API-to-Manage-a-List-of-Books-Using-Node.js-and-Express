const http = require('http');

// Test the API endpoints
async function testAPI() {
    console.log('🧪 Testing Books REST API...\n');

    // Test 1: Get all books
    console.log('1. Testing GET /books');
    try {
        const response = await makeRequest('GET', '/books');
        console.log('✅ Success:', response.status);
        console.log('📚 Books found:', response.data.data.length);
    } catch (error) {
        console.log('❌ Error:', error.message);
    }

    // Test 2: Get book by ID
    console.log('\n2. Testing GET /books/1');
    try {
        const response = await makeRequest('GET', '/books/1');
        console.log('✅ Success:', response.status);
        console.log('📖 Book:', response.data.data.title);
    } catch (error) {
        console.log('❌ Error:', error.message);
    }

    // Test 3: Add new book
    console.log('\n3. Testing POST /books');
    try {
        const newBook = { title: "The Hobbit", author: "J.R.R. Tolkien" };
        const response = await makeRequest('POST', '/books', newBook);
        console.log('✅ Success:', response.status);
        console.log('📖 Added book:', response.data.data.title);
    } catch (error) {
        console.log('❌ Error:', error.message);
    }

    console.log('\n🎉 API is working! You can now test with Postman.');
    console.log('📋 Import the Books_API_Postman_Collection.json file into Postman.');
}

function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const response = JSON.parse(body);
                    resolve({ status: res.statusCode, data: response });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

// Run the test
testAPI().catch(console.error); 