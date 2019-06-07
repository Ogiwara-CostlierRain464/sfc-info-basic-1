function bloodtype() {
  const a = isYes(document.getElementById("a").value);
  const b = isYes(document.getElementById("b").value);

  if(a && b){
    alert("AB");
  }else if(!a && b){
    alert("B");
  }else if(a && !b){
    alert("A");
  }else if(!a && !b){
    alert("O");
  }
}

function isYes(str) {
  return str === "yes";
}

function changeImageHieght() {
  const img = document.getElementById("photo");

  img.height = 800;
}
