
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
  else if(res[0]+"\n"==="add\n"){
    add(res[1]);
  }
  else if(res[0]+"\n" === "remove\n"){
    remove(+res[1]-1);
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
 * Add an item to the list
 * This function is supposed to add new item if the command is correct, else return an error.
 *
 * @param  {string} item the item received
 * @returns {void}
 */
function add (item){
  if(item){
    list.push(item);
    console.log(item+" is added to the list");
    console.log("------------------");
  }else{
    console.log("ERROR!, please try to add something.");
  }
}

/**
 * remove an item from the list
 * This function is supposed to remove the specified item, if not remove the last item.
 *
 * @param  {string} index the index received
 * @returns {void}
 */
function remove(index){
  if(index){
    console.log(list[index]+" task is removed");
    console.log("------------------");
    list.splice(index);

  }else{
    console.log("last task is removed");
    console.log("------------------");
    list.pop();
  }
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
    list:"prints all tasks in the list",
    add_X:"add X task to the list",
    remove:"remove the last task in the list",
    remove_I:"remove the task at index I",
    quit:"quit the application",
    exit:"exit the application",
  }
  console.table(obj);
}


// The following line starts the application
startApp("Jihad abdlghani")
