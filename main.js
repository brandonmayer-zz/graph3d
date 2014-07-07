function lidx(i, j, k, ni , nj){
    // Returns linear index where loop order (outer to inner) is k, j, i
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

    var graph = new Graph();
    var ni = 5, nj = 5, nk = 5;
    var cnt = 0;
    for(var k = 0; k < nk; ++k)
	for(var j = 0; j < nj; ++j)
	    for(var i = 0; i < ni; ++i){
		var node = new Node(cnt);
		node.position.x = i;
		node.position.y = j;
		node.position.z = k;
		graph.addNode(node);
		drawNode(node);
	    }

    
    // var n1 = graph.getNode(0);
    // var n2 = graph.getNode(1);
    // log_position(n1); 
    // log_position(n2);
    // log_position(n2);
    // drawEdge(n1, n2);
    // cnt = 0
    // for(var k = 1; k < nk; ++k)
    // 	for(var j = 1; j < nj; ++j)
    // 	    for(var i = 1; i < ni; ++i){
    // 		var itarget = lidx(i,j,k,ni,nj);
    // 		var iup = lidx(i,j+1,k,ni,nj);
    // 		target = graph.getNode(itarget);
    // 		up = graph.getNode(iup);
    // 		drawEdge(target,up);
		
		
    // 	    }


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
  
    // function drawEdge(source, target){
    // 	var draw_object = 
    // 	    new THREE.LineBasicMaterial(
    // 		{color:0xff0000, opacity: 1, linewidth: 0.5});

    // 	var tmp_geo = new THREE.Geometry();
    // 	tmp_geo.vertices.push(source.data.draw_object.position);
    // 	tmp_geo.vertices.push(target.data.draw_object.position);

    // 	line = new THREE.Line(tmp_geo, material, THREE.LinePieces);
    // 	line.scale.x = line.scale.y = line.scale.z = 1;
    // 	line.originalScale = 1;
	
    // 	scene.add(line);
    // }

    function log_position(node){

	var str = "node = {";
	// str += node.position.x.toString() + ", ";
	// str += node.position.y.toString() + ", ";
	// str += node.position.z.toString() + "}";
	console.log(node.position.x.toString());
	
	console.log(str);
    }

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


