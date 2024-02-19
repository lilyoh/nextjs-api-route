import fs from 'fs';
import path from 'path';

// 1)
// react component가 아닌 normal function
// executed when we visit 'localhost:3000/api/feedback'
// inside, any server side code is okay
// not going to be bundled to client side code
// not visible to users
// with this code, we can run our own server side code

// 2)
// inside of this handler function
// we have to find out which kind of request is triggering this api route
// because by default all kinds of requests will trigger this function execution - get, post, put, delete... everything

function handler(req, res) {
	if (req.method === 'POST') {
		const email = req.body.email;
		const feedbackText = req.body.text;

		const newFeedback = {
			id: new Date().toISOString(),
			email: email,
			text: feedbackText,
		};

		// store that in a db or in a file
		const filePath = path.join(process.cwd(), 'data', 'feedback.json');
		const fileData = fs.readFileSync(filePath);
		const data = JSON.parse(fileData);
		data.push(newFeedback);
		fs.writeFileSync(filePath, JSON.stringify(data));

		res.status(201).json({ message: 'Success!', feedback: newFeedback });
	} else {
		res.status(200).json({ message: 'this works! ' });
	}
}

export default handler;
