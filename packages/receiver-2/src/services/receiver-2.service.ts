import { Context, Service, ServiceBroker, ServiceSchema } from "moleculer";

export default class SenderService extends Service {
    // @ts-ignore
    public constructor(public broker: ServiceBroker) {
        super(broker);

        let schema: ServiceSchema = {
            name: "receiver-2",
            channels: {
                'message:send': {
                    handler(payload: any) {
                        console.log(`messagge received - ${payload.id}`);
                    }
                }
            }
        }

        this.parseServiceSchema(schema);
    }
}