let bgUrl = './images/port_map.png';
let fgUrl = './images/boat.png';
let fgUrl2 = './images/boat2.png';
let currentWidth = 900;
let currentHeight = 600;
let topPosition = 0;
let leftPosition = 0;
let mousePressed = false;
let currentMode;
//let selectedObject;
const modes = {
    pan: 'pan',
}
let pos = [{x: 229, y: 308.125}, {x: 290, y: 504.125}, {x:520, y: 246.125}, {x: 220, y: 271.125}];

// initialize canvas
const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 900,
        height: 600,
        selection: false
    });
}

// set background image for canvas
const setBackGround = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
        img.set({
            scaleX: currentWidth / img.width,
            scaleY: currentHeight / img.height,
            top: topPosition,
            left: leftPosition,
            originX: 'left', originY: 'top'
          });
        canvas.backgroundImage = img;
        canvas.renderAll();
    })
}

// superimposed image (vessels)
const setSuperImposeImg = (url, canvas) => {
    for (let i = 0; i<pos.length; i++) {
        fabric.Image.fromURL(url, (img) => {
            img.set({
                left: pos[i].x,
                top: pos[i].y
            })
            canvas.add(img);
            canvas.requestRenderAll();
        })
    }
}

/* const setSuperImposeImgWithPointer = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
        img.set({
            left:382,
            top:252.125
        });
        canvas.add(img);
        canvas.requestRenderAll();
    })
} */

// panning
const setPanEvents = (canvas) => {
    canvas.on('mouse:move', (event) => { 
        if (event.target) {
            //console.log('target', event.target);
        }
        //console.log(event);
        if (mousePressed && currentMode === modes.pan) {
            //console.log('target : ', event.target);
            canvas.setCursor('grab');
            canvas.renderAll();
            const mEvent = event.e;
            const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
            canvas.relativePan(delta);
        }
    });
    
    canvas.on('mouse:down', (event) => {
        mousePressed = true;
        if (currentMode === modes.pan) {
            canvas.setCursor('grab');
            canvas.renderAll();
        }
    });
    
    canvas.on('mouse:up', (event) => {
        mousePressed = false;
        canvas.setCursor('default');
        canvas.renderAll();
    });
}

const setDndTarget = (canvas) => {
    canvas.on('object:moving', function(event) {
        document.getElementById('target1').innerHTML = event.pointer;
        var bkColor = canvas.backgroundColor;
        console.log('bk', bkColor);
        //selectedObject = evn.target;
        //console.log('selected', selectedObject);
        //console.log('object m', evn);
      });
}

const canvas = initCanvas('canvas');
setBackGround(bgUrl, canvas);
setSuperImposeImg(fgUrl, canvas);
//setSuperImposeImgWithPointer(fgUrl2, canvas);
setPanEvents(canvas);
setDndTarget(canvas);

