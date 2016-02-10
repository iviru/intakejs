// Generated by dts-bundle v0.3.0

declare module 'intakejs' {
    import { IServiceConstructor } from "__intakejs/injector";
    export { IServiceConstructor } from "__intakejs/injector";
    import { IContext } from "__intakejs/context";
    export { IContext } from "__intakejs/context";
    export const Service: (target: IServiceConstructor) => IServiceConstructor;
    export const Inject: (runtime_id: string) => (target: any, key: any) => void;
    export const context: IContext;
}

declare module '__intakejs/injector' {
    import { IContext } from "__intakejs/context";
    export interface IServiceConstructor {
            new (): any;
            service_name: string;
    }
    export default class Injector {
            constructor();
            /**
                * registers a service
                * @param target
                * @constructor
                    */
            Service: (target: IServiceConstructor) => IServiceConstructor;
            /**
                * injects dependency with given runtime id to the decorated field on first get
                *
                * @param runtime_id
                * @returns {function(any, string)}
                * @constructor
                    */
            Inject: (runtime_id: string) => ((target, key) => void);
            getContext(): IContext;
    }
}

declare module '__intakejs/context' {
    export interface InstanceCreator<T> {
            (): T;
    }
    export interface IContext {
            register<T>(runtime_id: string, instance: T | InstanceCreator<T>, force?: boolean): any;
            resolve<T>(runtime_id: string): T;
            clear(): any;
    }
    export default class Context implements IContext {
            /**
                * Saves instance with given id in context. If second argument is InstanceCreator, actual instance would be
                * instantiated on first resolve.
                *
                * @param runtime_id
                * @param instance
                * @param force
                    */
            register<T>(runtime_id: string, instance: T | InstanceCreator<T>, force?: boolean): void;
            /**
                * Returns previously registered instance for given key. If instance was never created, throws error.
                * @param runtime_id
                */
            resolve<T>(runtime_id: string): T;
            /**
                * Removes all previously registered instances from context
                */
            clear(): void;
    }
}

