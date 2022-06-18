prediction1="";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera= document.getElementById("camera");
Webcam.attach('#camera');

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';
    })
}

console.log('ml5 version',ml5.version);

classifier= ml5.imageClassifier('Project 110: https://teachablemachine.withgoogle.com/models/-ulvgLp0Q/model.json',modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak1="the gesture is "+prediction1;
    var utterThis=new SpeechSynthesisUtterance(speak1);
    synth.speak(utterThis);
}

function predict(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML= results[0].label;
        prediction1= results[0].label;
        speak();
        if(results[0].label=="Cool"){
            document.getElementById("update_gesture").innerHTML="&#129304;";
        }
        if(results[0].label=="Clap"){
            document.getElementById("update_gesture").innerHTML="&#128079;";
        }
        if(results[0].label=="Good"){
            document.getElementById("update_gesture").innerHTML="&#128077;";
        }
        if(results[0].label=="Bad"){
            document.getElementById("update_gesture").innerHTML="&#128078;";
        }
    }
}