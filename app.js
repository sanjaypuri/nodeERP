const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const { render } = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const PORT = 5000;

//////////////////////
///////Home Page//////
//////////////////////
app.get('/', (request, response)=>{
  response.render('home', {});
});

///////////////////////////
///////Companies List//////
///////////////////////////
app.get('/companies/:popMsg/:border', (request, response)=>{
  const popMsg = request.params.popMsg;
  const border = request.params.border;
  const sql = `SELECT id, company FROM companies ORDER BY company`;
  db.all(sql, (error, companies)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error Reading Companies List";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    }
    else {
      response.render('companies', {companies, popMsg, border});
    }
  });
});

/////////////////////////////
///////Company Add Form//////
/////////////////////////////
app.get('/companyadd', (request, response)=>{
  response.render('companyadd', {});
});

///////////////////////////////////
///////Company Save (New)//////////
///////////////////////////////////
app.post('/companyadd', (request, response)=>{
  const company = request.body.company
  const sql = `INSERT INTO companies (company) VALUES (?)`;
  db.run(sql, company, (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error Saving New Company";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/companies/Company created/green`);
    }
  });
});

//////////////////////////////
///////Company Edit Form//////
//////////////////////////////
app.get('/companyedit/:id', (request, response)=>{
  const id = parseInt(request.params.id);
  const sql = `SELECT id, company from companies WHERE id = ?`;
  db.get(sql, id, (error, company)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error reading company details";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.render('companyedit', {company});
    }
  });
});

//////////////////////////////////////
///////Company Save (Update)//////////
//////////////////////////////////////
app.post('/companyedit', (request, response)=>{
  const id = parseInt(request.body.id);
  const company = request.body.company;
  const sql = `UPDATE companies SET company = ? WHERE id = ?`;
  db.run(sql, [company, id], (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error updating Company";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/companies/Company Updated/green`);
    }
  });
});

///////////////////////////
///////Company Delete//////
///////////////////////////
app.get('/companydelete/:id', (request, response)=>{
  const id = parseInt(request.params.id);
  const sql = `DELETE FROM companies WHERE id = ?`;
  db.run(sql, id, (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error deleting Company";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/companies/Company deleted/green`);
    }
  });
});

/////////////////////////////
///////Start the server//////
/////////////////////////////
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
