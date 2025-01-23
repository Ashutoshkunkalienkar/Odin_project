<?php
session_start();
// Dummy username for demonstration purposes
$username = "Emily Jones";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MindCare Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="header">
        <div class="logo">MIND<span style="color:#0056b3;">CARE</span></div>
        <div class="user-info">
            <img src="user-icon.png" alt="User Icon">
            <p>Profile<br><a href="logout.php">Logout</a></p>
        </div>
    </div>

    <div class="sidebar">
        <ul>
            <li class="active">Dashboard</li>
            <li>Assessments</li>
            <li>Progress</li>
            <li>Result</li>
            <li>Book an Appointment</li>
        </ul>
    </div>

    <div class="content">
        <h1>Welcome Back <?php echo $username; ?></h1>
        
        <div class="buttons">
            <button>Start New Test</button>
            <button>View Result</button>
            <button>Mental Health Tips</button>
            <button>Book an Appointment</button>
        </div>

        <h2>Completed Assessments</h2>
        <div class="assessments">
            <div class="assessment-box">
                <p>Depression Test<br>Completed on: 12 Oct 2024</p>
                <button class="yellow-btn">View Result</button>
            </div>
            <div class="assessment-box">
                <p>Anxiety Test<br>Completed on: 12 Sept 2024</p>
                <button class="yellow-btn">View Result</button>
            </div>
        </div>

        <h2>Pending Assessments</h2>
        <div class="assessments">
            <div class="assessment-box">
                <p>Sleeping Disorder Test</p>
                <button class="yellow-btn">Start Test</button>
            </div>
            <div class="assessment-box">
                <p>Eating Disorder Test</p>
                <button class="yellow-btn">Start Test</button>
            </div>
        </div>
    </div>

</body>
</html>
