import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage(props) {
	return (
		<ul>
			{props.feedbackItems.map((item) => (
				<li key={item.id}>{item.text}</li>
			))}
		</ul>
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
