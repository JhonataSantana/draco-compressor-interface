const gltfPipeline = require('gltf-pipeline');
const fsExtra = require('fs-extra');
const glbToGltf = gltfPipeline.glbToGltf;
const processGltf = gltfPipeline.processGltf;

async function glbToGltfParser(glbPath) {
    return new Promise((success, reject) => {

        const glb = fsExtra.readFileSync(glbPath);
        const result = glbToGltf(glb);

        result.then((results) => {
            success(results);
        });

        result.catch((error) => {
            reject(error);
        });

    })
}

async function dracoCompression(paths) {

    const { filePath, savePath } = paths
    let gltf;

    if (filePath.includes(".glb")) {
        await glbToGltfParser(filePath).then(results => {
            gltf = results.gltf;
        }).catch(error => {
            console.log(error);
        });
    } else {
        gltf = fsExtra.readJsonSync(filePath);
    }

    return new Promise((success, reject) => {

        const options = {
            dracoOptions: {
                compressionLevel: 10
            }
        };

        const result = processGltf(gltf, options);

        result.then((results) => {
            fsExtra.writeJsonSync(savePath, results.gltf);

            success({compression: true,result: results});
        });

        result.catch((error) => {
            reject({compression: false, error: error});
        });

    });

}

module.exports = {
    dracoCompression: dracoCompression
}