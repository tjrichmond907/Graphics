
var canvas;
var gl;

var program;

var near = 1;
var far = 100;


var left = -6.0;
var right = 6.0;
var ytop =6.0;
var bottom = -6.0;


var lightPosition2 = vec4(100.0, 100.0, 100.0, 1.0 );
var lightPosition = vec4(0.0, 0.0, 100.0, 1.0 );

var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialSpecular = vec4( 0.4, 0.4, 0.4, 1.0 );
var materialShininess = 30.0;

var ambientColor, diffuseColor, specularColor;

var modelMatrix, viewMatrix, modelViewMatrix, projectionMatrix, normalMatrix;
var modelViewMatrixLoc, projectionMatrixLoc, normalMatrixLoc;
var eye;
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

var RX = 0;
var RY = 0;
var RZ = 0;

var MS = []; // The modeling matrix stack
var TIME = 0.0; // Realtime
var dt = 0.0
var prevTime = 0.0;
var resetTimerFlag = true;
var animFlag = false;
var controller;

// These are used to store the current state of objects.
// In animation it is often useful to think of an object as having some DOF
// Then the animation is simply evolving those DOF over time.


var groundRotation = [0,0,0];
var groundPosition = [0,-6,0];

//initiate the rocks-------------------------------
//initiate the first rock
var rock1Rotation =[0,0,0];
var rock1Position = [0,-4, 0];

//initiate the scond rock
var rock2Rotation =[0,0,0];
var rock2Position = [-1.5,-4.25,0];


//initiate the kelp--------------------------------
//initiate kelp leaves on rock1
var leaf1Rotation = [0,0,0];
var leaf1Position = [0,0,0];
//var leaf1Position = [0,0,0];

var leaf2Rotation = [0,0,0];
var leaf2Position = [0,0,0];

var leaf3Rotation = [0,0,0];
var leaf3Position = [0,0,0];

var leaf4Rotation = [0,0,0];
var leaf4Position = [0,0,0];

var leaf5Rotation = [0,0,0];
var leaf5Position = [0,0,0];

var leaf6Rotation = [0,0,0];
var leaf6Position = [0,0,0];

var leaf7Rotation = [0,0,0];
var leaf7Position = [0,0,0];

var leaf8Rotation = [0,0,0];
var leaf8Position = [0,0,0];

var leaf9Rotation = [0,0,0];
var leaf9Position = [0,0,0];

var leaf10Rotation = [0,0,0];
var leaf10Position = [0,0,0];

var leaf11Rotation = [0,0,0];
var leaf11Position = [0,0,0];
//var leaf11Position = [0,0,0];

var leaf12Rotation = [0,0,0];
var leaf12Position = [0,0,0];

var leaf13Rotation = [0,0,0];
var leaf13Position = [0,0,0];

var leaf14Rotation = [0,0,0];
var leaf14Position = [0,0,0];

var leaf15Rotation = [0,0,0];
var leaf15Position = [0,0,0];

var leaf16Rotation = [0,0,0];
var leaf16Position = [0,0,0];

var leaf17Rotation = [0,0,0];
var leaf17Position = [0,0,0];

var leaf18Rotation = [0,0,0];
var leaf18Position = [0,0,0];

var leaf19Rotation = [0,0,0];
var leaf19Position = [0,0,0];

var leaf20Rotation = [0,0,0];
var leaf20Position = [0,0,0];

var leaf21Rotation = [0,0,0];
var leaf21Position = [0,0,0];
//var leaf21Position = [0,0,0];

var leaf22Rotation = [0,0,0];
var leaf22Position = [0,0,0];

var leaf23Rotation = [0,0,0];
var leaf23Position = [0,0,0];

var leaf24Rotation = [0,0,0];
var leaf24Position = [0,0,0];

var leaf25Rotation = [0,0,0];
var leaf25Position = [0,0,0];

var leaf26Rotation = [0,0,0];
var leaf26Position = [0,0,0];

var leaf27Rotation = [0,0,0];
var leaf27Position = [0,0,0];

var leaf28Rotation = [0,0,0];
var leaf28Position = [0,0,0];

var leaf29Rotation = [0,0,0];
var leaf29Position = [0,0,0];

var leaf30Rotation = [0,0,0];
var leaf30Position = [0,0,0];

