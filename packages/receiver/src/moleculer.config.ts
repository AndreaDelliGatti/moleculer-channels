import { BrokerOptions } from "moleculer";
import { Middleware as ChannelsMiddleware } from "@moleculer/channels";

const brokerConfig: BrokerOptions = {
	namespace: "",
	metadata: {},
	logger: {
		type: "Console",
		options: {
			colors: true,
			moduleColors: false,
			formatter: "full",
			objectPrinter: null,
			autoPadding: false
		},
	},
	logLevel: 'debug',
	transporter: {
		type: "TCP",
		options: {
			maxPacketSize: 10 * 1024 * 1024
		}
	},
	serializer: "JSON",
	requestTimeout: 70 * 1000,
	retryPolicy: {
		enabled: false,
		retries: 5,
		delay: 100,
		maxDelay: 1000,
		factor: 2,
		check: (err: any) => err && !!err.retryable
	},
	maxCallLevel: 100,
	heartbeatInterval: 5,
	heartbeatTimeout: 20,
	contextParamsCloning: false,
	tracking: {
		enabled: false,
		shutdownTimeout: 5000
	},
	disableBalancer: false,
	registry: {
		strategy: "RoundRobin",
		preferLocal: true
	},
	circuitBreaker: {
		enabled: false,
		threshold: 0.5,
		minRequestCount: 20,
		windowTime: 60,
		halfOpenTime: 10 * 1000,
		check: (err: any) => err && err.code >= 500
	},
	bulkhead: {
		enabled: false,
		concurrency: 10,
		maxQueueSize: 100
	},
	validator: true,
	metrics: {
		enabled: false,
		reporter: {
			type: ""
		},
	},
	tracing: {
		enabled: true,
		exporter: "Console"
	},
	middlewares: [
		// @ts-ignore
		ChannelsMiddleware({
			adapter: {
				type: 'amqp',
				//@ts-ignore
				options: {
					amqp: {
						url: process.env.HOST!!,
						consumerOptions: {}, // https://amqp-node.github.io/amqplib/channel_api.html#channel_consume
						exchangeOptions: {}, // https://amqp-node.github.io/amqplib/channel_api.html#channel_assertExchange
						messageOptions: {}, // https://amqp-node.github.io/amqplib/channel_api.html#channel_publish
						queueOptions: {}, // https://amqp-node.github.io/amqplib/channel_api.html#channel_assertQueue
						socketOptions: {} // https://amqp-node.github.io/amqplib/channel_api.html#connect
					},
					//@ts-ignore
					deadLettering: {
						enabled: true,
						exchangeName: 'DEAD'						
					}
				}
			}
			// adapter: process.env.HOST!!
		})
	]
};

export = brokerConfig;