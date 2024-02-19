// react component가 아닌 normal function
// executed when we visit 'localhost:3000/api/feedback'
// inside, any server side code is okay

// not going to be bundled to client side code
// not visible to users

// with this code, we can run our own server side code
function handler(req, res) {
	res.status(200).json({ message: 'this works! ' });
}

export default handler;
