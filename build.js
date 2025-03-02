const fs = require('fs');
const Handlebars = require('handlebars');

// Read the template file
const templateContent = fs.readFileSync('manifest.template.json', 'utf8');

// Compile the template
const template = Handlebars.compile(templateContent);

// Determine the environment (default to production)
const isDebug = process.env.NODE_ENV === 'debug';

// Generate the manifest content
const manifestContent = template({ debug: isDebug });

// Write the manifest.json file
fs.writeFileSync('./chrome/manifest.json', manifestContent);

console.log(`manifest.json has been generated for ${isDebug ? 'debug' : 'production'} environment.`);