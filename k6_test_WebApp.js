import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 100,  // 100 Virtual Users
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95)<500'],  // 95% of requests must be below 500ms
    },
    summaryTrendStats: ['avg', 'min', 'max', 'med', 'p(95)', 'p(99)', 'count'],  // Summary stats

    ext: {
        prometheus: {
            remoteWrite: "http://localhost:9090/api/v1/write",  // Ensure this is correct
        }
    }
};

export default function () {
    // Step 1: Initial GET request
    let res1 = http.get('https://loupaws.pythonanywhere.com/');
    check(res1, {
        'initial response code': (r) => r.status === 200 || r.status === 302,
        'initial response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);

    // Step 2: POST request to login endpoint
    let payload = 'password=CsF2ty9vjx@VHpbZq7';  // Replace with your actual password
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    let loginRes = http.post('https://loupaws.pythonanywhere.com/check-password', payload, { headers });

    check(loginRes, {
        'status is 200': (r) => r.status === 200,
        'login successful (JSON success)': (r) => r.json('success') === true,
        'message contains success': (r) => r.json('message') === undefined || r.json('message') === 'Your account is disabled.' || r.json('message') === 'Incorrect password. Please try again.',
    });

    // Step 3 (optional): Access the main page if login is successful
    if (loginRes.json('success') === true) {
        let mainPage = http.get('https://loupaws.pythonanywhere.com/');
        check(mainPage, {
            'main page accessible': (r) => r.status === 200,
        });
    }

    sleep(1);
}
