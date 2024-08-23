import jwt from 'jsonwebtoken'

export function verifyToken(req,res,next){
    try { 
       const token = req.cookies.token
       if(!token) return res.status(401).json({msg: 'Unauthorized - no token provided'})

       const decoded = jwt.verify(token, process.env.JWT_SECRET)

       if(!decoded) return res.status(401).json({msg: 'Unauthorized - Invalid Token'})

       req.userId = decoded.userId
       next()
    } catch(e) {
        res.status(500).json({msg: 'Internal server error'})
    }
}


// Yes, that's correct! By assigning req.userId = decoded.userId, you're adding a new property, userId, to the req (request) object. This is a common practice in Express.js to pass data from one middleware to the next.

// Why Add a New Key to req?
// In an Express.js application, the req object is passed through the middleware chain. By adding properties to req, you can store information that needs to be accessed by subsequent middleware functions or route handlers.

// Example Use Case:
// Authentication Middleware (verifyToken):

// The verifyToken middleware verifies the JWT and extracts the user's ID from the token. This ID is then stored as req.userId.
// Accessing userId in Subsequent Middleware or Routes:

// Any middleware or route handler that comes after verifyToken in the chain can now access req.userId to identify the authenticated user.
// For example:
// javascript
// Copy code
// app.get('/profile', verifyToken, (req, res) => {
//     // req.userId is available here
//     const userId = req.userId;
//     // Fetch user profile based on userId
//     res.json({ message: `User profile for user ID: ${userId}` });
// });
// Benefits:
// Sharing Data Across Middlewares: By adding userId to req, you're making it easy to access the user's ID across different parts of your application without needing to re-verify the token.

// Cleaner Code: Instead of decoding the token in every route where you need user information, you decode it once in the verifyToken middleware and simply reference req.userId elsewhere.

// This pattern is very common in Express.js applications, especially for tasks like authentication, where user data needs to be consistently available throughout the request lifecycle.
