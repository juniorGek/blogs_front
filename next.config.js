module.exports = {
    env: {
        backend_url: process.env.BACKEND_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'futurxm.s3.eu-north-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};
