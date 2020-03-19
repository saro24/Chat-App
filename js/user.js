var users=[];

var addUser=({id , name, room}) => {
  console.log("helloworlsrs");
  var name= name.trim().toLowerCase();
  var room= room.trim().toLowerCase();
  if(!name || !room) {
    return { error:"name and room are not supposed to be empty"}
  }
  var existingUser=users.find((user) => {
    return user.name==name && user.room ==room;
  })
  if(existingUser){
    return  { error: "User Already in use "}
  }
  var user ={id, name, room};
  users.push(user);
  console.log(users + "  " + user);
  return {user: user};
}

var removeUser= (id) => {
var index=  users.findIndex((user)=> user.id ==id);
   if(index!=-1){
    return users.splice(id, 1)[0];
  }
}

var findUser= (id) =>{
  console.log(users);
return   users.find((user) => {
    return user.id== id
  });
}
var getUserRoom = (room) =>{
names=[];
   users.forEach((user) =>{
    if (user.room==room) {
      names.push(user.name)
    }
  });
  return names
}
module.exports= {
 addUser ,
 removeUser,
 findUser,
 getUserRoom

}
