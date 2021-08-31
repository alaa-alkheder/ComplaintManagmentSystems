const redis = require("redis");
const client = redis.createClient({"url":"//redis-19028.c282.east-us-mz.azure.cloud.redislabs.com:19028","user":"Admin","password":"369258/Asd"});

client.on("error", function(error) {
    console.error(error);
});

client.set("key", "test");
client.get("key", redis.print);
