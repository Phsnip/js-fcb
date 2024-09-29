
// variables - storage of values
let board;
let score = 0;
let rows = 4;
let columns = 4;

let is2048Exsist = false;
let is4096Exsist = false;
let is8192Exsist = false;

function setGame(){
	board = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
		]; 

		// board = [
  //       [32, 8, 4, 4],
  //       [4, 128, 64, 256],
  //       [8, 32, 16, 2],
  //       [16, 2, 256, 1024]
  //   	];
		// this board will be used as the backend board to dsign and modify the tiels of the fornt end board

		// loop
	for(let r=0; r<rows;r++){
		for(let c=0; c<columns;c++){

			// create div element
			let tile = document.createElement("div");

			// assign an id based on the position of the tile
			tile.id = r.toString() + "-" + c.toString();

			// get board coords
			let num = board[r][c];
			updateTile(tile, num);
			document.getElementById("board").append(tile);
		}

	}
	setTwo();
	setTwo();
}
// this fucntion is to update the color of the tile based on its num value
function updateTile(tile, num){

	tile.innerText = "";
	tile.classList.value = "";

	tile.classList.add("tile");

	if(num > 0){
			tile.innerText = num.toString();

			if(num < 8192){
				tile.classList.add("x" + num.toString());
			}
			else{
			tile.classList.add("x8192");
		}
	}	
}

window.onload = function(){
	setGame(); // function game
}

function handleSlide(e){

	console.log(e.code);

	if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.code)){
		if(e.code == "ArrowRight"){
			slideRight();
		}
		else if(e.code == "ArrowLeft"){
			slideLeft();
		}
		else if(e.code == "ArrowUp"){
			slideUp();
		}
		else if(e.code == "ArrowDown"){
			slideDown();
		}
	}

	document.getElementById("score").innerText = score;

	checkWin();

	if (hasLost() == true){
		setTimeout(() =>{
			alert("Gameover. You have lost the game. Game will restart");
			restartGame();
			alert("click any arrow key to restart");
		},100);
		score = 0;
		return;
	}
}
document.addEventListener("keydown",handleSlide);


// slide left
function slideLeft(){
	for(let r=0; r<rows;r++){

		let row = board[r];
		row = slide(row);
		board[r] = row;


		for(let c=0; c<columns;c++){

			for(let c=0; c<columns;c++){
				let tile = document.getElementById(r.toString() + "-" + c.toString());
				let num = board[r][c];
				updateTile(tile,num);
			}

		}
	}
	setTwo();
}

function slideRight(){
	for(let r=0; r<rows;r++){

		// alltiles values per row are saved in a container row
		let row = board[r];


		// 2 2 2 0 -> 0 2 2 2
		row.reverse();		

		row = slide(row); //use slide function to merge the same values
		// 4 0 0 0
		row.reverse();

		board[r] = row; //update the row with the merge tile/s


		for(let c=0; c<columns;c++){

			for(let c=0; c<columns;c++){
				let tile = document.getElementById(r.toString() + "-" + c.toString());
				let num = board[r][c];
				updateTile(tile,num);
			}

		}
	}
	setTwo();

}

function slideUp(){
	for(let c=0; c<columns;c++){

		let col = [board[0][c], board[1][c],board[2][c],board[3][c]];

		col = slide(col);


		for(let r=0; r<rows;r++){

				board[r][c] = col[r];
				let tile = document.getElementById(r.toString() + "-" + c.toString());
				let num = board[r][c];
				updateTile(tile,num);
			
		}
	}
		setTwo();

}

function slideDown(){
	for(let c=0; c<columns;c++){

		let col = [board[0][c], board[1][c],board[2][c],board[3][c]];


		col.reverse();
		col = slide(col);
		col.reverse();

		for(let r=0; r<rows;r++){

				board[r][c] = col[r];
				let tile = document.getElementById(r.toString() + "-" + c.toString());
				let num = board[r][c];
				updateTile(tile,num);
		}
	}
	setTwo();

}

//according to mod 2 0 0 4 is hard to move
function filterZero(row){
	return row.filter(num => num != 0);
}


function slide(tiles){
	tiles = filterZero(tiles);

	for(let i = 0; i < tiles.length-1; i++){
		if(tiles[i] == tiles[i+1]){
			tiles[i] *= 2;
			tiles[i+1] = 0;
			score += tiles[i]; //add merge tiles to the score
		}
	}

	tiles = filterZero(tiles);
	console.log(tiles);


	while(tiles.length < columns){
		tiles.push(0);
	}
	return tiles;
}

function hasEmptyTile(){

		for(let r=0; r<rows; r++){
			for(let c=0; c<columns; c++){
				if(board[r][c] == 0){
					return true;
				}
			}
		}
		return false;
}

function setTwo(){
	if(hasEmptyTile()== false){
		return
	}

	let found = false;

	while(found == false){
		//random floor
		let r = Math.floor(Math.random()* rows);
		let c = Math.floor(Math.random()* columns);

		if(board[r][c] == 0){

			board[r][c] = 2;
			let tile = document.getElementById(r.toString() + "-" + c.toString());

			tile.innerText = "2";
			tile.classList.add("x2");

			found = true;

		}
	}
}

function checkWin(){
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){
			if(board[r][c] == 2048 && is2048Exsist == false){
				alert("You win! you got the 2048");
				is2048Exsist = true;
			}
			else if(board[r][c] == 4096 && is4096Exsist == false){
				alert("You win! you got the 4096");
				is4096Exsist = true;
			}
			else if(board[r][c] == 8192 && is8192Exsist == false){
				alert("You win! you got the 8192");
				is8192Exsist = true;
			}
		}
	}
}

function hasLost(){
	for(let r=0; r<rows; r++){
		for(let c=0; c<columns; c++){

			if(board[r][c]==0){
				return false;
			}

			const currentTile = board[r][c];

			if( r > 0 && board[r-1][c] === currentTile ||
				r < 3 - 1 && board[r+1][c] === currentTile ||
				c > 0 && board[r][c-1] === currentTile ||
				c < 3 - 1 && board[r][c+1] === currentTile
				)
			{
				return false;
			}
		}
	}

	// nopossible moves
	return true;
}

function restartGame(){
	board = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	]
	setTwo();
}
