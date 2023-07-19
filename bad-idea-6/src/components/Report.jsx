export default function report(props) {
    async function reportPost() {
        try {
            const response = await fetch(`${BASEURL}/messages/report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${currentToken}`,
                },
                body: JSON.stringify({
                    reviewId: props.Id,
                }),
            });
            console.log("did this work?")
            const result = await response.json();
        } catch (error) {

        }
    }

    return (<button onClick={reportPost}></button>)

}