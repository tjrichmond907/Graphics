
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
var animFlag = true;
var controller;

// These are used to store the current state of objects.
// In animation it is often useful to think of an object as having some DOF
// Then the animation is simply evolving those DOF over time.
var currentRotation = [0,0,0];
var bouncingCubePosition = [0,4,0];
var bouncyBallVelocity = 0;
var bouncyEnergyLoss = 0.9;
var gravity = -9.8;


var blendTextures = 0;
var useTextures = 1;
var useShader = 0;

//uniform wave functions
var amplitiude = -35;
var angFreq = -0.0015;//0.001
var phase = 0.35;

//fps variables
var frameRate;

//cover photo
var coverPos = [0,0,0];
var coverRot = [0,0,0];

// Ground -------------------------
var groundPos = [0,0,0];
var groundRot = [0,0,0];

// Pond
var pondPos = [-6,-1.9,3];

//logs -----------------------------
var log1Pos = [-2,0.15,0];
var log1Rot = [0,0,0];

var log1EndPos = [-3.5, 0.15, 0];
var log2EndPos = [2.5, 0.15, 0];


var log1FallPos = [-2, 0.15, 0];
var log1FallRot = [0,0,0];

var log2Pos = [1,0.15,0];
var log2Rot = [0,0,0];

var log2FallPos = [0,0,0]
var log2FallRot = [0,0,0];


//Racks -----------------------------
//Rack 1
//cross
var rack1CrossPos= [1.5, -0.5, 0.0];
var rack1CrossRot= [0,0,0];

//left front
var rack1LFPos = [1.25, -1.25, 0.75];
var rack1LFRot = [0,0,0];

//right front
var rack1RFPos = [1.75, -1.25, 0.75];
var rack1RFRot = [0,0,0];

//left back
var rack1LBPos = [1.25, -1.25, -0.75];
var rack1LBRot = [0,0,0];

//right back
var rack1RBPos = [1.75, -1.25, -0.75];
var rack1RBRot = [0,0,0];

//Rack 2-------
//cross
var rack2CrossPos= [-2.5, -0.5, 0.0];
var rack2CrossRot= [0,0,0];

//left front
var rack2LFPos = [-2.75, -1.25, 0.75];
var rack2LFRot = [0,0,0];

//right front
var rack2RFPos = [-2.25, -1.25, 0.75];
var rack2RFRot = [0,0,0];

//left back
var rack2LBPos = [-2.75, -1.25, -0.75];
var rack2LBRot = [0,0,0];

//right back
var rack2RBPos = [-2.25, -1.25, -0.75];
var rack2RBRot = [0,0,0];

// LUMBERJACK
//Body----------
var lJackBodyPos = [-0.5,0.5,-3];
var lJackBodyRot = [0,0,0];

//Head ---------
var ljHeadPos = [-0.5, 1.6, -3];
var ljHeadRot = [0,0,0];

//Legs---------

//Left leg
var lFemurPos = [-0.25, -0.5, -3];
var lFemurRot = [0,0,0];

var lTibPos = [-0.25, -1.5, -3];
var lTibRot = [0,0,0];

var lFootPos = [-0.25, -1.9, -3];
var lFootRot = [0,0,0];

//Right Leg
var rFemurPos = [-0.8, -0.5, -3];
var rFemurRot = [0,0,0];

var rTibPos = [-0.8, -1.5, -3];
var rTibRot = [0,0,0];

var rFootPos = [-0.8, -1.9, -3];
var rFootRot = [0,0,0];

// Arms ---------

//left arm
var lForePos = [0,0,0];//[0.1,1.1,-3];
var lForeRot = [0,0,0];

var lBicepPos = [0.1,1.1,-3];
var lBicepRot = [0,0,0];


// Right arm
var rForePos = [0,0,0]; //[-1.1,1.1,-3];
var rForeRot = [0,0,0];

var rBicepPos = [-1.1,1.1,-3];
var rBicepRot = [0,0,0];

// hands 
var handPos = [0,0,0];

// Axe ----------------------
var handlePos = [0,0,0];
var aHeadPos = [0,0,0]; 

// Bird -------------------
var birdBodyPos = [0,0,0];
var birdBodyRot = [0,0,0];

var birdHeadPos = [0,0,0];
var birdHeadRot = [0,0,0];

var birdBillPos = [0,0,0];
var birdBillRot = [0,0,0];

