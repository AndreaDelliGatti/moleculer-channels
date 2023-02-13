import { Service, ServiceBroker, ServiceSchema } from "moleculer";

let timeout: NodeJS.Timeout;
let count = 0;

export default class SenderService extends Service {
    // @ts-ignore
    public constructor(public broker: ServiceBroker) {
        super(broker);

        let schema: ServiceSchema = {
            name: "sender",
            methods: {
                sendMessage: async () => {
                    if (broker.sendToChannel !== undefined && broker.channelAdapter !== undefined && broker.channelAdapter.connected) {
                        try {
                            await broker.sendToChannel('message:send', { id: count }, { persistent: true, ttl: 60000 });
                            console.log(`messagge send - ${count}`);
                            count += 1;
                        }
                        catch (e) {  }
                    }
                }
            },
            started: async () => {
                timeout = setInterval(async () => { await this.sendMessage() }, 5000);
            }
        }

        schema.events = {};

        this.parseServiceSchema(schema);
    }
}