const errorComponentsExtractor = (error) => {
    const errorMessage = error

    // Define a regular expression pattern to extract the title and description
    const errorPattern = /^([^:]+): ([^:]+): (.+)$/;

    // Use the pattern to match the error message
    const match = errorMessage.match(errorPattern);

    // Check if the match is successful
    let title;
    let description;
    title =match[1].trim()
    description =match[3].trim()
     
    return {title, description};
}

export default errorComponentsExtractor;