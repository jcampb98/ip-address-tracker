export const getEnviroments = () => {
    const variables = process.env;

    return {
        ...variables
    }
}