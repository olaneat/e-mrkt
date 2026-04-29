export const textTranform = (text: string) => {
    console.log("Original Text:", text); // Debugging log
    return text
      ?.toLowerCase()
      ?.replace(/\b\w/g, (char) => char.toUpperCase());
  };

