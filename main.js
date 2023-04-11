
song = ""
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;


function preload()
{
    song1 = loadSound("m.mp3")
    song2 = loadSound("m1.mp3")
}

function setup()
{
    canvas = createCanvas(600,500)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on('pose', gotPoses)
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
	stroke("#FF0000");

    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX, leftWristY, 30)

        song2.stop()
        song1.play()
    }
    else if(scoreRightWrist>0.2)
    {
        circle(rightWristX, rightWristY, 30)

        song1.stop()
        song2.play()
    }


}

function modelLoaded()
{
    console.log("Model has been Loaded")
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Value of leftWristX is = " + leftWristX)
        console.log("Value of leftWristY is = " + leftWristY)
        console.log("Value of rightWristX is = " + rightWristX)
        console.log("Value of rightWristY is = " + rightWristY)
    }
}