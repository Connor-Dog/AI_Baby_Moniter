img="";
status="";
objects=[];
function setup(){
canvas=createCanvas(350,350);
canvas.center();
video=createCapture(VIDEO);
video.size(350,350);
video.hide()
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:detecting objects";
}
function modelLoaded(){
console.log("cocossd loaded successfully");
status=true;
}
function gotResult(error,results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}
function draw(){
image(video,0,0,350,350);
if(status!=""){
r=random(255);
g=random(255);
b=random(255);

objectDetector.detect(video,gotResult);

for(i=0;i<objects.length;i++){
document.getElementById("status").innerHTML="status:object detected";
document.getElementById("number_object").innerHTML="number of objects detected are:"+objects.length;
fill(r,g,b);
stroke(r,g,b);
noFill();
percent=floor(objects[i].confidence*100)
text(objects[i].label + " "+percent+"%",objects[i].x+15,objects[i].y+15);
rect(objects[i].x-65,objects[i].y+10,objects[i].width,objects[i].height);
}
}

}