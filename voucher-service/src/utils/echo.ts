const isDev: boolean = process.env.NODE_ENV !== 'production';
const isTest: boolean = process.env.NODE_ENV === 'test';

export function echo(...params: any): void {
    if (isTest) {
        return null;
    }

    const envCanDebug: boolean = process.env.CAN_DEBUG === '1';

    if (isDev) {
        let e: Error = new Error('dummy');
        let callerName: any = e.stack.split('\n')[2].replace(/^\s+at\s+(.+?)\s.+/g, '$1');

        console.log(callerName, ...params);
        callerName = null;
        e = null;
    } else {
        if (envCanDebug) {
            console.log(...params);
        }
    }
}
