const umzug = require('./_umzug.js');

umzug.down().then(function (migrations) {
  if(migrations.length){
    for(const m of migrations){
      console.log('undone : ' + m.file);
    }
  } else {
    console.log('Zero migrations undone !');
  }
  process.exit();
});
