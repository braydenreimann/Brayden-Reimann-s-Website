/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
    try {
        let input = await context.request.formData();

        // Convert FormData to JSON
        let output = {};
        for (let [key, value] of input) {
            let tmp = output[key];
            if (tmp === undefined) {
                output[key] = value;
            } else {
                output[key] = [].concat(tmp, value);
            }
        }

        let formatted = JSON.stringify([...input], null, 2);
        return new Response(formatted, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
    } catch (err) {
        return new Response("Error parsing JSON content", { status: 400 });
    }
}