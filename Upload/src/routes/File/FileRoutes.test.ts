import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import * as FileController from '../../controllers/File/FileController';
import fileRoutes from '../../routes/File/FileRoutes';
import mockUsers from '../../tools/mock/User.mock';

jest.mock('../../controllers/File/FileController');

const mockedFileController = FileController as jest.Mocked<typeof FileController>;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', fileRoutes);

// Réinitialisez tous les mocks après chaque test
afterEach(() => {
    jest.resetAllMocks();
});

describe('POST /files', () => {
    it('should upload a file and return file details', async () => {
        const response = await request(app)
            .post('/files')
            .attach('file', '../../tools/filesTest/test.png')
            .field('title', 'Test File')
            .field('description', 'This is a test file')
            .field('isPublic', 'true')
            .field('author', '9718be5a-69d1-4880-a046-48c7f6dd50ac');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('url');
        expect(response.body).toHaveProperty('duration');
        expect(response.body).toHaveProperty('format');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('isPublic');
    });
});
