//Create variables here
var dog,dogImg,happyDogImg,database,foodS,foodStock;
var FeedTime,lastFeed,feed,addFood;
var foodObj;
function preload()
{
  dogImg = loadImage ("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png")

}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  
  foodObj = new Food();

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(800,220,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
background("green")


feedTime = database.ref('FeedTime');
feedTime.on("value",function (data){
  lastFeed=data.val();
});

fill(255);
textSize(20);
if(lastFeed >= 12){
   text("Last Feed :" + lastFeed%12   + "PM" ,350,30);
}else if(lastFeed == 0){
  text("Last Feed : 12 AM", 350,30);
}else{
  text("Last Feed :" + lastFeed + "AM",350,30);
}

foodObj.display();
drawSprites();

}

function readStock(data){

  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
dog.addImage(happyDogImg);
foodObj.updateFoodStock(foodObj.getFoodStock() -1);
database.ref('/').update({
 Food : foodObj.getFoodStock(),
 FeedTime : hour()
})
}
function addFoods(){
 foodS ++;
  database.ref('/').update({
    Food : foodS
  })

}
