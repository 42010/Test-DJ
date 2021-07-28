song = "";
LWX = 0;
LWY = 0;
RWX = 0;
RWY = 0;
scoreLeftWrist = "";
scoreRightWrist = "";

function preload() {
    song = loadSound('music.mp3');
}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded, POSENET!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        LWX = results[0].pose.leftWrist.x;
        LWY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + LWX + "leftWristY = " + LWY);

        RWX = results[0].pose.leftWrist.x;
        RWY = results[0].pose.leftWrist.y;
        console.log("rightWristX = " + RWX + "rightWristY = " + RWY);
    }
}

function draw() {
    image(video, 0, 0, 400, 300);

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreRightWrist > 0.1) {

        circle(RWX, RWY, 20);

        if (RWY > 0 && RWY < 100) {
            document.getElementById("speed").innerHTML = "Spped = 0.5x";
            song.rate(0.5);
        } else if (RWY >= 100 && RWY < 200) {
            document.getElementsById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (RWY >= 200 && RWY < 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
    }


    if (scoreLeftWrist > 0.2) {
        circle(LWX, LWY, 20);
        InNumberleftWristY = Number(LWY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 300;
        R = volume.toFixed(2);
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(R);
    }
}

function play() {
    song.play();
    song.setVolume(0.8);
    song.rate(1);
}