var strand_1 = [leaf1Position, leaf2Position, leaf3Position, leaf4Position,
                leaf5Position, leaf6Position, leaf7Position, leaf8Position,
                leaf9Position, leaf10Position
                ];

var strand_2 = [leaf11Position, leaf12Position, leaf13Position, leaf14Position,
                leaf15Position, leaf16Position, leaf17Position, leaf18Position,
                leaf19Position, leaf20Position
                ];

var strand_3 = [leaf21Position, leaf22Position, leaf23Position, leaf24Position,
                leaf25Position, leaf26Position, leaf27Position, leaf28Position,
                leaf29Position, leaf30Position
                ];

var strand_1R = [leaf1Rotation, leaf2Rotation, leaf3Rotation, leaf4Rotation,
            leaf5Rotation, leaf6Rotation, leaf7Rotation, leaf8Rotation,
            leaf9Rotation, leaf10Rotation
            ];

var strand_2R = [leaf11Rotation, leaf12Rotation, leaf13Rotation, leaf14Rotation,
             leaf15Rotation, leaf16Rotation, leaf17Rotation, leaf18Rotation,
             leaf19Rotation, leaf20Rotation
            ];

var strand_3R = [leaf21Rotation, leaf22Rotation, leaf23Rotation, leaf24Rotation,
             leaf25Rotation, leaf26Rotation, leaf27Rotation, leaf28Rotation,
             leaf29Rotation, leaf30Rotation
            ];
//-------------END KELP-------------------------

//rename to fishbody
var coneRotation = [0,0,0];
var conePosition = [0,0,0];

//rename to fishface
var cone2Rotation =[0,0,0];
var cone2Position = [0,0,0];

var topFinRotation = [0,0,0];
var topFinPosition = [0,0,0];

var bottomFinRotation = [0,0,0];
var bottomFinPosition = [0,0,0];

//viewer right
var rightEyeRotation = [0,0,0];
var rightEyePosition = [0,0,0];

//veiwer left
var leftEyeRotation = [0,0,0];
var leftEyePosition = [0,0,0];

//viewer right
var rightPupilRotation = [0,0,0];
var rightPupilPosition = [0,0,0];

//veiwer left
var leftPupilRotation = [0,0,0];
var leftPupilPosition = [0,0,0];

//Diver Variables

var diverBodyRotation = [0,0,0];
var diverBodyPosition = [0,0,0];

var diverHeadRotation = [0,0,0];
var diverHeadPosition = [0,0,0];

//LEGS
var cubeRotation = [0,0,0];
var cubePosition = [0,0,0];

var cube2Rotation = [0,0,0];
var cube2Position = [0,0,0];

var cube3Rotation = [0,0,0];
var cube3Position = [0,0,0];

var cube4Rotation = [0,0,0];
var cube4Position = [0,0,0];

var cube5Rotation = [0,0,0];
var cube5Position = [0,0,0];

var cube6Rotation = [0,0,0];
var cube6Position = [0,0,0];
//-----


var flag = 1;

// Setting the colour which is needed during illumination of a surface
function setColor(c)
{
    ambientProduct = mult(lightAmbient, c);
    diffuseProduct = mult(lightDiffuse, c);
    specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniform4fv( gl.getUniformLocation(program,
                                         "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
                                         "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
                                         "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
                                         "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program,
                                        "shininess"),materialShininess );
}

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5, 0.5, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    setColor(materialDiffuse);

	// Initialize some shapes, note that the curved ones are procedural which allows you to parameterize how nice they look
	// Those number will correspond to how many sides are used to "estimate" a curved surface. More = smoother
    Cube.init(program);
    Cylinder.init(20,program);
    Cone.init(20,program);
    Sphere.init(36,program);

    // Matrix uniforms
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    // Lighting Uniforms
    gl.uniform4fv( gl.getUniformLocation(program,
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "specularProduct"),flatten(specularProduct) );
    gl.uniform4fv( gl.getUniformLocation(program,
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program,
       "shininess"),materialShininess );


    document.getElementById("animToggleButton").onclick = function() {
        if( animFlag ) {
            animFlag = false;
        }
        else {
            animFlag = true;
            resetTimerFlag = true;
            window.requestAnimFrame(render);
        }
        //console.log(animFlag);

		controller = new CameraController(canvas);
		controller.onchange = function(xRot,yRot) {
			RX = xRot;
			RY = yRot;
			window.requestAnimFrame(render); };
    };

    render(0);
}

