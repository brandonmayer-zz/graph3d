function main(){

    var scene    = new THREE.Scene();
    var cam      = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);


    controls = new THREE.TrackballControls(cam);
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 5.2;
    controls.panSpeed = 1;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    controls.addEventListener('change', render);

    cam.position.z = 25;
    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var material = new THREE.MeshBasicMaterial({color: 0xff0000});
    var sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    var sphere2 = new THREE.Mesh(geometry, material)
    sphere2.position.x = 5;
    sphere2.position.y = 5;
    scene.add(sphere2)

    document.body.appendChild(renderer.domElement);
    animate();
    
    function animate(){
	requestAnimationFrame(animate);
	controls.update();
	render();	
    }


    function render(){
	renderer.render(scene, cam);
    }
    render();
}
