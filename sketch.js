//Create variables here
var dog,hdog,dogimg,hdogimg
var bed,garden,wash
var database
var foodS,foodStock
var feed,addFood
var lastFed,fedTime
var foodObj
var readState,gameState
function preload()
{
  //load images here
  dogimg =loadImage('images/dog.png');
  hdogimg =loadImage('images/happydog.png');
  bed =loadImage('images/Bed Room.png');
  garden =loadImage('images/Garden.png');
  wash =loadImage('images/Wash Room.png');
  saddog=loadImage('images/Lazy.png')
}

function setup() {
  database = firebase.database();
 
  createCanvas(400, 500);

  dog=createSprite(250,350)
  dog.addImage(dogimg)


  var foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on('value',function(data){
  lastFed=data.val()
  });
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

  

  foodObj= new Food();

}
  


function draw() {  
  currentTime=hour();
   if(currentTime===(lastFed+1)){
     update("Playing");
     foodObj.garden()
   }else if(currentTime===(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }
  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foods)
  //   dog.addImage(hdogimg)
  // }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();

  }else{
   feed.show();
   addFood.show();
   dog.addImage(saddog);
  }
  


  // textSize(20)
  // fill('white')
  // text("Stock:"+foods,200,250)


  
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(hdogimg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:'Hungry'
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}