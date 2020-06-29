/*
|--------------------------------------------------------------------------
| Variable
|--------------------------------------------------------------------------
*/
const { Kafka } = require('kafkajs');


/*
|--------------------------------------------------------------------------
| Kafka Server Library
|--------------------------------------------------------------------------
|
| Apache Kafka is an open-source stream-processing software platform 
| developed by LinkedIn and donated to the Apache Software Foundation, 
| written in Scala and Java. The project aims to provide a unified, 
| high-throughput, low-latency platform for handling real-time data feeds.
|
*/
	const kafka = new Kafka({
		clientId: 'MSA-INSPECTION',
		brokers: [config.app.kafka[config.app.env].server_host]
	})
   
	const producer = kafka.producer()
		
	class KafkaServer {
		async producer(topic, message) {
			// Producing
			try {
				await producer.connect();
				await producer.send({
					topic: topic,
					messages: [
						{ value: message },
					],
					retry: {
						initialRetryTime: 100,
						retries: 5
					}
				});
				console.log( '[KAFKA PRODUCER] - Broker Update success.' );
			} catch (error) {
				console.log( '[KAFKA PRODUCER] - Connection Error.' );
				console.log(error);
			}
		}
	}

/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = new KafkaServer();