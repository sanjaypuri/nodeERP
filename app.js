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

///////////////////////////
///////Customers List//////
///////////////////////////
app.get('/customers/:popMsg/:border', (request, response)=>{
  const popMsg = request.params.popMsg;
  const border = request.params.border;
  const sql = `SELECT id, customer FROM customers ORDER BY customer`;
  db.all(sql, (error, customers)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error Reading Customers List";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    }
    else {
      response.render('customers', {customers, popMsg, border});
    }
  });
});

/////////////////////////////
///////Company Add Form//////
/////////////////////////////
app.get('/customeradd', (request, response)=>{
  response.render('customeradd', {});
});

////////////////////////////////////
///////Customer Save (New)//////////
////////////////////////////////////
app.post('/customeradd', (request, response)=>{
  const customer = request.body.customer
  const sql = `INSERT INTO customers (customer) VALUES (?)`;
  db.run(sql, customer, (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error Saving New Customer";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/customers/Customer created/green`);
    }
  });
});

//////////////////////////////
///////Company Edit Form//////
//////////////////////////////
app.get('/customeredit/:id', (request, response)=>{
  const id = parseInt(request.params.id);
  const sql = `SELECT id, customer from customers WHERE id = ?`;
  db.get(sql, id, (error, customer)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error reading customer details";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.render('customeredit', {customer});
    }
  });
});

///////////////////////////////////////
///////Customer Save (Update)//////////
///////////////////////////////////////
app.post('/customeredit', (request, response)=>{
  const id = parseInt(request.body.id);
  const customer = request.body.customer;
  const sql = `UPDATE customers SET customer = ? WHERE id = ?`;
  db.run(sql, [customer, id], (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error updating Customer";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/customers/Customer Updated/green`);
    }
  });
});

////////////////////////////
///////Customer Delete//////
////////////////////////////
app.get('/customerdelete/:id', (request, response)=>{
  const id = parseInt(request.params.id);
  const sql = `DELETE FROM customers WHERE id = ?`;
  db.run(sql, id, (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error deleting Customer";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/customers/Customer deleted/green`);
    }
  });
});

//////////////////////////
///////Projects List//////
//////////////////////////
app.get('/projects/:popMsg/:border', (request, response)=>{
  const popMsg = request.params.popMsg;
  const border = request.params.border;
  const sql = `SELECT
                p.projectno, p.status, p.description, p.Customerid, c.customer, p.companyid, cm.company
              FROM projects p
              LEFT JOIN customers c on c.id = p.Customerid
              LEFT JOIN companies cm on cm.id = p.companyid`;
  db.all(sql, (error, projects)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error Reading Projects List";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    }
    else {
      response.render('projects', {projects, popMsg, border});
    }
  });
});

/////////////////////////////
///////Project Add Form//////
/////////////////////////////
app.get('/projectadd', (request, response)=>{
  let sql = 'SELECT id, customer FROM Customers';
  db.all(sql, (error, customers)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error loading Customers";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      sql = `SELECT id, company FROM companies`;
      db.all(sql, (error, companies)=>{
        if(error){
          console.log(error.message);
          const errorName = error.name;
          const errorMessage = error.message;
          const errorDetails = "Error loading Companies";
          response.render("errorPage", {errorName, errorMessage, errorDetails})
        } else {
          response.render('projectadd', {customers, companies});
        }
      });
    }
  }); 
});

///////////////////////////////////
///////Project Save (New)//////////
///////////////////////////////////
app.post('/projectadd', (request, response)=>{
  const projectno = request.body.projectno
  const status = request.body.status
  const description = request.body.description
  const customerid = parseInt(request.body.customerid)
  const companyid = parseInt(request.body.companyid)
  const sql = `INSERT INTO projects (projectno, status, description, customerid, companyid) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [projectno, status, description, customerid, companyid], (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error Saving New Project";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/Projects/Project created/green`);
    }
  });
});

///////////////////////////
///////Project Delete//////
///////////////////////////
app.get('/projectdelete/:projectno', (request, response)=>{
  const projectno = request.params.projectno;
  const sql = `DELETE FROM projects WHERE projectno = ?`;
  db.run(sql, projectno, (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error deleting Project";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/projects/Project deleted/green`);
    }
  });
});

//////////////////////////////
///////Project Edit Form//////
//////////////////////////////
app.get('/projectedit/:projectno', (request, response)=>{
  const projectno = parseInt(request.params.projectno);
  let sql = `SELECT projectno, status, description, Customerid, companyid from projects WHERE projectno = ?`;
  db.get(sql, projectno, (error, project)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error reading Project details";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      sql = `SELECT id, company FROM companies`;
      db.all(sql, (error, companies)=>{
        if(error){
          console.log(error.message);
          const errorName = error.name;
          const errorMessage = error.message;
          const errorDetails = "Error reading Project details";
          response.render("errorPage", {errorName, errorMessage, errorDetails})
        } else {
          let sql = 'SELECT id, customer FROM Customers';
          db.all(sql, (error, customers)=>{
            if(error){
              console.log(error.message);
              const errorName = error.name;
              const errorMessage = error.message;
              const errorDetails = "Error reading Project details";
              response.render("errorPage", {errorName, errorMessage, errorDetails})
            } else {
              response.render('projectedit', {project, companies, customers});
            }
          });
        }
      });
    }
  });
});

//////////////////////////////////////
///////Project Save (Update)//////////
//////////////////////////////////////
app.post('/projectedit', (request, response)=>{
  const projectno = request.body.projectno;
  const status = request.body.status;
  const description = request.body.description;
  const customerid = parseInt(request.body.customerid);
  const companyid = parseInt(request.body.companyid);
  const sql = `UPDATE projects SET status = ?, description = ?, Customerid = ?, companyid = ? WHERE projectno = ?`;
  db.run(sql, [status, description, customerid, companyid, projectno], (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error updating Project";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/projects/Project Updated/green`);
    }
  });
});

/////////////////////////////
///////Customer PO List//////
/////////////////////////////
app.get('/projects/:popMsg/:border', (request, response)=>{
  const popMsg = request.params.popMsg;
  const border = request.params.border;
  const sql = `SELECT
                p.projectno, p.status, p.description, p.Customerid, c.customer, p.companyid, cm.company
              FROM projects p
              LEFT JOIN customers c on c.id = p.Customerid
              LEFT JOIN companies cm on cm.id = p.companyid`;
  db.all(sql, (error, projects)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error Reading Projects List";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    }
    else {
      response.render('projects', {projects, popMsg, border});
    }
  });
});

/////////////////////////////
///////Start the server//////
/////////////////////////////
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
