 class Food {
    constructor(){
     this.foodStock=0
     this,lastFed;
     this.image=loadImage("milk.png");
    }
    getFedT(){
        this.lastFed=lastFed;
        }
    updateFoodStock(foodStock){
        this.foodStock=foodStock
        } 
    deductFood(){
    if (this.foodStock>0){
      this.foodStock=this.foodStock
    } }
    getFoodStock(){
      return this.foodStock;
    }   
   
  display(){
    background(46,139,87);

    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
        text("Last Feed : "+ lastFed%12 + " PM", 50,30);
    }else if(lastFed==0){
        text("Last Feed : 12 AM",50,30);
    }else{
        text("Last Feed : "+ lastFed + " AM", 50,30);
    }
   
    var x=70,y=100
    imageMode(CENTER);
   if(this.foodStock!=0){
       for(var i=0;i<this.foodStock;i++){
           if(i%10===0){
               x=80;
               y=y+50;
           }
           image(this.image,x,y,50,50);
           x=x+30
       }
   }
   
   
   
  }
  bedroom(){
    background(bed,550,500);  
}
  
garden(){
    background(garden,550,500);  
} 

washroom(){
    background(wash,550,500); 
}
}
