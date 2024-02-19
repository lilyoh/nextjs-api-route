// this frontend code, we should not ask for data - because it's credential, insecure
// instead, use api route
// when button is clicked, send a request to api route (to our own api)
// and in that api route, we can connect to a database
// because code in api folder will not be exposed

import { useRef } from 'react';

function HomePage() {
	const emailInputRef = useRef();
	const feedbackInputRef = useRef();

	function submitFormHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredFeedback = feedbackInputRef.current.value;

		const reqBody = { email: enteredEmail, text: enteredFeedback };

		fetch('/api/feedback', {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json ',
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	}

	return (
		<div>
			<h1>The Home Page</h1>
			<form onSubmit={submitFormHandler}>
				<div>
					<label htmlFor="email">Your Email Address</label>
					<input
						type="email"
						id="email"
						ref={emailInputRef}
					/>
				</div>
				<div>
					<label htmlFor="feedback">Your Feedback</label>
					<textarea
						id="feedback"
						rows="5"
						ref={feedbackInputRef}
					/>
				</div>
				<button>Send Feedback </button>
			</form>
		</div>
	);
}

export default HomePage;
