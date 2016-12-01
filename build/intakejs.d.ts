// Generated by dts-bundle v0.6.1

declare module 'intakejs' {
    import { IServiceConstructor, IConstructor, default as Injector } from "intakejs/injector";
    export { IServiceConstructor } from "intakejs/injector";
    export { IConstructor } from "intakejs/injector";
    import { IContext } from "intakejs/context";
    export { IContext } from "intakejs/context";
    export const Service: (target: IServiceConstructor) => any;
    export const Injectable: (runtime_id: string) => (target: IConstructor) => any;
    export const Inject: (runtime_id: string) => (target: any, key: string) => void;
    export const ConstructorInject: (...runtime_id: string[]) => (target: Function) => any;
    export const injector: Injector;
    export const context: IContext;
}

declare module 'intakejs/injector' {
    import { IContext } from "intakejs/context";
    export interface IServiceConstructor extends IConstructor {
            service_name: string;
    }
    export interface IConstructor {
            new (): any;
    }
    export default class Injector {
            constructor();
            /**
                * registers a service
                * @param target
                * @constructor
                    */
            Service: (target: IServiceConstructor) => any;
            /**
                * registers instance of a class with given runtime id
                * @param runtime_id
                * @returns {function(any)}
                */
            Injectable: (runtime_id: string) => (target: IConstructor) => any;
            /**
                * injects dependency with given runtime id to the decorated field on first get
                *
                * @param runtime_id - runtime id or array of runtime ids
                * @returns {function(any, string)}
                * @constructor
                    */
            Inject: (runtime_id: string) => ((target: any, key: string) => void);
            /**
                * injects dependency with given runtime ids to the decorated class'es constructor
                */
            ConstructorInject: (...runtime_id: string[]) => (target: Function) => any;
            getContext(): IContext;
            mock(runtime_id: string, mock: any): void;
            clearMocks(): void;
            createTestContext(): void;
            clearTestContext(): void;
    }
}

declare module 'intakejs/context' {
    export interface InstanceCreator<T> {
            (): T;
    }
    export interface IContext {
            register<T>(runtime_id: string, instance: T | InstanceCreator<T>, force?: boolean): void;
            resolve<T>(runtime_id: string): T;
            clone(): IContext;
            clear(): void;
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
            /**
                * Copies all state of current context to newly created one
                * @returns {IContext}
                    */
            clone(): IContext;
    }
}

