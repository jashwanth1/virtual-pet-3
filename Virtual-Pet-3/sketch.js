var dog,saddog,happydog, database;
var foodS, foodStock;
var bedroom,garden,washroom;
var addFood;
var foodObj;


var feed, lastFed

function preload(){
  sadDog=loadImage("Dog.png")
  happyDog=loadImage("happy Dog.png");
  bedroom=loadImage("Bed Room.png");
  garden=loadImage("Garden.png");
  washroom=loadImage("Wash Room.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1000, 400);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;




  addFood=createButton("Add Food");
  addFood.position(800,95)
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });

}

function draw() {  
  background(46,139,87);
  foodObj.display();
  
  //add styles here

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
  lastFed=data.val()
  })




  fill(255,255,255)

  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }else{
    text("Last Feed: "+ lastFed+"AM",350,30)
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
}else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
}

  drawSprites();
}


function readStock(data) {
  foodS=data.val();
  foodObj.updateFoodStock();
}


function feedDog() {
  dog.addImage(happyDog);


  var food_Stock_val = foodObj.getFoodStock();
  if(food_Stock_val <= 0){
    foodObj.updateFoodStock(food_Stock_val = 0);
  }else{
    foodObj.updateFoodStock(food_Stock_val = -1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()

  })

}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function background(){
  
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}