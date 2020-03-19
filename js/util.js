var generateMsg = (text , location, user) => {
  console.log(text);
   return {
      text,
      location,
      user,
      createdAt: new Date().getTime()
   }
}

module.exports = {
 generateMsg

}
