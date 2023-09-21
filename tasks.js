const fs=require("fs");

var json={list:[]};
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
  try{
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  fs.readFile("database.json",(err,data)=>{
    json=JSON.parse(data);
    process.stdin.on('data', onDataReceived);
    console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
  })
}catch(err){
  console.log(err);
}
  
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
    res.splice(0,1);
    add(res.join(" "));
  }
  else if(res[0]+"\n" === "edit\n"){
    
    if(!isNaN(parseInt(res[1]))){
      index=+res[1];
      res.splice(0,2);
      task=res.join(" ");
      edit(index,task);
    }else{
      res.splice(0,1);
      task=res.join(" ");
      edit(-1,task);
    }

  }
  else if(res[0]+"\n" === "remove\n"){
    remove(+res[1]);
    }
    else if (res[0]+"\n" === "check\n"){
      check(+res[1]);
    }
    else if (res[0]+"\n" === "uncheck\n"){
      unCheck(+res[1]);
    }
  else{
    unknownCommand(text);
  }
}


/**
 * prints the list items
 *
 * @returns {void}
 */
function List(){
  json.list.map((item,index)=>{
    console.log((index+1)+"- ["+(item.done?" \u2713 ":" ")+"] "+item.task);
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
    json.list.push({task:item,done:false});
    console.log(item+" is added to the list");
    console.log("------------------");
  }else{
    console.log("ERROR!, please try to add something.");
  }
}

/**
 * edit an item from the list
 * This function is supposed to edit the specified item, if not edit the last item.
 *
 * @param  {string} index the index received
 * @returns {void}
 */

function edit(i,new_value){
  if(i){
    console.log("ERROR!, please add what you want to edit or \t try 'help'");
  }
    else if(+i === -1){
            json.list[json.list.length-1]={task:new_value,done:false};
      console.log("task "+(json.list.length)+" changed to "+new_value);
      console.log("------------------");
    }else{
    json.list[--i]={task:new_value,done:false};
    console.log("task "+(++i)+" changed to "+new_value);
    console.log("------------------");
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
  if(index-1>json.list.length-1){
    console.log("You entered a wrong number\t try 'help'");

  }
  else if(index){
    console.log(json.list[index-1].task+" task is removed");
    console.log("------------------");
    json.list.splice(index-1,1);

  }else{
    console.log("last task is removed");
    console.log("------------------");
    json.list.pop();
  }
}


/**
 * mark the task as done
 * This function is supposed to check the specified item, if no specified task it will give an error.
 *
 * @param  {string} index the index received
 * @returns {void}
 */

function check(index){
  if(!index){
    console.log("ERROR!, specify which task to check or \t try 'help'");
  }else{
    json.list[index-1].done=true;
    console.log("task "+index+" is done!");
    console.log("------------------");
  }
}

/**
 * mark the task as not done
 * This function is supposed to uncheck the specified item, if no specified task it will give an error.
 *
 * @param  {string} index the index received
 * @returns {void}
 */

function unCheck(index){
  if(!index){
    console.log("ERROR!, specify which task to check or \t try 'help'");
  }else{
    json.list[index-1].done=false;
    console.log("task "+index+" is unchecked");
    console.log("------------------");
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
  json=JSON.stringify(json);
  fs.writeFile("database.json",json,()=>{
    console.log('Quitting now, goodbye!')
    process.exit();
  });
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
    edit_N_X:"edit the task at number N yo X",
    edit_X:"edit the last task to X",
    remove:"remove the last task in the list",
    remove_I:"remove the task at index I",
    check_N:"mark the task at N as done",
    uncheck_N:"un-check the task at N",
    quit:"quit the application",
    exit:"exit the application",
  }
  console.table(obj);
}


// The following line starts the application
startApp("Jihad abdlghani")
