var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "KanDao0@"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // con.query("CREATE DATABASE mydb", function(err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });
  con.query("use mydb", function(err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  // var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  // con.query(sql, function(err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });

  // var sql =
  //   "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
  // con.query(sql, function(err, result) {
  //   if (err) throw err;
  //   console.log("Table altered");
  // });

  // var sql =
  //   "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  // con.query(sql, function(err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });

  // var sql = "INSERT INTO customers (name, address) VALUES ?";
  // var values = [
  //   ["John", "Highway 71"],
  //   ["Peter", "Lowstreet 4"],
  //   ["Amy", "Apple st 652"],
  //   ["Hannah", "Mountain 21"],
  //   ["Michael", "Valley 345"],
  //   ["Sandy", "Ocean blvd 2"],
  //   ["Betty", "Green Grass 1"],
  //   ["Richard", "Sky st 331"],
  //   ["Susan", "One way 98"],
  //   ["Vicky", "Yellow Garden 2"],
  //   ["Ben", "Park Lane 38"],
  //   ["William", "Central st 954"],
  //   ["Chuck", "Main Road 989"],
  //   ["Viola", "Sideway 1633"]
  // ];
  // con.query(sql, [values], function(err, result) {
  //   if (err) throw err;
  //   console.log("Number of records inserted: " + result.affectedRows);
  // });

  // var sql =
  //   "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
  // con.query(sql, function(err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted, ID: " + result.insertId);
  // });

  con.query("SELECT * FROM customers", function(err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

  con.query("SELECT name, address FROM customers", function(
    err,
    result,
    fields
  ) {
    if (err) throw err;
    console.log(result);
  });

  {
    var adr = "Mountain 21";
    var sql = "SELECT * FROM customers WHERE address = " + mysql.escape(adr);
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  }

  {
    var adr = "Mountain 21";
    var sql = "SELECT * FROM customers WHERE address = ?";
    con.query(sql, [adr], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  }

  {
    var name = "Amy";
    var adr = "Mountain 21";
    var sql = "SELECT * FROM customers WHERE name = ? OR address = ?";
    con.query(sql, [name, adr], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  }

  {
    var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  }

  {
    var sql = "DROP TABLE customers";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("Table deleted");
    });
  }

  {
    var sql =
      "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  {
    var sql = "SELECT * FROM customers LIMIT 5";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  }

  {
    //var sql = "SELECT * FROM customers LIMIT 2, 5";
    var sql = "SELECT * FROM customers LIMIT 5 OFFSET 2";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  }

  {
    var sql =
      "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  }
});
