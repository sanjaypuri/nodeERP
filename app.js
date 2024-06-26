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
app.get('/customerpo/:popMsg/:border', (request, response)=>{
  const popMsg = request.params.popMsg;
  const border = request.params.border;
  const sql = `SELECT
                  po.id, po.projectno, pr.description, c.customer, cm.company, po.pono, po.basicpovalue
                FROM customerpo po
                LEFT JOIN projects pr ON pr.projectno = po.projectno
                LEFT JOIN customers c ON c.id = pr.Customerid
                LEFT JOIN companies cm ON cm.id = pr.companyid
                ORDER BY po.projectno`;
  db.all(sql, (error, pos)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error Reading Projects List";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    }
    else {
      response.render('customerpos', {pos, popMsg, border});
    }
  });
});

/////////////////////////////////
///////Customer PO Add Form//////
/////////////////////////////////
app.get('/customerpoadd', (request, response)=>{
  let sql = 'SELECT projectno FROM projects';
  db.all(sql, (error, projects)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error loading Project Numbers";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.render('customerpoadd', {projects});
    }
  }); 
});

///////////////////////////////////////
///////Customer PO Save (New)//////////
///////////////////////////////////////
app.post('/customerpoadd', (request, response)=>{
  const projectno = request.body.projectno;
  const pono = request.body.pono;
  const podate = request.body.podate;
  const contractualdelivery = request.body.contractualdelivery;
  const basicpovalue = parseFloat(request.body.basicvalue);
  const incoterms = request.body.incoterms;
  const paymentterms = request.body.paymentterms;
  const komdate = request.body.komdate;
  const totaltaxes = parseFloat(request.body.totaltaxes);
  const totaladvances = parseFloat(request.body.totaladvances);
  const totalretention = parseFloat(request.body.totalretention);
  const packing = request.body.packing;
  const transport = request.body.transport;
  const insurance = request.body.insurance;
  const sql = `INSERT INTO customerpo (projectno, pono, podate, basicpovalue, contractualdelivery, 
    incoterms, paymentterms, komdate, totaltaxes, totaladvances, totalretention, packing, transport, insurance) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [projectno, pono, podate, basicpovalue, contractualdelivery, incoterms, paymentterms, komdate, totaltaxes, totaladvances, totalretention, packing, transport, insurance], (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error Saving New Customer PO";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/customerpo/Customer PO created/green`);
    }
  });
});

/////////////////////////////
///////Customer PO View//////
/////////////////////////////
app.get('/poview/:id', (request, response)=>{
  const id = parseInt(request.params.id);
  let sql = `SELECT id, projectno, pono, podate, basicpovalue, contractualdelivery, incoterms, paymentterms, 
                komdate, totaltaxes, totaladvances, totalretention, packing, transport, insurance
                from customerpo WHERE id = ?`;
  db.get(sql, id, (error, po)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error reading Customer PO details";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.render('customerpoview', {po});
    }
  });
});

///////////////////////////////////
///////Customer PO Edit Form//////
//////////////////////////////////
app.get('/poedit/:id', (request, response)=>{
  const id = parseInt(request.params.id);
  let sql = `SELECT id, projectno, pono, podate, basicpovalue, contractualdelivery,
              incoterms, paymentterms, komdate, totaltaxes, totaladvances, totalretention,
              packing, transport, insurance from customerpo WHERE id = ?`;
  db.get(sql, id, (error, po)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error reading Customer PO details";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.render('customerpoedit', {po});
    }
  });
});

//////////////////////////////////////////
///////Customer PO Save (Update)//////////
//////////////////////////////////////////
app.post('/poedit', (request, response)=>{
  const id = parseInt(request.body.id);
  const projectno = request.body.projectno;
  const pono = request.body.pono;
  const podate = request.body.podate;
  const basicpovalue = parseFloat(request.body.basicvalue);
  const contractualdelivery = request.body.contractualdelivery;
  const incoterms = request.body.incoterms;
  const paymentterms = request.body.paymentterms;
  const komdate = request.body.komdate;
  const totaltaxes = parseFloat(request.body.totaltaxes);
  const totaladvances = parseFloat(request.body.totaladvances);
  const totalretention = parseFloat(request.body.totalretention);
  const packing = request.body.packing;
  const transport = request.body.transport;
  const insurance = request.body.insurance;
  console.log(paymentterms);
  const sql = `UPDATE customerpo SET projectno = ?, pono = ?, podate = ?, basicpovalue = ?,
                contractualdelivery = ?, incoterms = ?, paymentterms = ?, komdate = ?,
                totaltaxes = ?, totaladvances = ?, totalretention = ?, 
                packing = ?, transport = ?, insurance = ? WHERE id = ?`;
  db.run(sql, [projectno, pono, podate, basicpovalue, contractualdelivery, incoterms, paymentterms, komdate, totaltaxes, totaladvances, totalretention, packing, transport, insurance, id], (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error updating Customer PO";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/customerpo/Customer PO Updated/green`);
    }
  });
});

