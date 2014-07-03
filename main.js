function main(){
    var scene    = new THREE.Scene();
    var cam      = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    cam.position.z = 25;

    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var material = new THREE.MeshDepthMaterial({wireframe: true});
    // var sphere   = new THREE.Mesh(geometry, material);
    var particle_system = new THREE.ParticleSystem(geometry, material);
    // scene.add(sphere);
    scene.add(particle_system);

    // var geometry = new THREE.SphereGeometry(5, 32, 32);

    // var material = new THREE.MeshDepthMaterial({color: THREE.color("rgb(255,0,0)")})

    function render(){
	renderer.render(scene, cam);
    }
    render();
}
