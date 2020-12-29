//creating variables for the game
var dog,dogImg,happydogImg;
var database;
var foodS,foodStock;

//preloading the images for the dog sprite
function preload(){
   dogImg=loadImage("Images/Dog.png");
   happydogImg=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {

  //creating database
  database=firebase.database();
  createCanvas(500,500);

  //creating dog sprite and adding image for the same
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  //making the foodStock variable refer to the 'Food' entry in the database using database.ref()
  foodStock=database.ref('Food');

  //creating a listenter using .on("value",function1)
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background(46,139,87);
 
  //to feed the dog in the event of pressing up arrow button
  if(keyWentDown(UP_ARROW)){

    //update the existing food value in the database after feeding the dog
    writeStock(foodS);

    //make the dog happy after being fed by changing the image of the dog
    dog.addImage(happydogImg);
  }

  drawSprites();

  //to display "Food remaining : " and the number of food remaining in the canvas
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);    //foodS refers to the updated number of food in the database

  //to display the text "Note: Press UP_ARROW Key To Feed Drago Milk!" 
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//defining function readStock() to read the values from the database
function readStock(data){

  //to store the listened values inside the foodS variable
  foodS=data.val();
}

//defining function writeStock() to calculate the reduction of food after being fed and updating the same in the database
function writeStock(x){     //x is passed as an argument Eg:20
  if(x<=0){                 
    x=0;
  }
  else{
    x=x-1;              //20-1 (=19)
  } 
  database.ref('/').update({
    Food:x      //x refers to the reduced food (19)
  })
}
