//import "minMatrix"

let gl;

function start() {
  const canvas = document.getElementById("gl_canvas");
  gl = canvas.getContext("webgl");

  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  const v_shader = createShader('vs');
  const f_shader = createShader('fs');

  const program = createProgram(v_shader, f_shader);
  // v3
  const positionAttr = gl.getAttribLocation(program, 'position');
  // v4
  const colorAttr = gl.getAttribLocation(program, 'color');


  const vertexPosition = [
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    0.0, -1.0,  0.0
  ];

  const vertexColor = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0
  ];

  const index = [
    0,1,2,
    1,2,3
  ];

  const positionVBO = createVBO(vertexPosition);
  const colorVBO = createVBO(vertexColor);

  setAttribute([positionVBO, colorVBO], [positionAttr, colorAttr], [3,4]);

  const ibo = createIBO(index);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

  const uniLocation = gl.getUniformLocation(program, 'mvpMatrix');

  const m = new matIV();

  let mMatrix = m.build();
  let vMatrix = m.build();
  let pMatrix = m.build();
  let tmpMatrix = m.build();
  let mvpMatrix = m.build();

  m.lookAt([0.0, 1.0, 3.0],[0, 0, 0], [0, 1, 0], vMatrix);
  m.perspective(90, canvas.width / canvas.height, 0.1, 100, pMatrix);
  m.multiply(pMatrix, vMatrix, tmpMatrix);

  let count = 0;

  (function(){
    // canvasを初期化
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // カウンタをインクリメントする
    count++;

    // カウンタを元にラジアンを算出
    const rad = (count % 360) * Math.PI / 180;

    // モデル座標変換行列の生成(Y軸による回転)
    m.identity(mMatrix);
    m.rotate(mMatrix, rad, [0, 1, 0], mMatrix);
    m.multiply(tmpMatrix, mMatrix, mvpMatrix);
    gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

    // インデックスを用いた描画命令
    gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);

    // コンテキストの再描画
    gl.flush();

    // ループのために再帰呼び出し
    setTimeout(arguments.callee, 1000 / 30);
  })();
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

// VBOをバインドし登録する関数
function setAttribute(vboArr, attLocationArr, attSizeArr) {
  for(let index in vboArr){
    gl.bindBuffer(gl.ARRAY_BUFFER, vboArr[index]);
    gl.enableVertexAttribArray(attLocationArr[index]);
    gl.vertexAttribPointer(attLocationArr[index], attSizeArr[index], gl.FLOAT, false, 0, 0);
  }
}


function createIBO(array) {
  const ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(array), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return ibo;
}
