var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT);
camera.position.z = 4.5;
camera.position.x = -1.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);
scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

//Se definen los vertices del dodecaedro a apartir de un arreglo
const vertices = [
  [-1, 1, 1],
  [1, 1, 1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, -1, -1],
  [-1, -1, -1],
  [0, (1 + Math.sqrt(5)) / 2, 0],
  [0, -(1 + Math.sqrt(5)) / 2, 0],
  [(1 + Math.sqrt(5)) / 2, 0, 0],
  [-(1 + Math.sqrt(5)) / 2, 0, 0]
];

// Se definen los índices de los triángulos que conforman las caras del dodecaedro
const indices = [
  0, 11, 5,    0, 5, 1,    0, 1, 7,    0, 7, 10,    0, 10, 11,
  1, 5, 9,    5, 11, 4,   11, 10, 2,   10, 7, 6,    7, 1, 8,
  3, 9, 4,    3, 4, 2,    3, 2, 6,    3, 6, 8,     3, 8, 9,
  4, 9, 5,    2, 4, 11,   6, 2, 10,   8, 6, 7,    9, 8, 1
];

// Creamos la geometría y el material del dodecaedro
const geometry = new THREE.Geometry();
geometry.vertices = vertices.map(v => new THREE.Vector3(v[0], v[1], v[2]));
geometry.faces = indices.map(triangle => new THREE.Face3(triangle[0], triangle[1], triangle[2]));

const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

// Generamos la malla del dodecaedro
const dodecahedron = new THREE.Mesh(geometry, material);

// Añadimos la malla a la escena
scene.add(dodecahedron);


//Aplicacion de luz 
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);

const size = 150;
const divisions = 160;
//Creación de ejes
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);
//Creacion de la grilla
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);
//Funcion para renderizar
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();