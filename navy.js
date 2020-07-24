"use strict";
// установка скорости в ручную и автом. разгон
// асинхронка
   // для слабаков: смоделировать набор скорости при вызове метода on()
   // для умничек: для слабаков + ограничить макс. скорость через this._speed
   // для красавчиклв: для умничек для метода off()

// Boat
//   _types
//   _speed
//   _status
//   _name
//   _type
// _speedLevel

function Watercraft(name, type){
	this._speed = 0;
	this._speedLevel = 0;
	this._status = false;
	//this._name ??? // код не общий 
	//this._this ???  // код не общий 
}

Watercraft.prototype.getStatus = function(){
	return this._status;
}

Watercraft.prototype.speedLevel = function(value) {
		if(typeof value == "number" && !isNaN(value) && value >= 0 && value <= 3){
			this._speedLevel = value;
		}
	
		
}

Watercraft.prototype.on = function(delay){
	this._status = true;
	this._speed = (this._speed + 2) * 2;
	
	switch (this._speedLevel){
		case 0: 
			this._speed = 0;
			break;
		case 1:
			if(this._speed > 12){
				this._speed = 12;
			};
			break;
		case 2:
			
			if(this._speed > 28){
				this._speed = 28;
			};
			break;
		case 3:
			if(this._speed > 60){
				this._speed = 60;
			};
			break;	
	}
	return new Promise( (resolve, reject) => {
	  
	  setTimeout ( () => {
		 
		resolve(this._speed);
		//console.log(sailing.getSpeed());
		//console.log(launch.getSpeed());
	  }, delay)
	});
}
Watercraft.prototype.off = function(delay){
			
	return new Promise ( (resolve, reject) => {
		setTimeout ( () => {
			resolve(this._speed);
			this._status = false;//
			if(this._speed != 0){//
			this._speed = (this._speed - 2) / 2;
				if(this._speed < 8){
					this._speed = 0;
				}
		}
			//console.log(sailing.getSpeed());
			console.log(launch.getSpeed());
		}, delay)	
	})
		
}


Watercraft.prototype.getType = function (){
	return this._type;
}

Watercraft.prototype.getName = function (){
	return this._name;
}
Watercraft.prototype.setSpeed = function(value){
	if(typeof value === "number" && !isNaN(value) && 0 <= value && value <= 60){
		this._speed = value;
	}
}

Watercraft.prototype.increaseSpeed = function (){
	if(this._speed <= 59){
		this._speed++;
	}
}

Watercraft.prototype.decreaseSpeed = function (){
	if(this._speed > 0){
		this._speed--;
	}
}



Watercraft.prototype.getSpeed = function(){
	return this._speed;
}



// наследник - Boat

function Boat(name, type) {
	Watercraft.call(this, name, type);
	if (typeof name === "string" && name.length > 2){
		this._name = name;
	} else {
      this._name = "Boat"; 
    }
    if (Boat.types.indexOf(type) >= 0) {//Boat.types - static
      this._type = type;
	  
   }
   else {
	   throw new Error("Enter correct type");
   }
	//Boat.types = ["fishingBoat", "pilot", "sailing"]; // static// Почему ошиб если в конструкторе?
	
	
}
Boat.types = ["fishingBoat", "pilot", "sailing"]; // static
Boat.prototype = Object.create(Watercraft.prototype);
Boat.prototype.constructor = Boat; 




Boat.prototype.setType = function (t){ // !!!
	
	if(Boat.types.indexOf(t) >= 0){
		this._type = t;
	}
	/*this._types.forEach( (v) => {// 2 вар, работ
		if(t == v){
			this._type = t;// если не => Cannot set property '_type' of undefined
		}
	})*/
}



// Наследник //Launch - катер

function Launch (name, type){
	Watercraft.call(this, name, type);
	//this._types = ["jetski", "launch"]; // static
	this._levelPetrol = 0;
	if (typeof name === "string" && name.length > 2){
		this._name = name;
	} else {
      this._name = "Launch"; 
      
   }
   
   if(Launch.types.indexOf(type)>= 0){
	   this._type = type;
   }
   else{
	   throw new Error("Enter correct type 2");
   }
	
}
Launch.types = ["jetski", "launch"];// static
Launch.prototype = Object.create(Watercraft.prototype);
Launch.prototype.constructor = Launch;

Launch.prototype.on = function(delay){// полиморфизм расшир 
	
	if (this._levelPetrol >= 1){
		
		//Watercraft.prototype.on.call(this, delay); // НЕ РАБОТ !!!! ???????
		//console.log("sos");
		this._status = true;
	this._speed = (this._speed + 3) * 2;//переопредел м-да
	
	switch (this._speedLevel){
		case 0: 
			this._speed = 0;
			break;
		case 1:
			if(this._speed > 20){
				this._speed = 20;
			};
			break;
		case 2:
			
			if(this._speed > 35){
				this._speed = 35;
			};
			break;
		case 3:
			if(this._speed > 75){
				this._speed = 75;
			};
			break;	
	}
	return new Promise( (resolve, reject) => {
	  
	  setTimeout ( () => {
		 
		resolve(this._speed);
		console.log(launch.getSpeed());
	  }, delay)
	});
		
	}	
}
Launch.prototype.setPetrol = function(level){
	if(typeof level === "number" && !isNaN(level) && 0 < level && level <= 40){
		this._levelPetrol = level;
	}	
}
Launch.prototype.getPetrol = function(){
	return this._levelPetrol;
}	
Launch.prototype.setType = function (t){ 
	
	if(Launch.types.indexOf(t) >= 0){
		this._type = t;
	}
	
}

