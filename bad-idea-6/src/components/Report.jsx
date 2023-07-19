import { BASEURL } from "./apiAdapters";
import { currentToken } from "./apiAdapters";

export default function Report(props) {
    async function reportPost() {
        console.log(props.id)
        try {
            const response = await fetch(`${BASEURL}/reviews/report/${props.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${currentToken}`,
                },
                body: JSON.stringify({
                    reviewId: props.Id
                }),
            });
            console.log("did this work?")
            const result = await response.json();
            console.log(result)
        } catch (error) {
            console.log(error, "report error")
        }
    }

    return (<button onClick={reportPost}>Report Post</button>)

}