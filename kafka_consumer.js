const kafka = require('kafka-node');
const config = require('./config');
const mongoose = require('mongoose');

const createdModel=require('./Models/createdModel');
const shippedModel=require('./Models/shippedModel');
const deliveredModel=require('./Models/deliveredModel');
const returnedModel=require('./Models/returnModel');
const cancelledModel=require('./Models/cancelledModel');
const uri = "mongodb+srv://sellerperformance:sellerpassword@acms-project-wgmfk.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log("dbconnected");
})
    .catch(err => {
        console.log("dbnot connected");
        console.log(err);
    })
async function saveUser(user1) {
    try {
        await user1.save();
        console.log(user1);
    }
    catch (err) {
        console.log(err);
    }

}
async function searchFun(eventName, gotObj) {
    try {
        
        switch (eventName) {
            case "created":var newObj=new createdModel(); 
                newObj.orderId = gotObj.orderId;
                newObj.sellerId=gotObj.sellerId;
                newObj.orderDate = gotObj.orderDate;
                newObj.promisedShipDate = gotObj.promisedShipDate;
                newObj.promisedDeliveryDate = gotObj.promisedDeliveryDate;
                saveUser(newObj);
                break;
            case "shipped":var newObj=new shippedModel(); 
                newObj.orderId = gotObj.orderId;
                newObj.actualShipDate = gotObj.actualShipDate;
                saveUser(newObj);
                break;
            case "delivered": var newObj=new deliveredModel();
                newObj.orderId = gotObj.orderId;
                newObj.actualDeliveryDate = gotObj.actualDeliveryDate;
                saveUser(newObj);
                break;
            case "cancelled": var newObj=new cancelledModel();
                newObj.orderId = gotObj.orderId;
                newObj.cancellationOrigin=gotObj.cancellationOrigin;
                saveUser(newObj);
                break;  
            case "returned":var newObj=new returnedModel();
                newObj.orderId = gotObj.orderId;
                saveUser(newObj);
                break;

        }
        
    }
    catch (err) {
        console.log("error");
        console.log(err);

    }
}
try {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient(config.kafka_server);
    let consumer = new Consumer(
        client,
        [{ topic: config.kafka_topic, partition: 0 }],
        {
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            encoding: 'utf8',
            fromOffset: false
        }
    );

    consumer.on('message',function (message) {
        console.log('here');
        console.log(JSON.parse(message.value));
        var gotObj = JSON.parse(message.value);
        const eventName = gotObj.eventType;
        searchFun(eventName,gotObj);
    })
    consumer.on('error', function (err) {
        console.log('error', err);
    });


}
catch (e) {
    console.log(e);
}