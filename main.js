objects=[];
Status=""


function preload() {
}

function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    ObjectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function modelloaded() {
    console.log("modelloaded");
    Status=true;
}

function draw() {
    image(video,0,0,380,380);

    if(Status!="") {
        ObjectDetector.detect(video,GotResult);
        for(i=0;i<objects.length;i++) {
         r=random(255);
         g=random(255);
         b=random(255);
         fill(r,g,b);
         textSize(25);
         percent=floor(objects[i].confidence*100);
         text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
         noFill();
         stroke(r,g,b);
         rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
         document.getElementById("status").innerHTML="Status:Objects Detected";
         document.getElementById("numberofobjects").innerHTML="Number Of Objects Detected :"+objects.length;
        }
    }

}

function GotResult(error,results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects=results;
    }
}

