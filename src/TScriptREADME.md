Run ES Modules in Node.js
At this point the source code is configured to run with ES Modules, so we can now look at how to compile the code and run it with Node.js. To do this we'll need to add six additional scripts to the "scripts" property in the package.json file.

In the package.json "scripts" property add the following:

{
  "clean": "rimraf dist",
  "compile": "cross-env-shell babel src -d dist --source-maps --extensions '.ts'",
  "build": "npm run clean && npm run compile",
  "typecheck": "tsc --p .",
  "build-typecheck": "npm run typecheck && npm run build",
  "start": "npm run build-typecheck && node ./dist/index.js"
}

The "clean" script will ensure that prior to the compilation, the output directory "dist" will be deleted. This way the latest code will copied into an empty folder.

The "compile" script is where the cross-env package is used to run the babel compilation command. This babel compilation command specifies that the source files will be located in the "src" folder and when compilation is complete the JavaScript output will be copied to a folder named "dist". The flags that are passed in indicate that source maps should be generated for debugging purposes and also the "--extensions" flag is required so that Babel will look for files ending with the ".ts" extension.

To use the "clean" and "compile" script sequentially they are combined in a new script named "build", which can be run using the command npm run build. This will remove the old files from the "dist" folder and compile the TypeScript source code with Babel, however no typechecking errors will be indicated and Babel may fail to compile the code if there are errors present.

To resolve this an additional script "typecheck" is included that will pass the TypeScript source code through the TypeScript compiler, and if there are errors present, they will be output to the console. Since the tsconfig.json settings include the "noEmit" property the typecheck command won't output any JavaScript code.

The command that will be most commonly used is the "build-typecheck" command, which can be used by running npm run build-typecheck. This will sequentially run the "typecheck" command and then if there are no errors present as a result of the TypeScript compilation with the TypeScript compiler, the "build" command will be executed, invoking the Babel compiler and generating JavaScript code that can be run by Node.js in ES Module format.

Since the JavaScript code is being output to a folder named "dist" the "main" property in the package.json should be changed to:

{
  "main": "./dist/index.js"
}

To run the compiled JavaScript code, execute the command npm run start and this will carry out the type checking and compilation steps as well as run the index.js file with Node.js. If everything is setup and working as expected you should see the value included in the "main" function - "testing es modules" output to the console. Now you can use this configuration to create node modules that are statically typed and run in Node.js using the ES Module format.