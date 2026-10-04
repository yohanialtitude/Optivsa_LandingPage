<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, string $message): void
{
    http_response_code($status);
    echo json_encode(['error' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'Method not allowed.');
}

$secret = getenv('RECAPTCHA_SECRET_KEY');

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    respond(400, 'Invalid request body.');
}

$captchaToken = isset($body['captchaToken']) && is_string($body['captchaToken'])
    ? trim($body['captchaToken'])
    : '';
$fields = [
    'name' => isset($body['name']) && is_string($body['name']) ? trim($body['name']) : '',
    'email' => isset($body['email']) && is_string($body['email']) ? trim($body['email']) : '',
    'company' => isset($body['company']) && is_string($body['company']) ? trim($body['company']) : '',
    'role' => isset($body['role']) && is_string($body['role']) ? trim($body['role']) : '',
    'message' => isset($body['message']) && is_string($body['message']) ? trim($body['message']) : '',
];

if (!$captchaToken || !$fields['email'] || !$fields['message']) {
    respond(400, 'Required fields or CAPTCHA response are missing.');
}

if ($secret) {
    $verification = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($verification, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => $secret,
            'response' => $captchaToken,
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $verificationBody = curl_exec($verification);
    $verificationStatus = curl_getinfo($verification, CURLINFO_RESPONSE_CODE);
    $verificationFailed = curl_errno($verification) !== 0;
    curl_close($verification);

    $captchaResult = is_string($verificationBody) ? json_decode($verificationBody, true) : null;
    if ($verificationFailed || $verificationStatus < 200 || $verificationStatus >= 300) {
        respond(502, 'Could not verify CAPTCHA. Please try again.');
    }
    if (!is_array($captchaResult) || empty($captchaResult['success'])) {
        respond(400, 'CAPTCHA verification failed. Please try again.');
    }
}

$destination = getenv('CONTACT_FORM_ENDPOINT') ?: 'https://formspree.io/f/xdeoyjbe';
$submission = curl_init($destination);
curl_setopt_array($submission, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($fields),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Accept: application/json',
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
]);
curl_exec($submission);
$submissionStatus = curl_getinfo($submission, CURLINFO_RESPONSE_CODE);
$submissionFailed = curl_errno($submission) !== 0;
curl_close($submission);

if ($submissionFailed || $submissionStatus < 200 || $submissionStatus >= 300) {
    respond(502, 'Could not deliver the contact form submission.');
}

http_response_code(200);
echo json_encode(['message' => 'Message received.']);