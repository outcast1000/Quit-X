const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const archiver = require('archiver');

// Read the template file
const templateContent = fs.readFileSync('manifest.template.json', 'utf8');

// Compile the template
const template = Handlebars.compile(templateContent);

// Determine the environment (default to production)
const isDebug = process.env.NODE_ENV === 'debug';

// Generate the manifest content
const manifestContent = template({ debug: isDebug });

// Write the manifest.json file
const outputDir = './chrome';
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}
fs.writeFileSync(path.join(outputDir, 'manifest.json'), manifestContent);

console.log(`manifest.json has been generated for ${isDebug ? 'debug' : 'production'} environment.`);

// Create a ZIP file of the chrome folder
const output = fs.createWriteStream('chrome-extension.zip');
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level
});

output.on('close', function() {
    console.log(`chrome-extension.zip has been created. Total bytes: ${archive.pointer()}`);
});

archive.on('error', function(err) {
    throw err;
});

archive.pipe(output);

// Append files from the chrome directory
archive.directory('chrome/', false);

// Finalize the archive
archive.finalize();