Launch.prototype.increaseSpeed = function (){// полиморфизм
	if(this._speed <= 75){
		this._speed++;
	}
}
Launch.prototype.setSpeed = function(value){// полиморфизм
	if(typeof value === "number" && !isNaN(value) && 0 <= value && value <= 75){
		this._speed = value;
	}
}
	
var sailing = new Boat("Rose", "fishingBoat");
var launch = new Launch("Medusa", "launch");

console.log(sailing.getStatus());
sailing.speedLevel(3);
sailing.on(3000)
	.then( (result) => {
			
		return sailing.on(2000);
		
	})
	.then( (result) => {
		
		
		return sailing.on(2000);
		
	})
	.then( (result) => {
		
		
		return sailing.on(1000);
		
	})
sailing.off(9000)
	.then( (result) => {
		
		return sailing.off(2000);
	})
	.then( (result) => {
		
		return sailing.off(2000);
	})
	
console.log(sailing.getStatus());

console.log(sailing.getName());
console.log(sailing.getType());
sailing.setType("pilot");
console.log(sailing.getType());
/*sailing.setSpeed(2);
console.log(sailing.getSpeed());
sailing.increaseSpeed();
sailing.increaseSpeed();
sailing.decreaseSpeed();
console.log(sailing.getSpeed());
sailing.off();
console.log(sailing.getStatus());*/



//launch.on();
console.log(launch.getStatus());
console.log(launch.getName());
console.log(launch.getType());
launch.setType("jetski");
console.log(launch.getType());
/*launch.setSpeed(4);
launch.increaseSpeed();
launch.increaseSpeed();
launch.decreaseSpeed();
console.log(launch.getSpeed());*/

console.log(launch.getStatus());
launch.setPetrol(35);
console.log(launch.getPetrol());
launch.speedLevel(3);

launch.on(3000)
	.then( (result) => {
		
		
		return launch.on(2000);
		
	})
	.then( (result) => {
		
		
		return launch.on(2000);
		
	})
	.then( (result) => {
		
		
		return launch.on(1000);
		
	})


//launch.on();
console.log(launch.getStatus());
launch.off(9000)
	.then( (result) => {
		
		return launch.off(2000);
	})
	.then( (result) => {
		
		return launch.off(2000);
	})

console.log(launch.getStatus());














/*this._speed = 0;
	this._speedLevel = 0;
	this._status = false;
	if (typeof name === "string" && name.length > 2){
		this._name = name;
	} else {
      this._name = "Boat"; 
      
   }
		
   // indexOf
   if (Boat.types.indexOf(type) >= 0) {//Boat.types - не раб
      this._type = type;
	  
   }
   else {
	   throw new Error("Enter correct type");
   }*/
   
   /*this._types.forEach( (v) => {//2й вар, работ
		if(type == v){
			this._type = type;// если не => Cannot set property '_type' of undefined
		}
	})*/
	
	/*
Boat.prototype.getStatus = function(){
	return this._status;
}

Boat.prototype.speedLevel = function(value) {
		if(typeof value == "number" && !isNaN(value) && value >= 0 && value <= 3){
			this._speedLevel = value;
		}
	
		
}

Boat.prototype.on = function(delay){
	this._status = true;
	this._speed = (this._speed + 2) * 2;
	
	switch (this._speedLevel){
		case 0: 
			this._speed = 0;
			break;
		case 1:
			if(this._speed > 12){
				this._speed = 12;
			};
			break;
		case 2:
			
			if(this._speed > 28){
				this._speed = 28;
			};
			break;
		case 3:
			if(this._speed > 60){
				this._speed = 60;
			};
			break;	
	}
	return new Promise( (resolve, reject) => {
	  
	  setTimeout ( () => {
		 
		resolve(this._speed);
		console.log(sailing.getSpeed());
	  }, delay)
	});
}
Boat.prototype.off = function(delay){
			
	return new Promise ( (resolve, reject) => {
		setTimeout ( () => {
			resolve(this._speed);
			this._status = false;//
			if(this._speed != 0){//
			this._speed = (this._speed - 2) / 2;
				if(this._speed < 7){
					this._speed = 0;
				}
		}
			console.log(sailing.getSpeed());
		}, delay)	
	})
		
}


Boat.prototype.getType = function (){
	return this._type;
}

Boat.prototype.getName = function (){
	return this._name;
}
*/

/*
Boat.prototype.setSpeed = function(value){
	if(typeof value === "number" && !isNaN(value) && 0 <= value && value <= 60){
		this._speed = value;
	}
}

Boat.prototype.increaseSpeed = function (){
	if(this._speed <= 59){
		this._speed++;
	}
}

Boat.prototype.decreaseSpeed = function (){
	if(this._speed > 0){
		this._speed--;
	}
}



Boat.prototype.getSpeed = function(){
	return this._speed;
}*/