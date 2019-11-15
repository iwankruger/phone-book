
export function hasEnvValue(name: string): boolean {
    return !(process.env[name] === null || process.env[name] === undefined);
}

export function getNodeEnv(fallback: string = 'development'): string {
    return getEnvValue('NODE_ENV', fallback);
}

export function getEnvValue(name: string, fallback: any): any {
    if (!hasEnvValue(name)) {
        return fallback;
    }

    const env = process.env[name];

    return env;
}
