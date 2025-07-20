<?php
// PHPMailer ko class haru import garne
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// PHPMailer ko file haru lai require garne (path sahi hunuparchha)
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // === START: YO BHAG TAPAI KO CODE MA CHHUTEKO THIYO ===
    // Get form data and sanitize it
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject_from_form = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    // Check if data is valid
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }
    // === END: CHHUTEKO BHAG SAKKIYO ===


    // PHPMailer ko naya object banaune
    $mail = new PHPMailer(true);

    try {
        // --- Server settings ---
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;   // Samasya aayo bhane matra yo line on garne
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'mukundarijyal@gmail.com';
        $mail->Password   = 'khniplzqhfjzvmlq'; // Tapai ko App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // --- Recipients ---
        $mail->setFrom($email, $name);
        $mail->addAddress('mukundarijyal@gmail.com', 'Mukunda Rijyal');
        $mail->addReplyTo($email, $name);

        // --- Content ---
        if (empty($subject_from_form)) {
            $subject = "New Contact from Portfolio: $name";
        } else {
            $subject = $subject_from_form;
        }
        
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = "<h2>New Message from Contact Form</h2><p><b>Name:</b> {$name}</p><p><b>Email:</b> {$email}</p><hr><p><b>Message:</b><br>" . nl2br($message) . "</p>";
        $mail->AltBody = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}";

        $mail->send();

        // Success bhaye pachi ma pathaune
        header('Location: index.html#contact');
        exit();

    } catch (Exception $e) {
        http_response_code(500);
        // Error message ali user-friendly banaune
        echo "Oops! Message could not be sent. Please try again later.";
        // Detailed error herna ko lagi: echo "Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    // Yedi koi sidhai contact.php kholna khojchha bhane yo message dekhauchha
    http_response_code(403);
    echo "There was a problem with your submission. Please use the contact form.";
}
?>