const con = require("./db_connect");
  //require("./user")
  
  async function createTable() {
    let sql=`CREATE TABLE IF NOT EXISTS notes (
      noteID INT NOT NULL AUTO_INCREMENT,
      notedescription VARCHAR(255) NOT NULL,
      userID INT NOT NULL,
      CONSTRAINT note_pl PRIMARY KEY(noteID),
      CONSTRAINT note_fk FOREIGN KEY(userID) REFERENCES users(userID)
     
    ); `
    await con.query(sql);
  }
  createTable();
  async function getallnotes() {
    const sql = `SELECT * FROM notes;`;
    let notes = await con.query(sql);
    return notes;
  } 
  
  getallnotes();
  
  async function getnote(note) {
    let sql = `
      SELECT * FROM notes 
        WHERE userID = "${note.userID}"
    `;
  
    return await con.query(sql);  
    
  }
  
  async function creatingnote(note){
  
    let sql=`INSERT INTO notes (userID,notecontent) VALUES ("${note.userID}", "${note.notecontent}");`
  
  let data=await con.query(sql);
  
  
  return {success:"Note Added"};
  
  }
  
  async function deletingnote(note){
    let sql=`DELETE FROM notes where userID="${note.userID}"`;
  
    return await con.query(sql);
  }
  async function editingnote(note) {
    let sql = `UPDATE notes 
      SET notedescription = "${note.notedescription}"
      WHERE noteID = ${note.noteID}
    `;
    
    await con.query(sql);
    let updatedNote = await getnote(note);
    return updatedNote[0];
    }
  
  
  // createnote(notedata[0])
  module.exports = {getallnotes,getnote,creatingnote,deletingnote,editingnote};