// Sets the modelview and normal matrix in the shaders
function setMV() {
    modelViewMatrix = mult(viewMatrix,modelMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    normalMatrix = inverseTranspose(modelViewMatrix);
    gl.uniformMatrix4fv(normalMatrixLoc, false, flatten(normalMatrix) );
}

// Sets the projection, modelview and normal matrix in the shaders
function setAllMatrices() {
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix) );
    setMV();
}

// Draws a 2x2x2 cube center at the origin
// Sets the modelview matrix and the normal matrix of the global program
// Sets the attributes and calls draw arrays
function drawCube() {
    setMV();
    Cube.draw();
}

// Draws a sphere centered at the origin of radius 1.0.
// Sets the modelview matrix and the normal matrix of the global program
// Sets the attributes and calls draw arrays
function drawSphere() {
    setMV();
    Sphere.draw();
}

// Draws a cylinder along z of height 1 centered at the origin
// and radius 0.5.
// Sets the modelview matrix and the normal matrix of the global program
// Sets the attributes and calls draw arrays
function drawCylinder() {
    setMV();
    Cylinder.draw();
}

// Draws a cone along z of height 1 centered at the origin
// and base radius 1.0.
// Sets the modelview matrix and the normal matrix of the global program
// Sets the attributes and calls draw arrays
function drawCone() {
    setMV();
    Cone.draw();
}

// Post multiples the modelview matrix with a translation matrix
// and replaces the modeling matrix with the result
function gTranslate(x,y,z) {
    modelMatrix = mult(modelMatrix,translate([x,y,z]));
}

// Post multiples the modelview matrix with a rotation matrix
// and replaces the modeling matrix with the result
function gRotate(theta,x,y,z) {
    modelMatrix = mult(modelMatrix,rotate(theta,[x,y,z]));
}

// Post multiples the modelview matrix with a scaling matrix
// and replaces the modeling matrix with the result
function gScale(sx,sy,sz) {
    modelMatrix = mult(modelMatrix,scale(sx,sy,sz));
}

// Pops MS and stores the result as the current modelMatrix
function gPop() {
    modelMatrix = MS.pop();
}

// pushes the current modelViewMatrix in the stack MS
function gPush() {
    MS.push(modelMatrix);
}


