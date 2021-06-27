class Food {
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage("milk.png");

    }
    
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        bedroom(){
            background(bedroom,550,500);
        } 

        garden(){
            background(garden,550,500);
        }

        washroom(){
            background(washroom,550,500);
        }
        if(this.foodStock!=0){
            for(var i=0;i>this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
            }
        }

        currentTime=hour();
        if(currentTime==(lastFed+1)){
            update("playing");
            foodObj.garden();
          }else if(currentTime==(lastFed+2)){
            update("Sleeping");
            foodObj.bedroom();
          }else if(currentTime==(lastFed+2) && currentTime<=(lastFed+4)){
            update("Bathing");
            foodObj.washroom();
          }else {
              update("Hungry")
              foodObj.display();
          }
    }
}
