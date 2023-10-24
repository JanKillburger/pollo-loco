let globalScaleFactor = 0.23;
let globalMotionInterval = 100;
let nextAvailableObjectId = 1;

function getObjectId() {
    const newId = nextAvailableObjectId;
    nextAvailableObjectId++;
    return newId;
}