var lWingPos = [0,0,0];
var lWingRot = [0,0,0];

var rWingPos = [0,0,0];
var rWingRot = [0,0,0];

// Trees -------------------

// Tree 1 ---------
var t1TrunkPos = [0, -1.25, 4];
var t1L1Pos = [0, -0.5, 4];
var t1L2Pos = [0, 0.35, 4];
var t1L3Pos = [0, 1, 4];
var t1L4Pos = [0, 1.5, 4];
var t1L5Pos = [0,1.9, 4];

// tree2
var t2TrunkPos = [-4, -1.25, 6];
var t2L1Pos = [-4, -0.5, 6];
var t2L2Pos = [-4, 0.35, 6];
var t2L3Pos = [-4, 1, 6];
var t2L4Pos = [-4, 1.5, 6];
var t2L5Pos = [-4,1.9, 6];

// tree3
var t3TrunkPos = [-6, -1.25, -3];
var t3L1Pos = [-6, -0.5, -3];
var t3L2Pos = [-6, 0.35, -3];
var t3L3Pos = [-6, 1, -3];
var t3L4Pos = [-6, 1.5, -3];
var t3L5Pos = [-6,1.9, -3];

// tree4
var t4TrunkPos = [6, -1.25, -5];
var t4L1Pos = [6, -0.5, -5];
var t4L2Pos = [6, 0.35, -5];
var t4L3Pos = [6, 1, -5];
var t4L4Pos = [6, 1.5, -5];
var t4L5Pos = [6,1.9, -5];

// tree5
var t5TrunkPos = [2, -1.25, -5.5];
var t5L1Pos = [2, -0.5, -5.5];
var t5L2Pos = [2, 0.35, -5.5];
var t5L3Pos = [2, 1, -5.5];
var t5L4Pos = [2, 1.5, -5.5];
var t5L5Pos = [2,1.9, -5.5];

// tree6
var t6TrunkPos = [4, -1.25, 7.5];
var t6L1Pos = [4, -0.5, 7.5];
var t6L2Pos = [4, 0.35, 7.5];
var t6L3Pos = [4, 1, 7.5];
var t6L4Pos = [4, 1.5, 7.5];
var t6L5Pos = [4,1.9, 7.5];

// tree7
var t7TrunkPos = [6, -1.25, 0];
var t7L1Pos = [6, -0.5, 0];
var t7L2Pos = [6, 0.35, 0];
var t7L3Pos = [6, 1, 0];
var t7L4Pos = [6, 1.5, 0];
var t7L5Pos = [6,1.9, 0];

// tree8
var t8TrunkPos = [-6, -1.25, -7];
var t8L1Pos = [-6, -0.5, -7];
var t8L2Pos = [-6, 0.35, -7];
var t8L3Pos = [-6, 1, -7];
var t8L4Pos = [-6, 1.5, -7];
var t8L5Pos = [-6,1.9, -7];

// tree9
var t9TrunkPos = [-9, -1.25, 7];
var t9L1Pos = [-9, -0.5, 7];
var t9L2Pos = [-9, 0.35, 7];
var t9L3Pos = [-9, 1, 7];
var t9L4Pos = [-9, 1.5, 7];
var t9L5Pos = [-9,1.9, 7];
		
// For this example we are going to store a few different textures here
var textureArray = [] ;

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
                                         "lightPosition"),flatten(lightPosition2) );
    gl.uniform1f( gl.getUniformLocation(program, 
                                        "shininess"),materialShininess );
}

// We are going to asynchronously load actual image files this will check if that call if an async call is complete
// You can use this for debugging
function isLoaded(im) {
    if (im.complete) {
        console.log("loaded") ;
        return true ;
    }
    else {
        console.log("still not loaded!!!!") ;
        return false ;
    }
}

// Helper function to load an actual file as a texture
// NOTE: The image is going to be loaded asyncronously (lazy) which could be
// after the program continues to the next functions. OUCH!
function loadFileTexture(tex, filename)
{
	//create and initalize a webgl texture object.
    tex.textureWebGL  = gl.createTexture();
    tex.image = new Image();
    tex.image.src = filename ;
    tex.isTextureReady = false ;
    tex.image.onload = function() { handleTextureLoaded(tex); }
}

