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

// function graph1(){
//     var graph = new Graph

//     var ni = 20, nj = 20, nk = 20;

//     for(var k = 0; k < nk; k++)
// 	for(var i = 0; i < ni; i++)
// 	    for(var j = 0; j  < nj; j++){
// 		console.log("creating node " + i.toString() +
// 			    ", " + j.toString() + ", " + k.toString() + ")");
// 		var node = new Node(lidx(i,j,k,ni,nj));
// 		if(graph.addNode(node)){
// 		    node.data.title = "this is node (" + i.toString() + 
// 			", " + j.toString() + ", " k.toString() + ")";
// 		    nodes.push(node);
// 		}
// 	    }

//     for(var k = 1; k < nk-1; k++)
// 	for(var i = 1; i < ni-1; i++)
// 	    for(var j = 1; j < nj-1; j++){

// 		var target_idx = lidx(i,j,k,ni,nj);
// 		var neigh_idx = [];
// 		neigh_idx.push(lidx(i,j-1,k,ni,nj));//down
// 		neigh_idx.push(lidx(i,j+1,k,ni,nj));//up
// 		neigh_idx.push(lidx(i-1,j,k,ni,nj));//left
// 		neigh_idx.push(lidx(i+1,j,k,ni,nj));//right
// 		neigh_idx.push(lidx(i,j,k+1,ni,nj));//forward
// 		neigh_idx.push(lidx(i,j,k-1,ni,nj));//back
		
// 		for(var n = 0; n < neigh_idx.length; n++){
// 		    graph.addEdge(graph.getNode([target_idx]), graph.getNode([neigh_idx[n]]));
// 		}
// 	    }
// }




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
    var geometry = new THREE.SphereGeometry(0.25, 32, 32);
    // var edge_geometry = new
    var material = new THREE.MeshBasicMaterial({color: 0xff0000});
    // var sphere = new THREE.Mesh(geometry, material);
    draw_node(0,0,0); draw_node(1,0,0); draw_node(0,1,0);

    // scene.add(sphere);

    // var sphere2 = new THREE.Mesh(geometry, material)
    // sphere2.position.x = 5;
    // sphere2.position.y = 5;
    // scene.add(sphere2)
    function draw_node(x, y, z){
	var node_obj = new THREE.Mesh(geometry, material);
	node_obj.position.x = x
	node_obj.position.y = y
	node_obj.position.z = z;
	scene.add(node_obj);
    }

    function draw_edge(){
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


