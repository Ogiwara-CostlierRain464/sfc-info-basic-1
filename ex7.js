function sayhello() { alert('Hello, ' +
  document.getElementById('who').value + '!');
}

function onChange(){
  const whoText = document.getElementById("who").value;
  document.getElementById("who-bind").value = "Hello, " + whoText +"!";
}


function add() {
  var x = document.getElementById('input1').value; var y = document.getElementById('input2').value; alert(x+y);
}


function BMI(weightKg, heightCm){
  const bmi = weightKg / ((heightCm / 100) ** 2);

  let show = "";
  if(bmi < 18.5){
    show = "低体重";
  }else if(18.5 <= bmi && bmi < 25){
    show = "普通";
  }else{
    show = "肥満";
  }

  alert("BMI: " + bmi + " " + show + "です");
}


function quiz( ) {
  const input = document.getElementById('answer').value;

  if (input.toUpperCase() === 'SFC' || input === '湘南大学') {
    alert('あたり!');
  }else{
    alert('ハズレ!');
  }
}