// Once the above image file loaded with loadFileTexture is actually loaded,
// this funcion is the onload handler and will be called.
function handleTextureLoaded(textureObj) {
	//Binds a texture to a target. Target is then used in future calls.
		//Targets:
			// TEXTURE_2D           - A two-dimensional texture.
			// TEXTURE_CUBE_MAP     - A cube-mapped texture.
			// TEXTURE_3D           - A three-dimensional texture.
			// TEXTURE_2D_ARRAY     - A two-dimensional array texture.
    gl.bindTexture(gl.TEXTURE_2D, textureObj.textureWebGL);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); // otherwise the image would be flipped upsdide down
	
	//texImage2D(Target, internalformat, width, height, border, format, type, ImageData source)
    //Internal Format: What type of format is the data in? We are using a vec4 with format [r,g,b,a].
        //Other formats: RGB, LUMINANCE_ALPHA, LUMINANCE, ALPHA
    //Border: Width of image border. Adds padding.
    //Format: Similar to Internal format. But this responds to the texel data, or what kind of data the shader gets.
    //Type: Data type of the texel data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureObj.image);
	
	//Set texture parameters.
    //texParameteri(GLenum target, GLenum pname, GLint param);
    //pname: Texture parameter to set.
        // TEXTURE_MAG_FILTER : Texture Magnification Filter. What happens when you zoom into the texture
        // TEXTURE_MIN_FILTER : Texture minification filter. What happens when you zoom out of the texture
    //param: What to set it to.
        //For the Mag Filter: gl.LINEAR (default value), gl.NEAREST
        //For the Min Filter: 
            //gl.LINEAR, gl.NEAREST, gl.NEAREST_MIPMAP_NEAREST, gl.LINEAR_MIPMAP_NEAREST, gl.NEAREST_MIPMAP_LINEAR (default value), gl.LINEAR_MIPMAP_LINEAR.
    //Full list at: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
	
	//Generates a set of mipmaps for the texture object.
        /*
            Mipmaps are used to create distance with objects. 
        A higher-resolution mipmap is used for objects that are closer, 
        and a lower-resolution mipmap is used for objects that are farther away. 
        It starts with the resolution of the texture image and halves the resolution 
        until a 1x1 dimension texture image is created.
        */
    gl.generateMipmap(gl.TEXTURE_2D);
	
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); //Prevents s-coordinate wrapping (repeating)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); //Prevents t-coordinate wrapping (repeating)
    gl.bindTexture(gl.TEXTURE_2D, null);
    console.log(textureObj.image.src) ;
    
    textureObj.isTextureReady = true ;
}

// Takes an array of textures and calls render if the textures are created/loaded
// This is useful if you have a bunch of textures, to ensure that those files are
// actually laoded from disk you can wait and delay the render function call
// Notice how we call this at the end of init instead of just calling requestAnimFrame like before
function waitForTextures(texs) {
    setTimeout(
		function() {
			   var n = 0 ;
               for ( var i = 0 ; i < texs.length ; i++ )
               {
                    console.log(texs[i].image.src) ;
                    n = n+texs[i].isTextureReady ;
               }
               wtime = (new Date()).getTime() ;
               if( n != texs.length )
               {
               		console.log(wtime + " not ready yet") ;
               		waitForTextures(texs) ;
               }
               else
               {
               		console.log("ready to render") ;
					render(0);
               }
		},
	5) ;
}