function render(timestamp) {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3(0,0,10);
    MS = []; // Initialize modeling matrix stack

	// initialize the modeling matrix to identity
    modelMatrix = mat4();

    // set the camera matrix
    viewMatrix = lookAt(eye, at , up);

    // set the projection matrix
    projectionMatrix = ortho(left, right, bottom, ytop, near, far);


    // set all the matrices
    setAllMatrices();

	if( animFlag )
    {
		// dt is the change in time or delta time from the last frame to this one
		// in animation typically we have some property or degree of freedom we want to evolve over time
		// For example imagine x is the position of a thing.
		// To get the new position of a thing we do something called integration
		// the simpelst form of this looks like:
		// x_new = x + v*dt
		// That is the new position equals the current position + the rate of of change of that position (often a velocity or speed), times the change in time
		// We can do this with angles or positions, the whole x,y,z position or just one dimension. It is up to us!
		dt = (timestamp - prevTime) / 1000.0;
		prevTime = timestamp;
	}



//ground placement
gPush();
  gTranslate(groundPosition[0], groundPosition[1], groundPosition[2]);
  gPush();
  gScale(8,1.25,0);
  gPush();
  {
    setColor(vec4(0.0,0.0,0.0,1.0));
    drawCube();
  }
    gPop();
  gPop();
gPop();


// rocks and associated function
function drawRock(rockLoc, scale){
  gPush();
  gTranslate(rockLoc[0], rockLoc[1], rockLoc[2]);
  gPush();
  gScale(scale, scale, scale);
  gPush();
  {
    setColor(vec4(0.3, 0.3, 0.3, 0.3));
    drawSphere();
  }
  gPop();
  gPop();
  gPop();

}
  drawRock(rock1Position, 0.75);
  drawRock(rock2Position, 0.5);


//---kelp---
function drawKelp(kStr, kRot, pos){
  var a = 2.25;
  var w = 0.001;
  var h = 0.005;

  for(var i = 0; i<kStr.length; i++){

    if(i == 0){
      gPush()
      gTranslate(kStr[i][0], kStr[i][1], kStr[i][2]);
      gPush();
      {
      setColor(vec4(0.0, 0.4, 0.0, 0.0));
      gTranslate(pos[0], pos[1], pos[2]);
      pos[1] = pos[1]+0.5;
      gScale(0.1, 0.25, 0.1);
      drawSphere();
      }
      gPop();
      gPop();
    } else{


    gPush()
    gTranslate(kStr[i][0], kStr[i][1], kStr[i][2]);
    gPush();
    {
    setColor(vec4(0.0, 0.4, 0.0, 0.0));
    kRot[i][2] = a * Math.cos(w * timestamp + h);
    w = w-0.001;
    h = h-0.001;
    a = a - 0.02;
    gRotate(kRot[i][2], 1,0,1);
    gTranslate(pos[0], pos[1], pos[2]);
    pos[1] = pos[1]+0.5;
    gScale(0.1, 0.25, 0.1);
    drawSphere();
    }
    gPop();
    gPop();
    }
  }
}

drawKelp(strand_1, strand_1R,[0,-3,0]);
drawKelp(strand_2, strand_2R,[0.8,-3.8,0]);
drawKelp(strand_3, strand_3R,[-0.8,-3.8,0]);

//----------------DRAWING THE FISH COMPONENTS-----------------
//-----fishbody
	gPush();
		gTranslate(conePosition[0],conePosition[1],conePosition[2]);
		gPush();


		{
			setColor(vec4(0.5,0.0,0.0,0.0));

			coneRotation[1] = coneRotation[1] + 40*dt;
			gRotate(coneRotation[1],0,-1,0);
      gPush();
      {
      conePosition[1] = 0.4*Math.cos( 0.002*timestamp +0.05);
      gRotate(conePosition[1], 0,1,0);
      }

      gScale(0.5,0.5,2)
      gTranslate(3,-4,0);
      gPush();
      gRotate(180, coneRotation[0], coneRotation[1], coneRotation[2]);
      gPush();

			drawCone();
		}

		gPop();
	gPop();
  gPop();
  gPop();
  gPop();
//----- face
  gPush();
  gTranslate(cone2Position[0], cone2Position[1], cone2Rotation[2]);
  gPush();

  {
    setColor(vec4(0.6, 0.6, 0.6, 0.6));

    cone2Rotation[1] = cone2Rotation[1] +40*dt;
    gRotate(cone2Rotation[1], 0,-1,0);
    gPush();
    {
    cone2Position[1] = 0.4*Math.cos( 0.002*timestamp +0.05);
    gRotate(cone2Position[1], 0,1,0);
    }
    gScale(0.5, 0.5, 0.5);
    gTranslate(3,-4,2.5);
    gPush();
    drawCone();

    }
    gPop();
    gPop();
    gPop();
    gPop();

//----- topfin
  gPush();
  gTranslate(topFinPosition[0], topFinPosition[1], topFinPosition[2]);
  gPush();

  {
    setColor(vec4(0.5, 0.0, 0.0, 0.0));

    topFinRotation[1] = topFinRotation[1] +40*dt;
    gRotate(topFinRotation[1], 0, -1, 0);
    gPush();
    {
    topFinPosition[1] = 0.4*Math.cos( 0.002*timestamp +0.05);
    gRotate(topFinPosition[1], 0,1,0);

    }
    gTranslate(1.55, -1.7, -1.2);
    gRotate(125, -1,0,0);
    {
      topFinPosition[0] = 0.1*Math.cos(0.01*timestamp+0.5);
      gRotate(topFinPosition[0], 1,0,0);
    }
    gScale(0.15, 0.15, 0.75);
    gPush();
    drawCone();

  }
  gPop();
  gPop();
  gPop();
  gPop();

//-----bottomfin
gPush();
gTranslate(bottomFinPosition[0], bottomFinPosition[1], bottomFinPosition[2]);
gPush();

{
  setColor(vec4(0.5, 0.0, 0.0, 0.0));

  bottomFinRotation[1] = bottomFinRotation[1] +40*dt;
  gRotate(bottomFinRotation[1], 0, -1, 0);
  gPush();
  {
  bottomFinPosition[1] = 0.4*Math.cos( 0.002*timestamp +0.05);
  gRotate(bottomFinPosition[1], 0,1,0);
  }
  gTranslate(1.55, -2.2, -1.2);
  gRotate(125, 1,0,0);
{
  bottomFinPosition[0] = 0.1*Math.cos(0.01*timestamp+0.5);
  gRotate(bottomFinPosition[0], 1,0,0);
}
  gScale(0.15, 0.15, 0.5);
  gPush();
  drawCone();
}
gPop();
gPop();
gPop();
gPop();

//veiwer right eye

gPush();
gTranslate(rightEyePosition[0], rightEyePosition[1], rightEyePosition[2]);
gPush();
{
  setColor(vec4(1.0, 1.0, 1.0, 1.0));
  rightEyeRotation[1] = rightEyeRotation[1] + 40*dt;
  gRotate(rightEyeRotation[1], 0, -1, 0);
  gPush();
  {
  rightEyePosition[1] = 0.4*Math.cos( 0.002*timestamp +0.05);
  gRotate(rightEyePosition[1], 0,1,0);
  }
  gTranslate(1.75, -1.75, 1.2);
  gScale(0.1, 0.1, 0.1);
  gPush();
  drawSphere();
}
gPop();
gPop();
gPop();
gPop();

//viewer left left eye
gPush();
gTranslate(leftEyePosition[0], leftEyePosition[1], leftEyePosition[2]);
gPush();
{
  setColor(vec4(1.0, 1.0, 1.0, 1.0));
  leftEyeRotation[1] = leftEyeRotation[1] + 40*dt;
  gRotate(leftEyeRotation[1], 0, -1, 0);
  gPush();
  {
  leftEyePosition[1] = 0.4*Math.cos( 0.002*timestamp +0.05);
  gRotate(leftEyePosition[1], 0,1,0);
  }
  gTranslate(1.3, -1.75, 1.2);
  gScale(0.1, 0.1, 0.1);
  gPush();
  drawSphere();
}
gPop();
gPop();
gPop();
gPop();

//veiwer right pupil
gPush();
gTranslate(rightPupilPosition[0], rightPupilPosition[1], rightPupilPosition[2]);
gPush();
{
  setColor(vec4(0.0, 0.0, 0.0, 0.0));
  rightPupilRotation[1] = rightPupilRotation[1] + 40*dt;
  gRotate(rightPupilRotation[1], 0, -1, 0);
  gPush();
  {
  rightPupilPosition[1] = 0.4*Math.cos( 0.002*timestamp +0.05);
  gRotate(rightPupilPosition[1], 0,1,0);
  }
  gTranslate(1.75, -1.75, 1.28);
  gScale(0.05, 0.05, 0.05);
  gPush();
  drawSphere();
}
gPop();
gPop();
gPop();
gPop();

//viewer left left pupil
gPush();
gTranslate(leftPupilPosition[0], leftPupilPosition[1], leftPupilPosition[2]);
gPush();
{
  setColor(vec4(0.0, 0.0, 0.0, 0.0));
  leftPupilRotation[1] = leftPupilRotation[1] + 40*dt;
  gRotate(leftPupilRotation[1], 0, -1, 0);
  gPush();
  {
  leftPupilPosition[1] = 0.4*Math.cos( 0.002*timestamp +0.05);
  gRotate(leftPupilPosition[1], 0,1,0);
  }
  gTranslate(1.3, -1.75, 1.28);
  gScale(0.05, 0.05, 0.05);
  gPush();
  drawSphere();
}
gPop();
gPop();
gPop();
gPop();


//---------------------DRAWING THE DIVER COMPONENTS------------------------
//diver body

gPush();
gTranslate(diverBodyPosition[0], diverBodyPosition[1], diverBodyPosition[2]);
gPush();

{
  setColor(vec4(1.0, 0.0, 1.0, 0.0));
  gRotate(90, 1, 0,0 );

  {
    if(flag == 1){
    if(diverBodyPosition[0] > 0.3 && diverBodyPosition[1] > 0.5){
      flag = 0;
    } else {
    diverBodyPosition[1] = diverBodyPosition[1] + 0.17 * dt;
    diverBodyPosition[0] = diverBodyPosition[0] + 0.1 * dt;
    gTranslate(diverBodyPosition[0], diverBodyPosition[1], diverBodyPosition[2]);
      }
    } else if (flag == 0) {
      if(diverBodyPosition[0] < -0.25 && diverBodyPosition[1] < -0.5) {
        flag = 1;
      } else {
      diverBodyPosition[1] = diverBodyPosition[1] - 0.17 * dt;
      diverBodyPosition[0] = diverBodyPosition[0] - 0.1 * dt;
      gTranslate(diverBodyPosition[0], diverBodyPosition[1], diverBodyPosition[2]);
      }
    }
  }
  gTranslate(3.5, 2, 0);
  gScale(0.9,1,1.5);
  gPush();
  drawCylinder();
}
gPop();
gPop();
gPop();


//diver head

gPush();
gTranslate(diverHeadPosition[0], diverHeadPosition[1], diverHeadPosition[2]);
gPush();
{
  setColor(vec4(1.0, 0.0, 1.0, 0.0));
  {
    if(flag == 1){
    if(diverHeadPosition[0] > 0.3 && diverHeadPosition[1] > 0.3){
      flag = 0;
    } else {
    diverHeadPosition[1] = diverHeadPosition[1] + 0.08 * dt;
    diverHeadPosition[0] = diverHeadPosition[0] + 0.1 * dt;
    gTranslate(diverHeadPosition[0], diverHeadPosition[1], diverHeadPosition[2]);
      }
    } else if (flag == 0) {
      if(diverHeadPosition[0] < -0.3 && diverHeadPosition[1] < -0.3) {
        flag = 1;
      } else {
      diverHeadPosition[1] = diverHeadPosition[1] - 0.08 * dt;
      diverHeadPosition[0] = diverHeadPosition[0] - 0.1 * dt;
      gTranslate(diverHeadPosition[0], diverHeadPosition[1], diverHeadPosition[2]);
      }
    }
  }
  gTranslate(3.5, 1, 0);
  gScale(0.4,0.4, 0.4);
  gPush();
  drawSphere();
}
gPop();
gPop();
gPop();


//-------------------LEG 1---------------------------------------
//---- Topleg
	gPush();
		gTranslate(cubePosition[0],cubePosition[1],cubePosition[2]);
		gPush();
		{
			setColor(vec4(1.0, 0.0, 1.0, 0.0));
      gRotate(15, 1,0,0);
      gRotate(-30, 0,1,0);
      gRotate(5, 0,0,1);
      {
        if(flag == 1){
        if(cubePosition[0] > 0.3 && cubePosition[1] > 0.3){
          flag = 0;
        } else {
        cubePosition[1] = cubePosition[1] + 0.1 * dt;
        cubePosition[0] = cubePosition[0] + 0.1 * dt;
        gTranslate(cubePosition[0], cubePosition[1], cubePosition[2]);
          }
        } else if (flag == 0) {
          if(cubePosition[0] < -0.3 && cubePosition[1] < -0.3) {
            flag = 1;
          } else {
          cubePosition[1] = cubePosition[1] - 0.1 * dt;
          cubePosition[0] = cubePosition[0] - 0.1 * dt;
          gTranslate(cubePosition[0], cubePosition[1], cubePosition[2]);
          }
        }
      }

    {
        cubeRotation[0] = 35 * Math.cos(0.0005 * timestamp + 0.025);
        gRotate(cubeRotation[0], 1,0,0);
     }

      gTranslate(4,-1,0);
      gScale(0.1, 0.4, 0.1);
			drawCube();
		}

		gPop();
	gPop();

//bottomleg
  gPush();
    gTranslate(cube2Position[0], cube2Position[1], cube2Position[2]);
    gPush();
    {
      setColor(vec4(1.0, 0.0, 1.0, 0.0));
      gRotate(15, 1,0,0);
      gRotate(-30, 0,1,0);
      gRotate(5, 0,0,1);

      {
        if(flag == 1){
        if(cube2Position[0] > 0.3 && cube2Position[1] > 0.3){
          flag = 0;
        } else {
        cube2Position[1] = cube2Position[1] + 0.1 * dt;
        cube2Position[0] = cube2Position[0] + 0.1 * dt;
        gTranslate(cube2Position[0], cube2Position[1], cube2Position[2]);
          }
        } else if (flag == 0) {
          if(cube2Position[0] < -0.3 && cube2Position[1] < -0.3) {
            flag = 1;
          } else {
          cube2Position[1] = cube2Position[1] - 0.1 * dt;
          cube2Position[0] = cube2Position[0] - 0.1 * dt;
          gTranslate(cube2Position[0], cube2Position[1], cube2Position[2]);
          }
        }
      }

      {
        cube2Rotation[0] = 35 * Math.cos(0.0005 * timestamp + 0.025);
        gRotate(cube2Rotation[0], 1,0,0);
      }

      gTranslate(4,-1.8,-0.2);
      gRotate(25, 1,0,0);
      gScale(0.1, 0.4, 0.1);
			drawCube();
    }
    gPop();
  gPop();

// foot
gPush();
  gTranslate(cube3Position[0], cube3Position[1], cube3Position[2]);
  gPush();
  {
    setColor(vec4(1.0, 0.0, 1.0, 0.0));
    gRotate(15, 1,0,0);
    gRotate(-30, 0,1,0);
    gRotate(5, 0,0,1);

    {
      if(flag == 1){
      if(cube3Position[0] > 0.3 && cube3Position[1] > 0.3){
        flag = 0;
      } else {
      cube3Position[1] = cube3Position[1] + 0.1 * dt;
      cube3Position[0] = cube3Position[0] + 0.1 * dt;
      gTranslate(cube3Position[0], cube3Position[1], cube3Position[2]);
        }
      } else if (flag == 0) {
        if(cube3Position[0] < -0.3 && cube3Position[1] < -0.3) {
          flag = 1;
        } else {
        cube3Position[1] = cube3Position[1] - 0.1 * dt;
        cube3Position[0] = cube3Position[0] - 0.1 * dt;
        gTranslate(cube3Position[0], cube3Position[1], cube3Position[2]);
        }
      }
    }
    {
      cube3Rotation[0] = 35 * Math.cos(0.0005 * timestamp + 0.025);
      gRotate(cube3Rotation[0], 1,0,0);
   }
    gTranslate(4,-2.3,-0.2);
    gRotate(25, 1,0,0);
    gScale(0.1, 0.05, 0.3);
    drawCube();
  }
  gPop();
gPop();
//----------------------------------------------------------------


//-------------------LEG 2---------------------------------------

//---- Topleg
	gPush();
		gTranslate(cube4Position[0],cube4Position[1],cube4Position[2]);
		gPush();
		{
			setColor(vec4(1.0, 0.0, 1.0, 0.0));
      gRotate(15, 1,0,0);
      gRotate(-30, 0,1,0);
      gRotate(5, 0,0,1);

      {
        if(flag == 1){
        if(cube4Position[0] > 0.3 && cube4Position[1] > 0.3){
          flag = 0;
        } else {
        cube4Position[1] = cube4Position[1] + 0.1 * dt;
        cube4Position[0] = cube4Position[0] + 0.1 * dt;
        gTranslate(cube4Position[0], cube4Position[1], cube4Position[2]);
          }
        } else if (flag == 0) {
          if(cube4Position[0] < -0.3 && cube4Position[1] < -0.3) {
            flag = 1;
          } else {
          cube4Position[1] = cube4Position[1] - 0.1 * dt;
          cube4Position[0] = cube4Position[0] - 0.1 * dt;
          gTranslate(cube4Position[0], cube4Position[1], cube4Position[2]);
          }
        }
      }
    {
        cube4Rotation[0] = 35 * Math.cos(0.0005 * timestamp + 0.025);
        gRotate(cube4Rotation[0], -1,0,0);
     }
      gTranslate(4.3,-1,0);
      gScale(0.1, 0.4, 0.1);
			drawCube();
		}
		gPop();
	gPop();

//bottomleg
  gPush();
    gTranslate(cube5Position[0], cube5Position[1], cube5Position[2]);
    gPush();
    {
      setColor(vec4(1.0, 0.0, 1.0, 0.0));
      gRotate(15, 1,0,0);
      gRotate(-30, 0,1,0);
      gRotate(5, 0,0,1);
      {
        if(flag == 1){
        if(cube5Position[0] > 0.3 && cube5Position[1] > 0.3){
          flag = 0;
        } else {
        cube5Position[1] = cube5Position[1] + 0.1 * dt;
        cube5Position[0] = cube5Position[0] + 0.1 * dt;
        gTranslate(cube5Position[0], cube5Position[1], cube5Position[2]);
          }
        } else if (flag == 0) {
          if(cube5Position[0] < -0.3 && cube5Position[1] < -0.3) {
            flag = 1;
          } else {
          cube5Position[1] = cube5Position[1] - 0.1 * dt;
          cube5Position[0] = cube5Position[0] - 0.1 * dt;
          gTranslate(cube5Position[0], cube5Position[1], cube5Position[2]);
          }
        }
      }

      {
        cube5Rotation[0] = 35 * Math.cos(0.0005 * timestamp + 0.025);
        gRotate(cube5Rotation[0], -1,0,0);
      }
      gTranslate(4.3,-1.8,-0.2);
      gRotate(25, 1,0,0);
      gScale(0.1, 0.4, 0.1);
			drawCube();
    }
    gPop();
  gPop();

// foot
gPush();
  gTranslate(cube6Position[0], cube6Position[1], cube6Position[2]);
  gPush();
  {
    setColor(vec4(1.0, 0.0, 1.0, 0.0));
    gRotate(15, 1,0,0);
    gRotate(-30, 0,1,0);
    gRotate(5, 0,0,1);

    {
      if(flag == 1){
      if(cube6Position[0] > 0.3 && cube6Position[1] > 0.3){
        flag = 0;
      } else {
      cube6Position[1] = cube6Position[1] + 0.1 * dt;
      cube6Position[0] = cube6Position[0] + 0.1 * dt;
      gTranslate(cube6Position[0], cube6Position[1], cube6Position[2]);
        }
      } else if (flag == 0) {
        if(cube6Position[0] < -0.3 && cube6Position[1] < -0.3) {
          flag = 1;
        } else {
        cube6Position[1] = cube6Position[1] - 0.1 * dt;
        cube6Position[0] = cube6Position[0] - 0.1 * dt;
        gTranslate(cube6Position[0], cube6Position[1], cube6Position[2]);
        }
      }
    }

    {
      cube6Rotation[0] = 35 * Math.cos(0.0005 * timestamp + 0.025);
      gRotate(cube6Rotation[0], -1,0,0);
   }

    gTranslate(4.3,-2.3,-0.2);
    gRotate(25, 1,0,0);
    gScale(0.1, 0.05, 0.3);
    drawCube();
  }
  gPop();
gPop();

//----------------------------------------------------------------

    if( animFlag )
        window.requestAnimFrame(render);
}

