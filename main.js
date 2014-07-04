function lidx(i, j, k, ni , nj){
    // Returns linear index where loop order (outer to inner) is k, i, j
    return (ni*nj*k) + ni*j + i;
}

function coord(idx,ni,nj){
    // Returns i,j,k
    var result = [];
    var N = ni*nj;
    var lmod = idx % N;
    result.push(lmod % ni);
    result.push(lmod / ni);
    result.push(idx / N);
    return result;
}

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
    cam.position.z = 25;
    controls.addEventListener('change', render);


    var geometry = new THREE.SphereGeometry(0.25, 32, 32);

    var material = new THREE.MeshBasicMaterial({color: 0xff0000});
    draw_node(0,0,0); draw_node(1,0,0); draw_node(0,1,0);

    var nodes = []
    
    var cnt = 0;
    for(var i = 5; i < 7; i++)
	for(var j = 5; j < 7; j++)
	    for(var k = 5; k < 7; k++, cnt++){
		var node = new Node;
		node.position.x = i;
		node.position.y = j;
		node.position.z = k;
		nodes.push(node)
		drawNode(node);
	    }



    function drawNode(node){
	var draw_object = 
	    new THREE.Mesh(
		geometry, 
		new THREE.MeshBasicMaterial({color: 0x009ACD}));
	draw_object.position.x = node.position.x;
	draw_object.position.y = node.position.y;
	draw_object.position.z = node.position.z;
	node.data.draw_object = draw_object
	scene.add(draw_object);
    }
    

    function drawEdge(source, target){
	var draw_object = 
	    new THREE.LineBasicMaterial(
		{color:0xff0000, opacity: 1, linewidth: 0.5});

	var tmp_geo = new THREE.Geometry();
	tmp_geo.verticies.push(source.data.draw_object.position);
	tmp_geo.verticies.push(target.data.draw_object.position);

	line = new THREE.Line(tmp_geo, material, THREE.LinePieces);
	line.scale.x = line.scale.y = line.scale.z = 1;
	line.originalScale = 1;
	
	// geometries.push(tmp_geo);
	scene.add(line);
    }
    function draw_node(x, y, z, idx){
	var node_obj = new THREE.Mesh(geometry, material);
	node_obj.position.x = x
	node_obj.position.y = y
	node_obj.position.z = z;
	scene.add(node_obj);
    }

    // function draw_edge(){
    // }

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


