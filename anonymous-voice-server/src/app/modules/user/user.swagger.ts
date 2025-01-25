// Create a new file: src/app/modules/auth/auth.swagger.ts

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         statusCode:
 *           type: number
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             refreshToken:
 *               type: string
 */

/**
 * @swagger
 * /api/v1/auth/create-admin:
 *   post:
 *     summary: Create admin user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

//MENTEE CREATE API 
// Create a new file: src/app/modules/user/user.swagger.ts

/**
 * @swagger
 * components:
 *   schemas:
 *     MenteeInput:
 *       type: object
 *       required:
 *         - userName
 *         - gender
 *         - age
 *       properties:
 *         password:
 *           type: string
 *           description: User's password
 *         mentee:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *               description: Unique username for the mentee
 *             gender:
 *               type: string
 *               description: Gender of the mentee (should match the enum values)
 *             email:
 *               type: string
 *               format: email
 *               description: Email address of the mentee
 *             age:
 *               type: string
 *               description: Age of the mentee
 * 
 *     DuplicateKeyErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "E11000 duplicate key error collection: anonymus-voice-server.userdetails index: userName_1 dup key: { userName: \"test_euser\" }"
 *         errorMessages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 example: "mentee.userName"
 *               message:
 *                 type: string
 *                 example: "E11000 duplicate key error collection: anonymus-voice-server.userdetails index: userName_1 dup key: { userName: \"test_euser\" }"
 *         stack:
 *           type: string
 *           description: Stack trace of the error for debugging
 *
 * /api/v1/users/create-mentee:
 *   post:
 *     summary: Create a new mentee user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenteeInput'
 *     responses:
 *       200:
 *         description: Mentee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       409:
 *         description: Duplicate key error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DuplicateKeyErrorResponse'
 *       500:
 *         description: Server error
 */
