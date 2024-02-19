import { buildFeedbackPath, extractFeedback } from '../api/feedback/feedback';
import { useState } from 'react';

function FeedbackPage(props) {
	const [feedbackData, setFeedbackData] = useState();

	function loadFeedbackHandler(id) {
		fetch(`/api/feedback/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setFeedbackData(data.feedback);
			});
	}

	return (
		<>
			{feedbackData && <p>{feedbackData.email}</p>}
			<ul>
				{props.feedbackItems.map((item) => (
					<li key={item.id}>
						{item.text}
						<button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button>
					</li>
				))}
			</ul>
		</>
	);
}

// can't use fetch in getStaticProps when you reach 'inside api'
export async function getStaticProps() {
	const filePath = buildFeedbackPath();
	const data = extractFeedback(filePath);

	return {
		props: {
			feedbackItems: data,
		},
	};
}

export default FeedbackPage;
