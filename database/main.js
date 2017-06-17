// /* eslint-disable  func-names */
// /* eslint quote-props: ["error", "consistent"]*/
// /**
//  * This sample demonstrates a simple skill built with the Amazon Alexa Skills
//  * nodejs skill development kit.
//  * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
//  * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
//  * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
//  **/
//
// 'use strict';
//
// const Alexa = require('alexa-sdk');
//
// var APP_ID = undefined;
// var SKILL_NAME = "Hackday";
// var TIME_OUT = "Are you still there?";
// var HELP_MESS = "You can say, I want to file a claim, I want to call an agent, or say I want to exit";
// var GREET_PROMPT = "Welcome to the Hackday App. I can help you file a claim or find an agent. What can I help you with?";
// var STOP_MESS = "Thanks for using the Hackday App";
// const languageStrings = {};
//
// var autoflag = 0;
// var nameflag = 0;
// var policyflag = 0;
// var name = '';
// var type = '';
//
// const handlers = {
//
//     'LaunchRequest': function () {
//         this.emit(':ask', GREET_PROMPT);
//     },
//
//     'Claims': function () {
//         autoflag = 1;
//         this.emit(':ask', "Do you want to file an auto or home claim");
//     },
//     'Auto': function () {
//         //var filledSlots = delegateSlotCollection.call(this);
//         //var nm = this.event.request.intent.slots.Name.value;
//         if(autoflag ===1)
//         {
//             type = "auto";
//             autoflag = 0;
//             nameflag = 1;
//             this.emit(':ask', "What is your first name?. Please say it in this format. 'My name is:'");
//         }
//
//     },
//     'Name': function () {
//         if(nameflag === 1)
//         {
//             nameflag = 0;
//             policyflag = 1;
//             name = this.event.request.intent.slots.username.value;
//             this.emit(':ask', "Hello, " + name + ", can you state your policy number");
//         }
//     },
//     'PolicyNumber': function()
//     {
//         if(policyflag === 1)
//         {
//             policyflag = 0;
//             //policyflag = 1;
//             var polnum = this.event.request.intent.slots.policynum.value;
//             this.emit(':ask', polnum + ". Please identify the date of the incident.");
//         }
//     },
//     /*'Duration': function()
//     {
//         this.emit();
//     },
//     'Incident': function()
//     {
//         this.emit();
//     },
//     'Involved': function()
//     {
//     },
//     'LicenseNum': function()
//     {
//     },
//     'AddInfo':function()
//     {
//     },
//     'Conf':function()
//     {
//     },
//     'Submit': function()
//     {
//
//     },
//     */
//     'AMAZON.HelpIntent': function () {
//         const speechOutput = (HELP_MESS);
//         const reprompt = (HELP_MESS);
//         this.emit(':ask', speechOutput, reprompt);
//     },
//     'AMAZON.CancelIntent': function () {
//         this.emit(':tell', (STOP_MESS));
//     },
//     'AMAZON.StopIntent': function () {
//         this.emit(':tell', (STOP_MESS));
//     },
// };
//
// exports.handler = function (event, context) {
//     const alexa = Alexa.handler(event, context);
//     alexa.APP_ID = APP_ID;
//     // To enable string internationalization (i18n) features, set a resources object.
//     alexa.resources = languageStrings;
//     alexa.registerHandlers(handlers);
//     alexa.execute();
// };
//
//
// function delegateSlotCollection(){
//     if (this.event.request.dialogState === "STARTED") {
//       var updatedIntent=this.event.request.intent;
//       //optionally pre-fill slots: update the intent object with slot values for which
//       //you have defaults, then return Dialog.Delegate with this updated intent
//       // in the updatedIntent property
//       this.emit(":delegate", updatedIntent);
//     } else if (this.event.request.dialogState !== "COMPLETED") {
//       // return a Dialog.Delegate directive with no updatedIntent property.
//       this.emit(":delegate");
//     } else {
//       // Dialog is now complete and all required slots should be filled,
//       // so call your normal intent handler.
//       return this.event.request.intent;
//     }
// }

var AWS = require("aws-sdk");

AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAJJZLYEPMGLWOUSVQ";
AWS.config.secretAccessKey = "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";

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

// var name = "Dennis";
// var security_question = "dog";
// var policy_number = "1234";
addToTable();

function addToTable(){
var AWS = require("aws-sdk");

AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAJJZLYEPMGLWOUSVQ";
AWS.config.secretAccessKey = "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";

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Customers";



var params = {
  TableName: table,
  Item: {
    "user_name": "Tim",
    "user_type": "NA",
    "info": {
      "user_policy_number": 1234,
      "user_DOB": "1996-12-26",
      "user_security_question": "dog",
      "user_license_num": "12345",
      "user_address": "1 Statefarm Plaza"
    }
  }
}

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});
}

function queryTable(name, polnum, securityanswer) {
var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Customers";

console.log(name);
console.log(polnum);
console.log(securityanswer);
var user_name = name;
var user_policy_number = polnum;

var user_security_question = securityanswer;

var params = {
    TableName: table,
    FilterExpression: 'user_name = :name_query and info.user_policy_number = :policy_query',
    ExpressionAttributeValues: {
			":name_query": user_name,
      ":policy_query": user_policy_number,
    //  ":security_query": user_security_question
		}
};

docClient.scan(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        //return 0
    } else {
        if (data.Count != 0){
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      //  return 1
      var queried_obj = data.Items[0];
      console.log(queried_obj.user_name);
    } else {
      console.log("no match");
    }
    }

});
}
