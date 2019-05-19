//import "minMatrix"

let gl;

function start() {
  const canvas = document.getElementById("gl_canvas");
  gl = canvas.getContext("webgl");

  gl.clearColor(0,0,0,1);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const v_shader = createShader('vs');
  const f_shader = createShader('fs');

  const program = createProgram(v_shader, f_shader);
  const attLocation = gl.getAttribLocation(program, 'position');

  const vertexPosition = [
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0
  ];

  const vbo = createVBO(vertexPosition);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

  // attribute属性を有効にする
  gl.enableVertexAttribArray(attLocation);
  // attribute属性を登録
  gl.vertexAttribPointer(attLocation, 3, gl.FLOAT, false, 0, 0);

  const m = new matIV();

  let mMatrix = m.build();
  let vMatrix = m.build();
  let pMatrix = m.build();
  let mvpMatrix = m.build();

  vMatrix = m.lookAt([0.0, 1.0, 3.0],[0, 0, 0], [0, 1, 0], vMatrix);
  pMatrix = m.perspective(90, canvas.width / canvas.height, 0.1, 100, pMatrix);

  // p -> v -> m
  m.multiply(pMatrix, vMatrix , mvpMatrix);
  m.multiply(mvpMatrix, mMatrix, mvpMatrix);

  const uniLocation = gl.getUniformLocation(program, 'mvpMatrix');
  gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.flush();
}


function createShader(id) {
  const scriptElement = document.getElementById(id);

  const shader =
    scriptElement.type === "x-shader/x-vertex"
      ? gl.createShader(gl.VERTEX_SHADER)
      : gl.createShader(gl.FRAGMENT_SHADER);


  // 生成されたシェーダにソースを割り当てる
  gl.shaderSource(shader, scriptElement.text);
  gl.compileShader(shader);

  return shader;
}

function createProgram(vs, fs){
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.useProgram(program);
  return program;
}

function createVBO(array) {
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return vbo;
}
