var generateMsg = (text , location) => {
   return {
      text,
      location,
      createdAt: new Date().getTime()
   }
}

module.exports = {
 generateMsg

}
