export declare abstract class Component {
    private isLoadedAfterImages;
    protected typeName: string;
    constructor(typeName: string, isLoadedAfterImages?: boolean);
    init(): Promise<void>;
    toString(): string;
    warning(message: string): void;
    success(): void;
}
