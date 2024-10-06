export declare const nnsContractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
export declare const avatarKey = "avatar";
export declare const nnsAbi: ({
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
} | {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    name: string;
    outputs: {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
} | {
    inputs: ({
        internalType: string;
        name: string;
        type: string;
        components?: undefined;
    } | {
        components: {
            internalType: string;
            name: string;
            type: string;
        }[];
        internalType: string;
        name: string;
        type: string;
    })[];
    name: string;
    outputs: never[];
    stateMutability: string;
    type: string;
})[];
