#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get command-line arguments
const args = process.argv.slice(2);

// Print the arguments for debugging
console.log('Arguments:', args);

// Define command handlers
const commands = {
    make: {
        controller: (controllerName, entityType) => {
            // Define the path where controllers will be created
            const controllersDir = path.join(__dirname, 'app', entityType, 'Controller');
            const fileName = `${controllerName}.js`;
            const filePath = path.join(controllersDir, fileName);

            // Check if the controllers directory exists, create if not
            if (!fs.existsSync(controllersDir)) {
                fs.mkdirSync(controllersDir, { recursive: true });
            }

            // Create controller content
            const controllerContent = `
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ 'message': 'this is ${entityType} ${controllerName}' });
});

module.exports = router;
`;

            // Write to the file
            fs.writeFileSync(filePath, controllerContent.trim());
            console.log(`Controller ${controllerName} created successfully in ${entityType}/Controller.`);
        },
        model: (modelName) => {
            // Define the path where models will be created
            const modelsDir = path.join(__dirname, 'app-lib', 'Model');
            const fileName = `${modelName}.js`;
            const filePath = path.join(modelsDir, fileName);

            // Check if the models directory exists, create if not
            if (!fs.existsSync(modelsDir)) {
                fs.mkdirSync(modelsDir, { recursive: true });
            }

            // Create model content
            const modelContent = `
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ${modelName}Schema = new Schema({
  name: String,
  age: Number,
});

const ${modelName} = mongoose.model('${modelName}', ${modelName}Schema);

// Export the model to use it in other files
module.exports = ${modelName};
`;

            // Write to the file
            fs.writeFileSync(filePath, modelContent.trim());
            console.log(`Model ${modelName} created successfully in app-lib/Model.`);
        }
    }
};

// Command parsing
const command = args[0];
const subCommand = args[1];
const entityName = args[2]; // Can be controller name or model name

// Debugging output to check the command structure
console.log('Command:', command);
console.log('SubCommand:', subCommand);
console.log('Entity Name:', entityName);

if (command === 'make') {
    if (subCommand === 'controller') {
        const entityType = args[3];
        if (!entityName || !entityType) {
            console.error('Usage: node artisan make:controller {controllername} {entitytype}');
            process.exit(1);
        }
        commands.make.controller(entityName, entityType);
    } else if (subCommand === 'model') {
        if (!entityName) {
            console.error('Usage: node artisan make:model {modelname}');
            process.exit(1);
        }
        commands.make.model(entityName);
    } else {
        console.error('Command not recognized. Use "make:controller" or "make:model" for creating controllers or models.');
        process.exit(1);
    }
} else {
    console.error('Command not recognized. Use "make:controller" or "make:model" for creating controllers or models.');
    process.exit(1);
}
