var generateMsg = (text , location) => {
  console.log(text);
   return {
      text,
      location,
      createdAt: new Date().getTime()
   }
}

module.exports = {
 generateMsg

}