///////////////////////////////
///////Customer PO Delete//////
///////////////////////////////
app.get('/podelete/:id', (request, response)=>{
  const id = parseInt(request.params.id);
  const sql = `DELETE FROM customerpo WHERE id = ?`;
  db.run(sql, id, (error)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error deleting Customer PO";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/customerpo/Customer PO deleted/green`);
    }
  });
});

///////////////////////////////
///////Billing Schedule////////
///////////////////////////////
app.get('/bsproject/:popMsg/:border', (request, response)=>{
  const popMsg = request.params.popMsg;
  const border = request.params.border;
  const sql = `SELECT projectno from projects`;
  db.all(sql, (error, projects)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error loading projects";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.render('bsproject', {projects, popMsg, border});
    }
  });
});

///////////////////////////////
///////Billing Schedule////////
///////////////////////////////
app.post('/bs', (request, response)=>{
  const popMsg = '';
  const border = '';
  const projectno = request.body.projectno;
  let sql = `SELECT
                  bs.id, bs.projectno, bs.bsno, bs.assyno, bs.section, bs.description, bs.customerref, 
                  bs.qty, bs.unitid, u.Units, bs.billingvalue, bs.remarks, sum(bs.billingvalue) over () bstotal, po.basicpovalue pototal  
                FROM billingscheduledata bs
                LEFT JOIN customerpo po ON po.projectno = bs.projectno
                LEFT JOIN units u ON u.id = bs.unitid
                WHERE bs.projectno = ?`;
  db.all(sql, projectno, (error, rows)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error loading projects";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      sql = `SELECT id, Units from Units`;
      db.all(sql, (error, units)=>{
        if(error){
          console.log(error.message);
          const errorName = error.name;
          const errorMessage = error.message;
          const errorDetails = "Error loading projects";
          response.render("errorPage", {errorName, errorMessage, errorDetails})
        } else {
          response.render('bs', {rows, units, projectno, popMsg, border});
        }
      });
    }
  });
});

///////////////////////////////
///////Billing Schedule////////
///////////////////////////////
app.get('/bs/:projectno/:msg/:border', (request, response)=>{
  const popMsg = request.params.popMsg;
  const border = request.params.border;
  const projectno = request.body.projectno;
  let sql = `SELECT
                  bs.id, bs.projectno, bs.bsno, bs.assyno, bs.section, bs.description, bs.customerref, 
                  bs.qty, bs.unitid, u.Units, bs.billingvalue, bs.remarks, sum(bs.billingvalue) over () bstotal, po.basicpovalue pototal  
                FROM billingscheduledata bs
                LEFT JOIN customerpo po ON po.projectno = bs.projectno
                LEFT JOIN units u ON u.id = bs.unitid
                WHERE bs.projectno = ?`;
  db.all(sql, projectno, (error, rows)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error loading projects";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      sql = `SELECT id, Units from Units`;
      db.all(sql, (error, units)=>{
        if(error){
          console.log(error.message);
          const errorName = error.name;
          const errorMessage = error.message;
          const errorDetails = "Error loading projects";
          response.render("errorPage", {errorName, errorMessage, errorDetails})
        } else {
          response.render('bs', {rows, units, projectno, popMsg, border});
        }
      });
    }
  });
});

////////////////////////////////////
///////Billing Schedule Save////////
////////////////////////////////////
app.post('/bssave', (request, response)=>{
  const projectno = request.body.projectno;
  const bsno = request.body.bsno;
  const assyno = request.body.assyno;
  const section = request.body.section;
  const description = request.body.description;
  const customerref = request.body.customerref;
  const billingvalue = parseFloat(request.body.billingvalue);
  const qty = parseInt(request.body.qty);
  const unitid = parseInt(request.body.units);
  const remarks = request.body.remarks;
  let sql = `INSERT INTO billingscheduledata 
              (projectno, bsno, assyno, section, description, customerref, qty, unitid, billingvalue, remarks) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [projectno, bsno, assyno, section, description, customerref, qty, unitid, billingvalue, remarks], (error, rows)=>{
    if(error){
      console.log(error.message);
      const errorName = error.name;
      const errorMessage = error.message;
      const errorDetails = "Error writing Billing Schedule";
      response.render("errorPage", {errorName, errorMessage, errorDetails})
    } else {
      response.redirect(`/bs/${projectno}/Billing Schedule Saved/green`);
    }
  });
});

/////////////////////////////
///////Start the server//////
/////////////////////////////
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
