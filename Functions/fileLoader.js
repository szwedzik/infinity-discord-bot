const { glob } = require("glob");
const { promisify } = require("util");
const proGlob = promisify(glob);

async function fileLoader(path) {
    const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/${path}/**/*.js`);
    Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
}

module.exports = { fileLoader };