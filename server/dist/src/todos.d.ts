declare const todoRoute: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/": {
        $get: {
            input: {};
            output: {
                [x: number]: {
                    [x: string]: any;
                };
                length: number;
                toString: null;
                toLocaleString: null;
                pop: null;
                push: never;
                concat: never;
                join: never;
                reverse: null;
                shift: null;
                slice: never;
                sort: never;
                splice: never;
                unshift: never;
                indexOf: never;
                lastIndexOf: never;
                every: never;
                some: never;
                forEach: never;
                map: never;
                filter: never;
                reduce: never;
                reduceRight: never;
                find: never;
                findIndex: never;
                fill: never;
                copyWithin: never;
                entries: null;
                keys: null;
                values: null;
                includes: never;
                flatMap: never;
                flat: never;
                at: never;
                findLast: never;
                findLastIndex: never;
                toReversed: null;
                toSorted: never;
                toSpliced: never;
                with: never;
                [Symbol.iterator]: null;
                readonly [Symbol.unscopables]: {
                    [x: number]: boolean | undefined;
                    length?: boolean | undefined;
                    toString?: boolean | undefined;
                    toLocaleString?: boolean | undefined;
                    pop?: boolean | undefined;
                    push?: boolean | undefined;
                    concat?: boolean | undefined;
                    join?: boolean | undefined;
                    reverse?: boolean | undefined;
                    shift?: boolean | undefined;
                    slice?: boolean | undefined;
                    sort?: boolean | undefined;
                    splice?: boolean | undefined;
                    unshift?: boolean | undefined;
                    indexOf?: boolean | undefined;
                    lastIndexOf?: boolean | undefined;
                    every?: boolean | undefined;
                    some?: boolean | undefined;
                    forEach?: boolean | undefined;
                    map?: boolean | undefined;
                    filter?: boolean | undefined;
                    reduce?: boolean | undefined;
                    reduceRight?: boolean | undefined;
                    find?: boolean | undefined;
                    findIndex?: boolean | undefined;
                    fill?: boolean | undefined;
                    copyWithin?: boolean | undefined;
                    entries?: boolean | undefined;
                    keys?: boolean | undefined;
                    values?: boolean | undefined;
                    includes?: boolean | undefined;
                    flatMap?: boolean | undefined;
                    flat?: boolean | undefined;
                    at?: boolean | undefined;
                    findLast?: boolean | undefined;
                    findLastIndex?: boolean | undefined;
                    toReversed?: boolean | undefined;
                    toSorted?: boolean | undefined;
                    toSpliced?: boolean | undefined;
                    with?: boolean | undefined;
                };
                columns: {
                    name: string;
                    type: number;
                    table: number;
                    number: number;
                    parser?: undefined;
                }[];
                count: number;
                command: string;
                statement: {
                    name: string;
                    string: string;
                    types: number[];
                    columns: {
                        name: string;
                        type: number;
                        table: number;
                        number: number;
                        parser?: undefined;
                    }[];
                };
                state: {
                    status: string;
                    pid: number;
                    secret: number;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/": {
        $post: {
            input: {
                json: {
                    title: string;
                    description: string | null;
                };
            };
            output: {
                [x: string]: any;
            };
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/:id": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                [x: string]: any;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/:id": {
        $patch: {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    title: string;
                    description: string | null;
                    is_completed: boolean;
                };
            };
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    title: string;
                    description: string | null;
                    is_completed: boolean;
                };
            };
            output: {
                [x: string]: any;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/:id": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: null;
            outputFormat: "body";
            status: 204;
        };
    };
}, "/">;
export default todoRoute;
