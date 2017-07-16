var scene, camera, renderer;
var geometry, material, mesh;
// var controls;

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    geometry = new THREE.IcosahedronGeometry( 400, 1 );
    material = new THREE.MeshBasicMaterial( { color: 0xAAAAAA, wireframe: true } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( window.innerWidth, window.innerHeight );

    // controls = new THREE.OrbitControls( camera, renderer.domElement );
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.25;
    // controls.enableZoom = false;

    document.body.appendChild( renderer.domElement );
    
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
}


function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX ) * 1;
    mouseY = ( event.clientY - windowHalfY ) * 1;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {
    requestAnimationFrame( animate );
    
    // controls.update();

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.010;

    render();
}

function render() {
    // var time = Date.now() * 0.001;
    // var rx = Math.sin( time * 0.7 ) * 0.5,
    // ry = Math.sin( time * 0.3 ) * 0.5,
    // rz = Math.sin( time * 0.2 ) * 0.5;
    
    camera.position.x += ( mouseX - camera.position.x ) * .055;
    camera.position.y += ( - mouseY - camera.position.y ) * .055;
    camera.lookAt( scene.position );
    
    // group.rotation.x = rx;
    // group.rotation.y = ry;
    // group.rotation.z = rz;
    renderer.render( scene, camera );
}