// This will use an array of existing image data to load and set parameters for a texture
// We'll use this function for procedural textures, since there is no async loading to deal with
function loadImageTexture(tex, image) {
	//create and initalize a webgl texture object.
    tex.textureWebGL  = gl.createTexture();
    tex.image = new Image();

	//Binds a texture to a target. Target is then used in future calls.
		//Targets:
			// TEXTURE_2D           - A two-dimensional texture.
			// TEXTURE_CUBE_MAP     - A cube-mapped texture.
			// TEXTURE_3D           - A three-dimensional texture.
			// TEXTURE_2D_ARRAY     - A two-dimensional array texture.
    gl.bindTexture(gl.TEXTURE_2D, tex.textureWebGL);

	//texImage2D(Target, internalformat, width, height, border, format, type, ImageData source)
    //Internal Format: What type of format is the data in? We are using a vec4 with format [r,g,b,a].
        //Other formats: RGB, LUMINANCE_ALPHA, LUMINANCE, ALPHA
    //Border: Width of image border. Adds padding.
    //Format: Similar to Internal format. But this responds to the texel data, or what kind of data the shader gets.
    //Type: Data type of the texel data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
	
	//Generates a set of mipmaps for the texture object.
        /*
            Mipmaps are used to create distance with objects. 
        A higher-resolution mipmap is used for objects that are closer, 
        and a lower-resolution mipmap is used for objects that are farther away. 
        It starts with the resolution of the texture image and halves the resolution 
        until a 1x1 dimension texture image is created.
        */
    gl.generateMipmap(gl.TEXTURE_2D);
	
	//Set texture parameters.
    //texParameteri(GLenum target, GLenum pname, GLint param);
    //pname: Texture parameter to set.
        // TEXTURE_MAG_FILTER : Texture Magnification Filter. What happens when you zoom into the texture
        // TEXTURE_MIN_FILTER : Texture minification filter. What happens when you zoom out of the texture
    //param: What to set it to.
        //For the Mag Filter: gl.LINEAR (default value), gl.NEAREST
        //For the Min Filter: 
            //gl.LINEAR, gl.NEAREST, gl.NEAREST_MIPMAP_NEAREST, gl.LINEAR_MIPMAP_NEAREST, gl.NEAREST_MIPMAP_LINEAR (default value), gl.LINEAR_MIPMAP_LINEAR.
    //Full list at: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); //Prevents s-coordinate wrapping (repeating)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); //Prevents t-coordinate wrapping (repeating)
    gl.bindTexture(gl.TEXTURE_2D, null);

    tex.isTextureReady = true;
}

// This just calls the appropriate texture loads for this example and puts the textures in an array
function initTexturesForExample() {
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"forestFloor.bmp") ;
    
    textureArray.push({}) ;
    loadFileTexture(textureArray[textureArray.length-1],"Bark.bmp") ;

}

// Turn texture use on and off
function toggleTextureBlending() {
    blendTextures = (blendTextures + 1) % 2
	gl.uniform1i(gl.getUniformLocation(program, "useTextures"), useTextures);
}

