const auth=require('../middlewares/userMiddleware.js')

let mockRequest=jest.mockRequest;
let mockResponse=jest.mockResponse;
let nextFunction= jest.fn()

beforeEach(() => {
    mockRequest = {};
    mockResponse = {
        json: jest.fn()
    };
});

describe('user middleware', () => {

    it('without headers', async () => {
        const expectedResponse = {
            "error": "Missing JWT token from the 'Authorization' header"
        };

        auth.authenticateToken(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    it('without "authorization" header', async () => {
        const expectedResponse = {
            "error": "Missing JWT token from the 'Authorization' header"
        };
        mockRequest = {
            headers: {
            }
        }
        auth.authenticateToken(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    it('with wrong "authorization" header', async () => {
        const expectedResponse = {
            "error": "Wrong JWT token"
        };
        mockRequest = {
            headers: {
                'authorization':"wrong"
            }
        }
        auth.authenticateToken(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    it('with "authorization" header', async () => {
        mockRequest = {
            headers: {
                'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhQGdtYWlsLmNvbSIsImlhdCI6MTY1NTIyNTExOH0.LQdEeb369g0JM0dQsdLxp6UN1JhAXUGGRuBhCFIM0oA'
            }
        }
        auth.authenticateToken(mockRequest, mockResponse, nextFunction);

        expect(nextFunction).toBeCalledTimes(2);
    });
});
