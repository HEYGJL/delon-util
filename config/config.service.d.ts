import { AlainConfig, AlainConfigKey } from './config.types';
export declare class AlainConfigService {
    private config;
    constructor(defaultConfig?: AlainConfig);
    get<T extends AlainConfigKey>(componentName: T, key?: string): AlainConfig[T];
    merge<T extends AlainConfigKey>(componentName: T, ...defaultValues: AlainConfig[T][]): AlainConfig[T];
    attach<T extends AlainConfigKey>(componentThis: any, componentName: T, defaultValues: AlainConfig[T]): void;
    attachKey<T extends AlainConfigKey>(componentThis: any, componentName: T, key: string): void;
    set<T extends AlainConfigKey>(componentName: T, value: AlainConfig[T]): void;
}