// Changes which texture is active in the array of texture examples (see initTexturesForExample)
function toggleTextures() {
    useTextures = (useTextures + 1) % 2
	gl.uniform1i(gl.getUniformLocation(program, "useTextures"), useTextures);
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
	
	// Helper function just for this example to load the set of textures
    initTexturesForExample() ;

    waitForTextures(textureArray);
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

// Draw a Bezier patch
function drawB3(b) {
	setMV() ;
	b.draw() ;
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

function drawGroud(groundPos) {
    gPush();
    gTranslate(groundPos[0], -2, groundPos[2]);
      {
        gPush();
        gScale(10, 0.025, 10);
        drawCube();
        gPop();
      }
      gPop();
    }

  function drawPond(pPos){
    gPush();
    gTranslate(pPos[0], pPos[1], pPos[2]);
    gPush();
  {
    setColor(vec4(0.0, 0.0, 1.0, 0.0));
    gScale(2, 0.01, 2);
    drawSphere();
  } 
  gPop();
  gPop();
  }
    
    function drawlog(logPos, endP){
        gPush();
        gTranslate(logPos[0],logPos[1],logPos[2]);
        {
          gPush();
          gRotate(90, 0,1,0);
          gScale(1.0, 1.0, 3.0);
          drawCylinder();
          gPop();
        }
        gPop();

        gPush();
        gTranslate(endP[0], endP[1], endP[2]);
        gPush();
        {
          setColor(vec4(0.6, 0.5, 0.4, 0.0));
          gScale(0.01, 0.5, 0.5);
          drawSphere();
        }
        gPop();
        gPop();
      }


    function drawRack(cross, leftFront, rightFront, leftBack, rightBack) {
      //cross bar
      gPush();
      gTranslate(cross[0], cross[1], cross[2]);
      gPush();
      {
        setColor(vec4(0.3, 0.2, 0.2, 0.0));
        gScale(0.15,0.15,1.0);
        drawCube();
      }
      gPop();
      gPop();
    
      //Rightfront leg
      gPush();
      gTranslate(rightFront[0], rightFront[1], rightFront[2]);
      gPush();
      {
        setColor(vec4(0.3, 0.2, 0.2, 0.0));
        gRotate(90, 1,0,0);
        gRotate(20, 0,1,0);
        gScale(0.1, 0.1, 0.75);
        drawCube();
      }
      gPop();
      gPop();
    
      //left front leg
      gPush();
      gTranslate(leftFront[0], leftFront[1], leftFront[2]);
      gPush();
      {
        setColor(vec4(0.3, 0.2, 0.2, 0.0));
        gRotate(90, 1,0,0);
        gRotate(-20, 0,1,0);
        gScale(0.1, 0.1, 0.75);
        drawCube();
      }
      gPop();
      gPop();
    
      //right back leg
      gPush();
      gTranslate(rightBack[0], rightBack[1], rightBack[2]);
      gPush();
      {
        setColor(vec4(0.3, 0.2, 0.2, 0.0));
        gRotate(90, 1,0,0);
        gRotate(20, 0,1,0);
        gScale(0.1, 0.1, 0.75);
        drawCube();
      }
      gPop();
      gPop();
    
      //left back leg
      gPush();
      gTranslate(leftBack[0], leftBack[1], leftBack[2]);
      gPush();
      {
        setColor(vec4(0.3, 0.2, 0.2, 0.0));
        gRotate(90, 1,0,0);
        gRotate(-20, 0,1,0);
        gScale(0.1, 0.1, 0.75);
        drawCube();
      }
      gPop();
      gPop();
    
    }
    
    
    function drawLumberJack(head, body, lBi, lFor, rBi, rFor, lFe, lTib, lFoot, rFe, rTib, rFoot, lBiRot, lForRot, rBiRot, rForRot, time, hndlP, aHeadP, handP){
      var ljColor = vec4(0.4, 0.1, 0.3, 0.3);
      //Body
      gPush();
      gTranslate(body[0], body[1], body[2]);
      gPush();
      {
        setColor(ljColor);
        gRotate(90, 1,0,0);
        gScale(1,1,1.5);
        drawCylinder();
      }
      gPop();
      gPop();
    
      //Head
      gPush();
      gTranslate(head[0], head[1], head[2]);
      gPush();
      {
        setColor(ljColor);
        gScale(0.4,0.4,0.4);
        drawSphere();
      }
      gPop();
      gPop();
    
      //Legs---------
      //left leg of LJ
      //Femur
      gPush();
      gTranslate(lFe[0], lFe[1], lFe[2]);
      gPush();
      {
        setColor(ljColor);
        gRotate(-10, 1,0,0);
        gScale(0.1, 0.5, 0.1);
        drawCube();
      }
      gPop();
      gPop();
      //Tibia
      gPush();
      gTranslate(lTib[0], lTib[1], lTib[2]);
      gPush();
      {
        setColor(ljColor);
        gRotate(10, 1,0,0);
        gScale(0.1, 0.5, 0.1);
        drawCube();
      }
      gPop();
      gPop();
      //foot
      gPush();
      gTranslate(lFoot[0], lFoot[1], lFoot[2]);
      gPush();
      {
        setColor(ljColor);
        gScale(0.1, 0.1, 0.2);
        drawCube();
      }
      gPop();
      gPop();
    
      // Right Leg---
      //Femur
      gPush();
      gTranslate(rFe[0], rFe[1], rFe[2]);
      gPush();
      {
        setColor(ljColor);
        gRotate(-10, 1,0,0);
        gScale(0.1, 0.5, 0.1);
        drawCube();
      }
      gPop();
      gPop();
      //Tibia
      gPush();
      gTranslate(rTib[0], rTib[1], rTib[2]);
      gPush();
      {
        setColor(ljColor);
        gRotate(10, 1,0,0);
        gScale(0.1, 0.5, 0.1);
        drawCube();
      }
      gPop();
      gPop();
      //foot
      gPush();
      gTranslate(rFoot[0], rFoot[1], rFoot[2]);
      gPush();
      {
        setColor(ljColor);
        gScale(0.1, 0.1, 0.2);
        drawCube();
      }
      gPop();
      gPop();


          //Arms -------
      // Right arm bicep
      gPush();
      gTranslate(rBi[0], rBi[1], rBi[2]);
      gPush();
      {
        setColor(ljColor);
        gRotate(10, 1,0,0);
        gRotate(5, 0,1,0);
        {
          rBiRot[0] = amplitiude * Math.cos(angFreq * time + phase);
          gRotate(rBiRot[0], -1,0,0);
          gPush();
          {
            //forearm
            gPush();
            gTranslate(rFor[0], rFor[1], rFor[2]);
            gPush();
            {
              gTranslate(0,0,1.15);
              rForRot[0] = -amplitiude * Math.cos(angFreq* time + phase);
              gRotate(rForRot[0], 1,0,0);
              gRotate(35, -1,0,0);
              gRotate(30, 0,1,0);
              gTranslate(0, 0.15, 0.35);
              gRotate(20, -1,0,0);
              gScale(0.1, 0.1, 0.5);
              drawCube();
            }
            gPop();
            gPop();
          }
        }
        gTranslate(0,0,0.5);
        gScale(0.1, 0.1, 0.5);
        drawCube();
      }
      gPop();
      gPop();
      gPop();
    //new Left 
            // Right arm bicep
            gPush();
            gTranslate(lBi[0], lBi[1], lBi[2]);
            gPush();
            {
              setColor(ljColor);
              gRotate(10, 1,0,0);
              gRotate(5, 0,1,0);
              {
                lBiRot[0] = amplitiude * Math.cos(angFreq * time + phase);
                gRotate(lBiRot[0], -1,0,0);
                gPush();
                {
                  //forearm
                  gPush();
                  gTranslate(lFor[0], lFor[1], lFor[2]);
                  gPush();
                  {
                    gTranslate(0,0,1.15);
                    lForRot[0] = -amplitiude * Math.cos(angFreq* time + phase);
                    gRotate(lForRot[0], 1,0,0);
                    gPush();
                    {
                      gPush();
                      gTranslate(hndlP[0], hndlP[1], hndlP[2]);
                      gPush();
                      {
                        setColor(ljColor);
                        {
                          gPush();
                          gTranslate(aHeadP[0], aHeadP[1], aHeadP[2]);
                          gPush();
                          {
                            gPush();
                            gTranslate(handP[0], handP[1], handP[2]);
                            gPush();  
                            gTranslate(-0.6,0.8,0.4);
                            gScale(0.25, 0.25, 0.25);
                            drawSphere();
                          }
                          gPop();
                          gPop();
                          {
                          gTranslate(-0.6,1.6,0.05);
                          gRotate(25, -1,0,0);
                          gScale(0.05, 0.15, 0.2);
                          drawCube();
                          }
                          gPop();
                          gPop();
                        }
                        gTranslate(-0.6,1,0.2);
                        gRotate(60, 1,0,0);
                        gScale(0.2, 0.2, 1.75);
                        drawCylinder();
                      }
                      gPop();
                      gPop();
                    }
                    gRotate(35, -1,0,0);
                    gRotate(30, 0,-1,0);
                    gTranslate(0, 0.15, 0.35);
                    gRotate(20, -1,0,0);
                    gScale(0.1, 0.1, 0.5);
                    drawCube();
                  }
                  gPop();
                  gPop();
                  gPop();
                }
              }
              
              gTranslate(0,0,0.5);
              gScale(0.1, 0.1, 0.5);
              drawCube();
            }
            gPop();
            gPop();
            gPop();
    }
    
    function drawTree(trunk, l1, l2, l3, l4, l5) {
      gPush();
      gTranslate(trunk[0], trunk[1], trunk[2]);
      gPush();
      {
        setColor(vec4(0.3, 0.2, 0.2, 0.0));
        gRotate(90, 1,0,0);
        gScale(0.75,0.75,1.5);
        drawCylinder();
      }
      gPop();
      gPop();
    
      gPush();
      gTranslate(l1[0], l1[1], l1[2]);
      gPush();
      {
        setColor(vec4(0.0, 1.0, 0.0, 0.0));
        gRotate(-90, 1,0,0);
        gScale(1.5,1.5,1.5);
        drawCone();
      }
      gPop();
      gPop();
    
      gPush();
      gTranslate(l2[0], l2[1], l2[2]);
      gPush();
      {
        setColor(vec4(0.0, 1.0, 0.0, 0.0));
        gRotate(-90, 1,0,0);
        gScale(1.25,1.25,1.25);
        drawCone();
      }
      gPop();
      gPop();
    
      gPush();
      gTranslate(l3[0], l3[1], l3[2]);
      gPush();
      {
        setColor(vec4(0.0, 1.0, 0.0, 0.0));
        gRotate(-90, 1,0,0);
        gScale(1,1,1);
        drawCone();
      }
      gPop();
      gPop();
    
      gPush();
      gTranslate(l4[0], l4[1], l4[2]);
      gPush();
      {
        setColor(vec4(0.0, 1.0, 0.0, 0.0));
        gRotate(-90, 1,0,0);
        gScale(0.75,0.75,0.75);
        drawCone();
      }
      gPop();
      gPop();
    
      gPush();
      gTranslate(l5[0], l5[1], l5[2]);
      gPush();
      {
        setColor(vec4(0.0, 1.0, 0.0, 0.0));
        gRotate(-90, 1,0,0);
        gScale(0.5,0.5,0.5);
        drawCone();
      }
      gPop();
      gPop();
    }
    
function drawBird(bHeadP, bHeadR, bBodyP, bBodyR, bBillP, bBillR, lWingP, lWingR, rWingP, rWingR, time){
//body
gPush();
  gTranslate(bBodyP[0], bBodyP[1], bBodyP[2]);
  gPush();
  {
    setColor(vec4(1.0, 0.0, 0.0, 0.0));
    bBodyR[1] = bBodyR[1] + 40 * dt; 
    gRotate(bBodyR[1], 0, -1,0);
    gPush();
    {
      bBodyP[1] = 0.5 * Math.cos(0.002 * time + 0.05);
      gRotate(bBodyP[1], 0,1,0);
    }
    gTranslate(3, 5,0);
    gScale(0.5, 0.5, 0.5);
    drawSphere();
  }
  gPop();
  gPop();
  gPop();
//head
  gPush();
  gTranslate(bHeadP[0], bHeadP[1], bHeadP[2]);
  gPush();
    {
      setColor(vec4(1.0, 0.0, 0.0, 0.0));
      bHeadR[1] = bHeadR[1] + 40 * dt;
      gRotate(bHeadR[1], 0, -1,0);
      gPush();
      {
        bHeadP[1] = 0.5 * Math.cos(0.002 * time + 0.05);
        gRotate(bHeadP[1], 0,1,0);
      }
      gTranslate(3, 5.2, 0.5);
      gScale(0.25, 0.25, 0.25);
      drawSphere();
    }
    gPop();
    gPop();
    gPop();
//beak
    gPush();
    gTranslate(bBillP[0], bBillP[1], bBillP[2]);
    gPush();
      {
        setColor(vec4(1.0, 1.0, 0.0, 0.0));
        bBillR[1] = bBillR[1] + 40 * dt;
        gRotate(bBillR[1], 0, -1,0);
        gPush();
        {
          bBillP[1] = 0.5 * Math.cos(0.002 * time + 0.05);
          gRotate(bBillP[1], 0,1,0);
        }
        gTranslate(3, 5.2, 0.75);
        gScale(0.15, 0.15, 0.25);
        drawCone();
      }
      gPop();
      gPop();
      gPop();
//wings
      //bird left
      gPush();
      gTranslate(lWingP[0], lWingP[1], lWingP[2]);
      gPush();
      {
        setColor(vec4(1.0, 0.0, 0.0, 0.0));
        lWingR[1] = lWingR[1] + 40 * dt;
        gRotate(lWingR[1], 0, -1, 0);
        gPush();
        {
          lWingP[1] = 0.5 * Math.cos(0.002 * time + 0.05);
          gRotate(lWingP[1], 0,1,0);
          gPush();
          {
          gTranslate(3.25, 5, 0);
          lWingR[2] = -35 * Math.cos(0.005 * time + 0.005);
          gRotate(lWingR[2], 0,0,-1);
          gPush();
          } 
        }
        gTranslate(0.5,0.5,0);
        gRotate(45, 0,0,1);
        gScale(0.5, 0.1, 0.25);
        drawSphere();
      }
      gPop();
      gPop();
      gPop();
      gPop();
      gPop();

      //bird right
      gPush();
      gTranslate(rWingP[0], rWingP[1], rWingP[2]);
      gPush();
      {
        setColor(vec4(1.0, 0.0, 0.0, 0.0));
        rWingR[1] = rWingR[1] + 40 * dt;
        gRotate(rWingR[1], 0, -1, 0);
        gPush();
        {
          rWingP[1] = 0.5 * Math.cos(0.002 * time + 0.05);
          gRotate(rWingP[1], 0,1,0);
          gPush();
          {
          gTranslate(2.75, 5, 0);
          rWingR[2] = -35 * Math.cos(0.005 * time + 0.005);
          gRotate(-rWingR[2], 0,0,-1);
          gRotate(-180, 0,-1,0);
          gPush();
          } 
        }
        gTranslate(0.5,0.5,0);
        gRotate(45, 0,0,1);
        gScale(0.5, 0.1, 0.25);
        drawSphere();
      }
      gPop();
      gPop();
      gPop();
      gPop();
      gPop();


}



function render(timestamp) {
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //eye = vec3(0,-10,10); //orig
    //eye = vec3(0,0,10);//(0,0,10)//(0,4,2)(2,5,10)front
    //eye = vec3(20, 0,0); //side riight
    //eye = vec3(-20, 0,0); //side left
    eye = vec3(0,15,100);

    // camera rotation 
    var tempEye = -eye[0];
    var theta = 0.25 * (timestamp/1000);
    eye[0] = 0.5 * (eye[0] * Math.cos(theta) + eye[2] * Math.sin(theta));
    eye[2] = 0.5 * (tempEye * Math.sin(theta) + eye[2] * Math.cos(theta));  

    MS = []; // Initialize modeling matrix stack
	
	// initialize the modeling matrix to identity
    modelMatrix = mat4();
    
    // set the camera matrix
    viewMatrix = lookAt(eye, at, up);
   
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

toggleTextures();
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, textureArray[0].textureWebGL);
gl.uniform1i(gl.getUniformLocation(program, "texture1"), 0);
drawGroud(groundPos);
toggleTextures();


toggleTextures();
gl.activeTexture(gl.TEXTURE1);
gl.bindTexture(gl.TEXTURE_2D, textureArray[1].textureWebGL);
gl.uniform1i(gl.getUniformLocation(program, "texture1"), 1);
drawlog(log1Pos, log1EndPos);
toggleTextures(); 

toggleTextures();
gl.activeTexture(gl.TEXTURE1);
gl.bindTexture(gl.TEXTURE_2D, textureArray[1].textureWebGL);
gl.uniform1i(gl.getUniformLocation(program, "texture1"), 1);
drawlog(log2Pos, log2EndPos);
toggleTextures();

useShader = useShader + 1;
drawPond(pondPos);
useShader = useShader - 1;

drawRack(rack1CrossPos, rack1LFPos, rack1RFPos, rack1LBPos, rack1RBPos);
drawRack(rack2CrossPos, rack2LFPos, rack2RFPos, rack2LBPos, rack2RBPos);

drawLumberJack(ljHeadPos, lJackBodyPos, lBicepPos, lForePos, rBicepPos, rForePos, lFemurPos, lTibPos, lFootPos,
                  rFemurPos, rTibPos, rFootPos, lBicepRot, lForeRot, rBicepRot, rForeRot, timestamp, handlePos, aHeadPos, handPos);

drawTree(t1TrunkPos, t1L1Pos, t1L2Pos, t1L3Pos, t1L4Pos, t1L5Pos);
drawTree(t2TrunkPos, t2L1Pos, t2L2Pos, t2L3Pos, t2L4Pos, t2L5Pos);
drawTree(t3TrunkPos, t3L1Pos, t3L2Pos, t3L3Pos, t3L4Pos, t3L5Pos);
drawTree(t4TrunkPos, t4L1Pos, t4L2Pos, t4L3Pos, t4L4Pos, t4L5Pos);
drawTree(t5TrunkPos, t5L1Pos, t5L2Pos, t5L3Pos, t5L4Pos, t5L5Pos);
drawTree(t6TrunkPos, t6L1Pos, t6L2Pos, t6L3Pos, t6L4Pos, t6L5Pos);
drawTree(t7TrunkPos, t7L1Pos, t7L2Pos, t7L3Pos, t7L4Pos, t7L5Pos);
drawTree(t8TrunkPos, t8L1Pos, t8L2Pos, t8L3Pos, t8L4Pos, t8L5Pos);
drawTree(t9TrunkPos, t9L1Pos, t9L2Pos, t9L3Pos, t9L4Pos, t9L5Pos);

drawBird(birdHeadPos, birdHeadRot, birdBodyPos, birdBodyRot, birdBillPos, birdBillRot, lWingPos, lWingRot, rWingPos, rWingRot, timestamp);

frameRate = 1/dt;
document.getElementById('test').innerHTML = frameRate;


    if( animFlag )
        window.requestAnimFrame(render);
}

