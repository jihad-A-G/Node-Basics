
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  const res=text.trim().split(" ");
  if (text === 'quit\n' || text==="exit\n") {
    quit();
  }
  else if(res[0]+"\n" === 'hello\n'){
    hello(text.trim());
  }
  else if(res[0]+"\n"==='help\n'){
    help();
  }
  else if(text==="list\n"){
    List();
  }
  else{
    unknownCommand(text);
  }
}

//Declare List of tasks.
const list = ["Buy coffee","Do sport at 6"];

/**
 * prints the list items
 *
 * @returns {void}
 */
function List(){
  list.map((item,index)=>{
    console.log((index+1)+"- [ ] "+item);
  })
}



/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @param {string} text the text received 
 * @returns {void}
 */
function hello(text){
  console.log(text+"!");
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}


/**
 * Print all commands available in the application
 *
 * @returns {void}
 */
function help(){
  const obj={
    help:"prints all the command available",
    hello:"prints hello!",
    hello_X:"print hello X!",
    quit:"quit the application",
    exit:"exit the application",
  }
  console.table(obj);
}


// The following line starts the application
startApp("Jihad abdlghani")