// A simple camera controller which uses an HTML element as the event
// source for constructing a view matrix. Assign an "onchange"
// function to the controller as follows to receive the updated X and
// Y angles for the camera:
//
//   var controller = new CameraController(canvas);
//   controller.onchange = function(xRot, yRot) { ... };
//
// The view matrix is computed elsewhere.
function CameraController(element) {
	var controller = this;
	this.onchange = null;
	this.xRot = 0;
	this.yRot = 0;
	this.scaleFactor = 3.0;
	this.dragging = false;
	this.curX = 0;
	this.curY = 0;

	// Assign a mouse down handler to the HTML element.
	element.onmousedown = function(ev) {
		controller.dragging = true;
		controller.curX = ev.clientX;
		controller.curY = ev.clientY;
	};

	// Assign a mouse up handler to the HTML element.
	element.onmouseup = function(ev) {
		controller.dragging = false;
	};

	// Assign a mouse move handler to the HTML element.
	element.onmousemove = function(ev) {
		if (controller.dragging) {
			// Determine how far we have moved since the last mouse move
			// event.
			var curX = ev.clientX;
			var curY = ev.clientY;
			var deltaX = (controller.curX - curX) / controller.scaleFactor;
			var deltaY = (controller.curY - curY) / controller.scaleFactor;
			controller.curX = curX;
			controller.curY = curY;
			// Update the X and Y rotation angles based on the mouse motion.
			controller.yRot = (controller.yRot + deltaX) % 360;
			controller.xRot = (controller.xRot + deltaY);
			// Clamp the X rotation to prevent the camera from going upside
			// down.
			if (controller.xRot < -90) {
				controller.xRot = -90;
			} else if (controller.xRot > 90) {
				controller.xRot = 90;
			}
			// Send the onchange event to any listener.
			if (controller.onchange != null) {
				controller.onchange(controller.xRot, controller.yRot);
			}
		}
	};
}
