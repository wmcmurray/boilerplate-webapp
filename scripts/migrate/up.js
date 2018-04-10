var umzug = require('./_umzug.js');

umzug.up().then(function (migrations) {
  if(migrations.length){
    for(var m of migrations){
      console.log('done : ' + m.file);
    }
  } else {
    console.log('Zero migrations done !');
  }
  process.exit();
});
