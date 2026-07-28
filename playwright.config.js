//import defineConfig and devices

import { chromium, defineConfig,devices } from "@playwright/test";
import { trace } from "node:console";

export default defineConfig({

  //testDir 
  testDir: 'tests',

  //Run all tests in parallel
  fullyParallel : true,

  //reporter
  reporter : 'html',

  //baseURL, trace

  use:{
    browserName: 'chromium',

    baseURL : "", //if any baseURL is there place here

    trace : 'on-first-retry', //only when retrying the test for first time

    screenshot : 'only-on-failure', //captures screenshot after each failure

    video : 'off', // other options on, on-first-retry 

    headless : false 

  },

  outputDir :'test-results', //folder for test artifacts such as screenshots, video, trace etc

  timeout : 30000, //timeOut for each tests 30 seconds

  //expect assertion library timeOut (Assertion)

  expect:{
    timeout : 5000, //only for expect 
  }

 
  



});